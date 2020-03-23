/**
 * @param {number} num
 * @return {string[]}
 */
var readBinaryWatch = function (num) {
  let result = new Set();
  function helper(h, m, c) {
    // console.log(h,"-",m,"-",c)
    if (c < 0 || 10 - h.length - m.length < c) return;
    if (h.length > 4 || m.length > 6) return;
    if (h.length === 4 && m.length === 6) {
      if (c !== 0) return;
      let hours = parseInt(h, 2);
      let minutes = parseInt(m, 2);
      if (hours > 11 || minutes > 59) return;
      result.add(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
      return;
    }
    if (h.length < 4) {
      helper('1' + h, m, c - 1);
      helper('0' + h, m, c);
    }
    if (m.length < 6) {
      helper(h, '1' + m, c - 1);
      helper(h, '0' + m, c);
    }
  }
  helper('', '', num);
  return [...result];
};