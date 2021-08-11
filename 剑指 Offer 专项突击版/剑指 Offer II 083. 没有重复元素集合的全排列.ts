function permute(nums: number[]): number[][] {
    const result = [];
    function dfs(cur: number[], used: Set<number>) {
        if (cur.length === nums.length) {
            result.push(cur);
            return;
        }
        for (let i = 0;i < nums.length; i++) {
            if (used.has(i)) continue;
            used.add(i);
            dfs([...cur,nums[i]], used);
            used.delete(i);
        }
    }
    dfs([],new Set());
    return result;
};
