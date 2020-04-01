/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function (seq) {
  let dep = 0;
  return seq.split('').map(x => x === '(' ? (++dep % 2) : (dep-- % 2));
};