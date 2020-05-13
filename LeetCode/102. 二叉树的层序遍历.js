/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const result = [];
  bfs(root, 0, result);
  return result;
};
const bfs = (node, depth, result) => {
  if (!result[depth]) result[depth] = [];
  result[depth].push(node.val);
  if (node.left) bfs(node.left, depth + 1, result);
  if (node.right) bfs(node.right, depth + 1, result);
};
