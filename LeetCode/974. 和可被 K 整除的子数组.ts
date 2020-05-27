var subarraysDivByK = function (A: number[], K: number): number {
  const m = new Map();
  let ans = 0,
    pre = 0;
  m.set(0, 1);
  for (let x of A) {
    pre = (pre + x) % K;
    if (pre < 0) pre += K;
    if (m.has(pre)) (ans += m.get(pre)), m.set(pre, m.get(pre) + 1);
    else m.set(pre, 1);
  }
  return ans;
};
