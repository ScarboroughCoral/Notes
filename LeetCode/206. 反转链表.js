/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let p = head,
    pre = null;
  while (p) {
    let next = p.next;
    p.next = pre;
    pre = p;
    p = next;
  }
  return pre;
};
