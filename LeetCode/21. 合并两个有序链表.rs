// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
//
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }
impl Solution {
    pub fn merge_two_lists(list1: Option<Box<ListNode>>, list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut virtual_head = ListNode::new(-1);
        let mut p = &mut virtual_head;
        let mut p1 = list1;
        let mut p2 = list2;
        while p1.is_some() && p2.is_some() {
            let (mut p1_data, mut p2_data) = (p1.as_deref_mut().unwrap(), p2.as_deref_mut().unwrap());
            if p1_data.val > p2_data.val {
                let next = p2_data.next.take();
                p.next = p2.take();
                p2 = next;
            } else {
                let next = p1_data.next.take();
                p.next = p1.take();
                p1 = next;
            }
            p = p.next.as_deref_mut().unwrap();
        }
        p.next = p1.or(p2);
        return virtual_head.next;
    }
}
