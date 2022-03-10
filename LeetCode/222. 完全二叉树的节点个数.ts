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

function countNodes(root: TreeNode | null): number {
    if (root === null) return 0;
    let lh = 1, rh = 1;
    let left = root;
    while(left.left !== null) {
        lh++;
        left = left.left;
    }
    let right = root;
    while(right.right !== null) {
        rh++;
        right = right.right;
    }
    if (lh === rh) {
        return Math.pow(2, lh) - 1;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
};
