/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (!head) return true;
  let data = [];
  while (head) data.push(head.val), (head = head.next);
  return data.every((x, i, a) => a[i] === a[a.length - i - 1]);
};
