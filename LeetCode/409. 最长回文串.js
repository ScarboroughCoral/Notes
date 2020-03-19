/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  let m = new Map();
  for (let c of s) m.set(c, m.has(c) ? m.get(c) + 1 : 1);
  let r = 0, flag = false;
  m.forEach(v => (v % 2 ? ((v > 2 ? r += v - 1 : 0), flag = true) : r += v));
  return r + flag;
};