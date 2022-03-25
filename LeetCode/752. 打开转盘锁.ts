function openLock(deadends: string[], target: string): number {
    let q1: Set<string> = new Set();
    let q2: Set<string> = new Set();
    const deadendsSet = new Set(deadends);
    const visited: Set<string> = new Set();
    let step = 0;
    q1.add('0000');
    q2.add(target);
    const plusOne = (s: string, idx: number) => s.slice(0, idx) + (s[idx] === '9' ? '0' : String.fromCharCode(s.charCodeAt(idx) + 1)) + s.slice(idx + 1);
    const minusOne = (s: string, idx: number) => s.slice(0, idx) + (s[idx] === '0' ? '9' : String.fromCharCode(s.charCodeAt(idx) - 1)) + s.slice(idx + 1);
    while (q1.size !== 0 && q2.size !== 0) {
        const tmp: Set<string> = new Set();
        for(let x of q1) {
            if (deadendsSet.has(x)) {
                continue;
            }
            if (q2.has(x)) {
                return step;
            }
            visited.add(x);
            for (let i = 0; i < 4; i++) {
                const plus = plusOne(x, i);
                if (!visited.has(plus)) {
                    tmp.add(plus);
                }
                const minus = minusOne(x, i);
                if (!visited.has(minus)) {
                    tmp.add(minus);
                }
            }
        }
        step++;
        q1 = q2;
        q2 = tmp;
    }
    return -1;
};
