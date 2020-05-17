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
  TreeNode *lowestCommonAncestor(TreeNode *root, TreeNode *p, TreeNode *q)
  {
    stack<TreeNode *> s;
    unordered_set<TreeNode *> visited;
    unordered_set<TreeNode *> candidates;
    int tag = 0;
    s.push(root);
    while (!s.empty())
    {
      TreeNode *cur = s.top();
      s.pop();
      if (!visited.count(cur))
      {
        visited.insert(cur);
        if (cur->right)
          s.push(cur->right);
        s.push(cur);
        if (cur->left)
          s.push(cur->left);
      }
      else
      {
        if (cur == p || cur == q)
        {
          tag++;
        }
        if (tag > 0)
        {
          candidates.insert(cur);
        }
        if (tag == 2)
          break;
      }
    }
    stack<TreeNode *>().swap(s);
    visited.clear();
    s.push(root);
    while (!s.empty())
    {
      TreeNode *cur = s.top();
      s.pop();
      if (!visited.count(cur))
      {
        visited.insert(cur);
        if (cur->right)
          s.push(cur->right);
        if (cur->left)
          s.push(cur->left);
        s.push(cur);
      }
      else
      {
        if (candidates.count(cur))
          return cur;
      }
    }
    return NULL;
  }
};