use std::collections::HashSet;
use std::collections::VecDeque;
impl Solution {
    pub fn open_lock(deadends: Vec<String>, target: String) -> i32 {
        let mut deadends: HashSet<String> = deadends.into_iter().collect();
        let mut q: VecDeque<String> = VecDeque::new();
        let mut visited: HashSet<String> = HashSet::new();
        q.push_back("0000".into());
        let mut step = 0;
        while q.len() != 0 {
            let l = q.len();
            for i in 0..l {
                let cur = q.pop_front().unwrap();
                if deadends.contains(&cur) {
                    continue;
                }
                if cur == target {
                    return step;
                }
                for next in 0..4 {
                    let minus = Solution::minus_one(&cur[..], next);
                    if !visited.contains(&minus)  {
                        q.push_back(minus.clone());
                        visited.insert(minus);
                    }
                    let plus = Solution::plus_one(&cur[..], next);
                    if !visited.contains(&plus) {
                        q.push_back(plus.clone());
                        visited.insert(plus);
                    }
                }
            }
            step += 1;
        }
        -1
    }
    fn minus_one(s: &str, idx: usize) -> String {
        s.chars().enumerate().map(|(i, c)| if i == idx {
            if c == '0' {
                '9'
            } else {
                ((c as u8) - 1) as char
            }
        } else {
            c
        }).collect()
    }
    fn plus_one(s: &str, idx: usize) -> String {
        s.chars().enumerate().map(|(i, c)| if i == idx {
            if c == '9' {
                '0'
            } else {
                ((c as u8) + 1) as char
            }
        } else {
            c
        }).collect()
    }
}
