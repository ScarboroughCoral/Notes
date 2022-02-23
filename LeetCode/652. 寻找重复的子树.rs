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
    pub fn find_duplicate_subtrees(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
        let mut result = vec![];
        let mut subtrees = HashMap::new();
        Solution::subtree(root, &mut result, &mut subtrees);
        result
    }
    fn subtree(node: Option<Rc<RefCell<TreeNode>>>, mut result: &mut Vec<Option<Rc<RefCell<TreeNode>>>>, mut subtrees: &mut HashMap<String, i32>) -> String {
        match node {
            None => '#'.to_string(),
            Some(node) => {
                let val = node.borrow().val;
                let left = Solution::subtree(node.borrow().left.clone(), &mut result, &mut subtrees);
                let right = Solution::subtree(node.borrow().right.clone(), &mut result, &mut subtrees);

                let subtree = format!("{},{},{}", left, right, val);
                if let Some(count) = subtrees.get_mut(&subtree) {
                    if *count == 1 {
                        result.push(Some(node.clone()));
                    }
                    *count += 1;
                } else {
                    subtrees.insert(subtree.clone(), 1);
                }
                subtree
            }
        }
    }
}
