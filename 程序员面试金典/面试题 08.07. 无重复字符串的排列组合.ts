function permutation(S: string): string[] {
    const result:Array<string> = [];
    function dfs(cur: string, used: Set<number>) {
        if (cur.length===S.length) {
            result.push(cur);
            return;
        }
        for(let i = 0; i < S.length; i ++) {
            if (used.has(i)) continue;
            used.add(i);
            dfs(cur+S[i],used);
            used.delete(i);
        }
    }
    dfs('',new Set())
    return result;
};
