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
  vector<vector<int>> levelOrder(TreeNode *root)
  {
    vector<vector<int>> result;
    queue<TreeNode *> q;
    if (!root)
      return result;
    q.push(root);
    while (!q.empty())
    {

      int size = q.size();
      vector<int> curlevel;
      for (int i = 0; i < size; i++)
      {
        TreeNode *cur = q.front();
        curlevel.push_back(cur->val);
        if (cur->left)
          q.push(cur->left);
        if (cur->right)
          q.push(cur->right);
        q.pop();
      }
      result.push_back(curlevel);
    }
    return result;
  }
};