function numTrees(n: number): number {
    const memo = new Map<string, number>();
    const count = (l: number, h: number): number => {
        if (l > h) return 1;
        if (memo.has(`${l},${h}`)) return memo.get(`${l},${h}`);
        let result = 0;
        for (let i = l; i <= h; i++) {
            const left = count(l, i - 1);
            const right = count(i + 1, h);
            result += left * right;
        }
        memo.set(`${l},${h}`, result);
        return result;
    }
    return count(1, n);
};
