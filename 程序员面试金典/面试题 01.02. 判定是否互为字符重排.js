/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function (s1, s2) {
  let st1 = new Set(s1), st2 = new Set(s2);
  for (let c of st1) if (!st2.has(c)) return false;
  for (let c of st2) if (!st1.has(c)) return false;
  return true;
};