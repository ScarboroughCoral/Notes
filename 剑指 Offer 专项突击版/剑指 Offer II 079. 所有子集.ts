function subsets(nums: number[]): number[][] {
    const result = [];
    function dfs(cur: number[], remainCount: number) {
        if(remainCount === 0) {
            result.push(cur);
            return;
        }
        dfs([...cur, nums[nums.length-remainCount]], remainCount - 1)
        dfs([...cur], remainCount - 1)
    }
    dfs([],nums.length);
    return result;
};
