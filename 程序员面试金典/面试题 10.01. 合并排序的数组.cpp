class Solution
{
public:
  void merge(vector<int> &A, int m, vector<int> &B, int n)
  {
    int a = m - 1, b = n - 1, r = m + n - 1;
    while (a >= 0 && b >= 0)
    {
      if (A[a] > B[b])
        A[r--] = A[a--];
      else
        A[r--] = B[b--];
    }
    while (b >= 0)
      A[r--] = B[b--];
  }
};