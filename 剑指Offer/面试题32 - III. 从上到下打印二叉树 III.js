/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let result = [];
  if (!root) return result;
  let s1 = [], s2 = [], flag = true;
  s1.push(root);
  let curS, anotherS, size;
  while (size = (anotherS = !flag ? s1 : s2, curS = flag ? s1 : s2).length) {
    let tmp = [];
    while (size--) {
      let x = curS.pop();
      flag ? (x.left && anotherS.push(x.left), x.right && anotherS.push(x.right))
        : (x.right && anotherS.push(x.right), x.left && anotherS.push(x.left))
      tmp.push(x.val);
    }
    result.push(tmp);
    flag = !flag;
  }
  return result;
}