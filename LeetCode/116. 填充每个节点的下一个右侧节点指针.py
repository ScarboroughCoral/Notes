"""
# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
"""

class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        def connectTwo(pre: 'Optional[Node]',next: 'Optional[Node]'):
            if pre and next:
                pre.next = next;
                connectTwo(pre.left, pre.right)
                connectTwo(pre.right, next.left)
                connectTwo(next.left, next.right)
        if root:
            connectTwo(root.left, root.right)
        return root
