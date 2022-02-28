class Solution:
    def numTrees(self, n: int) -> int:
        memo = {}
        def count(l: int, h: int) -> int:
            if l > h:
                return 1
            k = "%s,%s" %(l, h)
            if k in memo:
                return memo[k]
            result = 0
            for i in range(l, h + 1):
                left = count(l, i - 1)
                right = count(i + 1, h)
                result += left * right
            memo[k] = result
            return result
        return count(1, n)
