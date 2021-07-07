function countPairs(deliciousness: number[]): number {
    let count = 0;
    const feasts = new Set(Array.from({length: 22}).map((v,idx) => 2**idx));
    const watched = new Map<number, number>();
    deliciousness.forEach((del) => {
        feasts.forEach((feast) => {
            const targetPair = feast - del;
            if (watched.has(targetPair)) {
                count += watched.get(targetPair);
            }
        })
        watched.set(del, (watched.get(del) ?? 0) + 1)
    })
    return count % (10 ** 9 + 7);
};
