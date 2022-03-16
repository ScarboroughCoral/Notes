# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        stk = []
        visited = None
        result = []
        def pushLeft(node: Optional[TreeNode]):
            p = node
            while p:
                result.append(p.val)
                stk.append(p)
                p = p.left
        pushLeft(root)
        while len(stk) != 0:
            cur = stk[len(stk) - 1]
            if (not cur.left or cur.left == visited) and cur.right != visited:
                pushLeft(cur.right)
            if not cur.right or cur.right == visited:
                visited = stk.pop()
        return result
