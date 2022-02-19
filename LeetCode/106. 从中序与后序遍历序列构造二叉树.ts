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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (inorder.length === 0) return null;
    const val = postorder[postorder.length - 1];
    const inorderIndex = inorder.indexOf(val);
    const leftCount = inorderIndex;
    const left = buildTree(inorder.slice(0, leftCount), postorder.slice(0, leftCount));
    const right = buildTree(inorder.slice(inorderIndex + 1), postorder.slice(leftCount, postorder.length - 1));
    return new TreeNode(val, left, right)
};
