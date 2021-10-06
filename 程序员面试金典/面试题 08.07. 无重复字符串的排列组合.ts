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
function permutation1(S: string): string[] {
    if (S.length > 1) {
        const curChar = S[S.length - 1];
        // 上一个排列组合单个元素字符串长度
        const lastItemCount = S.length - 1;
        const last = permutation(S.slice(0,lastItemCount));
        const cur: string[] = [];
        for (let s of last) {
            for (let i = 0; i < lastItemCount + 1; i++) {
                cur.push([...s.slice(0,i), curChar,...s.slice(i)].join(''));
            }
        }
        return cur;
    }
    return [S[0]];
};
