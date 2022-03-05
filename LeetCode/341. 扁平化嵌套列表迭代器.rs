use std::collections::VecDeque;
// #[derive(Debug, PartialEq, Eq)]
// pub enum NestedInteger {
//   Int(i32),
//   List(Vec<NestedInteger>)
// }
struct NestedIterator {
    list: VecDeque<NestedInteger>
}


/** 
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl NestedIterator {

    fn new(nestedList: Vec<NestedInteger>) -> Self {
        Self{
            list: VecDeque::from(nestedList)
        }
    }
    
    fn next(&mut self) -> i32 {
        match self.list.pop_front().unwrap() {
            NestedInteger::Int(n) => n,
            _ => panic!("never!")
        }
    }
    
    fn has_next(&mut self) -> bool {
        while !self.list.is_empty() {
            if let NestedInteger::Int(num) = self.list[0] {
                return true;
            }
            if let NestedInteger::List(mut first) = self.list.pop_front().unwrap() {
                while !first.is_empty() {
                    self.list.push_front(first.pop().unwrap());
                }
            }
        }
        !self.list.is_empty()
    }
}

/**
 * Your NestedIterator object will be instantiated and called as such:
 * let obj = NestedIterator::new(nestedList);
 * let ret_1: i32 = obj.next();
 * let ret_2: bool = obj.has_next();
 */
