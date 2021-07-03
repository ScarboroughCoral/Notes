function frequencySort(s: string): string {
    const freqs = new Map<string,number>();
    for (let char of s) {
        freqs.set(char, (freqs.get(char)??0) + 1);
    }
    return [...freqs.entries()].map(([char,count]) => char.repeat(count)).sort((a,b)=>b.length - a.length).join('')
};
