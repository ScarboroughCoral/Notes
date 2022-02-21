# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def constructFromPrePost(self, preorder: List[int], postorder: List[int]) -> TreeNode:
        if len(preorder) == 0:
            return None
        l = len(preorder)
        val = preorder[0]
        if l == 1:
            return TreeNode(val)
        valOfLeftChild = preorder[1]
        postorderIndex = postorder.index(valOfLeftChild)
        leftCount = postorderIndex + 1
        left = self.constructFromPrePost(preorder[1:1 + leftCount], postorder[:leftCount])
        right = self.constructFromPrePost(preorder[1 + leftCount:], postorder[leftCount:l - 1])
        return TreeNode(val, left, right)
