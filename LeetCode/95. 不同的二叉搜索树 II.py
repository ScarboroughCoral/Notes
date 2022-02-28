# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:
        def build(l: int, h: int) -> List[TreeNode]:
            if l > h:
                return [None]
            result = []
            for i in range(l, h + 1):
                lefts = build(l, i - 1)
                rights = build(i + 1, h)
                for left in lefts:
                    for right in rights:
                        node = TreeNode(i, left, right)
                        result.append(node)
            return result
        return build(1, n)
