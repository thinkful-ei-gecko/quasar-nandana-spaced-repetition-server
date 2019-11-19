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

  populateList(words) {
    const list = new LinkedList();
    words.forEach(word => list.insertLast(word));
    return list;
  },

  movehead(db,list){
    //console.log(list.size())
    const temp = list.head;
    list.remove(list.head.value);//moving head to next node
    
    nNode = list._findNthElement(temp.value.memory_value);
    temp.value.next = nNode.value.next;
    nNode.value.next = temp.value.id;
    //temp.value.next = nNode.value.next;
    list.insertAt(temp.value.memory_value, temp);
    LanguageService.updateWords(db,temp);
    LanguageService.updateWords(db,nNode)
    return list;
  },
  
  updateWords(db,temp){

    //update temp and nNode
    db('word')
    .where({id:temp.value.next})
    .update({
      original:temp.value.original,
      translation:temp.value.translation,
      memory_value: temp.value.memory_value,
      correct_count: temp.value.correct_count,
      incorrect_count: temp.value.incorrect_count,})

    
  },

  updateTotalScore(db, id, total) {
    return db('language')
      .where({ id })
      .update({ total_score: total });
  },


}

module.exports = LanguageService
