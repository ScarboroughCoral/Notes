# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
from collections import deque
class Codec:
    SEP = ','
    NULL = '#'
    def serialize(self, root):
        if not root:
            return self.NULL
        q = deque([])
        result = []
        q.append(root)
        while len(q) != 0:
            cur = q.popleft()
            if cur:
                result.append(str(cur.val))
                result.append(self.SEP)
                q.append(cur.left)
                q.append(cur.right)
            else:
                result.append(self.NULL)
                result.append(self.SEP)
        result.pop()
        return ''.join(result)

    def deserialize(self, data):
        nodes = deque(data.split(self.SEP))
        if len(nodes) == 0:
            return None
        rootVal = nodes.popleft()
        if rootVal == self.NULL:
            return None
        root = TreeNode(rootVal)
        q = deque([])
        q.append(root)
        while len(q) != 0:
            cur = q.popleft()
            if len(nodes) != 0:
                leftVal = nodes.popleft()
                if leftVal != self.NULL:
                    cur.left = TreeNode(leftVal)
                    q.append(cur.left)
                else:
                    cur.left = None
            if len(nodes) != 0:
                rightVal = nodes.popleft()
                if rightVal != self.NULL:
                    cur.right = TreeNode(rightVal)
                    q.append(cur.right)
                else:
                    cur.right = None
        return root

        

# Your Codec object will be instantiated and called as such:
# ser = Codec()
# deser = Codec()
# ans = deser.deserialize(ser.serialize(root))
