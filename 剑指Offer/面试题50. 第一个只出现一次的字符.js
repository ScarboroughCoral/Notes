/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  let m = new Map();
  for (let c of s) m.set(c, m.has(c) ? m.get(c) + 1 : 1);
  for (let c of s) if (m.get(c) === 1) return c;
  return ' ';
};