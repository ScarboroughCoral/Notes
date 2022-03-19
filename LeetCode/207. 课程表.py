class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        hasCircle = False
        visited = [False for i in range(numCourses)]
        onPath = [False for i in range(numCourses)]
        graph = [[] for i in range(numCourses)]
        for (cur, pre) in prerequisites:
            graph[pre].append(cur)
        def traverse(start):
            nonlocal hasCircle,visited,onPath,graph
            if onPath[start]:
                hasCircle = True
            if hasCircle or visited[start]:
                return
            onPath[start] = True
            visited[start] = True
            for x in graph[start]:
                traverse(x)
            onPath[start] = False
        for i in range(numCourses):
            traverse(i)
        return not hasCircle
