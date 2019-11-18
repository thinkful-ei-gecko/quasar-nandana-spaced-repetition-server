const LinkedList = require('./linkedList');
const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getWordByHead(db,id){
    return db
    .from ('word')
    .select('*')
    .where({id})
  },

  populateList(words){
    let wordList = new LinkedList();
    words.forEach(word => list.insertLast(word));
    return wordList;
  }

}

module.exports = LanguageService
