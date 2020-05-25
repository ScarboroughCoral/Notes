class DLinkedNode
{
public:
  int k;
  int v;
  DLinkedNode *prev;
  DLinkedNode *next;
  DLinkedNode() : k(0), v(0), prev(nullptr), next(nullptr) {}
  DLinkedNode(int _k, int _v) : k(_k), v(_v), prev(nullptr), next(nullptr) {}
};
class LRUCache
{
private:
  int capacity;
  int size;
  DLinkedNode *head;
  DLinkedNode *tail;
  unordered_map<int, DLinkedNode *> m;

public:
  LRUCache(int capacity)
  {
    this->capacity = capacity;
    size = 0;
    head = new DLinkedNode();
    tail = new DLinkedNode();
    head->next = tail;
    tail->prev = head;
  }

  int get(int key)
  {
    if (!m.count(key))
      return -1;
    DLinkedNode *ret = m[key];
    moveToHead(ret);
    return ret->v;
  }

  void put(int key, int value)
  {
    if (!m.count(key))
    {
      DLinkedNode *node = new DLinkedNode(key, value);
      m[key] = node;
      addToHead(node);
      ++size;
      if (size > capacity)
      {
        int removedKey = removeTail();
        m.erase(removedKey);
        --size;
      }
    }
    else
    {
      DLinkedNode *node = m[key];
      node->v = value;
      moveToHead(node);
    }
  }
  void moveToHead(DLinkedNode *node)
  {
    removeNode(node);
    addToHead(node);
  }
  void removeNode(DLinkedNode *node)
  {
    node->prev->next = node->next;
    node->next->prev = node->prev;
  }
  void addToHead(DLinkedNode *node)
  {
    node->prev = head;
    node->next = head->next;
    head->next = node;
    node->next->prev = node;
  }
  int removeTail()
  {
    DLinkedNode *retNode = tail->prev;
    removeNode(retNode);
    return retNode->k;
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */