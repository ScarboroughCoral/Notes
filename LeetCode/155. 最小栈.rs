use std::cmp::min;
struct Data{
    val:i32,
    min:i32
}
struct MinStack {
    data:Vec<Data>
}


/** 
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl MinStack {

    /** initialize your data structure here. */
    fn new() -> Self {
        Self{
            data:Vec::new()
        }
    }
    
    fn push(&mut self, x: i32) {
        match self.data.last() {
            None => self.data.push(Data{
                val:x,
                min:x
            }),
            Some(item) => self.data.push(Data{
                val:x,
                min:min(x,self.data[self.data.len()-1].min)
            })
        }
    }
    
    fn pop(&mut self) {
        self.data.pop();
    }
    
    fn top(&self) -> i32 {
        self.data[self.data.len()-1].val
    }
    
    fn get_min(&self) -> i32 {
        self.data[self.data.len()-1].min
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * let obj = MinStack::new();
 * obj.push(x);
 * obj.pop();
 * let ret_3: i32 = obj.top();
 * let ret_4: i32 = obj.get_min();
 */