/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumRootToLeaf = function (root) {
  let result = 0;
  if (!root) return result;
  !function dfs(x, s) {
    if (!x.left && !x.right) {
      result += parseInt(s + x.val, 2);
    }
    if (x.left) dfs(x.left, s + x.val);
    if (x.right) dfs(x.right, s + x.val);
  }(root, '');
  return result % (10 ** 9 + 7);
};