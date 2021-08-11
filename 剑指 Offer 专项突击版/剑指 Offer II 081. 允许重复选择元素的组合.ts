function combinationSum(candidates: number[], target: number): number[][] {
    const reuslt = [];
    function dfs(cur: number[], remain: number, startIndex = 0) {
        if (remain === 0) {
            reuslt.push(cur);
            return;
        }
        for (let i = startIndex; i < candidates.length; i++) {
            const curEle = candidates[i];
            if (remain >= curEle) dfs([...cur,curEle], remain - curEle, i);
        }
    }
    dfs([],target);
    return reuslt;
};
