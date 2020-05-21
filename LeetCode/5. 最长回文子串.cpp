class Solution
{
private:
  string addSplit(string &s, string sp)
  {
    string ss = "#";
    for (char c : s)
    {
      ss += c;
      ss += "#";
    }
    return ss;
  }

public:
  string longestPalindrome(string s)
  {
    if (s.length() < 2)
      return s;
    string ss = addSplit(s, "#");
    int maxLen = 1, begin = 0;
    int center = 0, maxRight = 0;
    vector<int> dp(ss.length(), 0);
    for (int i = 0; i < ss.length(); i++)
    {
      if (i < maxRight)
      {
        int mirror = 2 * center - i;
        dp[i] = min(dp[mirror], maxRight - i);
      }
      int l = i - dp[i] - 1, r = i + dp[i] + 1;
      while (l >= 0 && r < ss.length() && ss[l] == ss[r])
        l--, r++, dp[i]++;
      if (i + dp[i] > maxRight)
      {
        maxRight = i + dp[i];
        center = i;
      }
      if (dp[i] > maxLen)
      {
        maxLen = dp[i];
        begin = (i - maxLen) / 2;
      }
    }

    return s.substr(begin, maxLen);
  }
};