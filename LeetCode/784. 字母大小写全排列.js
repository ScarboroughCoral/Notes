/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function (S) {
  let result = [];
  function helper(cur) {
    if (cur.length === S.length) {
      result.push(cur);
      return;
    }
    let i = cur.length;
    while (i < S.length && /[^a-z]/i.test(S[i])) i++;
    if (i === S.length) {
      helper(cur + S.slice(cur.length, i + 1));
      return;
    };
    helper(cur + S.slice(cur.length, i + 1).toUpperCase());
    helper(cur + S.slice(cur.length, i + 1).toLowerCase());
  }
  helper('');
  return result;
};