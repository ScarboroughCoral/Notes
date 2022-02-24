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

function convertBST(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;
    let acc = 0;
    const traverse = (node: TreeNode | null) => {
        if (node === null) return;
        traverse(node.right);
        acc += node.val;
        node.val = acc;
        traverse(node.left);
    }
    traverse(root);
    return root;
};
