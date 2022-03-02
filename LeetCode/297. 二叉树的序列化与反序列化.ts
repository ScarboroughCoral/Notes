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
const SEP = ',';
const NULL = '#';
/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
    let result = [];
    const traverse = (node: TreeNode | null) => {
        if (node === null) {
            result.push(NULL,SEP);
            return;
        }
        result.push(node.val, SEP);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return result.join('');
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    const nodes = data.split(',');
    const traverse = (nodes: string[]): TreeNode | null => {
        if (nodes.length === 0) return null;
        const rootVal = nodes.shift();
        if (rootVal === NULL) return null;
        const root = new TreeNode(Number(rootVal));
        const left = traverse(nodes);
        const right = traverse(nodes);
        root.left = left;
        root.right = right;
        return root;
    }
    return traverse(nodes);
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
