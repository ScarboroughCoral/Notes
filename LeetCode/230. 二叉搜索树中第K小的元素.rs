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
static mut result: i32 = -1;
static mut i: i32 = 0;
use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn kth_smallest(root: Option<Rc<RefCell<TreeNode>>>, k: i32) -> i32 {
        unsafe {
            result = -1;
            i = 0;
        }
        Solution::traverse(root.clone(), k);
        unsafe { return result; }
    }
    fn traverse(node: Option<Rc<RefCell<TreeNode>>>, k: i32) {
        if let Some(node) = node {
            unsafe {
                if i >= k {
                    return;
                }
            }
            Solution::traverse(node.borrow().left.clone(), k);
            unsafe {
                i += 1;
                if i == k {
                    result = node.borrow().val;
                    return;
                }
            }
            Solution::traverse(node.borrow().right.clone(), k);
        }
    }
}
