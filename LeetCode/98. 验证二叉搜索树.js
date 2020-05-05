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
var isValidBST = function (root) {
  if (!root) return true;
  let visited = new Set();
  let s = [];
  s.push(root);
  let pre = Number.NEGATIVE_INFINITY;
  while (s.length) {
    let cur = s.pop();
    if (!visited.has(cur)) {
      visited.add(cur);
      if (cur.right) s.push(cur.right);
      s.push(cur);
      if (cur.left) s.push(cur.left);
    } else {
      let { val } = cur;
      if (val <= pre) return false;
      pre = val;
    }
  }
  return true;
};
