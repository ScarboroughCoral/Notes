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
    pub fn lowest_common_ancestor(root: Option<Rc<RefCell<TreeNode>>>, p: Option<Rc<RefCell<TreeNode>>>, q: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        if root == None {
            return None;
        }
        if root == p {
            return root.clone();
        }
        if root == q {
            return root.clone();
        }
        let root = root.unwrap();
        let left = Self::lowest_common_ancestor(root.borrow().left.clone(), p.clone(), q.clone());
        let right = Self::lowest_common_ancestor(root.borrow().right.clone(), p.clone(), q.clone());
        match (left.clone(), right.clone()) {
            (Some(_), Some(_)) => Some(root.clone()),
            _ => if left.is_some() { left } else { right }
        }
    }
}
