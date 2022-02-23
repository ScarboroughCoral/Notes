# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        r = -1
        i = 0
        def traverse(node: Optional[TreeNode]):
            nonlocal r, i
            if not node or i >= k:
                return
            traverse(node.left)
            i += 1
            if i == k:
                r = node.val
                return
            traverse(node.right)
        traverse(root)
        return r
