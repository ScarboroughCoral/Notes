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
use std::collections::HashMap;
impl Solution {
    pub fn build_tree(preorder: Vec<i32>, inorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        if preorder.len()==0||inorder.len()!=preorder.len(){
            return None;
        }
        let mut in_map=HashMap::new();
        for i in 0..inorder.len(){
            in_map.insert(inorder[i],i);
        }
        return Solution::build_tree_dfs(&preorder,0,preorder.len()-1,&in_map,0,inorder.len()-1);
    }
    fn build_tree_dfs(preorder:&Vec<i32>,pre_left:usize,pre_right:usize,in_map:&HashMap<i32,usize>,in_left:usize,in_right:usize) -> Option<Rc<RefCell<TreeNode>>>{
        if pre_left>pre_right||in_left>in_right {
            return None;
        }
        let val=preorder[pre_left];
        let p_idx=in_map.get(&val).unwrap();
        let mut node=TreeNode::new(val);
        node.left=Solution::build_tree_dfs(&preorder,pre_left+1,p_idx-in_left+pre_left,&in_map,in_left,p_idx-1);
        node.right=Solution::build_tree_dfs(&preorder,p_idx-in_left+pre_left+1,pre_right,&in_map,p_idx+1,in_right);
        Some(Rc::new(RefCell::new(node)))

    }
}