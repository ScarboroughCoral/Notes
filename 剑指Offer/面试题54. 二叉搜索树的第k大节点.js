/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
  let count = 0;
  let s = [];
  let visited = new Set();
  s.push(root);
  while (s.length !== 0) {
    let cur = s.pop();
    if (!visited.has(cur)) {
      visited.add(cur);
      cur.left && s.push(cur.left);
      s.push(cur);
      cur.right && s.push(cur.right);
    } else {
      count++;
      if (count === k) return cur.val;
    }
  }
};