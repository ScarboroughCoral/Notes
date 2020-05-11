/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n === -1) return 1 / x;
  if (n % 2 === 0) {
    let t = myPow(x, n / 2);
    return t * t;
  }
  let t = myPow(x, (n - 1) / 2);
  return t * t * x;
};
