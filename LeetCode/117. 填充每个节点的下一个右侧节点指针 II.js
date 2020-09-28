/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    const q=[];
    if(!root) return root;
    q.push(root);
    while(q.length){
        let size=q.length;
        let prev=null;
        for(let i=0;i<size;i++){
            const cur=q.shift();
            if(cur.left) q.push(cur.left);
            if(cur.right) q.push(cur.right);
            if(prev===null){
                prev=cur;
                continue;
            }
            prev.next=cur;
            prev=cur;
        }
        if(prev) prev.next=null;//此时prev是每行最后一个
    }
    return root;
};
