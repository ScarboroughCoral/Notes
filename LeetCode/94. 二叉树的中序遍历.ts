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

function inorderTraversal(root: TreeNode | null): number[] {
    const stk: Array<TreeNode | null> = [];
    const result = [];
    let visited: TreeNode | null = new TreeNode(NaN)
    const pushLeft = (node: TreeNode | null) => {
        while (node !== null) {
            stk.push(node);
            node = node.left;
        }
    };
    pushLeft(root);
    while(stk.length !== 0) {
        const cur = stk[stk.length - 1];
        if ((cur.left === null || cur.left === visited) && cur.right !== visited) {
            result.push(cur.val);
            pushLeft(cur.right);
        }
        if (cur.right === null || cur.right === visited) {
            visited = stk.pop();
        }
    }
    return result;
};
