/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  let m = new Map();
  let result = 0;
  chars.split('').forEach(x => m.set(x, m.has(x) ? m.get(x) + 1 : 1));
  for (let w of words) {
    if (test(w, new Map(m))) result += w.length;
  }
  return result;
  function test(s, m) {
    for (let c of s) {
      if (m.has(c) && m.get(c) > 0) m.set(c, m.get(c) - 1);
      else return false;
    }
    return true;
  }
};

