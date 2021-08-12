function allPathsSourceTarget(graph: number[][]): number[][] {
    const result = [];
    const n = graph.length;
    function dfs(curPath: number[], curEle: number) {
        if (curEle === n - 1) {
            return result.push(curPath);
        }
        for (let i = 0; i < n; i++) {
            const target = graph[curEle][i];
            if (target === undefined) continue;
            dfs([...curPath,target],target);
        }
    }
    dfs([0],0);
    return result;
};
