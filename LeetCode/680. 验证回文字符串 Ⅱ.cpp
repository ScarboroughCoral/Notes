class Solution {
private:
    bool isPalindrome(string &s,int l,int r){
        for(;l<r&&s[l]==s[r];l++,r--);
        return l>=r;
    }
public:
    bool validPalindrome(string s) {
        int l=0,r=s.size()-1;
        for(;l<r&&s[l]==s[r];l++,r--);
        return isPalindrome(s,l+1,r)||isPalindrome(s,l,r-1);
    }
};