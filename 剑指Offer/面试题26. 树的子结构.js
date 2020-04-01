/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
  function isSame(a, b) {
    if (!b) return true;
    if (!a) return false;
    return a.val === b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
  }

  function helper(a, b) {
    if (!b || !a) return false;
    if (isSame(a, b)) return true;
    return helper(a.left, b) || helper(a.right, b);
  }
  return helper(A, B);
};