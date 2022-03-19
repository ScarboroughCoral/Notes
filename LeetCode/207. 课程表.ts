function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const visited: boolean[] = new Array(numCourses).fill(false);
    const onPath: boolean[] = new Array(numCourses).fill(false);
    let hasCircle = false;
    const buildGraph = (prerequisites: number[][]) => {
        const graph: number[][] = new Array(numCourses);
        for (let i = 0; i < graph.length; i++) {
            graph[i] = []
        }
        for(let [cur, pre] of prerequisites) {
            graph[pre].push(cur);
        }
        return graph;
    }
    const graph = buildGraph(prerequisites);
    const traverse = (start: number) => {
        if (onPath[start]) {
            hasCircle = true;
        }
        if (visited[start] || hasCircle) {
            return;
        }
        onPath[start] = true;
        visited[start] = true;
        for (let x of graph[start]) {
            traverse(x);
        }
        onPath[start] = false;
    }
    for (let i = 0; i< numCourses; i++){
        traverse(i);
    }
    return !hasCircle;

};
