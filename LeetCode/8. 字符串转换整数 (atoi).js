/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
  let t = (str.match(/^\s*[\+\-]?\d+/) || [0])[0];
  let intMax = 2 ** 31 - 1, intMin = -(2 ** 31);
  if (t > intMax) return intMax;
  if (t < intMin) return intMin;
  return t;
};