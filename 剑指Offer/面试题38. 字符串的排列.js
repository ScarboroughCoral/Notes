/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
  let len = s.length;
  let result = new Set();
  function helper(cur, st) {
    if (cur.length === len) {
      result.add(cur);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (st.has(i)) continue;
      st.add(i);
      helper(cur + s[i], st);
      st.delete(i);
    }
  }
  helper('', new Set());
  return [...result];
};