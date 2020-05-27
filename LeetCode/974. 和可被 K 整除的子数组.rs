use std::collections::HashMap;
impl Solution {
    pub fn subarrays_div_by_k(a: Vec<i32>, k: i32) -> i32 {
        let mut m=HashMap::new();
        m.insert(0,1);
        let (mut ans,mut pre)=(0,0);
        for x in a.iter(){
            pre=(pre+x)%k;
            if pre<0{pre+=k;}
            if m.contains_key(&pre) {ans+=m.get(&pre).unwrap();m.insert(pre,m.get(&pre).unwrap()+1);}
            else {m.insert(pre,1);}
        }
        ans
    }
}