/**
 * @param {string[]} words
 * @return {number}
 */
var minimumLengthEncoding = function (words) {
  let s = new Set(words);
  for (let c of words) {
    for (let i = 1; i < c.length; i++) {
      let x = c.slice(i);
      s.has(x) && s.delete(x);
    }
  }
  return [...s].reduce((s, x) => s + x.length, 0) + s.size;
};