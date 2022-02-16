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
function maxDepthWithTraverse(root: TreeNode | null): number {
    let depth = 1
    let result = 0;
    function calc(node: TreeNode | null): void {
    if (node === null) return;
    result = Math.max(depth, result);
    depth++;
    if (node.left !== null) calc(node.left);
    if (node.right !== null) calc(node.right);
    depth--;
    }
  calc(root);
  return result
};



function maxDepthWithInfer(root: TreeNode | null): number {
    if(root === null) return 0;
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return Math.max(left, right) + 1;
};
