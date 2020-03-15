/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 *
 * https://leetcode-cn.com/problems/word-search/description/
 *
 * algorithms
 * Medium (40.89%)
 * Likes:    338
 * Dislikes: 0
 * Total Accepted:    43.1K
 * Total Submissions: 105.6K
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
 * 
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 * 
 * 示例:
 * 
 * board =
 * [
 * ⁠ ['A','B','C','E'],
 * ⁠ ['S','F','C','S'],
 * ⁠ ['A','D','E','E']
 * ]
 * 
 * 给定 word = "ABCCED", 返回 true.
 * 给定 word = "SEE", 返回 true.
 * 给定 word = "ABCB", 返回 false.
 * 
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    
  let l=word.length;
  let r=board.length,c=board[0].length;
  function dfs(i,j,k){
      if(i<0||j<0||i>=r||j>=c) return false;
      if(board[i][j]!==word[k]) return false;
      if(k===l-1) return true;
      let t=board[i][j];
      board[i][j]='-'
      let res=dfs(i-1,j,k+1)||dfs(i,j-1,k+1)||dfs(i+1,j,k+1)||dfs(i,j+1,k+1);
      board[i][j]=t;
      return res;
  }
  for(let i=0;i<r;i++){
      for(let j=0;j<c;j++) if(dfs(i,j,0)) return true;
  }
  return false;
};
// @lc code=end

