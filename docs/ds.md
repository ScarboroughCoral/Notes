# 简单数据结构和应用





## 队列和栈

### 队列和广度优先搜索

#### 算法

1. `根节点入队并标记已访问`
2. `当前队列所有节点（每个节点记为A）出队，依次访问节点A`
3. `如果A为目标节点，结束返回；否则4`
4. `当前节点A邻居节点入队并标记已访问`
5. `继续执行2，直到所有出队的节点（新入队的不算）处理完`
6. `继续执行2，直到队列为空`

#### 例子：[《岛屿数量》](https://leetcode-cn.com/problems/number-of-islands/)

### 广度优先搜索和Dijkstra

> - 简单广度优先搜索是图的所有边权值都为1的情况下的搜索。
>
> - Dijkstra处理的图（更一般图）更多的是权值为不等的。
>
> - 简单BFS每次入队的是一个层次（距离根节点距离相等的且相对剩余节点最近的）所有节点
> - 更一般图每次入队的也是距离根节点相对剩余节点最近的（可以看做每层节点数只有一个，省去了队列）



#### 算法

1. `定义访问集visited、最短距离向量distance`
2. `根节点（源节点）加入visited，更新distance`
3. `获取未加入visited节点的distance最小的节点A`
4. `将A加入visited，更新distance（更新规则：distance中未加入visited的节点D=min{D的当前值，distance[A]+A到D的距离}）`

#### 代码

```c++
#include <iostream>
#include <string>
#include <set>

using namespace std;

unsigned MAX_D = (-1U);

void dijkstra(unsigned a[][5], int count, int src)
{
    set<int> visited;

    unsigned *distance = new unsigned[count];
    for (size_t i = 0; i < count; i++)
    {
        distance[i] = MAX_D;
    }
    distance[src] = 0;
    visited.insert(src);


// 获取每个节点的最短路径，BFS，每一次循环获得一个节点的最短距离
    for (size_t i = 0; i < count; i++)
    {
        if (i==src)
        {
            continue;
        }
        // 找到距离根节点最短且未被计算过得节点
        unsigned min_d=MAX_D,min_i=0;
        for (size_t j = 0; j < count; j++)
        {
            if (visited.count(j)>0)
            {
                continue;
            }

            if (distance[j]<min_d)
            {
                min_d=distance[j];
                min_i=j;
            }
            
        }
        visited.insert(min_i);
        // 更新距离向量
        for (size_t i = 0; i < count; i++)
        {
            if (visited.count(i)>0)
            {
                continue;
            }
            if (a[min_i][i]==MAX_D)
            {
                continue;
            }
            
            distance[i]=min(distance[i],distance[min_i]+a[min_i][i]);
            
        }
        
        
    }
    for (size_t i = 0; i < count; i++)
    {
        std::cout << distance[i] << std::endl;
    }
    
}

unsigned min(unsigned a, unsigned b)
{
    return a > b ? b : a;
}

int main()
{
    unsigned a[5][5]={
        {0,1,2,MAX_D,MAX_D},
        {1,0,MAX_D,5,MAX_D},
        {2,MAX_D,0,2,6},
        {MAX_D,5,2,0,MAX_D},
        {MAX_D,MAX_D,6,MAX_D}
    };
    dijkstra(a,5,0);
    return 0;
}
```



### 栈和表达式求值

#### 中缀表达式转后缀表达式

`中缀表达式字符串从左向右扫描每个对象A：`

1. `对象A为数字：直接输出；`
2. `对象A为左括号：入栈；`
3. `对象A为右括号：弹栈并输出直到左括号（括号不必输出）`
4. `对象A为运算符，则和栈顶运算符B比较优先级：`
   1. `若B的优先级小，则将A压栈`
   2. `若B的优先级大于等于A，弹栈输出直到B的优先级小于A，然后将A压栈`
5. `栈内剩余运算符弹出并输出`

#### 后缀表达式计算

`后缀表达式字符串从左向后扫描每个对象A：`

