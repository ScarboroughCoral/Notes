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
    pub fn helper(root:&Option<Rc<RefCell<TreeNode>>>,lower:i64,upper:i64)->bool{
        match root{
            None=>true,
            Some(node)=>{
                if node.borrow().val as i64<=lower||node.borrow().val as i64>=upper{
                    false
                }else{
                    Solution::helper(&node.borrow().left,lower,node.borrow().val as i64)&&Solution::helper(&node.borrow().right,node.borrow().val as i64,upper)
                }
            }
        }
    }
    pub fn is_valid_bst(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        Solution::helper(&root,i64::min_value(),i64::max_value())
    }
}