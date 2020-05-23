use std::collections::HashMap;
impl Solution {
    pub fn min_window(s: String, t: String) -> String {
        let (t_len,s_len)=(t.len(),s.len());
        if t_len==0||s_len==0||t_len>s_len  {
            return "".to_string();
        }
        let mut t_freq=HashMap::new();
        for c in t.as_bytes(){
            t_freq.entry(c).or_insert(0);
            *t_freq.get_mut(&c).unwrap()+=1;
        }
        let (mut l,mut r,mut begin,mut min_len,mut d)=(0,0,0,s_len+1,t_len);
        let sc=s.as_bytes();
        while r<s_len{
            let rc=sc[r];
            if !t_freq.contains_key(&rc) {
                r+=1;
                continue;
            }
            if t_freq.get(&rc)>Some(&0) {
                d-=1;
            }
            *t_freq.get_mut(&rc).unwrap()-=1;
            r+=1;
            while d==0{
                let lc=sc[l];
                if r-l<min_len{
                    min_len=r-l;
                    begin=l;
                }
                if !t_freq.contains_key(&lc) {
                    l+=1;
                    continue;
                }
                if t_freq.get(&lc)==Some(&0){
                    d+=1;
                }
                *t_freq.get_mut(&lc).unwrap()+=1;
                l+=1;
            }
        }
        if min_len==s_len+1{
            "".to_string()
        }else{
            s.chars().skip(begin).take(min_len).collect()
        }
    }
}