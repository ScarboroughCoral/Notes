var longestPalindrome = function (s: string): string {
  if (s.length < 2) return s;
  let ss = addSplit(s, "#");
  let begin = 0,
    maxLen = 1;
  let center = 0,
    maxRight = 0;
  let dp = Array(ss.length).fill(0);
  for (let i = 0; i < ss.length; i++) {
    if (i < maxRight) {
      let mirror = 2 * center - i;
      dp[i] = Math.min(dp[mirror], maxRight - i);
    }
    let l = i - dp[i] - 1,
      r = i + dp[i] + 1;
    while (l >= 0 && r < ss.length && ss[l] === ss[r]) l--, r++, dp[i]++;
    if (i + dp[i] > maxRight) (maxRight = i + dp[i]), (center = i);
    if (dp[i] > maxLen) (maxLen = dp[i]), (begin = (i - maxLen) / 2);
  }
  return s.substr(begin, maxLen);
};
const addSplit = (s: string, sp: string): string =>
  s.replace(/./g, sp + "$&") + sp;
