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


function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
    let result = [];
    let subtreeMap = new Map();
    const subtree = (node: TreeNode | null): string => {
        if(node === null) return '#';
        const val = node.val;
        const left = subtree(node.left);
        const right = subtree(node.right);
        const s = `${left},${right},${val}`;
        console.log(s)
        if (subtreeMap.get(s) === 1) {
            result.push(node);
        }
        subtreeMap.set(s, (subtreeMap.get(s) ?? 0) + 1);
        return s;
    };
    subtree(root);
    return result;
};
