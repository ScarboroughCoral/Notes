/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) return s;
  let origin = s;
  s = addSplit(s, "#");

  let begin = 0,
    maxLen = 1;
  let maxRight = 0,
    center = 0;
  let dp = Array(s.length).fill(0);
  for (let i = 0; i < s.length; i++) {
    if (i < maxRight) {
      let mirror = 2 * center - i;
      dp[i] = Math.min(dp[mirror], maxRight - i);
    }
    let l = i - dp[i] - 1,
      r = i + dp[i] + 1;
    while (l >= 0 && r < s.length && s[l] === s[r]) dp[i]++, l--, r++;
    if (i + dp[i] > maxRight) {
      center = i;
      maxRight = i + dp[i];
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      begin = (i - maxLen) / 2;
    }
  }
  return origin.substr(begin, maxLen);
};

const addSplit = (s, sp) => s.replace(/./g, "#$&") + "#";
