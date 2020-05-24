class Solution
{
public:
  double findMedianSortedArrays(vector<int> &nums1, vector<int> &nums2)
  {
    if (nums1.size() > nums2.size())
    {
      return findMedianSortedArrays(nums2, nums1);
    }
    int m = nums1.size(), n = nums2.size();
    int leftCount = (m + n + 1) / 2;
    int l = 0, r = m;
    while (l < r)
    {
      int i = (l + r) / 2;
      int j = leftCount - i;
      if (nums2[j - 1] > nums1[i])
      {
        l = i + 1;
      }
      else
      {
        r = i;
      }
    }
    int i = l;
    int j = leftCount - i;
    int leftMax1 = i == 0 ? INT_MIN : nums1[i - 1];
    int leftMax2 = j == 0 ? INT_MIN : nums2[j - 1];
    int rightMin1 = i == m ? INT_MAX : nums1[i];
    int rightMin2 = j == n ? INT_MAX : nums2[j];
    return (m + n) % 2 ? max(leftMax1, leftMax2) : (max(leftMax2, leftMax1) + min(rightMin1, rightMin2)) / 2.0;
  }
};