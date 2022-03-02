# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Codec:
    SEP = ','
    NULL = '#'
    def serialize(self, root):
        """Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        """
        result = []
        def traverse(node):
            if not node:
                result.append(self.NULL)
                result.append(self.SEP)
                return
            result.append(str(node.val))
            result.append(self.SEP)
            traverse(node.left)
            traverse(node.right)
        traverse(root)
        return ''.join(result)
        

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        
        :type data: str
        :rtype: TreeNode
        """
        nodes = data.split(self.SEP)
        def traverse(nodes):
            if len(nodes) == 0:
                return None
            nodeVal = nodes.pop(0)
            if nodeVal == self.NULL:
                return None
            left = traverse(nodes)
            right = traverse(nodes)
            return TreeNode(nodeVal, left, right)
        return traverse(nodes)
        

# Your Codec object will be instantiated and called as such:
# ser = Codec()
# deser = Codec()
# ans = deser.deserialize(ser.serialize(root))
