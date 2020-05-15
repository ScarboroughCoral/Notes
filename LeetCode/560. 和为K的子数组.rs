impl Solution {
  pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
      let mut m=std::collections::HashMap::new();
      m.insert(0,1);
      let mut c=0;
      let mut pre=0;
      for x in nums{
          pre+=x;
          c+=m.get(&(pre-k)).unwrap_or(&0);
          *m.entry(pre).or_insert(0)+=1;
      }
      return c;
  }
}