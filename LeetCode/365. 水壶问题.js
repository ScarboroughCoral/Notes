/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {boolean}
 */
var canMeasureWater = function (x, y, z) {
  if (x + y < z) return false;
  if (z === 0) return true;
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  return z % gcd(x, y) === 0;
};