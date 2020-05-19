/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let i = 0,
    j = s.length - 1;
  for (; i < j && s[i] === s[j]; i++, j--);
  function isPalindrome(i, j) {
    for (; i < j && s[i] === s[j]; i++, j--);
    return i >= j;
  }
  return isPalindrome(i, j - 1) || isPalindrome(i + 1, j);
};
