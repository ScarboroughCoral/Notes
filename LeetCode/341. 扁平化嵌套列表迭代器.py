# """
# This is the interface that allows for creating nested lists.
# You should not implement it, or speculate about its implementation
# """
#class NestedInteger:
#    def isInteger(self) -> bool:
#        """
#        @return True if this NestedInteger holds a single integer, rather than a nested list.
#        """
#
#    def getInteger(self) -> int:
#        """
#        @return the single integer that this NestedInteger holds, if it holds a single integer
#        Return None if this NestedInteger holds a nested list
#        """
#
#    def getList(self) -> [NestedInteger]:
#        """
#        @return the nested list that this NestedInteger holds, if it holds a nested list
#        Return None if this NestedInteger holds a single integer
#        """
from collections import deque
class NestedIterator:
    list = deque([])
    def __init__(self, nestedList: [NestedInteger]):
        self.list = deque(nestedList)
    
    def next(self) -> int:
        return self.list.popleft().getInteger()
    
    def hasNext(self) -> bool:
        while len(self.list) != 0 and not self.list[0].isInteger():
            first = self.list.popleft().getList()
            for x in reversed(first):
                self.list.appendleft(x)
        return len(self.list) != 0

# Your NestedIterator object will be instantiated and called as such:
# i, v = NestedIterator(nestedList), []
# while i.hasNext(): v.append(i.next())
