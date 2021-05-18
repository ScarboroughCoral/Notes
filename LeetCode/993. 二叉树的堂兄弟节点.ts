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

function isCousins(root: TreeNode | null, x: number, y: number): boolean {
    if (!root) return false;
    let q = new Array<{parent: number,cur: TreeNode}>();
    q.push({parent: 0, cur: root});
    while(q.length) {
        let len = q.length;
        let hasOne =false,oneParent = 0;
        for(let i=0;i<len;i++) {
            let {cur,parent} = q.shift();
            if (cur.val === x || cur.val === y) {
                if (hasOne) {
                    if (oneParent === parent) {
                        return false
                    }
                    return true
                }
                hasOne = true;
                oneParent = parent;
            }
            if (cur.left) {
                q.push({parent: cur.val, cur: cur.left});
            }
            if (cur.right) {
                q.push({parent: cur.val, cur: cur.right})
            }
        }
    }
    return false;
};
