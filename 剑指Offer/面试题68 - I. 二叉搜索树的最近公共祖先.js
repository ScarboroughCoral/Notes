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
  //the first node in preorder of the sequence for inorder between p&q
  let s = [];
  let visited = new Set();
  if (root === null) return null;
  let tmp = new Set();
  s.push(root);
  let flag = 0;
  while (s.length !== 0) {
    let cur = s.pop();
    if (!visited.has(cur)) {
      visited.add(cur);
      if (cur.right) s.push(cur.right);
      s.push(cur);
      if (cur.left) s.push(cur.left);
    } else {
      if (cur === p || cur === q) {
        flag++;
      }
      if (flag > 0) {
        tmp.add(cur);
      }
      if (flag === 2) break;
    }
  }
  s = [];
  visited.clear();
  s.push(root);
  while (s.length !== 0) {
    let cur = s.pop();
    if (!visited.has(cur)) {
      visited.add(cur);
      if (cur.right) s.push(cur.right);
      if (cur.left) s.push(cur.left);
      s.push(cur);
    } else {
      if (tmp.has(cur)) return cur;
    }
  }
  return null;
};