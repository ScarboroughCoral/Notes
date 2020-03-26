/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function (board) {
  let i = 0, j = 0, r = board.length, c = board[0].length;
  let res = 0;
  let flag = true;
  for (let x = 0; x < r; x++) {
    for (let y = 0; y < c; y++) {
      if (board[x][y] === 'R') {
        i = x;
        j = y;
        flag = false;
        break;
      }
    }
    if (!flag) break;
  }
  for (let x = i - 1; x >= 0; x--) {
    if (board[x][j] === '.') continue;
    if (board[x][j] === 'B') break;
    res++;
    break;
  }
  for (let x = i + 1; x < r; x++) {
    if (board[x][j] === '.') continue;
    if (board[x][j] === 'B') break;
    res++;
    break;
  }
  for (let x = j - 1; x >= 0; x--) {
    if (board[i][x] === '.') continue;
    if (board[i][x] === 'B') break;
    res++;
    break;
  }
  for (let x = j + 1; x < c; x++) {
    if (board[i][x] === '.') continue;
    if (board[i][x] === 'B') break;
    res++;
    break;
  }
  return res;
};