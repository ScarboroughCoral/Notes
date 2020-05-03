impl Solution {
  pub fn max_sub_array(nums: Vec<i32>) -> i32 {
      let mut max=nums[0];
      let mut sum=0;
      let len=nums.len();
      for i in 0..len{
          sum+=nums[i];
          max=if max>sum{max}else{sum};
          if sum<0{
              sum=0;
          }
      }
      max
  }
}