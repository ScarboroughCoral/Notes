use std::cmp::*;
impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        let mut max0=nums[0];
        let mut min0=nums[0];
        let mut result=nums[0];
        for i in 1..nums.len(){
            let mut tMax=max0*nums[i];
            let mut tMin=min0*nums[i];
            max0=max(nums[i],max(tMax,tMin));
            min0=min(nums[i],min(tMin,tMax));
            result=max(max0,result);
        }
        return result;
    }
}