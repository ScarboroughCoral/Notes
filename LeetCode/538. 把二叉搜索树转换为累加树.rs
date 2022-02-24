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
static mut acc:i32 = 0;
use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn convert_bst(root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
        unsafe {acc = 0;}
        Solution::traverse(root.clone());
        root
    }
    fn traverse(node: Option<Rc<RefCell<TreeNode>>>) {
        if let Some(node) = node {
            let mut cur = node.borrow_mut();
            Solution::traverse(cur.right.clone());
            unsafe {
                cur.val += acc;
                acc = cur.val
            }
            Solution::traverse(cur.left.clone());
        }
    }
}
