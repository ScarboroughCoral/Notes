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
private:
  bool isSame(TreeNode *a, TreeNode *b)
  {
    if (!a && !b)
      return true;
    if (!a || !b)
      return false;
    return a->val == b->val && isSame(a->left, b->right) && isSame(a->right, b->left);
  }

public:
  bool isSymmetric(TreeNode *root)
  {
    if (!root)
      return true;
    return isSame(root->left, root->right);
  }
};