1. `对象A为数字：压栈`
2. `对象A为符号x：依次弹栈得到a和b，计算bxa结果压栈`
3. `后缀表达式读取完毕，弹栈输出`



### 栈和深度优先搜索

#### 算法

1. `根节点压栈`
2. `弹栈得到节点A`
3. `如果节点为A目标，则结束返回；否则4`
4. `将A的每个邻居节点标记为已访问并按次序压栈`
5. `执行2，直到栈空`

#### 例子：[《树的中序遍历》]()

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        set<TreeNode*> visited;
        stack<TreeNode*> s;
        vector<int> result;
        if(!root) return result;
        s.push(root);
        while(!s.empty()){
            TreeNode* cur=s.top();
            s.pop();
            if(!cur) continue;
            if(visited.find(cur)==visited.end()){
                visited.insert(cur);
                s.push(cur->right);
                s.push(cur);
                s.push(cur->left);
            }
            else{
                result.push_back(cur->val);
            }
        }
        return result;
    }
};
```


### 队列实现栈

#### 算法

用两个队列S[2]

- 压栈操作
  1. 入队S[0]
- 弹栈操作
  1. S[0]出队直到剩一个元素A，出队的元素依次入队S[1]
  2. S[0]中最后一个元素A出队并返回
  3. 切换S[0]和S[1]的作用

#### 代码

```c++
class MyStack {
    queue<int> q[2];
    int index=0;
public:
    void changeIndex(){
        index=(index+1)%2;
    }
    /** Initialize your data structure here. */
    MyStack() {
        
    }
    
    /** Push element x onto stack. */
    void push(int x) {
        q[index].push(x);
    }
    
    /** Removes the element on top of the stack and returns that element. */
    int pop() {
        while(q[index].size()!=1){
            q[(index+1)%2].push(q[index].front());
            q[index].pop();
        }
        int result = q[index].front();
        q[index].pop();
        changeIndex();
        return result;
        
    }
    
    /** Get the top element. */
    int top() {
        while(q[index].size()!=1){
            q[(index+1)%2].push(q[index].front());
            q[index].pop();
        }
        int result = q[index].front();
        q[(index+1)%2].push(q[index].front());
        q[index].pop();
        changeIndex();
        return result;
    }
    
    /** Returns whether the stack is empty. */
    bool empty() {
        return q[0].empty()&&q[1].empty();
    }
};

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack* obj = new MyStack();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->top();
 * bool param_4 = obj->empty();
 */
```


### 栈实现队列

#### 算法

两个栈S[2]

- 入队操作
  1. 压栈到S[0]
- 出队操作
  1. 如果S[1]为空，则S[0]依次弹栈，弹出的元素依次压栈至S[1]
  2. S[1]弹出元素并返回

#### 代码

```c++
class MyQueue {
private:
    stack<int> s;
    stack<int> q;
public:
    /** Initialize your data structure here. */
    MyQueue() {
        
    }
    
    /** Push element x to the back of queue. */
    void push(int x) {
        s.push(x);
    }
    
    /** Removes the element from in front of queue and returns that element. */
    int pop() {
        int result = peek();
        q.pop();
        return result;
    }
    
    /** Get the front element. */
    int peek() {
        if(q.empty()){
            while(!s.empty()){
                q.push(s.top());
                s.pop();
            }
        }
        return q.top();
    }
    
