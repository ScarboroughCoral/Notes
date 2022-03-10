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
    pub fn count_nodes(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        match root {
            None => 0,
            Some(node) => {
                let lh = Self::count_height(Some(node.clone()), true);
                let rh = Self::count_height(Some(node.clone()), false);
                if (lh == rh) {
                    return 2_i32.pow(lh) - 1;
                }
                return 1 + Self::count_nodes(node.borrow().left.clone()) + Self::count_nodes(node.borrow().right.clone());
            }
        }
    }
    pub fn count_height(node: Option<Rc<RefCell<TreeNode>>>, is_left: bool) -> u32 {
        match node {
            None => 0,
            Some(node) => {
                1 + if is_left {Self::count_height(node.borrow().left.clone(), true)} else {Self::count_height(node.borrow().right.clone(), false)}
            }
        }
    }
}
