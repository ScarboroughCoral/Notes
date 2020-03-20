/*
 * @lc app=leetcode.cn id=1302 lang=javascript
 *
 * [1302] 层数最深叶子节点的和
 *
 * https://leetcode-cn.com/problems/deepest-leaves-sum/description/
 *
 * algorithms
 * Medium (79.43%)
 * Likes:    12
 * Dislikes: 0
 * Total Accepted:    3.9K
 * Total Submissions: 5K
 * Testcase Example:  '[1,2,3,4,5,null,6,7,null,null,null,null,8]'
 *
 * 给你一棵二叉树，请你返回层数最深的叶子节点的和。
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 
 * 输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
 * 输出：15
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在 1 到 10^4 之间。
 * 每个节点的值在 1 到 100 之间。
 * 
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
  let q = [];
  let result = 0;
  if (!root || root.length === 0) return result;
  q.push(root);
  while (q.length) {
    let size = q.length;
    result = 0;
    for (let i = 0; i < size; i++) {
      let cur = q.shift();
      result += cur.val;
      if (cur.left) q.push(cur.left);
      if (cur.right) q.push(cur.right)
    }
  }
  return result;
};
// @lc code=end

