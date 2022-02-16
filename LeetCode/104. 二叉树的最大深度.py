# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        result = 0
        depth = 1
        def calc(node: Optional[TreeNode]):
            nonlocal result
            nonlocal depth
            if not node:
                return
            result = max(result, depth)
            depth += 1
            if node.left:
                calc(node.left)
            if node.right:
                calc(node.right)
            depth -= 1
        calc(root)
        return result
    
class SolutionWithInfer:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        left = self.maxDepth(root.left)
        right = self.maxDepth(root.right)
        return max(left, right) + 1