    /** Returns whether the queue is empty. */
    bool empty() {
        return q.empty()&&s.empty();
    }
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue* obj = new MyQueue();
 * obj->push(x);
 * int param_2 = obj->pop();
 * int param_3 = obj->peek();
 * bool param_4 = obj->empty();
 */
```

## 数组和字符串



### 双指针技巧

- 情景一——加速迭代（`从两端向中间迭代数组（比如翻转数组）`）
- 情景二——快指针和慢指针的不同步来解决问题（`给定一个数组和一个值，原地删除改值的所有实例并返回新的长度;判断链表中是否有环（快慢指针肯定相遇第二次）`）

## 链表

### 反转链表

#### 算法

> 按原始顺序迭代，并将已翻转列表的后续列表依次放到已翻转列表头部



  ![1570611771332](pics/1570611771332.png)



#### 代码

  ```c++
  /**
   * Definition for singly-linked list.
   * struct ListNode {
   *     int val;
   *     ListNode *next;
   *     ListNode(int x) : val(x), next(NULL) {}
   * };
   */
  class Solution {
  public:
      ListNode* reverseList(ListNode* head) {
          ListNode* cur=head,*tmp=head;
          if(!head) return head;
          while(cur->next){
              cur=cur->next;
              tmp->next=cur->next;
              cur->next=head;
              head=cur;
              cur=tmp;
          }
          return head;
      }
  };
  ```


## 哈希表

### 原理

> 利用哈希函数将数据转换为索引，以实现快速插入和搜索

### 哈希集

> 哈希集的存储数据只有一个数value

#### 应用情景

1. 查重

#### 代码

```c++
struct Node{
    int val;
    Node * next;
    Node(int x):val(x),next(NULL){}
};

class MyHashSet {
private:
    Node* set[1000];
public:
    /** Initialize your data structure here. */
    MyHashSet() {
        for(int i=0;i<1000;i++){
            set[i]=NULL;
        }
    }
    
    void add(int key) {
        int box=key%1000;
        if(!set[box]){
            Node * node = new Node(key);
            set[box]=node;
            return;
        }
        Node * cur=set[box];
        Node * pre=NULL;
        while(cur){
            if(cur->val==key) return;
            pre=cur;
            cur=cur->next;
        }
        Node * node = new Node(key);
        pre->next=node;
    }
    
    void remove(int key) {
        int box=key%1000;
        if(!set[box]){
            return;
        }
        Node * cur=set[box];
        if(cur->val==key){
            set[box]=set[box]->next;
            delete(cur);
            return;
        }
        Node * pre=NULL;
        while(cur){
            if(cur->val==key){
                pre->next=cur->next;
                delete(cur);
                return;
            }
            pre=cur;
            cur=cur->next;
        }
    }
    
    /** Returns true if this set contains the specified element */
    bool contains(int key) {
        int box=key%1000;
        if(!set[box]){
            return false;
        }
        Node * cur=set[box];
        while(cur){
            if(cur->val==key) return true;
            cur=cur->next;
        }
        return false;
    }
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * MyHashSet* obj = new MyHashSet();
 * obj->add(key);
 * obj->remove(key);
 * bool param_3 = obj->contains(key);
 */
```

### 哈希映射

> 哈希映射的存储数据是{key,value}键值对

#### 应用情景

1. 提供更多信息
2. 按键聚合数据：
   - 属于同一组的所有值都将映射到同一组中。
   - 需要分成不同组的值不会映射到同一组。

#### 代码

```c++
struct Node{
    int key;
    int val;
    Node* next;
    Node(int k,int v):key(k),val(v),next(NULL){}
};

class MyHashMap {
    
private:
    Node* map[1000];
    
public:
    /** Initialize your data structure here. */
    MyHashMap() {
        for(int i=0;i<1000;i++){
            map[i]=NULL;
        }
    }
    
