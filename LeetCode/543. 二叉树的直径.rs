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
static mut diameter: i32 = 0;
use std::rc::Rc;
use std::cell::RefCell;
use std::cmp;
impl Solution {
    pub fn diameter_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        unsafe {
            diameter = 0;
        }
        Solution::traverse(root.clone());
        unsafe {
            return diameter;
        }
    }
    fn traverse(node: Option<Rc<RefCell<TreeNode>>>) {
        if let Some(node) = node {
            let left = Solution::depth(node.borrow().left.clone());
            let right = Solution::depth(node.borrow().right.clone());
            let d = left + right;
            unsafe {
                diameter = cmp::max(d, diameter);
            }
            Solution::traverse(node.borrow().left.clone());
            Solution::traverse(node.borrow().right.clone());
        }
    }
    fn depth(node: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        match node {
            None => 0,
            Some(node) => {
                let left = Solution::depth(node.borrow().left.clone());
                let right = Solution::depth(node.borrow().right.clone());
                cmp::max(left, right) + 1
            }
        }
    }

}


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
static mut diameter: i32 = 0;
use std::rc::Rc;
use std::cell::RefCell;
use std::cmp;
impl SolutionInfer {
    pub fn diameter_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        unsafe {
            diameter = 0;
        }
        Solution::depth(root.clone());
        unsafe {
            return diameter;
        }
    }
    fn depth(node: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        match node {
            None => 0,
            Some(node) => {
                let left = Solution::depth(node.borrow().left.clone());
                let right = Solution::depth(node.borrow().right.clone());
                unsafe {
                    diameter = cmp::max(left + right, diameter);
                }
                cmp::max(left, right) + 1
            }
        }
    }
}
