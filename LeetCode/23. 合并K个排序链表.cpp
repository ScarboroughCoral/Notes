/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution
{
  struct Node
  {
    int val;
    ListNode *p;
    bool operator<(const Node &rhs) const
    {
      return val > rhs.val;
    }
  };
  priority_queue<Node> q;

public:
  ListNode *mergeKLists(vector<ListNode *> &lists)
  {
    for (auto l : lists)
    {
      if (l)
        q.push({l->val, l});
    }
    ListNode result;
    ListNode *tail = &result;
    while (!q.empty())
    {
      auto p = q.top();
      q.pop();
      tail->next = p.p;
      tail = tail->next;
      if (p.p->next)
      {
        q.push({p.p->next->val, p.p->next});
        if (q.size() == 1)
          break;
      }
    }
    return result.next;
  }
};