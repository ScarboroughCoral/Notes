/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let result = [];
  function helper(cur, l, r) {
    if (l > r) return;
    if (cur.length === n << 1) {
      result.push(cur);
      return;
    }
    if (l > 0) helper(cur + '(', l - 1, r);
    if (r > 0) helper(cur + ')', l, r - 1);
  }
  helper('', n, n);
  return result;
};