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

function diameterOfBinaryTree(root: TreeNode | null): number {
    let result = 0;
    const depthMap = new Map<TreeNode, number>();
    const depth = (node: TreeNode | null): number => {
        if (node === null) return 0;
        if (depthMap.has(node)) return depthMap.get(node);
        const left = depth(node.left);
        const right = depth(node.right);
        const d = Math.max(left, right) + 1;
        depthMap.set(node, d);
        return d;
    };
    const traverse = (node: TreeNode | null) => {
        if (node === null) return;
        const left = depth(node.left);
        const right = depth(node.right);
        const cur = left + right;
        result = Math.max(cur, result);
        traverse(node.left);
        traverse(node.right);
    };
    traverse(root);
    return result;
};


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

function diameterOfBinaryTreeInfer(root: TreeNode | null): number {
    let diameter = 0;
    const depth = (node: TreeNode | null): number => {
        if(node === null) return 0;
        const left = depth(node.left);
        const right = depth(node.right);
        diameter = Math.max(diameter, left + right);
        return Math.max(left, right) + 1;
    };
    depth(root);
    return diameter;
};
