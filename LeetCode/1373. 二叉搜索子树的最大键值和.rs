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
use std::cmp::{ max, min };
impl Solution {
    pub fn max_sum_bst(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        let mut max_sum = 0;
        fn traverse(node: Option<Rc<RefCell<TreeNode>>>, mut max_sum: &mut i32) -> (bool, i32, i32, i32) {
            match node {
                None => (true, 0, i32::MAX, i32::MIN),
                Some(node) => {
                    let node_ref = node.borrow();
                    let left = traverse(node_ref.left.clone(), max_sum);
                    let right = traverse(node_ref.right.clone(), max_sum);
                    if left.0 && right.0 && node_ref.val > left.3 && node_ref.val < right.2 {
                        let cur_sum = left.1 + right.1 + node_ref.val;
                        *max_sum = max(cur_sum, *max_sum);
                        return (true, cur_sum, min(node_ref.val, left.2), max(node_ref.val, right.3));
                    }
                    return (false, 0, 0, 0);
                }
            }
        }

        traverse(root, &mut max_sum);
        return max_sum;
    }
}
