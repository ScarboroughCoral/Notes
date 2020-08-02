/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
declare class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null);
}

type TreeNodeOptional = TreeNode | null;
function flatten(root: TreeNodeOptional): void {
  if (!root) return;
  let visited = new Set();
  let s = [];
  s.push(root);
  let prev = null;
  while (s.length !== 0) {
    let cur = s.pop() as TreeNode;
    if (!visited.has(cur)) {
      visited.add(cur);
      s.push(cur);
      if (cur.left) s.push(cur.left);
      if (cur.right) s.push(cur.right);
    } else {
      cur.left = null;
      cur.right = prev;
      prev = cur;
    }
  }
}
