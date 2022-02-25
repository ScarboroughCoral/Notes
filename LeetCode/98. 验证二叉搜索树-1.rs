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
    pub fn is_valid_bst(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        return Solution::validate(root.clone(), None, None);
    }
    fn validate(node: Option<Rc<RefCell<TreeNode>>>, min: Option<i32>, max: Option<i32>) -> bool {
        match node {
            None => true,
            Some(node) => {
                let n = node.borrow();
                return min.map_or(true, |x| x < n.val)
                    && max.map_or(true, |x| x > n.val)
                    && Solution::validate(n.left.clone(), min, Some(n.val))
                    && Solution::validate(n.right.clone(), Some(n.val), max);
            }
        }
    }
}
