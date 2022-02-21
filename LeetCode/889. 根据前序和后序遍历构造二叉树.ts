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

function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
    if (preorder.length === 0) return null;
    const val = preorder[0];
    const l = preorder.length;
    if(l === 1) return new TreeNode(val);
    const valOfLeftChild = preorder[1];
    const postorderIndex = postorder.indexOf(valOfLeftChild);
    const leftCount = postorderIndex + 1;
    const left = constructFromPrePost(preorder.slice(1, leftCount + 1), postorder.slice(0, leftCount));
    const right = constructFromPrePost(preorder.slice(leftCount + 1), postorder.slice(leftCount, l - 1));
    return new TreeNode(val, left, right);
};
