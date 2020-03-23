/**
 * @param {string[]} book
 */
let k = Symbol("book");
var WordsFrequency = function (book) {
  this[k] = book.reduce((m, x) => m.set(x, m.has(x) ? m.get(x) + 1 : 1), new Map());
};

/** 
 * @param {string} word
 * @return {number}
 */
WordsFrequency.prototype.get = function (word) {
  return this[k].get(word) || 0;
};

/**
 * Your WordsFrequency object will be instantiated and called as such:
 * var obj = new WordsFrequency(book)
 * var param_1 = obj.get(word)
 */