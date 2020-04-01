/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  let rows = Array(9).fill(null).map(x => new Set());
  let columns = Array(9).fill(null).map(x => new Set());
  let subs = Array(9).fill(null).map(x => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let x = board[i][j];
      let idx = (i / 3 | 0) * 3 + j / 3 | 0;
      if (x === '.') continue;
      if (rows[i].has(x) || columns[j].has(x) || subs[idx].has(x)) return false;
      rows[i].add(x);
      columns[j].add(x);
      subs[idx].add(x);
    }
  }
  return true;
};