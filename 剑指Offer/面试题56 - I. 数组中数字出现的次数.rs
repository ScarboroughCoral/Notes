impl Solution {
  pub fn single_numbers(nums: Vec<i32>) -> Vec<i32> {
      let mut r=0;
      for x in &nums{
          r^=x;
      }
      let mut d=1;
      while (d&r)==0{
          d<<=1;
      }
      let mut a=0;
      let mut b=0;
      for x in &nums{
          if x&d==0{
              a^=x;
          }
          else{
              b^=x;
          }
      }
      return vec![a,b];
  }
}