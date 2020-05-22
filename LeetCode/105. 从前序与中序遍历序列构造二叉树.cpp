/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution
{
public:
  TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder)
  {
    unordered_map<int, int> inMap;
    for (int i = 0; i < inorder.size(); i++)
      inMap[inorder[i]] = i;
    return buildTree(preorder, 0, preorder.size() - 1, inMap, 0, inorder.size() - 1);
  }
  TreeNode *buildTree(vector<int> &preorder, int preL, int preR, unordered_map<int, int> &inMap, int inL, int inR)
  {
    if (preL > preR || inL > inR)
      return NULL;
    int val = preorder[preL];
    int pIdx = inMap[val];
    TreeNode *node = new TreeNode(val);
    node->left = buildTree(preorder, preL + 1, pIdx - inL + preL, inMap, inL, pIdx - 1);
    node->right = buildTree(preorder, pIdx - inL + preL + 1, preR, inMap, pIdx + 1, inR);
    return node;
  }
};