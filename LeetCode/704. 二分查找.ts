function search(nums: number[], target: number): number {
    let l = 0, r = nums.length - 1;
    while(l < r) {
        let mid = l + Math.floor((r - l) / 2);
        const midVal = nums[mid];
        if (midVal === target) return mid;
        if (midVal > target) r = mid;
        else l = mid + 1;
    }
    return nums[l] === target ? l : -1;
};
