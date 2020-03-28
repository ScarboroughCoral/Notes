/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function (original, cloned, target) {
  let v = target.val;
  let q = [];
  q.push(cloned);
  while (q.length) {
    let size = q.length;
    for (let i = 0; i < size; i++) {
      let cur = q.shift();
      if (cur.val === v) return cur;
      if (cur.left) q.push(cur.left);
      if (cur.right) q.push(cur.right);
    }
  }
  return null;
};