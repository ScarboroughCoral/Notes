use std::collections::HashSet;
impl Solution {
    pub fn permute(nums: Vec<i32>) -> Vec<Vec<i32>> {
        fn backtrace(mut track: &mut Vec<i32>, nums: &Vec<i32>, mut visited: &mut HashSet<i32>, mut result: &mut Vec<Vec<i32>>) {
            if track.len() == nums.len() {
                result.push(track.clone());
                return;
            }
            for &x in &nums[..] {
                if visited.contains(&x) {
                    continue;
                }
                track.push(x);
                visited.insert(x);
                backtrace(&mut track, &nums, &mut visited, &mut result);
                visited.remove(&x);
                track.pop();
            }
        }
        let mut result = vec![];
        let mut track = vec![];
        let mut visited = HashSet::new();
        backtrace(&mut track, &nums, &mut visited, &mut result);
        return result;
    }
}
