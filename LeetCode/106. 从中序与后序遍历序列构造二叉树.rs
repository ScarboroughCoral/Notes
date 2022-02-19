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
    pub fn build_tree(inorder: Vec<i32>, postorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        match inorder.len() {
            0 => None,
            l => {
                let val = postorder[l - 1];
                let inorder_index = inorder.iter().position(|&x| x == val).unwrap();
                let left_count = inorder_index;
                let left = Solution::build_tree((&inorder[..inorder_index]).to_vec(), (&postorder[..left_count]).to_vec());
                let right = Solution::build_tree((&inorder[inorder_index + 1..]).to_vec(), (&postorder[left_count..l-1]).to_vec());
                let mut node = TreeNode::new(val);
                node.left = left;
                node.right = right;
                Some(Rc::new(RefCell::new(node)))
            }
        }
    }
}
