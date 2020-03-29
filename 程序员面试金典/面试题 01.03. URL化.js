/**
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
var replaceSpaces = function (S, length) {
  let r = length - 1;
  let result = S.split('');
  let i = S.length - 1;
  while (i >= 0) {
    if (result[r] === ' ') {
      result[i--] = '0';
      result[i--] = '2';
      result[i--] = '%';
      r--;
      continue;
    }
    result[i--] = result[r--];
  }
  return result.join('');
};