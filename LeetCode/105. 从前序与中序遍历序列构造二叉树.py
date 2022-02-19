# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if len(preorder) == 0:
            return None
        val = preorder[0]
        inorderIndex = inorder.index(val)
        leftCount = inorderIndex
        rightCount = len(preorder) - leftCount - 1
        left = self.buildTree(preorder[1:1 + leftCount], inorder[:leftCount])
        right = self.buildTree(preorder[1 + leftCount:], inorder[1 + leftCount:])
        return TreeNode(val, left, right)
