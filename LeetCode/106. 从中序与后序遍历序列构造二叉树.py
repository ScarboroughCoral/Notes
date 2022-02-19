# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        if len(inorder) == 0:
            return None
        l = len(inorder)
        val = postorder[l - 1]
        inorderIndex = inorder.index(val)
        leftCount = inorderIndex
        left = self.buildTree(inorder[:inorderIndex], postorder[:leftCount])
        right = self.buildTree(inorder[inorderIndex + 1:], postorder[leftCount:l-1])
        return TreeNode(val, left, right)




