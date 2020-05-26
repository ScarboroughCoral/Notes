impl Solution {
  pub fn find_duplicate(nums: Vec<i32>) -> i32 {
      let (mut slow,mut fast)=(0,0);
      loop{
          slow=nums[slow as usize];
          fast=nums[nums[fast as usize] as usize];
          if slow==fast{
              break;
          }
      }
      slow=0;
      while slow!=fast{
          slow=nums[slow as usize];
          fast=nums[fast as usize];
      }
      slow
  }
}