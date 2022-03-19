class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        result = []
        n = len(graph)
        def traverse(start, path):
            path.append(start)
            if start == n - 1:
                result.append(path[::])
                path.pop()
                return
            for x in graph[start]:
                traverse(x, path)
            path.pop()
        traverse(0, [])
        return result
