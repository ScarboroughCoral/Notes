/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  let tmp = board.map(x => [...x]);
  const M = board.length, N = board[0].length;
  function isInArea(i, j) {
    return i >= 0 && j >= 0 && i < M && j < N;
  }
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let t = tmp[i][j];
      let lCount = 0;
      for (let [dx, dy] of directions) {
        let x = i + dx, y = j + dy;
        if (isInArea(x, y)) {
          if (tmp[x][y] === 1) lCount++;
        }
      }
      if (t === 1 && (lCount < 2 || lCount > 3)) board[i][j] = 0;
      if (t === 0 && (lCount === 3)) board[i][j] = 1;
    }
  }

};