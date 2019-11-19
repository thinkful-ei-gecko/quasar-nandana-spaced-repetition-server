const express = require('express');
const LanguageService = require('./language-service');
const LinkedList = require('./linkedList');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();
const jsonBodyParser = express.json();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    res.json({
      language: req.language,
      words
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/head', async (req, res, next) => {
  // implement me
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );
    const [word] = await LanguageService.getWordByHead(
      req.app.get('db'),
      language.head
    );

    res.json({
      nextWord: word.original,
      wordCorrectCount: word.correct_count,
      wordIncorrectCount: word.incorrect_count,
      totalScore: language.total_score
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.post('/guess', jsonBodyParser, async (req, res, next) => {
  try {
    const { guess } = req.body;
    if (!req.body.guess) {
      return res.status(400).json({
        error: `Missing 'guess' in request body`
      });
    }

    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    const list = new LinkedList();
    words.forEach(word => list.insertLast(word));

    // check answer
    let correct = false;
    if (guess === list.head.value.translation) {
      correct = true;
      ++list.head.value.correct_count;
      list.head.value.memory_value *= 2;
      ++req.language.total_score;
    } else {
      ++list.head.value.incorrect_count;
      list.head.value.memory_value = 1;
    }

    let pNode = list.head;
    while (pNode != null) {
      console.log(`pNode: ${pNode.value.translation}, ${pNode.value.correct_count}, ${pNode.value.next},`);
      pNode = pNode.next;
    }

    const oldHead = list.head; // old head node
    list.remove(list.head.value); //moving head to next node
    list.insertAt(oldHead.value.memory_value, oldHead.value);

/*     let sNode = list.head;
    while (sNode != null) {
      console.log(`sNode: ${sNode.value.translation}, ${sNode.value.correct_count}, ${sNode.value.next},`);
      sNode = sNode.next;
    } */

    let tNode = list.head;
    while (tNode != null) {
      await LanguageService.updateWords(
        req.app.get('db'),
        tNode.value,
        tNode.next != null ? tNode.next.value : null
      );
      tNode = tNode.next;
    }

    await LanguageService.updateTotalScore(
      req.app.get('db'),
      req.language.id,
      req.language.user_id,
      req.language.total_score
    );

    const response = {
      nextWord: list.head.value.original,
      wordCorrectCount: list.head.value.correct_count,
      wordIncorrectCount: list.head.value.incorrect_count,
      totalScore: req.language.total_score,
      answer: oldHead.value.translation,
      isCorrect: correct
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
