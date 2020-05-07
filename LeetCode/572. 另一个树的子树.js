/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function (s, t) {
  function isSame(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return isSame(a.left, b.left) && isSame(a.right, b.right);
  }
  function isSub(s, t) {
    if (!t) return true;
    if (!s) return false;
    return isSub(s.left, t) || isSub(s.right, t) || isSame(s, t);
  }
  return isSub(s, t);
};
