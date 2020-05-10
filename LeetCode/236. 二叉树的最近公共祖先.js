/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let s = [];
  let visited = new Set();
  let candidates = new Set();
  s.push(root);
  let idx = 0;
  while (s.length) {
    let cur = s.pop();
    if (!visited.has(cur)) {
      visited.add(cur);
      if (cur.right) s.push(cur.right);
      s.push(cur);
      if (cur.left) s.push(cur.left);
    } else {
      if (cur === p || cur === q) {
        idx++;
      }
      if (idx === 1) {
        candidates.add(cur);
      }
      if (idx === 2) {
        candidates.add(cur);
        break;
      }
    }
  }
  s = [];
  visited = new Set();
  s.push(root);
  while (s.length) {
    let cur = s.pop();
    if (!visited.has(cur)) {
      visited.add(cur);
      if (cur.right) s.push(cur.right);
      if (cur.left) s.push(cur.left);
      s.push(cur);
    } else {
      if (candidates.has(cur)) return cur;
    }
  }
  return null;
};
