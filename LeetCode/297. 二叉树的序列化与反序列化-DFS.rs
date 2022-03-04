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
        match root {
            None => NULL.to_string(),
            Some(node) => {
                let mut result: Vec<String> = vec![];
                let mut traversal: VecDeque<Option<Rc<RefCell<TreeNode>>>> = VecDeque::new();
                traversal.push_back(Some(node));
                while !traversal.is_empty() {
                    let cur = traversal.pop_front().unwrap();
                    match cur {
                        None => {
                            result.push(NULL.to_string());
                        },
                        Some(cur) => {
                            let cur = cur.borrow();
                            result.push(cur.val.to_string());
                            traversal.push_back(cur.left.clone());
                            traversal.push_back(cur.right.clone());
                        }
                    }
                    result.push(SEP.to_string());
                }
                result.pop();
                result.join("")
            }
        }
    }
	
    fn deserialize(&self, data: String) -> Option<Rc<RefCell<TreeNode>>> {
        let mut nodes: VecDeque<&str> = data.split(SEP).collect();
        let mut result: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
        let root = nodes.pop_front();
        match root {
            None => None,
            Some(s) => {
                if s == NULL { None }
                else {
                    let root = TreeNode::new(s.parse().unwrap());
                    let root = Rc::new(RefCell::new(root));
                    result.push_back(root.clone());
                    while !result.is_empty() {
                        let mut cur = result.pop_front().unwrap();
                        let mut cur = cur.borrow_mut();
                        let leftVal = nodes.pop_front().unwrap();
                        if (leftVal != NULL) {
                            let left = Rc::new(RefCell::new(TreeNode::new(leftVal.to_string().parse().unwrap())));
                            result.push_back(left.clone());
                            cur.left = Some(left);
                        } else {
                            cur.left = None;
                        }
                        let rightVal = nodes.pop_front().unwrap();
                        if rightVal != NULL {
                            let right = Rc::new(RefCell::new(TreeNode::new(rightVal.to_string().parse().unwrap())));
                            result.push_back(right.clone());
                            cur.right = Some(right);
                        } else {
                            cur.right = None;
                        }
                    }
                    Some(root)
                }
            }
        }

    }
}

/**
 * Your Codec object will be instantiated and called as such:
 * let obj = Codec::new();
 * let data: String = obj.serialize(strs);
 * let ans: Option<Rc<RefCell<TreeNode>>> = obj.deserialize(data);
 */
