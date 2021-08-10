function subsetXORSum(nums: number[]): number {
    let result = 0;
    function dfs(cur: number, remain: number) {
        if (remain === 0) {
            result += cur;
            return;
        }
        dfs(cur, remain - 1);
        dfs(cur ^ nums[nums.length - remain], remain - 1)
    }
    dfs(0, nums.length);
    return result;
};