    /** value will always be non-negative. */
    void put(int key, int value) {
        int box=key%1000;
        if(!map[box]){
            Node *node = new Node(key,value);
            map[box]=node;
            return;
        }
        Node*cur=map[box],*pre=NULL;
        while(cur){
            if(cur->key==key){
                cur->val=value;
                return;
            }
            pre=cur;
            cur=cur->next;
        }
        Node *node = new Node(key,value);
        pre->next=node;
    }
    
    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    int get(int key) {
        int box=key%1000;
        if(!map[box]) return -1;
        Node*cur=map[box];
        while(cur){
            if(cur->key==key){
                return cur->val;
            }
            cur=cur->next;
        }
        return -1;
        
    }
    
    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    void remove(int key) {
        int box=key%1000;
        if(!map[box]) return;
        Node*cur=map[box],*pre=NULL;
        if(map[box]->key==key){
            map[box]=map[box]->next;
            delete(cur);
            return;
        }
        while(cur){
            if(cur->key==key){
                pre->next=cur->next;
                delete cur;
                return;
            }
            
            pre=cur;
            cur=cur->next;
        }
    }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * MyHashMap* obj = new MyHashMap();
 * obj->put(key,value);
 * int param_2 = obj->get(key);
 * obj->remove(key);
 */
```

#### 例子：[《字母异位词分组》](<https://leetcode-cn.com/problems/group-anagrams/>)

- 算法

  > 利用哈希映射，按键聚合数据，关键是“键”的设计。

- 代码


```c++
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> result;
        unordered_map<string,vector<string>> map;
        for(int i=0;i<strs.size();i++){
            string tmp=strs[i];
            sort(tmp.begin(),tmp.end());
            map[tmp].push_back(strs[i]);
        }
        
        for(auto it=map.begin();it!=map.end();it++){
            result.push_back(it->second);
        }
        return result;
        
    }
};
```



## 排序



### 插入排序

> 类似于摸扑克牌后的排序。每次摸到扑克牌，手中的扑克是有序的，需要将新扑克插入到适当的位置。

#### 特点

- 对于部分有序数组更快
- 对于数组元素较少时排序较快
- 空间复杂度O(1)，时间复杂度O(n^2)
- 稳定排序

#### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        for(int i=1;i<nums.size();i++){
            int tmp=nums[i];
            int j=i-1;
            for(;j>=0&&nums[j]>tmp;j--){
                nums[j+1]=nums[j];
            }
            nums[j+1]=tmp;
        }
        return nums;
    }
};
```



### 朴素希尔排序

> 插入排序的升级版。源于对部分有序的数组进行插入排序会比较快。



#### 特点

- 空间复杂度O(1)，最差时间复杂度O(n^2)（甚至比插入还蛮，分组都是有序的，一组时进行插入排序，不如不分组）
- **非朴素希尔排序（增量选择使用其他策略，不是简单地折半）时间复杂度为O(n^(3/2)) 或 O(n^(4/3))**

#### 算法

思路：将原始数组进行分组，每个组内进行插入排序。
分组思路：选取跨度，首先跨度是`length/2`，分成`length/2`个组，各组排好序后，跨度减半`length/4`，这时共有`length/4`个组，继续迭代，直到最后剩余一个组**排序后**结束。



#### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int d=nums.size();
        while(d>1){
            d/=2;
            for(int i=0;i<d;i++){
                for(int j=i+d;j<nums.size();j+=d){
                    int tmp=nums[j];
                    int k=j-d;
                    for(;k>=0&&nums[k]>tmp;k-=d){
                        nums[k+d]=nums[k];
                    }
                    nums[k+d]=tmp;
                }
            }
        }
        return nums;
    }
};
```



### 选择排序

> 选择未排序元素中最小（或最大）的元素，放到已排好序的末尾

#### 特点

- 空间复杂度O(1)，时间复杂度O(n^2)
- 不稳定排序



#### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        for(int i=0;i<nums.size()-1;i++){
            int min_index=i;
            for(int j=i+1;j<nums.size();j++){
                if(nums[j]<nums[min_index]){
                    min_index=j;
                }
            }
            int tmp=nums[i];
            nums[i]=nums[min_index];
            nums[min_index]=tmp;
        }
        return nums;
    }
};
```



### 简单冒泡排序

> 像冒泡一样排序。

#### 特点

- 空间复杂度O(1)，时间复杂度O(n^2)
- 稳定排序

#### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        for(int i=0;i<nums.size();i++){
            for(int j=0;j<nums.size()-i-1;j++){
                if(nums[j]>nums[j+1]){
                    int tmp = nums[j];
                    nums[j]=nums[j+1];
                    nums[j+1]=tmp;
                }
            }
        }
        return nums;
    }
};
```



### 优化冒泡排序

#### 第一步优化

> 若冒泡过程中数组已经有序，则无需执行后续操作了

##### 思路

若一轮冒泡中没有交换，那说明已经有序了。则添加标志位即可判断此情况。

##### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        bool isSorted;
        for (size_t i = 0; i < nums.size(); i++)
        {
            isSorted=true;
            for (size_t j = 0; j < nums.size()-i-1; j++)
            {
                if (nums[j]>nums[j+1])
                {
                    int tmp=nums[j];
                    nums[j]=nums[j+1];
                    nums[j+1]=tmp;
                    isSorted=false;
                }
                
            }
            if (isSorted)
            {
                break;
            }
        }
        return nums;
    }
};
```



#### 第二步优化

> 已经冒泡结束的有序部分长度，可能小于有序的部分，此时做了无用比较，如下图，4-8已经有序了，8是已经冒泡的部分，下一轮冒泡4-7还得比较，浪费了资源

![img](https://mmbiz.qpic.cn/mmbiz_png/NtO5sialJZGow5P5qiaicSEib1InC3PzJ1tsuKDArK6z7dN0eZibUic4WoRyvMOgTScybibFuaxEeCtYPIYKCib9PZDnZw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

##### 思路

记录一轮冒泡中最后交换的位置，这个位置就是有序的边界。



##### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        bool isSorted;
        int lastSwapIndex;
        int border=nums.size()-1;
        for (size_t i = 0; i < nums.size(); i++)
        {
            isSorted=true;
            for (size_t j = 0; j < border; j++)
            {
                if (nums[j]>nums[j+1])
                {
                    int tmp=nums[j];
                    nums[j]=nums[j+1];
                    nums[j+1]=tmp;
                    isSorted=false;
                    lastSwapIndex=j;
                }
                
            }
            border=lastSwapIndex;
            if (isSorted)
            {
                break;
            }
            
            
        }
        
        return nums;
    }
};
```



### 小范围或双射——计数排序

> 针对数值范围较小的数组，或者数组数值可以一一对应映射到较小范围的数组，可以采用技术排序

#### 特点

- 局限性较强，只适用于数值小范围或双射小范围的数组
- 时间复杂度和空间复杂度都为O(n)

#### 思路

利用有限范围数组进行计数，初始化为0。每遇见一个元素X，对应映射下标Y数组元素计数加一；最后下标Y映射为原来的数值X输出。

#### 代码

> 映射函数y=x，即数值x和数组下标y的关系是y=x的关系，其他情况类似，例如y=x-90等

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int a[10];
        for (size_t i = 0; i < 10; i++)
        {
            a[i]=0;
        }
        for (size_t i = 0; i < nums.size(); i++)
        {
            a[nums[i]]++;
        }
        int k=0;
        for (size_t i = 0; i < 10; i++)
        {
            for (size_t j = 0; j < a[i]; j++)
            {
                nums[k]=i;
                k++;
            }
        }
        return nums;
        
    }
};

int main(int argc, const char** argv) {
    vector<int> a={9,2,5,7,3,4,8,7,0};
    Solution s;
    s.sortArray(a);
    for (size_t i = 0; i < a.size(); i++)
    {
        std::cout << a[i] << " ";
    }
    
    return 0;
}
```



### 桶排序

> 类似计数排序。取不同的桶，每个桶放入同范围的数，桶内的元素自动排序。

#### 特点

- 时间复杂度O(n)，空间复杂度O(n+m)，m是桶的个数

#### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int maxValue = *max_element(nums.begin(),nums.end());
        int minValue = *min_element(nums.begin(),nums.end());
        int n=maxValue-minValue+1;
        vector<int> bucket(n);
        for(int i=0;i<nums.size();i++){
            bucket[nums[i]-minValue]++;
        }
        int k=0;
        for(int i=0;i<n;i++){
            for(int j=0;j<bucket[i];j++){
                nums[k++]=i+minValue;
            }
        }
        return nums;
        
    }
};
```




### 归并排序

> 顾名思义，先递归，后合并。通过二分递归至每个子数组只有一个元素，然后每两个进行合并成一个较大数组，然后回溯合并较大数组成更大数组，循环往复，直到结束

#### 特点

- 稳定排序
- 空间复杂度O(n)，时间复杂度O(nlogn)
- 类似于二叉树的层次遍历（从下向上）

#### 算法

- `递归`

  1. `给定数组边界：left、right`
  2. `中间值mid=left+(right-left)/2`
  3. `递归左边[left,mid]`
  4. `递归右边[mid+1,right]`
  5. `合并[left,right]`

- `合并`

  > 即合并[left,mid]和[mid+1,right]两个有序数组

#### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        mergeSort(nums,0,nums.size()-1);
        return nums;
    }
    //归并排序
    void mergeSort(vector<int>&nums,int left,int right){
        if(left>=right) return;
        int mid=left+(right-left)/2;
        mergeSort(nums,left,mid);
        mergeSort(nums,mid+1,right);
        merge(nums,left,right,mid);
    }
    //合并已有序的两个相邻子数组
    void merge(vector<int>&nums,int left,int right,int mid){
        vector<int> tmp;
        int i=left,j=mid+1;
        while(i<=mid&&j<=right){
            if(nums[i]<=nums[j]){
                tmp.push_back(nums[i]);
                i++;
            }else{
                tmp.push_back(nums[j]);
                j++;
            }
        }
        while(i<=mid){
            tmp.push_back(nums[i]);
            i++;
        }
        while(j<=right){
            tmp.push_back(nums[j]);
            j++;
        }
        for(int k=left,p=0;k<=right;k++,p++){
            nums[k]=tmp[p];
        }
    }
};
```



### 快速排序

> 分治策略。冒泡的升级版，一堆数据一起冒泡，基准值当水面。

#### 特征

- 时间复杂度O(nlogn)，最差时间复杂度O(n^2)
- 不稳定排序

#### 算法

1. `选基准值pivot`
2. `大于pivot的放右边，小于等于的放左边`
3. `左边和右边分治迭代`

#### 代码

##### 递归版本

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        quickSort(nums,0,nums.size()-1);
        return nums;
    }
    void quickSort(vector<int>& nums,int start,int end){
        if(start>=end) return;
        int pivotIndex=partition(nums,start,end);
        quickSort(nums,start,pivotIndex-1);
        quickSort(nums,pivotIndex+1,end);
    }
    int partition(vector<int>& nums,int start,int end){
        int pivot=nums[start];
        int left=start;
        int right=end;
        while(left!=right){
            while(right>left&&nums[right]>pivot){
                right--;
            }
            while(left<right&&nums[left]<=pivot){
                left++;
            }
            int tmp=nums[left];
            nums[left]=nums[right];
            nums[right]=tmp;
        }
        nums[start]=nums[left];
        nums[left]=pivot;
        return left;
    }
};
```



##### 迭代版本

> 用栈模拟函数栈，保存所需参数即可

```c++
struct Border{
    int start;
    int end;
};

