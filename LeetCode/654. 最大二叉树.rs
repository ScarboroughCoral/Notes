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
    pub fn construct_maximum_binary_tree(nums: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        match nums.len() {
            0 => None,
            _ => {
                let max_number = *nums.iter().max().unwrap();
                let max_index = nums.iter().position(|&n| n == max_number).unwrap();
                let left = Solution::construct_maximum_binary_tree((&nums[..max_index]).to_vec());
                let right = Solution::construct_maximum_binary_tree((&nums[max_index+1..]).to_vec());
                let mut node = TreeNode::new(max_number);
                node.left = left;
                node.right = right;
                Some(Rc::new(RefCell::new(node)))
            }
        }
    }
}
