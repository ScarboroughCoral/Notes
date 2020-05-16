impl Solution {
  pub fn merge(a: &mut Vec<i32>, m: i32, b: &mut Vec<i32>, n: i32) {
      let mut len = (m + n - 1) as usize;
      let mut i = m as usize;
      let mut j = n as usize;
      
      while i > 0 && j > 0{
          if a[i-1] >= b[j-1]{
              a[len] = a[i-1];
              len -= 1;
              i -= 1;
          }else{
              a[len] = b[j-1];
              len -= 1;
              j -= 1;
          }
      }
      while j > 0{
          a[len] = b[j-1];
          len -= 1;
          j -= 1;
      }
  }
}
