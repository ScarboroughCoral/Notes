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
    pub fn construct_from_pre_post(preorder: Vec<i32>, postorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        match preorder.len() {
            0 => None,
            1 => Some(Rc::new(RefCell::new(TreeNode::new(preorder[0])))),
            l => {
                let val = preorder[0];
                let mut node = TreeNode::new(val);
                let val_of_left_child = preorder[1];
                let postorder_index = postorder.iter().position(|&x| x == val_of_left_child).unwrap();
                let left_count = postorder_index + 1;
                let left = Solution::construct_from_pre_post((&preorder[1..left_count + 1]).to_vec(), (&postorder[..left_count]).to_vec());
                let right = Solution::construct_from_pre_post((&preorder[left_count + 1..]).to_vec(), (&postorder[left_count..l - 1]).to_vec());
                node.left = left;
                node.right = right;
                Some(Rc::new(RefCell::new(node)))
            }
        }
    }
}
