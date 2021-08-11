function isValidSudoku(board: string[][]): boolean {
    const rows = Array.from({length:9},()=>new Set<string>());
    const cols = Array.from({length:9},()=>new Set<string>());
    const subs = Array.from({length:9},()=>new Set<string>());
    for (let i=0;i<9;i++) {
        for (let j=0;j<9;j++) {
            const cur = board[i][j];
            if (cur === '.') continue;
            const subIndex = Math.floor(i/3) * 3 + Math.floor(j/3);
            if (rows[i].has(cur) || cols[j].has(cur) || subs[subIndex].has(cur)) return false;
            rows[i].add(cur);
            cols[j].add(cur);
            subs[subIndex].add(cur); 
        }
    }
    return true;
};
