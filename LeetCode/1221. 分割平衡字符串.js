/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let m = {
    'L': 'R',
    'R': 'L'
  };
  let i = 0, cnt = 0, st = [];
  st.push(s[0]);
  while (++i < s.length) {
    if (st.length === 0 || st[st.length - 1] !== m[s[i]]) {
      st.push(s[i]);
      continue;
    }
    st.pop();
    if (st.length === 0) cnt++;
  }
  return cnt;
};