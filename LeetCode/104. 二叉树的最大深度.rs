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
use std::cmp;
struct Meta {
    pub result: i32,
    pub depth: i32,
}

static mut meta: Meta = Meta {
    result: 0,
    depth: 1,
};
impl Solution {
    pub fn max_depth(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        unsafe {
            meta = Meta {
            result: 0,
            depth: 1,
            };
        }
        Solution::calc(root);
        unsafe {
            return meta.result;
        }
    }
    fn calc(node: Option<Rc<RefCell<TreeNode>>>) {
        if node == None {
            return;
        }
        unsafe {
            meta.result = cmp::max(meta.result, meta.depth);
            meta.depth += 1;
        }
        if let Some(tmp) = node {
            if let Some(left) = &tmp.borrow().left {
                Solution::calc(Some(Rc::clone(&left)));
            }
            if let Some(right) = &tmp.borrow().right {
                Solution::calc(Some(Rc::clone(&right)));
            }
        }
        unsafe {
            meta.depth -= 1;
        }
    }
}

impl SolutionWithInfer {
    pub fn max_depth(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        match root {
            None => 0,
            Some(node) => {
                let left = SolutionWithInfer::max_depth(node.borrow().left.clone());
                let right = SolutionWithInfer::max_depth(node.borrow().right.clone());
                return cmp::max(left, right) + 1;
            }
        }

    }
}
