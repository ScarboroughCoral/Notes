# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        def validate(node: TreeNode, min: TreeNode, max: TreeNode) -> bool:
            if not node:
                return True
            if min and min.val >= node.val:
                return False
            if max and max.val <= node.val:
                return False
            return validate(node.left, min, node) and validate(node.right, node, max)
        return validate(root, None, None)
