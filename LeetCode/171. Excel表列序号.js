/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function (s) {
  let base = 'A'.charCodeAt(0) - 1;
  return s.split('').map(x => x.charCodeAt(0) - base).reduce((s, x) => s * 26 + x, 0);
};