/**
 * @param {number} n
 * @return {number}
 */
var waysToStep = function (n) {
  let a = 1, b = 2, c = 4;
  switch (n) {
    case 1: return a;
    case 2: return b;
    case 3: return c;
  }
  while (n-- > 3) {
    let t = c;
    c = (a + b + c) % 1000000007;
    a = b;
    b = t;
  }
  return c;
};