/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
  let m = new Map();
  deck.forEach(x => m.set(x, m.has(x) ? m.get(x) + 1 : 1));
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  let result = [...m.values()].reduce((a, b) => gcd(a, b));
  return result >= 2;
};