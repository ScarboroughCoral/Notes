impl Solution {
  pub fn valid_palindrome(s: String) -> bool {
      let s=s.as_bytes();
      let (mut l,mut r)=(0,s.len()-1);
      let is_palindrome=|mut l,mut r|{
          while l<r&&s[l]==s[r]{
              l+=1;
              r-=1;
          }
          return l>=r;
      };
      while l<r&&s[l]==s[r]{
          l+=1;
          r-=1;
      }
      return is_palindrome(l+1,r)||is_palindrome(l,r-1);
  }
}