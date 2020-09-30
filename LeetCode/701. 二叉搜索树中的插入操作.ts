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

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    const node=new TreeNode(val);
    if(!root) return node;
    let cur=root;
    while(cur){
        if(node.val<cur.val){//向左放
            if(!cur.left){
                cur.left=node;
                return root;
            }
            cur=cur.left;
            continue;
        }
        // 向右放
        if(!cur.right){
            cur.right=node;
            return root;
        }
        cur=cur.right;
    }
    return root;
};
