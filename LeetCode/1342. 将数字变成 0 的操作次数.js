/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
  return num.toString(2).length + (num.toString(2).match(/1/g) || []).length - 1;
};