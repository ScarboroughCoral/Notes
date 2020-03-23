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
var middleNode = function (head) {
  if (!head) return null;
  let l = 0;
  let p = head;
  while (p && ++l) p = p.next;
  console.log(l)
  let mid = (l / 2 | 0) + 1;
  let x = 0;
  p = head;
  while (x++ < mid - 1) p = p.next;
  return p;
};