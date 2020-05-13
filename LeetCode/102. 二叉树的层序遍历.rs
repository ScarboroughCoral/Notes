// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//   pub val: i32,
//   pub left: Option<Rc<RefCell<TreeNode>>>,
//   pub right: Option<Rc<RefCell<TreeNode>>>,
// }
// 
// impl TreeNode {
//   #[inline]
//   pub fn new(val: i32) -> Self {
//     TreeNode {
//       val,
//       left: None,
//       right: None
//     }
//   }
// }
use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut q=match root{
            None=>vec![],
            Some(r)=>vec![r]
        };
        let mut result=vec![];
        while !q.is_empty(){
            let (mut sub,mut next)=(vec![],vec![]);
            for x in q{
                sub.push(x.borrow().val.clone());
                if let Some(l)=x.borrow().left.clone(){
                    next.push(l);
                }
                if let Some(r)=x.borrow().right.clone(){
                    next.push(r);
                }
            }
            result.push(sub);
            q=next;
        }
        return result;
    }
}