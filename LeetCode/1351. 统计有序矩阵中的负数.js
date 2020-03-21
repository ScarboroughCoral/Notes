/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
  return grid.reduce((s, x) => {
    let l = 0, r = x.length - 1;
    if (x[0] < 0) return s + x.length;
    let pos = -1;
    while (l <= r) {
      let mid = l + (r - l) / 2 | 0;
      if (x[mid] < 0) pos = mid, r = mid - 1;
      else l = mid + 1;
    }
    return pos >= 0 ? s + x.length - pos : s;
  }, 0);
};