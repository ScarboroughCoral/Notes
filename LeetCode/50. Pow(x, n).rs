impl Solution {
  pub fn my_pow(x: f64, n: i32) -> f64 {
      if n==0{
          return 1.0;
      }
      if n==1{
          return x;
      }
      if n==-1{
          return 1.0/x;
      }
      let e=n/2;
      let t=Solution::my_pow(x,e);
      if n%2==0{t*t}else{t*t*if n>0{x}else{1.0/x}}
  }
}