/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

var buildTree = function (
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  const inMap = new Map();
  inorder.forEach((v, i) => inMap.set(v, i));
  return buildTreeDFS(
    preorder,
    0,
    preorder.length - 1,
    inMap,
    0,
    inorder.length - 1
  );
};
function buildTreeDFS(
  preorder: number[],
  preL: number,
  preR: number,
  inMap: Map<number, number>,
  inL: number,
  inR: number
): TreeNode | null {
  if (preL > preR || inL > inR) return null;
  let val = preorder[preL];
  let node = new TreeNode(val);
  let pIndex = inMap.get(val);
  if (typeof pIndex === "undefined") {
    throw Error("inMap error!");
  }
  node.left = buildTreeDFS(
    preorder,
    preL + 1,
    pIndex - inL + preL,
    inMap,
    inL,
    pIndex - 1
  );
  node.right = buildTreeDFS(
    preorder,
    pIndex - inL + preL + 1,
    preR,
    inMap,
    pIndex + 1,
    inR
  );
  return node;
}
