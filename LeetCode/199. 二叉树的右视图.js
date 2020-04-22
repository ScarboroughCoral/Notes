/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  let q = [];
  let result = [];
  if (!root) return result;
  q.push(root);
  while (q.length) {
    let size = q.length;
    let cur = null;
    for (let i = 0; i < size; i++) {
      cur = q.shift();
      if (cur.left) q.push(cur.left);
      if (cur.right) q.push(cur.right);
    }
    if (cur) result.push(cur.val);
  }
  return result;
};