/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function (s) {
  let statusPos = Array(1 << 5).fill(-1);
  let status = 0,
    ans = 0;
  statusPos[0] = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    switch (c) {
      case "a":
        status ^= 1 << 0;
        break;
      case "e":
        status ^= 1 << 1;
        break;
      case "i":
        status ^= 1 << 2;
        break;
      case "o":
        status ^= 1 << 3;
        break;
      case "u":
        status ^= 1 << 4;
        break;
    }
    if (~statusPos[status]) ans = Math.max(ans, i + 1 - statusPos[status]);
    else statusPos[status] = i + 1;
  }
  return ans;
};
