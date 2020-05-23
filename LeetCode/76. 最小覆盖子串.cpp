class Solution
{
public:
  string minWindow(string s, string t)
  {
    if (s.length() == 0 || t.length() == 0 || s.length() < t.length())
      return "";
    unordered_map<char, int> tFreq;
    for (char c : t)
      tFreq[c]++;
    const int sLen = s.length(), tLen = t.length();
    int begin = 0, l = 0, r = 0, minLen = sLen + 1, d = tLen;
    while (r < sLen)
    {
      const char rc = s[r];
      if (!tFreq.count(rc))
      {
        r++;
        continue;
      }
      if (tFreq[rc] > 0)
      {
        d--;
      }
      tFreq[rc]--;
      r++;
      while (d == 0)
      {
        const char lc = s[l];
        if (r - l < minLen)
        {
          minLen = r - l;
          begin = l;
        }
        if (!tFreq.count(lc))
        {
          l++;
          continue;
        }
        if (tFreq[lc] == 0)
        {
          d++;
        }
        tFreq[lc]++;
        l++;
      }
    }
    return minLen == sLen + 1 ? "" : s.substr(begin, minLen);
  }
};