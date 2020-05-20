class Solution
{
public:
  int findTheLongestSubstring(string s)
  {
    vector<int> statusPos(1 << 5, -1);
    int ans = 0, status = 0;
    statusPos[0] = 0;
    for (int i = 0; i < s.length(); i++)
    {
      if (s[i] == 'a')
        status ^= 1 << 0;
      else if (s[i] == 'e')
        status ^= 1 << 1;
      else if (s[i] == 'i')
        status ^= 1 << 2;
      else if (s[i] == 'o')
        status ^= 1 << 3;
      else if (s[i] == 'u')
        status ^= 1 << 4;

      if (~statusPos[status])
        ans = max(ans, i + 1 - statusPos[status]);
      else
        statusPos[status] = i + 1;
    }
    return ans;
  }
};