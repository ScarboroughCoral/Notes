use std::cmp::max;
impl Solution {
    pub fn find_the_longest_substring(s: String) -> i32 {
        let mut status_pos:Vec<i32>=vec![-1;1<<5];
        let (mut status,mut ans)=(0,0);
        status_pos[0]=0;
        for (i,c) in s.char_indices(){
            match c{
                'a'=>status^=1<<0,
                'e'=>status^=1<<1,
                'i'=>status^=1<<2,
                'o'=>status^=1<<3,
                'u'=>status^=1<<4,
                _=>()
            }
            match status_pos[status]{
                -1=>status_pos[status]=(i as i32)+1,
                _=>ans=max(ans,(i as i32)+1-status_pos[status])
            }
        }
        ans
    }
}