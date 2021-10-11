function sortedSquares(nums: number[]): number[] {
    let l = 0, r = nums.length - 1;
    const result: Array<number> = [];
    while(l <= r) {
        const lVal = nums[l] ** 2;
        const rVal = nums[r] ** 2;
        if (lVal > rVal) {
            result.push(lVal);
            l++;
        } else {
            result.push(rVal);
            r--;
        }
    }
    return result.reverse();
};
