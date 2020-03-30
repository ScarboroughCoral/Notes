/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let l = 0, r = 0;
  let ans = 0, st = new Set();
  while (r < s.length) {
    if (st.has(s[r])) {
      st.delete(s[l++]);
      continue;
    }
    st.add(s[r++]);
    ans = Math.max(st.size, ans);
  }
  return ans;
};