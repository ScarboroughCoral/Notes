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
public:
  ListNode *reverseKGroup(ListNode *head, int k)
  {
    ListNode *hair = new ListNode(0);
    hair->next = head;
    ListNode *pre = hair;
    while (head)
    {
      ListNode *tail = pre;
      for (int i = 0; i < k; i++)
      {
        tail = tail->next;
        if (!tail)
          return hair->next;
      }
      ListNode *nxt = tail->next;
      tie(head, tail) = reverseLink(head, tail);
      pre->next = head;
      tail->next = nxt;
      pre = tail;
      head = nxt;
    }
    return hair->next;
  }

private:
  pair<ListNode *, ListNode *> reverseLink(ListNode *head, ListNode *tail)
  {
    ListNode *pre = tail->next;
    ListNode *p = head;
    while (pre != tail)
    {
      ListNode *nxt = p->next;
      p->next = pre;
      pre = p;
      p = nxt;
    }
    return {tail, head};
  }
};