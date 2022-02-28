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
    pub fn generate_trees(n: i32) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
        fn build(l: i32, h: i32) -> Vec<Option<Rc<RefCell<TreeNode>>>> {
            if l > h {
                return vec![None];
            }
            let mut result = vec![];
            for i in l..=h {
                let mut lefts = build(l, i - 1);
                let mut rights = build(i + 1, h);
                for left in &lefts {
                    for right in &rights {
                        let mut node = TreeNode::new(i);
                        node.left = left.clone();
                        node.right = right.clone();
                        result.push(Some(Rc::new(RefCell::new(node))));
                    }
                }
            }
            return result;
        }
        return build(1, n)
    }
}
