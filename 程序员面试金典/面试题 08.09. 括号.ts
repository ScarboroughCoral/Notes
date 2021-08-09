function generateParenthesis(n: number): string[] {
    let result=[];
    function dfs(cur: string, lCount: number, rCount: number) {
        if (lCount>rCount) return;
        if (cur.length === 2 * n) {
            result.push(cur);
            return;
        }
        if (lCount > 0) dfs(cur+'(',lCount - 1,rCount);
        if (rCount > 0) dfs(cur+')',lCount,rCount - 1);
    }
    dfs('',n,n);
    return result;
};
