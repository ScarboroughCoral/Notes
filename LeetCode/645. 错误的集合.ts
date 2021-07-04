function findErrorNums(nums: number[]): number[] {
    let repeated: number,losted: number;
    let countsMap = new Map<number,number>();
    nums.forEach((v) => {
        countsMap.set(v, (countsMap.get(v) ?? 0) + 1)
    })
    for(let i = 1; i <= nums.length; i++) {
        if (countsMap.get(i) === 2){
            repeated = i;
            continue;
        }
        if (!countsMap.has(i)) {
            losted = i;
        }
    }
    return [repeated, losted]
};
