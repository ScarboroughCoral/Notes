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
  pub fn reverse_list(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
      let mut pre=None;
      while head.is_some(){
          let mut n=head.unwrap();
          head=n.next;
          n.next=pre;
          pre=Some(n);
      }
      return pre;
  }
}