class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        result = []
        visited = [False for i in range(numCourses)]
        onPath = [False for i in range(numCourses)]
        hasCircle = False
        graph = [[] for i in range(numCourses)]
        for [cur, pre] in prerequisites:
            graph[pre].append(cur)
        def traverse(start: int):
            nonlocal onPath, visited, result, hasCircle, graph
            if onPath[start]:
                hasCircle = True
            if hasCircle or visited[start]:
                return
            onPath[start] = True
            visited[start] = True
            for x in graph[start]:
                traverse(x)
            result.append(start)
            onPath[start] = False
        for i in range(numCourses):
            traverse(i)
        return [] if hasCircle else result[::-1]
