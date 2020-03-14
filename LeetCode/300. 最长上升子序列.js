/**
 * @param {number[]} nums
 * @return {number}
 */
// ==========================方法一：动态规划==========================
var lengthOfLIS = function(nums) {
    if(nums.length===0) return 0;
    let dp=Array(nums.length).fill(1);
    for(let i=0;i<nums.length;i++){
        for(let j=0;j<i;j++){
            if(nums[i]>nums[j]) dp[i]=Math.max(dp[i],dp[j]+1)
        }
    }
    return Math.max.apply(null,dp)
};