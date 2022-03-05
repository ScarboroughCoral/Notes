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
    if (root === null) return NULL;
    let result = [];
    let q: Array<TreeNode | null> = [];
    q.push(root);
    while (q.length !== 0) {
        let cur = q.shift();
        if (cur === null) {
            result.push(NULL, SEP);
        } else {
            result.push(cur.val, SEP);
            q.push(cur.left);
            q.push(cur.right);
        }
    }
    result.pop();
    return result.join('');
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    const nodes = data.split(SEP);
    if (nodes.length === 0) return null;
    const rootVal = nodes.shift();
    const q: Array<TreeNode | null> = [];
    if (rootVal === NULL) return null;
    const root = new TreeNode(Number(rootVal));
    q.push(root);
    while(q.length !== 0) {
        const cur = q.shift();
        if (nodes.length !== 0) {
            const leftVal = nodes.shift();
            if (leftVal !== NULL) {
                cur.left = new TreeNode(Number(leftVal));
                q.push(cur.left);
            } else {
                cur.left = null;
            }
        }
        if (nodes.length !== 0) {
            const rightVal = nodes.shift();
            if (rightVal !== NULL) {
                cur.right = new TreeNode(Number(rightVal));
                q.push(cur.right);
            } else {
                cur.right = null;
            }
        }
    }
    return root;
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
