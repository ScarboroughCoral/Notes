function canConstruct(ransomNote: string, magazine: string): boolean {
    const magazineTable = new Map<string,number>();
    for (let c of magazine.split('')) {
        magazineTable.set(c, (magazineTable.get(c) ?? 0) + 1);
    };
    for (let c of ransomNote.split('')) {
        if (!magazineTable.has(c)) return false;
        if (magazineTable.get(c) <= 0) return false;
        magazineTable.set(c, magazineTable.get(c) - 1);
    }
    return true;
};
