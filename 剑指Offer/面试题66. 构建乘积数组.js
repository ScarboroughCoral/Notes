/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function (a) {
  let dpL = Array(a.length),
    dpR = Array(a.length);
  dpL[0] = 1;
  dpR[dpR.length - 1] = 1;
  for (let i = 1; i < a.length; i++) {
    dpL[i] = dpL[i - 1] * a[i - 1];
  }
  for (let i = a.length - 2; i >= 0; i--) {
    dpR[i] = dpR[i + 1] * a[i + 1];
  }
  return Array.from({ length: a.length }, (x, i) => dpL[i] * dpR[i]);
};
