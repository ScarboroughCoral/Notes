# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        diameter = 0
        def depth(node: TreeNode) -> int:
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            return max(left, right) + 1
        def traverse(node: TreeNode):
            nonlocal diameter
            if not node:
                return
            left = depth(node.left)
            right = depth(node.right)
            diameter = max(diameter, left + right)
            traverse(node.left)
            traverse(node.right)
        traverse(root)
        return diameter

    
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTreeInfer(self, root: TreeNode) -> int:
        diameter = 0
        def depth(node: TreeNode) ->int:
            nonlocal diameter
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            diameter = max(left + right, diameter)
            return max(left, right) + 1
        depth(root)
        return diameter
