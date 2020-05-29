use std::cmp::max;
impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        if nums.len()<=2{
            return nums.into_iter().max().unwrap_or(0);
        }
        let mut dp=vec![0;nums.len()];
        dp[0]=nums[0];
        dp[1]=max(nums[0],nums[1]);
        for i in 2..dp.len(){
            dp[i]=max(dp[i-1],dp[i-2]+nums[i]);
        }
        dp[dp.len()-1]
    }
}