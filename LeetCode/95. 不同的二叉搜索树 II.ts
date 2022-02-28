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

function generateTrees(n: number): Array<TreeNode | null> {
    const build = (l: number, h: number):Array<TreeNode | null> => {
        let result = [];
        if (l > h) {
            result.push(null);
            return result;
        }
        for (let i = l; i <= h; i++) {
            const lefts = build(l, i -1);
            const rights = build(i + 1, h);
            for(let left of lefts) {
                for (let right of rights) {
                    const node = new TreeNode(i);
                    node.left = left;
                    node.right = right;
                    result.push(node);
                }
            }
        }
        return result;
    }
    return build(1, n)
};
