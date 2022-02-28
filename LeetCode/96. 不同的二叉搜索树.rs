use std::collections::HashMap;
impl Solution {
    pub fn num_trees(n: i32) -> i32 {
        let mut memo = HashMap::new();
        fn count(l: i32, h: i32, mut memo: &mut HashMap<String,i32>) -> i32 {
            if l > h {
                return 1;
            }
            let entry = memo.entry(format!("{},{}", l, h)).or_insert(0);
            if *entry != 0 {
                return *entry;
            }
            let mut result = 0;
            for i in l..=h {
                let left = count(l, i - 1, &mut memo);
                let right = count(i + 1, h, &mut memo);
                result += left * right;
            }
            let entry = memo.entry(format!("{},{}", l, h)).or_insert(0);
            *entry = result;
            return result;
        }
        return count(1, n, &mut memo);
    }
}
