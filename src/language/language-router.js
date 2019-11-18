const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()
const jsonBodyParser = express.json();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    // implement me
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id
    )
      const [word] = await LanguageService.getWordByHead(
        req.app.get('db'),
        language.head
      )
     
      res.json({
        nextWord:word.original,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count,
        totalScore:language.total_score,
        
        
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess',jsonBodyParser, async (req, res, next) => {
    // implement me
    try{
      const {guess} =req.body
      if (!req.body.guess) {
        return res
        .status(400)
        .json({
          error: `Missing 'guess' in request body`
        });
      }

      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      );

      const list = LanguageService.populateList(words);
      if (guess === list.head.value.translation){
        list.head.value.correct_count += 1;
        list.head.value.memory_value += 2;
        
      } else{
        list.head.value.incorrect_count += 1;
        list.head.value.memory_value += 2;
      }
  
      
      }
      catch (error) {
        next(error)
      }
  })

module.exports = languageRouter
