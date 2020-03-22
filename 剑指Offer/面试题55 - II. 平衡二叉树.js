/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  function height(x) {
    if (!x) return 0;
    return Math.max(height(x.left), height(x.right)) + 1;
  }
  function helper(x) {
    if (!x) return true;
    return Math.abs(height(x.left) - height(x.right)) <= 1 && helper(x.left) && helper(x.right);
  }
  return helper(root)
};