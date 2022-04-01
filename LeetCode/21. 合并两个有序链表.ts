/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const virtualHead = new ListNode(-1);
    let p = virtualHead;
    let p1 = list1;
    let p2 = list2;
    while (p1 !== null && p2 !== null) {
        if (p1.val > p2.val) {
            p.next = p2;
            p2 = p2.next;
        } else {
            p.next = p1;
            p1 = p1.next;
        }
        p = p.next;
    }
    if (p1 !== null) p.next = p1;
    if (p2 !== null) p.next = p2;
    return virtualHead.next;
};
