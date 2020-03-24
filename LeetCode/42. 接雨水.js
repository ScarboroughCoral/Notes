/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let dpL = Array(height.length), dpR = Array(height.length);
  dpL[0] = 0, dpR[dpR.length - 1] = 0;
  for (let i = 1; i < dpL.length; i++) {
    dpL[i] = Math.max(dpL[i - 1], height[i - 1]);
  }
  for (let i = dpR.length - 2; i >= 0; i--) {
    dpR[i] = Math.max(dpR[i + 1], height[i + 1]);
  };
  let sum = 0;
  height.forEach((x, i) => {
    let cur = Math.min(dpL[i], dpR[i]);
    sum += cur > x ? (cur - x) : 0;
  });
  return sum;
};