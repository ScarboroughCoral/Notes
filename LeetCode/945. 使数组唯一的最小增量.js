/**
 * @param {number[]} A
 * @return {number}
 */
var minIncrementForUnique = function (A) {
  if (A.length === 0) return 0;
  let sorted = [...A].sort((a, b) => a - b);
  let res = 0, taken = 0;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] == sorted[i - 1]) {
      taken++;
      res -= sorted[i];
    } else {
      let given = Math.min(taken, sorted[i] - sorted[i - 1] - 1);
      taken -= given;
      res += (sorted[i - 1] + 1) * given + given * (given - 1) / 2;
    }

  }

  if (taken > 0) res += taken * (sorted[sorted.length - 1] + 1) + taken * (taken - 1) / 2;
  return res;
};