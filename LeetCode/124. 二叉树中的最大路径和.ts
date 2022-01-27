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

function maxPathSum(root: TreeNode | null): number {
    let max = Number.MIN_SAFE_INTEGER;
    let getSideMax = (node: TreeNode | null) : number => {
        if (node === null) return 0;
        let left = Math.max(0, getSideMax(node.left));
        let right = Math.max(0, getSideMax(node.right));
        max = Math.max(max, left + right + node.val);
        return Math.max(left, right) + node.val;
    }
    getSideMax(root);
    return max;
};
