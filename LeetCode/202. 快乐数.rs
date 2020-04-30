use std::collections::HashSet;
impl Solution {
    pub fn is_happy(n: i32) -> bool {
        let mut computed=HashSet::new();
        let mut t=n;
        while t!=1{
            if computed.contains(&t){
                return false;
            }
            computed.insert(t);
            let mut x=0;
            while t!=0{
                let c=t%10;
                x+=c*c;
                t/=10;
            }
            t=x;
        }
        return true;
    }
}