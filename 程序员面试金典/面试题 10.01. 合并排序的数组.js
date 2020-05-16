/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function (A, m, B, n) {
  let r = A.length - 1;
  m--, n--;
  while (m >= 0 && n >= 0) {
    if (A[m] > B[n]) A[r--] = A[m--];
    else A[r--] = B[n--];
  }
  while (n >= 0) A[r--] = B[n--];
};
