function removeDuplicates(nums: number[]): number {
    let i = 0, j = 1;
    while(j < nums.length) {
        while (j < nums.length && nums[i] === nums[j]) j++;
        if (j >= nums.length) break;
        i++;
        nums[i] = nums[j];
    }
    return i + 1;
};
