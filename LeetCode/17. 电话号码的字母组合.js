/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  let result = [];
  if (digits.length === 0) return result;
  const m = new Map([['2', 'abc'], ['3', 'def'], ['4', 'ghi'], ['5', 'jkl'], ['6', 'mno'], ['7', 'pqrs'], ['8', 'tuv'], ['9', 'wxyz']]);
  function helper(cur, rm) {
    if (cur.length === digits.length) {
      result.push(cur);
      return;
    }
    let x = rm[0], chrs = m.get(x);
    let last = rm.slice(1);
    for (let i = 0; i < chrs.length; i++) {
      helper(cur + chrs[i], last);
    }
  }
  helper('', digits);
  return result;
};