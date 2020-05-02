use std::collections::HashSet;
use std::convert::TryInto;
impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        let s=s.as_bytes();
        let mut visited=HashSet::new();
        let mut l=0;
        let mut r=0;
        let mut max=0;
        let len=s.len();
        while r<len{
            if visited.contains(&s[r]){
                max=if max>visited.len(){max}else{visited.len()};
                visited.remove(&s[l]);
                l+=1;
                continue;
            }
            visited.insert(&s[r]);
            r+=1;
        }
        max=if max>visited.len(){max}else{visited.len()};
        max.try_into().unwrap()
    }
}