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
var reverseKGroup = function (head, k) {
  let hair = new ListNode(0);
  hair.next = head;
  let pre = hair;
  while (head) {
    let tail = pre;
    for (let i = 0; i < k; i++) {
      tail = tail.next;
      if (!tail) return hair.next;
    }
    let nex = tail.next;
    [head, tail] = myReverse(head, tail);
    pre.next = head;
    tail.next = nex;
    pre = tail;
    head = tail.next;
  }
  return hair.next;
};

function myReverse(head, tail) {
  let pre = tail.next;
  let p = head;
  while (tail !== pre) {
    const nex = p.next;
    p.next = pre;
    pre = p;
    p = nex;
  }
  return [tail, head];
}
