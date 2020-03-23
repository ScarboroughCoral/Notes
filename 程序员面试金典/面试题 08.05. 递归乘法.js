/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var multiply = function (A, B) {
  if (A === 0 || B === 0) return 0;
  if (B === 1) return A;
  if (B % 2 === 0) return multiply(A << 1, B >> 1);
  return multiply(A, B - 1) + A;
};