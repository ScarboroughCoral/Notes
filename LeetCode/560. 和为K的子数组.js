/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const m = new Map();
  m.set(0, 1);
  let c = 0,
    pre = 0;
  for (let x of nums) {
    pre += x;
    if (m.has(pre - k)) c += m.get(pre - k);
    if (m.has(pre)) m.set(pre, m.get(pre) + 1);
    else m.set(pre, 1);
  }
  return c;
};
