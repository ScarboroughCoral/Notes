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
    fn is_same(a: Option<Rc<RefCell<TreeNode>>>,b:  Option<Rc<RefCell<TreeNode>>>)->bool{
        if a==None&&b==None{
            return true;
        }
        if a==None||b==None{
            return false;
        }
        return if let (Some(a),Some(b))=(a,b){
            a.borrow().val==b.borrow().val&&Solution::is_same(a.borrow().left.clone(),b.borrow().right.clone())&&Solution::is_same(a.borrow().right.clone(),b.borrow().left.clone())
        }else{
            false
        };
    }
    pub fn is_symmetric(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        match root{
            None=>true,
            Some(r)=>{
                let r=r.borrow();
                Solution::is_same(r.left.clone(),r.right.clone())
            }
        }
    }
}