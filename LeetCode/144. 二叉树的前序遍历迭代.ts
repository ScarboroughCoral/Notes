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

function preorderTraversal(root: TreeNode | null): number[] {
    let visited: TreeNode | null = null;
    const stk: Array<TreeNode | null> = [];
    const result = [];
    const pushLeft = (node: TreeNode | null) => {
        let p = node;
        while(p) {
            result.push(p.val);
            stk.push(p);
            p = p.left;
        }
    };
    pushLeft(root);
    while(stk.length !== 0) {
        const cur = stk[stk.length - 1];
        if ((cur.left === null || cur.left === visited) && cur.right !== visited) {
            pushLeft(cur.right);
        }
        if (cur.right === null || cur.right === visited) {
            visited = stk.pop();
        }
    }
    return result;
};
