# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def countNodes(self, root: TreeNode) -> int:
        if not root:
            return 0
        lh, rh = 1, 1
        left = root
        right = root
        while left.left:
            lh += 1
            left = left.left
        while right.right:
            rh += 1
            right = right.right
        if lh == rh:
            return pow(2, lh) - 1
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
        
