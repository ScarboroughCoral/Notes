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
  if (!head) return null;
  if (head.next) {
    let nx = head.next;
    let r = reverseList(head.next);
    nx.next = head;
    head.next = null;
    return r;
  }
  return head;
};