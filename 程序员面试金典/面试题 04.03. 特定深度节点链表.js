/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */
var listOfDepth = function (tree) {
  let result = [];
  if (!tree) return result;
  let q = [];
  q.push(tree);
  while (q.length) {
    let size = q.length;
    let head = null, p = null;
    for (let i = 0; i < size; i++) {
      let cur = q.shift();
      cur.left && q.push(cur.left);
      cur.right && q.push(cur.right);
      if (!head) {
        head = new ListNode(cur.val);
        p = head;
        continue;
      }
      p.next = new ListNode(cur.val);
      p = p.next;
    }
    result.push(head);
  }
  return result;
};