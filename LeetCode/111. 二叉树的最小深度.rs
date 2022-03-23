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
use std::collections::VecDeque;
impl Solution {
    pub fn min_depth(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        if root.is_none() {
            return 0;
        }
        let mut result = 1;
        let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
        q.push_back(root.clone().unwrap());
        while q.len() != 0 {
            let l = q.len();
            for i in 0..l {
                let cur = q.pop_front().unwrap();
                let cur_borrow = cur.borrow();
                if cur_borrow.left.is_none() && cur_borrow.right.is_none() {
                    return result;
                }
                if cur_borrow.left.is_some() {
                    q.push_back(cur_borrow.left.clone().unwrap());
                }
                if cur_borrow.right.is_some() {
                    q.push_back(cur_borrow.right.clone().unwrap());
                }
            }
            result += 1;
        }
        return result;
    }
}
