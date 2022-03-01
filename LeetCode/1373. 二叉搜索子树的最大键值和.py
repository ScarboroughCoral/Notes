# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
import math
class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        maxSum = 0
        def traverse(node: Optional[TreeNode]) -> (bool, int, int, int):
            nonlocal maxSum
            if not node:
                return (True, 0, math.inf, -math.inf)
            left = traverse(node.left)
            right = traverse(node.right)
            if left[0] and right[0] and node.val > left[3] and node.val < right[2]:
                curSum = node.val + left[1] + right[1]
                maxSum = max(maxSum, curSum)
                return (True, curSum, min(node.val, left[2]), max(node.val, right[3]))
            return (False, 0, 0, 0)
        traverse(root)
        return maxSum
