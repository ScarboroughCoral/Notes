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
    pub fn preorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut result: Vec<i32> = vec![];
        Solution::traverse(root.clone(), &mut result);
        return result;
    }
    fn traverse(node: Option<Rc<RefCell<TreeNode>>>, set:&mut Vec<i32>) {
        if let Some(node) = node {
            set.push(node.borrow().val);
            Solution::traverse(node.borrow().left.clone(), set);
            Solution::traverse(node.borrow().right.clone(), set);
        }
    }
}
