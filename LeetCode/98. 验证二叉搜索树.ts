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

function isValidBST(root: TreeNode | null): boolean {
    const validate = (node: TreeNode | null, min: TreeNode | null, max: TreeNode | null): boolean => {
        if(node === null) return true;
        if(max !== null && node.val >= max.val) return false;
        if(min !== null && node.val <= min.val) return false;
        return validate(node.left, min, node) && validate(node.right, node, max);
    };
    return validate(root, null, null);
};