class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        quickSort(nums,0,nums.size()-1);
        return nums;
    }
    void quickSort(vector<int>& nums,int start,int end){
        stack<Border*> s;
        s.push(new Border{start,end});
        while(!s.empty()){
            Border* cur=s.top();
            s.pop();
            int pivotIndex=partition(nums,cur->start,cur->end);
            if(cur->start<pivotIndex-1){
                s.push(new Border{cur->start,pivotIndex-1});
            }
            if(cur->end>pivotIndex+1){
                s.push(new Border{pivotIndex+1,cur->end});
            }
        }
    }
    int partition(vector<int>& nums,int start,int end){
        int pivot=nums[start];
        int left=start;
        int right=end;
        while(left!=right){
            while(right>left&&nums[right]>pivot){
                right--;
            }
            while(left<right&&nums[left]<=pivot){
                left++;
            }
            int tmp=nums[left];
            nums[left]=nums[right];
            nums[right]=tmp;
        }
        nums[start]=nums[left];
        nums[left]=pivot;
        return left;
    }
};
```





### 堆排序

> 堆是完全二叉树，可直接用数组来存。堆排序基于堆。

#### 特点

- 不稳定
- 空间复杂度O(1)，时间复杂度O(nlogn)

#### 算法

1. `构建堆`
2. `替换堆顶和末尾元素，末尾部分已有序`
3. `长度减一`
4. `调整，继续执行2，直到全部有序`

#### 代码

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        for(int i=(nums.size()-2)/2;i>=0;i--){
            ajust(nums,i,nums.size());
        }
        for(int i=nums.size()-1;i>0;i--){
            int tmp=nums[i];
            nums[i]=nums[0];
            nums[0]=tmp;
            ajust(nums,0,i);
        }
        return nums;
    }

    void ajust(vector<int>& nums,int parent,int len){
        int tmp=nums[parent];
        int child=2*parent+1;
        while(child<len){
            if(child+1<len&&nums[child+1]>nums[child]){
                child++;
            }
            if(tmp>=nums[child]){
                break;
            }
            nums[parent]=nums[child];
            parent=child;
            child=2*parent+1;
        }
        nums[parent]=tmp;
    }
};
```



## 二叉树

### 二叉树遍历

> 用栈数据结构模拟系统栈，代码统一化

#### 算法

1. `初始化栈s、访问集visited`
2. `根节点压栈s`
3. `当s不为空执行下列操作：`
   1. `弹栈得到元素A`
   2. `如果A未被访问`
      1. `则A标记为已访问，`
      2. `然后A、A->left、A->right依次入栈**（不同遍历顺序恰恰相反）**`
   3. `如果A已被访问`
      1. `输出A`
4. `结束`

#### 代码



- 前序遍历

  ```c++
  /**
   * Definition for a binary tree node.
   * struct TreeNode {
   *     int val;
   *     TreeNode *left;
   *     TreeNode *right;
   *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
   * };
   */
  class Solution {
  public:
      vector<int> preorderTraversal(TreeNode* root) {
          vector<int> result;
          set<TreeNode*> visited;
          stack<TreeNode*> s;
          
          s.push(root);
          while(!s.empty()){
              TreeNode* cur=s.top();
              s.pop();
              if(!cur) continue;
              if(visited.count(cur)==0){
                  s.push(cur->right);
                  s.push(cur->left);
                  s.push(cur);
                  visited.insert(cur);
              }
              else{
                  result.push_back(cur->val);
              }
          }
          
          return result;
      }
  };
  ```

- 中序遍历

  ```c++
  /**
   * Definition for a binary tree node.
   * struct TreeNode {
   *     int val;
   *     TreeNode *left;
   *     TreeNode *right;
   *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
   * };
   */
  class Solution {
  public:
      vector<int> inorderTraversal(TreeNode* root) {
          set<TreeNode*> visited;
          stack<TreeNode*> s;
          vector<int> result;
          if(!root) return result;
          s.push(root);
          while(!s.empty()){
              TreeNode* cur=s.top();
              s.pop();
              if(!cur) continue;
              if(visited.find(cur)==visited.end()){
                  visited.insert(cur);
                  s.push(cur->right);
                  s.push(cur);
                  s.push(cur->left);
              }
              else{
                  result.push_back(cur->val);
              }
          }
          return result;
      }
  };
  ```

- 后序遍历

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        set<TreeNode*> visited;
        stack<TreeNode*> s;
        
        s.push(root);
        while(!s.empty()){
            TreeNode* cur=s.top();
            s.pop();
            if(!cur) continue;
            if(visited.count(cur)==0){
                s.push(cur);
                visited.insert(cur);
                s.push(cur->right);
                s.push(cur->left);
            }
            else{
                result.push_back(cur->val);
            }
        }
        return result;
    }
};
```

