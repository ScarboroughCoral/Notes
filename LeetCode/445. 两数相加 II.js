/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let p1 = l1, p2 = l2;
  let s1 = [], s2 = [];
  while (p1) {
    s1.push(p1.val);
    p1 = p1.next;
  }
  while (p2) {
    s2.push(p2.val);
    p2 = p2.next;
  }
  let ans = null, carry = 0;
  while (s1.length || s2.length || carry !== 0) {
    let a = s1.length ? s1.pop() : 0;
    let b = s2.length ? s2.pop() : 0;
    let x = a + b + carry;
    carry = x / 10 | 0;
    x = x % 10;
    let cur = new ListNode(x);
    cur.next = ans;
    ans = cur;
  }
  return ans;
};