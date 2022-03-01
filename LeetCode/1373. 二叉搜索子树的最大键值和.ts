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

function maxSumBST(root: TreeNode | null): number {
    let maxSum = 0;
    const traverse = (node: TreeNode | null): [boolean,number, number, number] => {
        if (node === null) return [true, 0, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        const left = traverse(node.left);
        const right = traverse(node.right);
        if (left[0] && right[0] && node.val > left[3] && node.val < right[2]) {
            maxSum = Math.max(left[1] + right[1] + node.val, maxSum)
            return [true, left[1] + right[1] + node.val, Math.min(node.val, left[2]), Math.max(node.val, right[3])];
        }
        return [false, 0, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    }
    traverse(root)
    return maxSum
};
