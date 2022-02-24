# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        acc = 0
        def traverse(node: Optional[TreeNode]):
            nonlocal acc
            if not node:
                return
            traverse(node.right)
            acc += node.val
            node.val = acc
            traverse(node.left)
        traverse(root)
        return root;
