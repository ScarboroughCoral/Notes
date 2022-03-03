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
use std::collections::VecDeque;
struct Codec {
	
}
const SEP: &str = ",";
const NULL: &str = "#";
/** 
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl Codec {
    fn new() -> Self {
        Self {}
    }

    fn serialize(&self, root: Option<Rc<RefCell<TreeNode>>>) -> String {
        let mut result = vec![];
        fn traverse(node: Option<Rc<RefCell<TreeNode>>>, result: &mut Vec<String>) {
            match node {
                None => {
                    result.push(NULL.to_string());
                    result.push(SEP.to_string());
                },
                Some(node) => {
                    let node_ref = node.borrow();
                    result.push(node_ref.val.to_string());
                    result.push(SEP.to_string());
                    traverse(node_ref.left.clone(), result);
                    traverse(node_ref.right.clone(), result);
                }
            }
        }
        traverse(root.clone(), &mut result);
        return result.join("");
    }
	
    fn deserialize(&self, data: String) -> Option<Rc<RefCell<TreeNode>>> {
        let mut nodes: VecDeque<&str> = data.split(SEP).collect();
        fn traverse(mut nodes: &mut VecDeque<&str>) -> Option<Rc<RefCell<TreeNode>>> {
            if nodes.len() == 0 {
                return None;
            }
            let nodeVal = nodes.pop_front().unwrap();
            if nodeVal == NULL {
                return None;
            }
            let mut node = TreeNode::new(nodeVal.parse().unwrap());
            node.left = traverse(&mut nodes);
            node.right = traverse(&mut nodes);
            return Some(Rc::new(RefCell::new(node)));
        }
        return traverse(&mut nodes);
    }
}

/**
 * Your Codec object will be instantiated and called as such:
 * let obj = Codec::new();
 * let data: String = obj.serialize(strs);
 * let ans: Option<Rc<RefCell<TreeNode>>> = obj.deserialize(data);
 */
