function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const visited = Array(numCourses).fill(false);
    const onPath = Array(numCourses).fill(false);
    let hasCircle = false;
    const result = [];
    const graph = Array.from({length: numCourses}, () => []);
    for (let [cur, pre] of prerequisites) {
        graph[pre].push(cur);
    }
    const traverse = (start: number) => {
        if (onPath[start]) {
            hasCircle = true;
        }
        if (hasCircle || visited[start]) return;
        onPath[start] = true;
        visited[start] = true;
        for (let x of graph[start]) {
            traverse(x);
        }
        result.push(start);
        onPath[start] = false;
    };
    for(let i = 0; i < numCourses; i++) {
        traverse(i);
    }
    if (hasCircle) return [];
    return result.reverse();
};
