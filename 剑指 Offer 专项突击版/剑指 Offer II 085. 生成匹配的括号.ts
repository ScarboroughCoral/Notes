function generateParenthesis(n: number): string[] {
    const result = [];
    function dfs(cur: string, lCnt: number, rCnt: number) {
        if (lCnt>rCnt) return;
        if (cur.length === 2 * n) {
            result.push(cur);
            return;
        }
        if (lCnt > 0) dfs(cur + '(', lCnt - 1, rCnt);
        if (rCnt > 0) dfs(cur + ')', lCnt, rCnt - 1);
    }
    dfs('', n, n);
    return result;
};
