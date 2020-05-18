class Solution
{
public:
  int maxProduct(vector<int> &nums)
  {
    int result = nums[0];
    int min0 = nums[0], max0 = nums[0];
    for (int i = 1; i < nums.size(); i++)
    {
      int tMin = min0 * nums[i], tMax = max0 * nums[i];
      min0 = min(tMax, min(tMin, nums[i]));
      max0 = max(tMin, max(tMax, nums[i]));
      result = max(max0, result);
    }
    return result;
  }
};