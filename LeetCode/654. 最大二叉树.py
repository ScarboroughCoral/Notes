# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
        if len(nums) == 0:
            return None
        maxNumber = max(nums)
        maxIndex = nums.index(maxNumber)
        left = self.constructMaximumBinaryTree(nums[:maxIndex])
        right = self.constructMaximumBinaryTree(nums[maxIndex+1:])
        return TreeNode(maxNumber, left, right)
