# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        result = []
        subtrees = {}
        def subtree(node: Optional[TreeNode]) -> List[Optional[TreeNode]]:
            if not node:
                return '#'
            left = subtree(node.left)
            right = subtree(node.right)
            val = node.val
            subtreeStr = left + ',' + right + ',' + str(val)
            if subtreeStr not in subtrees:
                subtrees[subtreeStr] = 1
            elif subtrees[subtreeStr] == 1:
                result.append(node)
                subtrees[subtreeStr] += 1
            else:
                subtrees[subtreeStr] += 1
            return subtreeStr
        subtree(root)
        return result
