/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
  let m = new Map();
  for (let c of s) {
    m.set(c, m.has(c) ? m.get(c) + 1 : 1);
  }
  return [...m.values()].reduce((s, x) => s + x % 2, 0) < 2;
};