/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let p = head;
  while (k--) p = p.next;
  let q = head;
  while (p) {
    p = p.next;
    q = q.next;
  }
  return q;
};