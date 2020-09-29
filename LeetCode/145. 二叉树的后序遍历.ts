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

function postorderTraversal(root: TreeNode | null): number[] {
    const visited=new Set<TreeNode>();
    const s:Array<TreeNode>=[];
    const result:Array<number>=[];
    if(!root) return result;
    s.push(root);
    while(s.length){
        const cur=s.pop() as TreeNode;
        if(!visited.has(cur)){
            visited.add(cur);
            s.push(cur);
            if(cur.right) s.push(cur.right);
            if(cur.left) s.push(cur.left);
        }else{
            result.push(cur.val);
        }
    }
    return result;
};
