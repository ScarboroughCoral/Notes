function maxIceCream(costs: number[], coins: number): number {
    const costsCopied = [...costs].sort((a,b) => a-b);
    let count = 0, consumed = 0;
    for(let cost of costsCopied) {
        if (coins < consumed + cost) {
            return count;
        }
        count ++;
        consumed += cost;
    }
    return count;
};
