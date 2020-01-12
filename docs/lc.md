# LeetCode 题解

## 算法题

### 简单

#### 1. 两数之和

> 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
>
> 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/two-sum
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

一遍哈希，键值对为（数组值，索引）。遍历数组，如果target-nums[i]存在于哈希中，则返回这个值的索引和i；不存在哈希中则插入。

- 时间复杂度On，空间On

##### 代码

```c++

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> map;
        int size=nums.size();
        vector<int> result;
        for(int i=0;i<size;i++){
            int c=target-nums[i];
            if(map.count(c)>0){
                result.push_back(map[c]);
                result.push_back(i);
                return result;
            }
            map[nums[i]]=i;
        }
        
        return result;
    }
};
```



#### 13. 罗马数字转整数

> 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下**六种情况：**
>
> - I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
>
> - X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
> - C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
>
> 给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/roman-to-integer
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

将负数部分先减去，只剩下正数部分相加即可。

- 负数部分是比后续元素值小的部分，需要减去
- 利用栈，依次压栈，将比当前元素值小的部分弹栈并减去并将当前元素压栈。最后将栈内剩余元素加起来减去负值部分就是答案。
- 复杂度，时间On，空间On

##### 代码

```c++
class Solution {
public:
    int romanToInt(string s) {
        map<char,int> m;
        m['I']=1;
        m['V']=5;
        m['X']=10;
        m['L']=50;
        m['C']=100;
        m['D']=500;
        m['M']=1000;
        int r=0;
        stack<int> st;
        for(int i=0;i<s.size();i++){
            if(i==0){
                st.push(m[s[i]]);
                continue;
            }
            while(!st.empty()&&st.top()<m[s[i]]){
                r-=st.top();
                st.pop();
            }
            st.push(m[s[i]]);
        }
        while(!st.empty()){
            r+=st.top();
            st.pop();
        }
        return r;
    }
};
```



#### 14. 最长公共前缀

> 编写一个函数来查找字符串数组中的最长公共前缀。
>
> 如果不存在公共前缀，返回空字符串 `""`。
>
> **示例 1:**
>
> ```bash
> 输入: ["flower","flow","flight"]
> 输出: "fl"
> ```



##### 思路

简单暴力，效率并不低。取第一个字符串当做最大前缀，然后遍历剩余的字符串，比较，取相同的公共前缀当做最大前缀，如果出现了并无相同前缀则直接返回空串，否则继续遍历，剩余的即最大公共前缀。

- 时间O(n*k)，空间O(k)，k是第一个字符串的长度。



##### 代码

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length===0) return "";
    let max=strs[0];
    for(let i=1;i<strs.length;i++){
        let cur=strs[i];
        let j=0;
        while(j<cur.length&&j<max.length&&max[j]===cur[j]) j++;
        if(j==0) return "";
        if(j===max.length) continue;
        max=max.slice(0,j);
    }
    return max;
};
```



#### 15. 三数之和

> 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
>
> **注意：答案中不可以包含重复的三元组。**
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/3sum
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

和2sum几乎完全不同，首先想到的是暴力解（n^3），显然不行。比较好的思路是排序+双指针。

1. 排除数组长度小于3的情况。
2. 排序数组（nlogn）
3. 遍历数组，当前元素下标设为i，值设为x，已经重复的跳过
   1. x>0，后续并无结果，直接返回
   2. 双指针设Left=i+1，L为对应值，Right=nums.length-1，R为对应值
   3. 如果L+R+x===0则添加到结果集合，并检查接下来是否有重复元素如果有则直接跳过
   4. 如果L+R+x<0，则Left++
   5. 如果L+R+x>0，则Right--

- 时间复杂度Onlogn，空间O1

##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let result=[];
    if(nums.length<3) return result;
    nums.sort((a,b)=>a-b);
    for(let i=0;i<nums.length;i++){
        if(nums[i]>0) return result;
        if(i>0&&nums[i]===nums[i-1]) continue;
        let L=i+1,R=nums.length-1;
        while(L<R){
            if(nums[i]+nums[L]+nums[R]===0){
                result.push([nums[i],nums[L],nums[R]]);
                while(L<R&&nums[L]===nums[L+1]) L++;
                while(L<R&&nums[R]===nums[R-1]) R--;
                L+=1;
                R-=1;
            }else if(nums[i]+nums[L]+nums[R]>0){
                R--;
            }else{
                L++;
            }
            
        }
    }
    return result;
};
```



#### 20. 有效的括号

##### 思路

使用栈，拿到当前元素，如果当前元素和栈顶元素匹配则弹出，否则把当前元素压栈，直到遍历完。如果此时栈不为空则无效，为空则有效。

- 时间复杂度On，空间On

##### 代码

```c++
class Solution {
public:
    bool isValid(string s) {
        if(!s.size()) return true;
        map<char,char> m;
        m['(']=')';
        m['[']=']';
        m['{']='}';
        stack<char> st;
        for(int i=0;i<s.size();i++){
            if(st.empty()){
                st.push(s[i]);
                continue;
            }
            char top=st.top();
            if(m[top]==s[i]) st.pop();
            else st.push(s[i]);
        }
        
        return st.empty();
    }
};
```



#### 21. 合并两个有序链表

> 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

##### 思路

数组**升序。**类似于合并有序数组，使用2+1指针，两个指针分别指向两个链表未被合并部分的最小元素，一个指针指向当前已经合并的最大元素。

- 时间复杂度O(m+n)，空间复杂度O1

##### 代码

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
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode* cur1=l1,*cur2=l2,*head=NULL,*cur=NULL,*tmp;
        if(cur1&&cur2){
            if(cur1->val>cur2->val){
                head=cur=l2;
                cur2=cur2->next;
            }else{
                head=cur=l1;
                cur1=cur1->next;
            }
            //more than 0 is NULL
        }else if(cur1){
            return cur1;
        }else{
            return cur2;
        }
        while(cur1&&cur2){
            if(cur1->val<cur2->val){
                cur->next=cur1;
                cur1=cur1->next;
            }else{
                cur->next=cur2;
                cur2=cur2->next;
            }
            cur=cur->next;
            
        }
        
        if(cur1) cur->next=cur1;
        if(cur2) cur->next=cur2;
        return head;
    }
};
```







#### 26. 删除排序数组中的重复项

> 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
>
> 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

更为有效的方式（代码2）是使用双指针法，如下代码1虽使用了双指针，但进行了删除操作，时间上会增加。

- 时间复杂度On，空间O1

##### 代码1

```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        auto i=nums.begin();
        while(i!=nums.end()){
            auto j=i+1;
            int count=0;
            while(j!=nums.end()&&*j==*i){
                j++;
                count++;
            }
            if(count>0){
                nums.erase(i+1,j);
            }
            i++;
        }
        return nums.size();
    }
};
```

##### 代码2

```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size()==0) return 0;
        int i=0;
        for(int j=1;j<nums.size();j++){
            if(nums[i]!=nums[j]){
                i++;
                nums[i]=nums[j];
            }
        }
        return i+1;
    }
};
```



#### 27. 移除元素

> 给定一个数组 *nums* 和一个值 *val*，你需要**原地**移除所有数值等于 *val* 的元素，返回移除后数组的新长度。

##### 思路

使用双指针，一个指向当前元素，一个指向被删除后前缀数组的最后元素。

- 时间复杂度On，空间O1

##### 代码

```c++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int l=0;
        for(int i=0;i<nums.size();i++){
            if(nums[i]!=val){
                nums[l]=nums[i];
                l++;
            }
        }
        return l;
    }
};
```



#### 28. 实现 strStr()

> 实现 strStr() 函数。
>
> 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/implement-strstr
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

方法一是直接indexOf，方法二是KMP。

##### 代码

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle);
};
```





#### 66. 加一

> 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
>
> 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
>
> 你可以假设除了整数 0 之外，这个整数不会以零开头。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/plus-one
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

仅需要处理进一的情况，还有溢出的情况。

- 复杂度：时间On，空间O1

##### 代码

```c++
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        digits[digits.size()-1]++;
        int i=digits.size()-1;
        while(digits[i]==10){
            digits[i]=0;
            i--;
            if(i<0) break;
            digits[i]++;
        }
        if(i<0) digits.insert(digits.begin(),1);
        return digits;
    }
};
```





#### 67. 二进制求和

> 给定两个二进制字符串，返回他们的和（用二进制表示）。
>
> 输入为**非空**字符串且只包含数字 `1` 和 `0`。

##### 思路

从低位向高位加，注意进位

- 时间复杂度O(max(m,n))，空闲复杂度O(max(m,n))

##### 代码

```c++
class Solution {
public:
    string addBinary(string a, string b) {
        int i=a.size()-1,j=b.size()-1;
        string result="";
        int carry=0;
        while(i>=0&&j>=0){
            if(a[i]=='1'&&b[j]=='1'){
                result.insert(0,carry?"1":"0");
                carry=1;
            }else if(a[i]=='1'||b[j]=='1'){
                if(carry==1){
                    result.insert(0,"0");
                }else{
                    result.insert(0,"1");
                }
            }else{
                result.insert(0,carry?"1":"0");
                carry=0;
            }
            i--;
            j--;
        }
        while(i>=0){
            if(a[i]=='1'){
                if(carry==1){
                    result.insert(0,"0");
                }else{
                    result.insert(0,"1");
                }
            }else{
                result.insert(0,carry?"1":"0");
                carry=0;
            }
            i--;
        }
        while(j>=0){
            if(b[j]=='1'){
                if(carry==1){
                    result.insert(0,"0");
                }else{
                    result.insert(0,"1");
                }
            }else{
                result.insert(0,carry?"1":"0");
                carry=0;
            }
            j--;
        }
        if(carry==1) result.insert(0,"1");
        return result;
    }
};
```



#### 69. x 的平方根

> 实现 int sqrt(int x) 函数。
>
> 计算并返回 x 的平方根，其中 x 是非负整数。
>
> 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/sqrtx
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

利用二分查找（还有牛顿法，没整，感觉logn挺好了），除了开始的几个数外，总有$ \sqrt{x}<=\frac{x}{2} $。右边界从这开始找就行了。

- 时间复杂度Ologn，空间O1

##### 代码

```c++
class Solution {
public:
    int mySqrt(int x) {
        
        int left=0,right=x;
        if(x>4) right=x/2;
        while(left<=right){
            long mid=left+(right-left)/2;
            long s=mid*mid;
            long s1=(mid+1)*(mid+1);
            if(s>x) right=mid-1;
            else if(s<=x&&s1>x) return mid;
            else left=mid+1;
        }
        return -1;
    }
};
```





#### 70. 爬楼梯

> 假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。
>
> 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
>
> **注意：**给定 *n* 是一个正整数。

##### 思路

斐波那契数列，利用动态规划`dp[i]=dp[i-1]+dp[i-2]`。

- 时间复杂度On，空间O1

##### 代码

- 动态规划

```c++
class Solution {
public:
    int climbStairs(int n) {
        if(n<3) return n;
        long f1=1,f2=2,r=0;
        while(n>2){
            f2= f1 +f2;
            f1 = f2-f1;
            n--;
        }

        return f2;
    }
};
```

- 公式法

  ```javascript
  /**
   * @param {number} n
   * @return {number}
   */
  var climbStairs = function(n) {
      let sqrtFive=Math.sqrt(5);
      phi=(1+sqrtFive)/2;
      return ((phi**(n+1))-((1-phi)**(n+1)))/sqrtFive;
  };
  ```




#### 88. 合并两个有序数组

> 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
>
> **说明:**
>
> - 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
>
> - 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/merge-sorted-array
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

和合并两个有序链表类似，使用2+1指针，2个指针分别指向两个数组的最小待合并元素，1个指针指向已合并元素的最后位置。

- 时间复杂度O(m+n)，空间复杂度O(m+n)

##### 代码

```c++
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        if(!nums2.size()) return;
        if(!nums1.size()){
            nums1=nums2;
            return;
        }
        vector<int> r;
        int i=0,j=0;
        while(i<m&&j<n){
            if(nums1[i]<nums2[j]){
                r.push_back(nums1[i]);
                i++;
            }else{
                r.push_back(nums2[j]);
                j++;
            }
        }
        while(i<m){
                r.push_back(nums1[i]);
                i++;
        }
        while(j<n){
                r.push_back(nums2[j]);
                j++;
        }
        nums1=r;

    }
};
```



#### 101. 对称二叉树

> 给定一个二叉树，检查它是否是镜像对称的。

##### 思路

利用递归，自顶向下的递归。先判断当前节点对的情况，然后判断子节点对的情况，子节点对的情况依赖于其父节点对的参数。

- 时间复杂度On，空间On

##### 代码

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
    bool isSymmetric(TreeNode* root) {
        if(!root) return true;
        return top_down(root->left,root->right);
    }
private:
    bool top_down(TreeNode* x,TreeNode*y){
        if(!x&&!y) return true;
        if(!x||!y) return false;
        if(x->val!=y->val) return false;
        return top_down(x->left,y->right)&&top_down(x->right,y->left);
    }
    
};
```





#### 104. 二叉树的最大深度

>给定一个二叉树，找出其最大深度。
>
>二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
>
>**说明**: 叶子节点是指没有子节点的节点。
>
>
>
>来源：力扣（LeetCode）
>链接：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree
>著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

使用递归实现，二叉树的最大深度就是1+左右子树的最大深度。

- 时间复杂度On，空间复杂度On



##### 代码

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
    int maxDepth(TreeNode* root) {
        if(!root) return 0;
        return 1+max(maxDepth(root->left),maxDepth(root->right));
    }
    int max(int left,int right){
        return left>right?left:right;
    }
};
```



#### 107. 二叉树的层次遍历 II

> 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

##### 思路

简单粗暴，层次遍历然后reverse。

- 时间复杂度On，空间On

##### 代码

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
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        vector<vector<int>> result;
        if(!root) return result;
        while(!q.empty()){
            int size=q.size();
            vector<int> v;
            for(int i=0;i<size;i++){
                TreeNode*cur=q.front();
                v.push_back(cur->val);
                q.pop();
                if(cur->left) q.push(cur->left);
                if(cur->right) q.push(cur->right);
            }
            result.push_back(v);
        }
        int i=0,j=result.size()-1;
        while(i<j){
            auto tmp=result[i];
            result[i]=result[j];
            result[j]=tmp;
            i++;
            j--;
        }
        return result;
    }
};
```



#### 108. 将有序数组转换为二叉搜索树

> 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
>
> 本题中，一个高度平衡二叉树是指一个二叉树*每个节点* 的左右两个子树的高度差的绝对值不超过 1。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

利用二分查找构造的二叉树一定是高度平衡的二叉树。

- 时间复杂度On，空间复杂度Ologn

##### 代码

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
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        int left=0,right=nums.size()-1;
        return build(nums,left,right);
    }
    TreeNode* build(vector<int>& nums,int left,int right){
        if(left>right) return NULL;
        int mid=left+(right-left)/2;
        TreeNode * cur= new TreeNode(nums[mid]);
        cur->left=build(nums,left,mid-1);
        cur->right=build(nums,mid+1,right);
        return cur;
    }
};
```



#### 112. 路径总和

> 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
>
> **说明:** 叶子节点是指没有子节点的节点。



##### 思路

采用递归，自顶向下的递归。先访问当前节点，然后子节点的状态需要父节点传入参数。

- 时间复杂度On。空间复杂度一般Ologn，最差On

##### 代码

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
    bool hasPathSum(TreeNode* root, int sum) {
        if(!root&&sum==0) return false;
        return top_down(root,sum);
    }
    bool top_down(TreeNode* root, int sum){
        if(!root&&sum!=0) return false;
        if(!root) return true;
        int nextSum=sum-root->val;
        if(root->left&&root->right) return top_down(root->left,nextSum)||top_down(root->right,nextSum);
        if(root->left) return top_down(root->left,nextSum);
        return top_down(root->right,nextSum);
        
    }
};
```



#### 118. 杨辉三角

> 给定一个非负整数 *numRows，*生成杨辉三角的前 *numRows* 行。
>
> ![img](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)
>
> 在杨辉三角中，每个数是它左上方和右上方的数的和。
>
> **示例:**
>
> ```text
> 输入: 5
> 输出:
> [
>      [1],
>     [1,1],
>    [1,2,1],
>   [1,3,3,1],
>  [1,4,6,4,1]
> ]
> 
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/pascals-triangle
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

递归或者动态规划，找到基本情况（**每行第一个和最后一个是1**）和递推关系（**`a[i][j]=a[i-1][j-1]+a[i-1]`[j]**）。

- 时间复杂度O(n^2)，空间O1

##### 代码

```javascript
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    if(numRows<=0) return [];
    let result=[];
    for(let i=0;i<numRows;i++){
        let tmp=[];
        for(let j=0;j<i+1;j++){
            if(j==0||j==i) tmp.push(1);
            else tmp.push(result[i-1][j-1]+result[i-1][j]);
        }
        result.push(tmp);
    }
    return result;
};
```



#### 119. 杨辉三角 II

> 给定一个非负索引 *k*，其中 *k* ≤ 33，返回杨辉三角的第 *k* 行。
>
> ![img](pics/PascalTriangleAnimated2.gif)
>
> 在杨辉三角中，每个数是它左上方和右上方的数的和。
>
> **示例:**
>
> ```
> 输入: 3
> 输出: [1,3,3,1]
> ```
>
> **进阶：**
>
> 你可以优化你的算法到 *O*(*k*) 空间复杂度吗？
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/pascals-triangle-ii/
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

只返回第K行的元素，为了避免创建二维数组，可以使用一维进行优化，思考每次在数组末尾新添加一个元素从后向前计算，这样不会覆盖原来的结果。

- 时间复杂度O(k^2)，空间O(k)



##### 代码

```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let result=[];
    for(let i=0;i<rowIndex;i++){
        result.push(1);
        for(let j=i;j>0;j--){
            result[j]=result[j]+result[j-1];
        }
    }
    result.push(1);
    return result;
};
```





#### 121. 买卖股票的最佳时机

> 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
>
> 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
>
> 注意你不能在买入股票前卖出股票。
>
> **示例 1:**
>
> 输入: [7,1,5,3,6,4]
> 输出: 5
> 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
> ​     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

动态规划，当前的利润等于当前股票价格减去前面股票价格最小值，即`cur=prices[i]-minBefore`，最大利润是这些利润的最大值。

- 时间On，空间O1

##### 代码

```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int max=0;
        if(prices.size()==0) return max;
        int minBefore=prices[0];
        for(int i=1;i<prices.size();i++){
            if(minBefore>prices[i-1]) minBefore=prices[i-1];
            if(max<prices[i]-minBefore) max=prices[i]-minBefore;
        }
        return max;
    }
};
```





#### 125. 验证回文串

> 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
>
> 说明：本题中，我们将空字符串定义为有效的回文串。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/valid-palindrome
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

利用双指针，分别从前往后找和从后往前找，如果当前都是字母则比较，不同则false，如果都相同则true

- 时间复杂度On，空间复杂度O1

##### 代码

```c++
class Solution {
public:
    bool isPalindrome(string s) {
        if(s.size()<=1) return true;
        int left=0,right=s.size()-1;
        transform(s.begin(),s.end(),s.begin(),::tolower);
        while(left<right){
            while(left<s.size()&&!isAlphaDigit(s[left])) left++;
            while(right>=0&&!isAlphaDigit(s[right])) right--;
            if(left>=s.size()||right<0) break;
            if(s[left]!=s[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    bool isAlphaDigit(char c){
        return (c>='0'&&c<='9')||(c>='a'&&c<='z');
    }
};
```



#### 189. 旋转数组

> 给定一个数组，将数组中的元素向右移动 *k* 个位置，其中 *k* 是非负数。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/rotate-array
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

利用额外数组，将前面部分移动到后面，再将前面的清除。空间复杂度是On，对应**代码1**

- 时间复杂度On，空间复杂度On

还有更高效的方法就是利用翻转，不使用额外空间。对应**代码2**

```
原始数组                  : 1 2 3 4 5 6 7
反转所有数字后             : 7 6 5 4 3 2 1
反转前 k 个数字后          : 5 6 7 4 3 2 1
反转后 n-k 个数字后        : 5 6 7 1 2 3 4 --> 结果
```

- 时间复杂度On，空间复杂度O1

##### 代码1

```c++
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k=k%nums.size();
        if(k==0) return;
        int size=nums.size();
        for(int i=0;i<size-k;i++){
            nums.push_back(nums[i]);
        }
        nums.erase(nums.begin(),nums.begin()+size-k);
    }
};
```

##### 代码2

```c++
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k=k%nums.size();
        if(k==0) return;
        reverse(nums.begin(),nums.end());
        reverse(nums.begin(),nums.begin()+k);
        reverse(nums.begin()+k,nums.end());
    }
};
```



#### 169. 多数元素

> 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
>
> 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
>
> **示例 1:**
>
> ```
> 输入: [3,2,3]
> 输出: 3
> ```
>
> **示例 2:**
>
> ```
> 输入: [2,2,1,1,1,2,2]
> 输出: 2
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/majority-element
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

使用哈希映射计数，计数过程中计算。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let threshold = Math.floor(nums.length/2);
    let m=new Map();
    for(let i=0;i<nums.length;i++){
        if(!m.has(nums[i])){
            m.set(nums[i],1);
        }else{
            m.set(nums[i],m.get(nums[i])+1)
        }
        if(m.get(nums[i])>threshold) return nums[i];
    }
    return -1;
};
```



#### 190. 颠倒二进制位

> 颠倒给定的 32 位无符号整数的二进制位。
>
>  
>
> **示例 1**：
>
> ```
> 输入: 00000010100101000001111010011100
> 输出: 00111001011110000010100101000000
> 解释: 输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
>       因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/reverse-bits
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

利用tostring和parseInt函数，另外前面补〇用substr函数。

- 时间复杂度O1，空间O1

##### 代码

```javascript
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    return parseInt(('00000000000000000000000000000000'+n.toString(2)).substr(-32).split('').reverse().join(''),2);
};
```





#### 198. 打家劫舍

>你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
>
>给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。
>
>**示例 1:**
>
>```输入: [1,2,3,1]
>输入: [1,2,3,1]
>输出: 4
>解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
>     偷窃到的最高金额 = 1 + 3 = 4 。
>```
>
>来源：力扣（LeetCode）
>链接：https://leetcode-cn.com/problems/house-robber
>著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

动态规划，关键是找到状态转移方程。

考虑如下情况：

1. `i=0`时，`f(i)=nums[i]`
2. `i=1`时，`f(i)=max{nums[1],nums[0]}`
3. `i=2`时，`f(i)=max{nums[2]+f(0),f(1)}`

总结如下，

**`f(i)=max{nums[i]+f(i-2),nums[i-1]}`**

考虑令`f(-2)=f(-1)=0`比较容易实现。



- 时间复杂度On，空间O1

##### 代码

```c++
class Solution {
public:
    int rob(vector<int>& nums) {
        int p=0,q=0,r=0;
        for(int i=0;i<nums.size();i++){
            r=max(nums[i]+p,q);
            p=q;
            q=r;
        }
        return r;
    }
};
```





#### 202. 快乐数

> 编写一个算法来判断一个数是不是“快乐数”。
>
> 一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为 1，那么这个数就是快乐数。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/happy-number
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

利用哈希集合，计算当前值sum，如果当前值为1则返回`true`，如果当前值已经出现过（`set`中存在）则返回false，否则下一次使用这个sum值并把sum值加入到集合内。

- 时间复杂度未知。。空间复杂度未知。。

##### 代码

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    if(n==1) return true;
    const s = new Set();
    s.add(n);
    let cur=n;
    while(true){
        let sum=0;
        while(cur!=0){
            let mod=cur%10;
            sum+=mod**2;
            cur=parseInt(cur/10);
        }
        if(sum==1) return true;
        if(s.has(sum)) return false;
        s.add(sum);
        cur=sum;
    }
    return false;
};
```





#### 205. 同构字符串

> 给定两个字符串 s 和 t，判断它们是否是同构的。
>
> 如果 s 中的字符可以被替换得到 t ，那么这两个字符串是同构的。
>
> 所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/isomorphic-strings
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

不考虑技巧，直观思路，同构根据题意可知一个字符能够映射到唯一的字符（x对应唯一的y），并且两个字符不能映射到同一个字符（y对应唯一的x），即两个字符一一对应，即双射。

- 时间复杂度On，空间On

##### 代码

```c++
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        map<char,char> m1,m2;
        for(int i=0;i<s.size();i++){
            if(m1.count(s[i])){
                if(m1[s[i]]!=t[i]) return false;
            }else{
                m1[s[i]]=t[i];
            }
            if(m2.count(t[i])){
                if(m2[t[i]]!=s[i]) return false;
            }else{
                m2[t[i]]=s[i];
            }
        }
        return true;
    }
};
```



#### 226. 翻转二叉树

> 翻转一棵二叉树。



##### 思路

递归。交换当前左右孩子，递归左孩子和右孩子。

- 时间复杂度On，空间Ologn（假设树是相对平衡的）

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(root===null) return root;
    let tmp=root.left;
    root.left=root.right;
    root.right=tmp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};
```



#### 235. 二叉搜索树的最近公共祖先

> 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
>
> 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
>
> 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
>
> ![img](pics/binarysearchtree_improved.png)
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

最近的祖先元素一定在中序遍历的p和q之间的节点。共同祖先便是这些结点中前序遍历最先出现的。

- 时间On，空间On

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    //the first node in preorder of the sequence for inorder between p&q
    let s=[];
    let visited=new Set();
    if(root===null) return null;
    let tmp=new Set();
    s.push(root);
    let flag=0;
    while(s.length!==0){
        let cur=s.pop();
        if(!visited.has(cur)){
            visited.add(cur);
            if(cur.right) s.push(cur.right);
            s.push(cur);
            if(cur.left) s.push(cur.left);
        }else{
            if(cur===p||cur===q){
                flag++;
            }
            if(flag>0){
                tmp.add(cur);
            }
            if(flag===2) break;
        }
    }
    s=[];
    visited.clear();
    s.push(root);
    while(s.length!==0){
        let cur=s.pop();
        if(!visited.has(cur)){
            visited.add(cur);
            if(cur.right) s.push(cur.right);
            if(cur.left) s.push(cur.left);
            s.push(cur);
        }else{
            if(tmp.has(cur)) return cur;
        }
    }
    return null;
};
```





#### 242. 有效的字母异位词

> 给定两个字符串 *s* 和 *t* ，编写一个函数来判断 *t* 是否是 *s* 的字母异位词。



##### 思路

排序后字符串相同，但是时间复杂度较高。

- 时间复杂度Onlogn，空间On

更有效的方法是字母计数，然后比较次数。在此就不写了。

- 时间复杂度On，空间O1

##### 代码

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    return s.split('').sort().join('')===t.split('').sort().join('');
};
```



#### 258. 各位相加

> 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
>
> **示例:**
>
> ```
> 输入: 38
> 输出: 2 
> 解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
> ```
>
> **进阶:**
> 你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗？
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/add-digits
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

使用字符串分割循环计算。

- 时间复杂度不确定，空间O1

##### 代码

```javascript
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
    let tmp=num;
    while(tmp>=10){
        tmp=(tmp+"").split("").reduce((sum,x)=>sum+Number(x),0);
    }
    return tmp;
};
```





#### 268. 缺失数字

> 给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。
>
> **示例 1:**
>
> ```
> 输入: [3,0,1]
> 输出: 2
> ```
>
>
> **示例 2:**
>
> ```
> 输入: [9,6,4,2,3,5,7,0,1]
> 输出: 8
> ```
>
> 说明:
> 你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现?
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/missing-number
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

因为是连续的n+1个数缺少了其中1个，因此可以将连续的数求和减去缺少数字的序列之和，差值就是结果。

- 时间复杂度On，空间O1

##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    return parseInt((nums.length)*(nums.length+1)/2)-nums.reduce((sum,x)=>x+sum);
};
```





#### 283. 移动零

> 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
>
>
> 说明:
>
> 必须在原数组上操作，不能拷贝额外的数组。
> 尽量减少操作次数。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/move-zeroes
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

利用双指针，一个指向“新”数组的当前元素，一个指向“旧”数组的非零元素。最后将新数组末尾全部置0即可。

- 时间复杂度On，空间复杂度O1



##### 代码

```c++
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int size=nums.size();
        int i=0,j=0;
        for(;j<size;j++){
            if(nums[j]!=0){
                nums[i++]=nums[j];
            }
        }
        while(i<size){
            nums[i]=0;
            i++;
        }
    }
};
```



#### 349. 两个数组的交集

> 给定两个数组，编写一个函数来计算它们的交集。

##### 思路

利用集合和filter。

- 时间复杂度O(n+m)，空间O(n+m)

##### 代码

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    let result=[];
    let s1=new Set(nums1);
    let s2=new Set(nums2);
    return [...s1].filter(x=>s2.has(x));
};


```





#### 389. 找不同

> 给定两个字符串 s 和 t，它们只包含小写字母。
>
> 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
>
> 请找出在 t 中被添加的字母。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/find-the-difference
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

首先想到的是哈希计数，把第一个字符串每个字符统计个数，第二个字符串减，最后判断那个字符已经为0则当前字符就是要找的字符。**更简单的方法是使用异或，除了目标字符其他字符都是出现两次**

- 时间复杂度On，空间On；（异或时间On，空间O1）

##### 代码

```c++
class Solution {
public:
    char findTheDifference(string s, string t) {
        map<char,int> m;
        for(int i=0;i<s.size();i++){
            if(m.count(s[i])==0||m[s[i]]==0){
                m[s[i]]=1;
            }else{
                m[s[i]]++;
            }
        }
        for(int i=0;i<t.size();i++){
            if(m.count(t[i])==0||m[t[i]]==0) return t[i];
            m[t[i]]--;
        }
        return -1;
    }
};
```



#### 500. 键盘行

> 给定一个单词列表，只返回可以使用在键盘同一行的字母打印出来的单词。

##### 思路

创建三个集合（键盘三行字母的集合），然后取当前字符串取交集，如果交集结果和当前字符串相同，那么满足条件。

- 时间复杂度O(n*k)，空间复杂度O(1)

##### 代码

```javascript
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
    l1 = 'qwertyuiopQWERTYUIOP'
    l2 = 'asdfghjklASDFGHJKL'
    l3 = 'zxcvbnmZXCVBNM'
    let result=[];
    const s1=new Set(l1);
    const s2=new Set(l2);
    const s3=new Set(l3);
    for(let i=0;i<words.length;i++){
        const cur=words[i];
        if(s1.has(cur[0])){
            let j=1;
            while(j<cur.length&&s1.has(cur[j])) j++;
            if(j===cur.length) result.push(words[i]);
        }else if(s2.has(cur[0])){
            let j=1;
            while(j<cur.length&&s2.has(cur[j])) j++;
            if(j===cur.length) result.push(words[i]);
        }else{
            let j=1;
            while(j<cur.length&&s3.has(cur[j])) j++;
            if(j===cur.length) result.push(words[i]);
        }
    }
    return result;
};
```



#### 504. 七进制数

> 给定一个整数，将其转化为7进制，并以字符串形式输出。
>
> **示例 1**:
>
> ```
> 输入: 100
> 输出: "202"
> ```
>
> **示例 2**:
>
> ```
> 输入: -7
> 输出: "-10"
> ```
>
> **注意**: 输入范围是 [-1e7, 1e7] 。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/base-7
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

可以取余取商法做。直接用toString了。

- 时间复杂度O1，空间O1

##### 代码

```javascript
/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {
    return num.toString(7);
};
```



#### 509. 斐波那契数

> 斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
>
> ```
> F(0) = 0,   F(1) = 1
> F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
> 给定 N，计算 F(N)。
> ```
>
>  
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/fibonacci-number
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

目前知道四种思路。1是递归求解有重复计算；2是动态规划；3是递归求解加记忆化技术（`memorization`）；

4是最快的使用公式法（`通过差分方程可以推出公式`）。以下代码使用记忆化技术。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    let computed=new Map();
    function helper(n){
        if(computed.has(n)){
            return computed.get(n);
        }
        let result;
        if(n<2){
            result=n;
        }else{
            result=helper(n-1)+helper(n-2)
        }
        computed.set(n,result);
        return result;
    }
    return helper(N);
};
```





#### 520. 检测大写字母

> 给定一个单词，你需要判断单词的大写使用是否正确。
>
>
>
> 我们定义，在以下情况时，单词的大写用法是正确的：
>
> - 全部字母都是大写，比如"USA"。
>
> - 单词中所有字母都不是大写，比如"leetcode"。
> - 如果单词不只含有一个字母，只有首字母大写， 比如 "Google"。
>
> 否则，我们定义这个单词没有正确使用大写字母。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/detect-capital
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

条件判断就行。

- 时间On，空间O1

##### 代码



```c++
class Solution {
public:
    bool detectCapitalUse(string word) {
        if(word.size()<2) return true;
        if(word.size()==2) return !(word[0]>='a'&&word[1]<'a');
        bool first=word[0]<'a';
        bool second=word[1]<'a';
        if(!first&&second) return false;
        for(int i=2;i<word.size();i++){
            if(first&&second&&word[i]>='a') return false;
            else if(!second&&word[i]<'a') return false;
            else if(!first&&word[i]<'a') return false;
        }
        return true;
    }
};
```



#### 557. 反转字符串中的单词 III

> 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
>
>
> 注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/reverse-words-in-a-string-iii
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

按照单词来翻转，不复杂，直接上。

- 时间复杂度On，空间O1

##### 代码

```c++
class Solution {
public:
    string reverseWords(string s) {
        int i=0,j=0;
        while(i<s.size()){
            while(j<s.size()&&s[j]!=' ') j++;
            int r=j-1;
            while(i<r){
                char tmp=s[i];
                s[i]=s[r];
                s[r]=tmp;
                i++;
                r--;
            }
            i=j+1;
            j=i;
        }
        return s;
    }
};
```



#### 559. N叉树的最大深度

> 给定一个 N 叉树，找到其最大深度。
>
> 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。



##### 思路

采用递归，自底向上的递归，先求子节点的深度，父节点的深度由子节点的深度决定。

- 时间复杂度On，空间复杂度Oh

##### 代码

```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
public:
    int maxDepth(Node* root) {
        if(!root) return 0;
        int max=0;
        for(int i=0;i<root->children.size();i++){
            int cur=maxDepth(root->children[i]);
            if(cur>max) max=cur;
        }
        return max+1;
    }
};
```





#### 589. N叉树的前序遍历

> 给定一个 N 叉树，返回其节点值的*前序遍历*。

#####  思路

和二叉树类似，直接写就行。

##### 代码

```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
public:
    vector<int> preorder(Node* root) {
        set<Node*> st;
        stack<Node*> s;
        vector<int> r;
        if(!root) return r;
        s.push(root);
        while(!s.empty()){
            Node * cur=s.top();
            s.pop();
            if(!st.count(cur)){
                for(int i=cur->children.size()-1;i>=0;i--){
                    if(cur->children[i]) s.push(cur->children[i]);
                }
                s.push(cur);
                st.insert(cur);
            }else{
                r.push_back(cur->val);
            }
        }
        return r;
    }
};
```



#### 590. N叉树的后序遍历

> 给定一个 N 叉树，返回其节点值的*后序遍历*。

##### 思路

和二叉树类似，直接写就行。

##### 代码

```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
public:
    vector<int> postorder(Node* root) {
        set<Node*> st;
        stack<Node*> s;
        vector<int> r;
        if(!root) return r;
        s.push(root);
        while(!s.empty()){
            Node * cur=s.top();
            s.pop();
            if(!st.count(cur)){
                s.push(cur);
                st.insert(cur);
                for(int i=cur->children.size()-1;i>=0;i--){
                    if(cur->children[i]) s.push(cur->children[i]);
                }
            }else{
                r.push_back(cur->val);
            }
        }
        return r;
    }
};
```





#### 637. 二叉树的层平均值

> 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组.
>
> **示例 1:**
>
> ```
> 输入:
>     3
>    / \
>   9  20
>     /  \
>    15   7
> 输出: [3, 14.5, 11]
> 解释:
> 第0层的平均值是 3,  第1层是 14.5, 第2层是 11. 因此返回 [3, 14.5, 11].
> ```
>
> **注意：**
>
> 节点值的范围在32位有符号整数范围内。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/average-of-levels-in-binary-tree
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

使用队列进行层次遍历，每层计算平均值。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
    let q=[];
    let result=[];
    if(!root) return result;
    q.push(root);
    while(q.length!==0){
        let size=q.length;
        let sum=0;
        for(let i=0;i<size;i++){
            let cur=q.shift();
            sum+=cur.val;
            if(cur.left) q.push(cur.left);
            if(cur.right) q.push(cur.right);
        }
        result.push(sum/size);
    }
    return result;
};
```





#### 674. 最长连续递增序列

> 给定一个未经排序的整数数组，找到最长且连续的的递增序列。
>
> **示例 1:**
>
> ```
> 输入: [1,3,5,4,7]
> 输出: 3
> 解释: 最长连续递增序列是 [1,3,5], 长度为3。
> 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为5和7在原数组里被4隔开。
> ```
>
>
> **示例 2:**
>
> ```
> 输入: [2,2,2,2,2]
> 输出: 1
> 解释: 最长连续递增序列是 [2], 长度为1。
> ```
>
> **注意：**数组长度不会超过10000。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

遍历统计即可。

- 时间复杂度On，空间O1

##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
    return nums.length===0?0:nums.reduce((last,cur,i)=>{
        if(i===0){
            return {
                v:cur,
                count:1,
                max:1
            }
        }
        if(cur>last.v){
            last.count++;
        }else{
            last.count=1;
        }
        last.v=cur;
        last.max=last.max>last.count?last.max:last.count;
        return last;
    },null).max;
};
```





#### 703. 数据流中的第K大元素

> 设计一个找到数据流中第K大元素的类（class）。注意是排序后的第K大元素，不是第K个不同的元素。
>
> 你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，它包含数据流中的初始元素。每次调用 KthLargest.add，返回当前数据流中第K大的元素。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/kth-largest-element-in-a-stream
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

用`C++`实现前先看一下C++的优先级队列（也就是堆）是怎么用的，第一次用，有点懵。

定义，下面是从[CPP Reference](http://www.cplusplus.com/reference/queue/priority_queue/)里摘出来的。模板需要接受至少一个参数，即队列元素的类型。另外还要选择性的传入存储容器类型和比较函数类。默认的容器是`vector`，比较函数是`less`即大根堆。

```c++
template <class T, class Container = vector<T>,
  class Compare = less<typename Container::value_type> > class priority_queue;
```

题目要求找数据流中第K大的数，我们仅需要维护一个小根堆，这个小根堆大小最大为K，小根堆里存的是当前前K大的数。当有新的数`val`加入的时候，如果小根堆的元素数量小于K那么直接加入，否则比较`val`和堆顶的数，如果比堆顶的值要大那就替换掉，否则忽略当前值。

- 插入时间O(logK)，空间复杂度O(K)

##### 代码

```c++
class KthLargest {
private:
    priority_queue<int,vector<int>,greater<int>> p;
    int limit;
public:
    KthLargest(int k, vector<int>& nums) {
        this->limit=k;
        for(int i=0;i<nums.size();i++){
            add(nums[i]);
        }
    }
    
    int add(int val) {
        if(p.size()<limit){
            p.push(val);
        }else if(p.top()<val){
            p.pop();
            p.push(val);
        }
        return p.top();
    }
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest* obj = new KthLargest(k, nums);
 * int param_1 = obj->add(val);
 */
```



#### 709. 转换成小写字母

> 实现函数 ToLowerCase()，该函数接收一个字符串参数 str，并将该字符串中的大写字母转换成小写字母，之后返回新的字符串。
>
>  
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/to-lower-case
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

直接使用内置`String.prototype.toLowerCase`函数。

- 时间On，空间On

##### 代码

```javascript
/**
 * @param {string} str
 * @return {string}
 */
var toLowerCase = function(str) {
    return str.toLowerCase();
};
```



#### 724. 寻找数组的中心索引

> 给定一个整数类型的数组 nums，请编写一个能够返回数组“中心索引”的方法。
>
> 我们是这样定义数组中心索引的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。
>
> 如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/find-pivot-index
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

先排除数组为空的情况。求和减去第一个元素，表示第一个元素右边的和，左边的和初始化为0，依次右移修改sum值直到两者相等或者中心索引超出数组的最大索引

- 时间复杂度On，空间O1

##### 代码

```c++
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        if(nums.size()==0) return -1;
        int sum_right=0;
        for_each(nums.begin(),nums.end(),[&](int n){
            sum_right+=n;
        });
        sum_right-=nums[0];
        int sum_left=0;
        int i=0;
        while(i+1<nums.size()&&sum_left!=sum_right){
            sum_left+=nums[i];
            sum_right-=nums[i+1];
            i++;
        }
        return sum_left==sum_right?i:-1;
    }
};
```



#### 747. 至少是其他数字两倍的最大数

> 在一个给定的数组nums中，总是存在一个最大元素 。
>
> 查找数组中的最大元素是否至少是数组中每个其他数字的两倍。
>
> 如果是，则返回最大元素的索引，否则返回-1。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思略

首先如果这个最大数存在的话就肯定是整个数组的最大值。那么思路就是找到这个最大值，并且比较其他元素是否满足条件即可。

- 时间复杂度On，空间O1

##### 代码

```c++
class Solution {
public:
    int dominantIndex(vector<int>& nums) {
        if(nums.size()==0) return -1;
        int index=0,max=nums[0];
        for(int i=1;i<nums.size();i++){
            if(nums[index]<nums[i]){
                max=nums[i];
                index=i;
            }
        }
        
        for(int i=0;i<nums.size();i++){
            if(index==i) continue;
            if(nums[i]*2>max) return -1;
        }
        return index;
    }
};
```



#### 922. 按奇偶排序数组 II

> 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
>
> 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
>
> 你可以返回任何满足上述条件的数组作为答案。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/sort-array-by-parity-ii
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

双指针。

- 时间复杂度On，空间复杂度O1

##### 代码

```javascript
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
    let slow=0,fast=1;
    while(slow<A.length&&fast<A.length){
        while(slow<A.length&&A[slow]%2===0) slow+=2;
        while(fast<A.length&&A[fast]%2===1) fast+=2;
        if(slow>=A.length) break;
        if(fast>=A.length) break;
        A[slow]=A[slow]+A[fast];
        A[fast]=A[slow]-A[fast];
        A[slow]=A[slow]-A[fast];
    }
    return A;
};
```



#### 961. 重复 N 次的元素

> 在大小为 2N 的数组 A 中有 N+1 个不同的元素，其中有一个元素重复了 N 次。
>
> 返回重复了 N 次的那个元素。
>
> **提示：**
>
> - 4 <= A.length <= 10000
> - 0 <= A[i] < 10000
> - A.length 为偶数
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/n-repeated-element-in-size-2n-array
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

利用集合。2N个数中N+1个不同的数，其中1个数出现了N次。那么其余所有数都出现了一次。当出现第二次的时候就是这个数。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var repeatedNTimes = function(A) {
    let s=new Set();
    for(let i=0;i<A.length;i++){
        if(s.has(A[i])) return A[i];
        s.add(A[i]);
    }
    return -1;
};
```



#### 965. 单值二叉树

> 如果二叉树每个节点都具有相同的值，那么该二叉树就是*单值*二叉树。
>
> 只有给定的树是单值二叉树时，才返回 `true`；否则返回 `false`。
>
> **提示：**
>
> 1. 给定树的节点数范围是 `[1, 100]`。
> 2. 每个节点的值都是整数，范围为 `[0, 99]` 。



##### 思路

遍历或者递归，遍历可以深度遍历和层次遍历。以下代码是递归。

- 时间复杂度On，空间Ologn

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isUnivalTree = function(root) {
    if(!root) return true;
    if(root.left&&root.right&&!(root.left.val===root.val&&root.right.val===root.val)) return false;
    else if((root.left||root.right)&&((root.left||root.right).val!==root.val)) return false;
    else if(!root.left&&!root.right) return true;
    return isUnivalTree(root.left)&&isUnivalTree(root.right);
};
```





#### 976. 三角形的最大周长

> 给定由一些正数（代表长度）组成的数组 A，返回由其中三个长度组成的、面积不为零的三角形的最大周长。
>
> 如果不能形成任何面积不为零的三角形，返回 0。
>
>  
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/largest-perimeter-triangle
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

三角形的最大周长一定来自于相对较大的几个数，所以说需要排序。假如说是升序排序则从后向前找只要满足三角形的构造规则即可。JS中比较坑的一点是`Array.prototype.sort`如果不指定比较函数则对其`UTF-16`编码进行排序。

- 时间复杂度Onlogn，空间O1

##### 代码

```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function(A) {
    A.sort((a,b)=>a-b);
    let i=A.length-1;
    while(i-2>=0){
        if(A[i-2]+A[i-1]<=A[i]){
            i--;
            continue;
        }
        return A[i-2]+A[i-1]+A[i];
    }
    return 0;
};
```



#### 1009. 十进制整数的反码

> 每个非负整数 N 都有其二进制表示。例如， 5 可以被表示为二进制 "101"，11 可以用二进制 "1011" 表示，依此类推。注意，除 N = 0 外，任何二进制表示中都不含前导零。
>
> 二进制的反码表示是将每个 1 改为 0 且每个 0 变为 1。例如，二进制数 "101" 的二进制反码为 "010"。
>
> 给定十进制数 N，返回其二进制表示的反码所对应的十进制整数。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/complement-of-base-10-integer
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

使用toString和map方法转换反码，用parseInt函数转换为数值。

- 时间复杂度O1，空间O1

##### 代码

```javascript
/**
 * @param {number} N
 * @return {number}
 */
var bitwiseComplement = function(N) {
    return parseInt(N.toString(2).split('').map(x=>x==='0'?'1':'0').join(''),2);
};
```





#### 1108. IP 地址无效化

> 给你一个有效的 IPv4 地址 address，返回这个 IP 地址的无效化版本。
>
> 所谓无效化 IP 地址，其实就是用 "[.]" 代替了每个 "."。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/defanging-an-ip-address
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

使用JavaScript的replace函数。第一个参数是正则对象或者字符串（仅仅匹配第一次出现），第二个参数是用于替换的字符串或者匹配转换函数。

```javascript
var newStr = str.replace(regexp|substr, newSubstr|function)
```



##### 代码

```javascript
/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function(address) {
    return address.replace(/\./g,'[.]');
};
```





#### 1207. 独一无二的出现次数

> 给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。
>
> 如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。
>
> **提示：**
>
> - 1 <= arr.length <= 1000
> - -1000 <= arr[i] <= 1000
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/unique-number-of-occurrences
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

用map计数，用set检测重复。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    let m=new Map();
    for(let i=0;i<arr.length;i++){
        if(m.has(arr[i])){
            m.set(arr[i],m.get(arr[i])+1);
            continue;
        }
        m.set(arr[i],1);
    }
    let s=new Set();
    for(let value of m.values()){
        if(s.has(value)) return false;
        s.add(value);
    }
    return true;
};
```



#### 1249. 移除无效的括号

> 给你一个由 '('、')' 和小写字母组成的字符串 s。
>
> 你需要从字符串中删除最少数目的 '(' 或者 ')' （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。
>
> 请返回任意一个合法字符串。
>
> 有效「括号字符串」应当符合以下 **任意一条** 要求：
>
> - 空字符串或只包含小写字母的字符串
> - 可以被写作 AB（A 连接 B）的字符串，其中 A 和 B 都是有效「括号字符串」
> - 可以被写作 (A) 的字符串，其中 A 是一个有效的「括号字符串」
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/minimum-remove-to-make-valid-parentheses
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

和检测括号有效性相同，需要记录每个括号的位置。最后在残留在栈内的就是无效的括号，去除即可。

- 时间复杂度On，空间复杂度On

##### 代码

```c++
struct Node{
    char c;
    int i;
};
class Solution {
public:
    string minRemoveToMakeValid(string str) {
        stack<Node> s;
        for(int i=0;i<str.size();i++){
            if(str[i]!='('&&str[i]!=')') continue;
            if(str[i]=='('){
                s.push({str[i],i});
                continue;
            }
            if(s.empty()){
                s.push({str[i],i});
                continue;
            }
            if(s.top().c=='('){
                s.pop();
                continue;
            }
            s.push({str[i],i});
        }
        while(!s.empty()){
            
            str.erase(s.top().i,1);
            s.pop();
        }
        return str;
    }
};
```



#### 1287. 有序数组中出现次数超过25%的元素

> 给你一个非递减的 有序 整数数组，已知这个数组中恰好有一个整数，它的出现次数超过数组元素总数的 25%。
>
> 请你找到并返回这个整数
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/element-appearing-more-than-25-in-sorted-array
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

数组有序，单调递增。如果存在数组下标差值为1/4长度的元素相等，那么这个元素就是目标值。

- 时间复杂度On，空间O1

##### 代码

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function(arr) {
    let start=parseInt(arr.length/4);
    for(let i=start;i<arr.length;i++){
        if(arr[i]===arr[i-start]||arr[i]===arr[i+start]) return arr[i];
    }
    return 0;
};
```





#### 1290. 二进制链表转整数

> 给你一个单链表的引用结点 head。链表中每个结点的值不是 0 就是 1。已知此链表是一个整数数字的二进制表示形式。
>
> 请你返回该链表所表示数字的 十进制值 。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/convert-binary-number-in-a-linked-list-to-integer
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

迭代，每次乘2加当前值作为当前结果值。

- 时间复杂度On，空间O1

##### 代码

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function(head) {
    let result=0;
    let cur=head;
    while(cur){
        result=result*2+cur.val;
        cur=cur.next;
    }
    return result;
};
```



#### 1299. 将每个元素替换为右侧最大元素

> 给你一个数组 arr ，请你将每个元素用它右边最大的元素替换，如果是最后一个元素，用 -1 替换。
>
> 完成所有替换操作后，请你返回这个数组。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/replace-elements-with-greatest-element-on-right-side
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

从右向左替换。

- 时间On，空间O1

##### 代码

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function(arr) {
    let max=arr[arr.length-1];
    let last=arr[arr.length-1];
    arr[arr.length-1]=-1;
    for(let i=arr.length-2;i>=0;i--){
        last=arr[i];
        arr[i]=max;
        max=max>last?max:last;
    }
    return arr;
};
```





#### 1304. 和为零的N个唯一整数

> 给你一个整数 n，请你返回 任意 一个由 n 个 各不相同 的整数组成的数组，并且这 n 个数相加和为 0 。
>
>  
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/find-n-unique-integers-sum-up-to-zero
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

前n-1使用下标，最后一个使用前面下标和的相反数。

- 时间On，空间On

##### 代码

```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
var sumZero = function(n) {
    return Array(n).fill(0).map((x,i,arr)=>i<n-1?i:-(n-2)*(1+n-2)/2);
};
```



#### 1309. 解码字母到整数映射

> 给你一个字符串 s，它由数字（'0' - '9'）和 '#' 组成。我们希望按下述规则将 s 映射为一些小写英文字符：
>
> 字符（'a' - 'i'）分别用（'1' - '9'）表示。
> 字符（'j' - 'z'）分别用（'10#' - '26#'）表示。 
> 返回映射之后形成的新字符串。
>
> 题目数据保证映射始终唯一。
>
> **示例 1**：
>
> ```
> 输入：s = "10#11#12"
> 输出："jkab"
> 解释："j" -> "10#" , "k" -> "11#" , "a" -> "1" , "b" -> "2".
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/decrypt-string-from-alphabet-to-integer-mapping
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

正则表达式匹配。贪婪模式，优先匹配#类别，再匹配其他。

![1578791884138](pics/1578791884138.png)

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var freqAlphabets = function(s) {
    return s.match(/((1[0-9])|(2[0-6]))#|[1-9]/g).map(x=>{
        return x.includes('#')?String.fromCharCode(+(x.split('#')[0])+'j'.charCodeAt(0)-10):String.fromCharCode(+x+'a'.charCodeAt(0)-1);
    }).join('');
};
```



#### 5291. 统计位数为偶数的数字

> 给你一个整数数组 nums，请你返回其中位数为 偶数 的数字的个数。
>
>
>
>
> 提示：
>
> - 1 <= nums.length <= 500
> - 1 <= nums[i] <= 10^5
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/find-numbers-with-even-number-of-digits
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

遍历查找即可。使用Functional Programming，reduce函数。

- 时间复杂度On，空间O1

##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function(nums) {
    return nums.reduce((count,x)=>{
        let bit=0;
        while(x!==0){
            x=parseInt(x/10);
            bit++;
        }
        return count+(bit%2===0);
    },0)
};
```





### 中等





#### 2. 两数相加

> 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
>
> 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
>
> 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/add-two-numbers
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

目的很明确，加的过程中注意进位，还要注意999的情况，可能还要添加最后新节点。

- 时间O(max{M,N})，空间O(max{M,N})

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    if(!l1||!l2) return l1||l2;
    let cur1=l1,cur2=l2;
    let carry=0;
    let pre1=null,pre2=null;
    while(cur1&&cur2){
        let tmp=cur1.val+cur2.val+carry;
        if(tmp>9){
            carry=1;
            cur1.val=tmp-10;
        }else{
            carry=0;
            cur1.val=tmp;
        }
        pre1=cur1;
        pre2=cur2;
        cur1=cur1.next;
        cur2=cur2.next;
    }
    if(cur1){
        while(cur1){
            let tmp=cur1.val+carry;
            if(tmp>9){
                carry=1;
                cur1.val=tmp-10;
            }else{
                carry=0;
                cur1.val=tmp;
            }
            pre1=cur1;
            cur1=cur1.next;
        }
        if(carry) pre1.next=new ListNode(carry);
        return l1;
    };
    if(!cur2){
        if(carry) pre1.next=new ListNode(carry);
        return l1;
    }
    pre1.next=cur2;
    while(cur2){
        let tmp=cur2.val+carry;
        if(tmp>9){
            carry=1;
            cur2.val=tmp-10;
        }else{
            carry=0;
            cur2.val=tmp;
        }
        pre2=cur2;
        cur2=cur2.next;
    }
    if(carry) pre2.next=new ListNode(carry);
    return l1;
};
```





#### 11. 盛最多水的容器

> 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
>
> 说明：你不能倾斜容器，且 n 的值至少为 2。
>
> ![img](pics/question_11.jpg)
>
> *图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。*
>
> **示例:**
>
> ```
> 输入: [1,8,6,2,5,4,8,3,7]
> 输出: 49
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/container-with-most-water
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

双指针，分别从头和尾部进行扫描，当前双指针状态计算面积，更新max。然后双指针中指向高度较低的向较高方向移动。

- 时间复杂度On，空间O1



##### 代码

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let l=0,r=height.length-1;
    let max=0;
    while(l<r){
        let cur;
        if(height[l]<height[r]){
            cur=height[l]*(r-l);
            l++;
        }else{
            cur=height[r]*(r-l);
            r--;
        }
        max=max>cur?max:cur;
    }
    return max;
};
```





#### 24. 两两交换链表中的节点

> 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
>
> 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
>
>  
>
> **示例:**
>
> ```
> 给定 1->2->3->4, 你应该返回 2->1->4->3.
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

递归的交换，并返回交换后第一个节点的值，用于递归完成后上一层递归的第二个节点的指向修改。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if(head===null||head.next===null) return head;
    let t=head.next;
    head.next=t.next;
    t.next=head;
    let r=swapPairs(t.next.next);
    head.next=r;
    return t;
};
```



#### 46. 全排列

> 给定一个**没有重复**数字的序列，返回其所有可能的全排列。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/permutations
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

利用递归回溯，每次保留当前状态，数组需要拷贝。**回溯=深度优先+状态重置+剪枝**。

- 时间复杂度O(n!)，空间O(n!)

##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    
    function swap(nums,i,j){
        let t=nums[i];
        nums[i]=nums[j];
        nums[j]=t;
    }
    function construct(n,nums,output,first){
        if(first===n) output.push([...nums]);
        for(let i=first;i<n;i++){
            swap(nums,first,i);
            construct(n,nums,output,first+1);
            swap(nums,first,i);
        }
    }
    let result=[];
    let n=nums.length;
    construct(n,nums,result,0);
    return result;
};
```



#### 48. 旋转图像

> 给定一个 n × n 的二维矩阵表示一个图像。
>
> 将图像顺时针旋转 90 度。
>
> 说明：
>
> 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/rotate-image
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

先沿着主对角线做对称，后沿着垂直中线做对称。

- 时间复杂度On，空间O1

##### 代码

```javascript
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    //mirror with main axis
    let n=matrix.length;
    for(let i=0;i<n;i++){
        for(let j=0;j<i;j++){
            let tmp=matrix[i][j];
            matrix[i][j]=matrix[j][i];
            matrix[j][i]=tmp;
        }
    }

    //mirror with vertical line
    let mid=parseInt(n/2);
    for(let i=0;i<n;i++){
        for(let j=0;j<mid;j++){
            let tmp=matrix[i][j];
            matrix[i][j]=matrix[i][n-j-1];
            matrix[i][n-j-1]=tmp;
        }
    }
    return matrix;
};
```





#### 49. 字母异位词分组

>  给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
>
> **示例:**
>
> 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
> 输出:
> [
>   ["ate","eat","tea"],
>   ["nat","tan"],
>   ["bat"]
> ]
> **说明：**
>
> 所有输入均为小写字母。
> 不考虑答案输出的顺序。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/group-anagrams
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

首先想到哈希。因为这是一种映射，将字母异位词映射到同一个组，哈希函数就是字符串排序结果。

- 时间复杂度On，空间复杂度On（也可以认为空间是结果的一部分可以看做和不同字母异位词的个数相关）

##### 代码

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



#### 54. 螺旋矩阵

> 给定一个包含 *m* x *n* 个元素的矩阵（*m* 行, *n* 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。



##### 思路

设置边界值，每遍历一行或者一列，缩小边界，如果边界重合则说明无剩余元素，退出。

- 时间复杂度On，空间O1

##### 代码



```c++
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> result;
        if(matrix.size()==0) return result;
        int up=0,down=matrix.size()-1,left=0,right=matrix[0].size()-1;
        while(true){
            for(int i=left;i<=right;i++) result.push_back(matrix[up][i]);
            if(++up>down) break;
            for(int i=up;i<=down;i++) result.push_back(matrix[i][right]);
            if(--right<left) break;
            for(int i=right;i>=left;i--) result.push_back(matrix[down][i]);
            if(--down<up) break;
            for(int i=down;i>=up;i--) result.push_back(matrix[i][left]);
            if(++left>right) break;
        }
        return result;
    }
};
```



#### 62. 不同路径

> 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
>
> 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
>
> 问总共有多少条不同的路径？
>
> ![img](pics/robot_maze.png)
>
> 例如，上图是一个7 x 3 的网格。有多少可能的路径？
>
> 说明：m 和 n 的值均不超过 100。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/unique-paths
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

动态规划，除了第一行和第一列，设置dp数组，从`(0,0)`到`(i,j)`共有`dp[i][j]=dp[i-1][j]+dp[i][j-1]`种情况。

- 时间复杂度O(mn)，空间O(mn)

##### 代码

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let dp=Array(m).fill(Array(n).fill(0));
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(i===0||j===0){
                dp[i][j]=1;
            }else{
                dp[i][j]=dp[i-1][j]+dp[i][j-1];
            }
        }
    }
    return dp[m-1][n-1];
};
```



#### 63. 不同路径 II

> 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
>
> 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
>
> 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
>
> ![img](pics/robot_maze.png)
>
> 网格中的障碍物和空位置分别用 1 和 0 来表示。
>
> 说明：m 和 n 的值均不超过 100。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/unique-paths-ii
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

动态规划。如果当前位置是障碍物则`dp[i][j]=0`，否则考虑：第一行`dp[i][j]=dp[i][j-1]`，第一列`dp[i][j]=dp[i-1][j]`，其他`dp[i][j]=dp[i-1][j]+dp[i][j-1]。`

- 时间Omn，空间Omn

##### 代码

```javascript
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m=obstacleGrid.length,n=obstacleGrid[0].length;
    let dp=Array(m).fill(Array(n).fill(0));
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(i===0&&j===0){
                dp[i][j]=obstacleGrid[i][j]===0?1:0;
                continue;
            }
            if(i===0||j===0){
                if(obstacleGrid[i][j]!==1){
                    if(i===0){
                        dp[i][j]=dp[i][j-1];
                    }else{
                        dp[i][j]=dp[i-1][j];
                    }
                }else{
                    dp[i][j]=0;
                }
            }else{
                if(obstacleGrid[i][j]!==1){
                    dp[i][j]=dp[i-1][j]+dp[i][j-1];
                }else{
                    dp[i][j]=0;
                }
            }
        }
    }
    return dp[m-1][n-1];
};
```





#### 78. 子集

> 给定一组**不含重复元素**的整数数组 nums，返回该数组所有可能的子集（幂集）。
>
> 说明：解集不能包含重复的子集。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/subsets
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

暴力回溯。利用每次选取当前元素后下次只能选取后面的元素以防重复。

- 时间复杂度O(n!)，空间On

##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    if(nums.length===0) return [];
    let result=[];
    let len=nums.length;
    function construct(idx,tmp){
        result.push(tmp);
        for(let i=idx;i<len;i++){
            construct(i+1,tmp.concat([nums[i]]));
        }
    }
    construct(0,[]);
    return result;
};
```





#### 94. 二叉树的中序遍历

> 给定一个二叉树，返回它的*中序* 遍历。

##### 思路

二叉树的前中后序遍历都是深度优先搜索，前序是第一次访问时便记录，中序是第二次访问，后序是第三次访问。我们可以使用自定义栈来模拟函数栈。

- 时间复杂度On，空间复杂度On

##### 代码

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



#### 98. 验证二叉搜索树

> 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
>
> 假设一个二叉搜索树具有**如下特征**：
>
> - 节点的左子树只包含小于当前节点的数。
>
> - 节点的右子树只包含大于当前节点的数。
> - 所有左子树和右子树自身必须也是二叉搜索树。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/validate-binary-search-tree
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

利用中序遍历有序，如果中序遍历存在当前元素比上一个元素小（假设升序）则不是二叉搜索树，否则遍历完成则是二叉搜索树。

- 时间复杂度On，空间复杂度On

##### 代码

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
    bool isValidBST(TreeNode* root) {
        stack<TreeNode*> s;
        set<TreeNode*> visited;
        s.push(root);
        int last,first=1;
        while(!s.empty()){
            TreeNode* cur=s.top();
            s.pop();
            if(!cur) continue;
            if(!visited.count(cur)){
                visited.insert(cur);
                s.push(cur->right);
                s.push(cur);
                s.push(cur->left);
            }else{
                if(first==1){
                    first=0;
                    last=cur->val;
                    continue;
                }
                if(last>=cur->val) return false;
                last=cur->val;
            }
        }
        return true;
    }
};
```



#### 102. 二叉树的层次遍历

> 给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

树的层次遍历就是一种广度优先搜索，使用队列来完成操作。

- 时间复杂度On，空间复杂度On

##### 代码

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
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;        
        queue<TreeNode*> q;
        if(!root) return result;
        q.push(root);
        while(!q.empty()){
            
            int size=q.size();
            vector<int> curlevel;
            for(int i=0;i<size;i++){
                TreeNode* cur=q.front();
                curlevel.push_back(cur->val);
                if(cur->left)
                    q.push(cur->left);
                if(cur->right)
                    q.push(cur->right);
                q.pop();
            }
            result.push_back(curlevel);
            
            
        }
        return result;
        
    }
};
```



#### 114. 二叉树展开为链表

> 给定一个二叉树，[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95/8010757)将它展开为链表。

##### 思路

遍历的同时构造，所以需要记录上一个节点，但是根元素必须晚于孩子元素的遍历，也就是说自底向上。所以说遍历只能“左右根”或者“右左根”。根据题意，通过right连接链表节点，而且顺序有规定，所以需要通过“右左根”顺序遍历。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    if(root===null) return;
    let st=new Set();
    let s=[];
    s.push(root);
    let pre;
    let first=true;
    while(s.length!==0){
        let cur=s.pop();
        if(!st.has(cur)){
            st.add(cur);
            s.push(cur);
            if(cur.left!==null) s.push(cur.left);
            if(cur.right!==null) s.push(cur.right);
        }else{
            if(first){
                pre=cur;
                first=false;
                continue;
            }
            cur.left=null;
            cur.right=pre;
            pre=cur;
        }
    }
};
```





#### 133. 克隆图

> 给定无向[**连通**](https://baike.baidu.com/item/%E8%BF%9E%E9%80%9A%E5%9B%BE/6460995?fr=aladdin)图中一个节点的引用，返回该图的[**深拷贝**](https://baike.baidu.com/item/%E6%B7%B1%E6%8B%B7%E8%B4%9D/22785317?fr=aladdin)（克隆）。图中的每个节点都包含它的值 `val`（`Int`） 和其邻居的列表（`list[Node]`）。
>
> **提示：**
>
> 1. 节点数介于 1 到 100 之间。
>
> 2. 无向图是一个简单图，这意味着图中没有重复的边，也没有自环。
> 3. 由于图是无向的，如果节点 p 是节点 q 的邻居，那么节点 q 也必须是节点 p 的邻居。
> 4. 必须将给定节点的拷贝作为对克隆图的引用返回。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/clone-graph
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

深度优先搜索迭代实现。

1. 定义遍历原图的栈`olds`和集合`oldst`
2. 定义已拷贝节点和原图节点的映射`created<old,new>`
3. 对原图进行遍历：
   1. 访问当前节点`oldCur`
   2. 如果没有创建拷贝节点`cur`则创建拷贝节点，否则通过`created`集合获取，定义拷贝节点邻居集合`neighbors`
   3. 访问`oldCur`的所有邻居`oldCur->neighbors`
      1. 如果当前邻居`oldCur->neighbors[i]`已经被创建过，则通过`created[oldCur->neighbors[i]]`获取加入到`neighbors`
      2. 如果当前邻居`oldCur->neighbors[i]`未被创建过，那么创建并加入到`created`映射中和`neighbors`中
   4. 令当前拷贝节点`cur->neighbors=neighbors`
4. 返回原图起始节点的拷贝



- 时间复杂度On（**好像是吧。。考虑邻居怎么说？**），空间On



##### 代码

```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;

    Node() {}

    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if(!node) return NULL;
        set<Node*> oldst;
        stack<Node*> olds;
        map<Node*,Node*> created;
        olds.push(node);
        Node * root=NULL;
        while(!olds.empty()){
            Node *oldCur=olds.top();
            olds.pop();
            if(!oldst.count(oldCur)){
                oldst.insert(oldCur);
                for(int i=0;i<oldCur->neighbors.size();i++){
                    if(oldCur->neighbors[i]) olds.push(oldCur->neighbors[i]);
                }
                olds.push(oldCur);
            }else{//右左根，访问当前节点
                vector<Node*> neighbors;
                for(int i=0;i<oldCur->neighbors.size();i++){
                    if(!created.count(oldCur->neighbors[i])){
                        Node * neighbor = new Node(oldCur->neighbors[i]->val,{});
                        neighbors.push_back(neighbor);
                        created[oldCur->neighbors[i]]=neighbor;
                    }else{
                        neighbors.push_back(created[oldCur->neighbors[i]]);
                    }
                }
                Node * cur;
                if(!created.count(oldCur)){
                    cur=new Node(oldCur->val,neighbors);
                }else{
                    cur=created[oldCur];
                    cur->neighbors=neighbors;
                }
                if(oldCur==node){
                    root=cur;
                }
            }
        }
        return root;
    }
};
```



#### 148. 排序链表

> 在 *O*(*n* log *n*) 时间复杂度和常数级空间复杂度下，对链表进行排序。



##### 思路

使用归并排序。因为是链表所以可以原地归并，不需要使用额外空间（非常数空间）。归并使用迭代方式，因此需要自底向上直接分cut然后merge。

- 时间复杂度Onlogn，空间O1



##### 代码

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    function mergeSort(head){
        let dummyHead=new ListNode(0);
        dummyHead.next=head;
        let p=head;
        let length=0;
        while(p){
            p=p.next;
            length++;
        }
        for(let size=1;size<length;size*=2){
            let cur=dummyHead.next;
            let tail=dummyHead;
            while(cur!==null){
                let left=cur;
                let right=cut(left,size);
                cur=cut(right,size);
                tail.next=merge(left,right);
                while(tail.next!==null) tail=tail.next;
            }
        }
        return dummyHead.next;
    }
    function cut(node,len){
        for(let i=1;i<len;i++){
            if(node===null) return null;
            node=node.next;
        }
        if(node===null) return null;
        let tmp=node.next;
        node.next=null;
        return tmp;
    }
    function merge(l1,l2){
        let dummyHead=new ListNode(0);
        let p=dummyHead;
        while(l1!==null&&l2!==null){
            if(l1.val<l2.val){
                p.next=l1;
                p=l1;
                l1=l1.next;
            }else{
                p.next=l2;
                p=l2;
                l2=l2.next;
            }
        }
        p.next=l1===null?l2:l1;
        return dummyHead.next;
    }
    
    return mergeSort(head);
};
```





#### 151. 翻转字符串里的单词

> 给定一个字符串，逐个翻转字符串中的每个单词。
>
>  说明：
>
> 无空格字符构成一个单词。
> 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
> 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/reverse-words-in-a-string
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

整体思路是首先翻转所有字符，然后再按单词翻转一次，得到答案。注意去除空格。

- 时间复杂度On（不考虑string erase造成的浪费），空间复杂度O1

##### 代码

```c++
class Solution {
public:
    string reverseWords(string s) {
        //reverse all chars
        reverse(s.begin(),s.end());
        //remove space at start&end
        while(s[0]==' ') s.erase(0,1);
        while(s[s.size()-1]==' ') s.erase(s.size()-1,1);
        //reverse all word in turn
        int i=0,j=0;
        while(i<s.size()){
            while(j<s.size()&&s[j]!=' ') j++;
            //remove extra space
            if(s[j]==' '){
                int k=j+1;
                while(k<s.size()&&s[k]==' ') s.erase(k,1);
            }
            int r=j-1;
            //cout<<i<<r<<endl;
            while(i<r){
                char tmp=s[i];
                s[i]=s[r];
                s[r]=tmp;
                i++;
                r--;
            }
            i=j+1;
            j=i;
        }
        return s;
        
        
    }
};
```



#### 230. 二叉搜索树中第K小的元素

> 给定一个二叉搜索树，编写一个函数 `kthSmallest` 来查找其中第 **k** 个最小的元素。

##### 思路

BST中序遍历有序，加个计数器即可。

- 时间复杂度On，空间On

进阶：二叉搜索树可以动态插入，即有数据流流入，可以使用大根堆，始终保证大根堆里的K个元素始终是最小的K个元素即可，堆顶就是第K小的。

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let st=new Set();
    let s=[];
    if(root===null) return -1;
    s.push(root);
    let count=0;
    while(s.length!==0){
        let cur=s.pop();
        if(!st.has(cur)){
            st.add(cur);
            if(cur.right!==null) s.push(cur.right);
            s.push(cur);
            if(cur.left!==null) s.push(cur.left);
        }else{
            count++;
            if(count===k) return cur.val;
        }
    }
    return -1;
};
```



#### 240. 搜索二维矩阵 II

> 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
>
> 每行的元素从左到右升序排列。
> 每列的元素从上到下升序排列。
> **示例**:
>
> 现有矩阵 matrix 如下：
>
> ```
> [
>   [1,   4,  7, 11, 15],
>   [2,   5,  8, 12, 19],
>   [3,   6,  9, 16, 22],
>   [10, 13, 14, 17, 24],
>   [18, 21, 23, 26, 30]
> ]
> ```
>
>
> 给定 target = 5，返回 true。
>
> 给定 target = 20，返回 false。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/search-a-2d-matrix-ii
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

从右上向左下搜，如果当前值比目标值大那一定在下面的行中，如果比目标值小那么一定在左边的列中。

- 时间复杂度O(m+n)，空间O1

##### 代码

```javascript
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if(!matrix||matrix.length===0) return false;
    let i=0,j=matrix[0].length-1;
    while(i<matrix.length&&j>=0&&matrix[i][j]!=target){
        if(matrix[i][j]>target) j--;
        else i++;
    }
    return i<matrix.length&&j>=0;
};
```





#### 429. N叉树的层序遍历

> 给定一个 N 叉树，返回其节点值的*层序遍历*。 (即从左到右，逐层遍历)。

##### 思路

和二叉树层次遍历类似，BFS，使用队列。

- 时间复杂度On，空间On

##### 代码

```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
public:
    vector<vector<int>> levelOrder(Node* root) {
        vector<vector<int>> result;
        if(!root) return result;
        queue<Node*> q;
        q.push(root);
        while(!q.empty()){
            int size=q.size();
            vector<int> row;
            for(int i=0;i<size;i++){
                Node* cur=q.front();
                row.push_back(cur->val);
                q.pop();
                for(int j=0;j<cur->children.size();j++){
                    if(cur->children[j]){
                        q.push(cur->children[j]);
                    }
                }
            }
            result.push_back(row);
        }
        return result;
    }
};
```





#### 450. 删除二叉搜索树中的节点

> 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
>
> 一般来说，删除节点可分为两个步骤：
>
> 首先找到需要删除的节点；
> 如果找到了，删除它。
> **说明**： 要求算法时间复杂度为 O(h)，h 为树的高度。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/delete-node-in-a-bst
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

1. 如果空树则直接返回根
2. 查找待删除节点，如果没有则直接返回根
3. 如果找到了，（查找时记录父亲节点`pre`和当前节点是父亲的左孩子还是右孩子（`left`），找到时`key==cur->val`）
   1. 如果没有孩子，直接删除：`pre->child=NULL `（删除如果是根节点单独处理）
   2. 如果有一个孩子，则令`pre->child=cur->child`（删除如果是根节点单独处理）
   3. 如果两个孩子，则替换`cur->val`和`successor->val`，然后使用步骤1和步骤2来删除`successor`节点（该节点不可能有两个孩子，因为`cur`的中序遍历的后续节点是在右子树上的最左下角）

- 时间复杂度Oh，空间O1

##### 代码

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
    TreeNode* deleteNode(TreeNode* root, int key) {
        if(!root) return root;
        TreeNode*cur=root;
        TreeNode*pre=NULL;
        bool left=false;
        while(cur&&cur->val!=key){
            pre=cur;
            if(cur->val>key){
                cur=cur->left;
                left=true;
            }
            else{
                cur=cur->right;
                left=false;
            }
        }
        
        if(!cur) return root;//not found
        if(cur->left&&cur->right){//case 3:two child
            //if two child,exchange from the successor and delete
            pre=cur;
            TreeNode * tmp=cur->right;
            left=false;
            while(tmp->left){
                left=true;
                pre=tmp;
                tmp=tmp->left;
            }
            cur->val=tmp->val;
            cur=tmp;
        }
        
        if(cur->left||cur->right){//case 2:one child
            if(pre==NULL) return cur->left?cur->left:cur->right;//delete root
            //if one child,delete and move child to the node
            (left?pre->left:pre->right)=(cur->left?cur->left:cur->right);
            return root;
            
        }else{//case 1:no child
            if(pre==NULL) return NULL;//delete root;
            //if no child,delete directly
            (left?pre->left:pre->right)=NULL;
            return root;
        }
        
    }
};
```





#### 494. 目标和

> 给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。
>
> 返回可以使最终数组和为目标数 S 的所有添加符号的方法数。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/target-sum
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

深度优先搜索递归实现。之前用迭代实现参数的保存太麻烦了，剪不断理还乱。递归实现思路清晰。当深度到达最深处时判断当前是否满足条件，满足条件总数加一。

- 时间复杂度O($2^n​$)，空间On（函数栈到最深层会回溯销毁栈帧）

##### 代码

```c++
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int S) {
        return ways(nums,S,0);
    }
    
    int ways(vector<int>& nums,long s,int i){
        if(i>=nums.size()){
            return s==0;
        }
        return ways(nums,s-nums[i],i+1)+ways(nums,s+nums[i],i+1);
    }
    
};
```





#### 498. 对角线遍历

> 二维数组对角线遍历。
>
> ![img](pics/diagonal_traverse.png)



##### 思路

> x+y=b(b=0,1,2,3)

##### 代码

```c++
class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& matrix) {
        //x+y=b(b=0,1,2)
        vector<int> result;
        if(matrix.size()==0) return result;
        int M=matrix.size();
        int N=matrix[0].size();
        int max_len=M>N?M:N;
        int flag=0;//0->up,1->down
        for(int b=0;b<=2*max_len-2;b++){
            if(!flag){
                int y=b;
                while(y>=M) y--;
                for(;y>=0;y--){
                    if(b-y>=N) continue;
                    result.push_back(matrix[y][b-y]);
                }
                
            }else{
                int x=b;
                while(x>=N) x--;
                for(;x>=0;x--){
                    if(b-x>=M) continue;
                    result.push_back(matrix[b-x][x]);
                }
            }
            flag=!flag;
        }
        return result;
    }
};
```



#### 513. 找树左下角的值

> 给定一个二叉树，在树的最后一行找到最左边的值。

##### 思路

二叉树的层次遍历，即BFS，使用队列，每次遍历更新结果值为最新一行的第一个元素。

- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let q=[];
    q.push(root);
    let result=root.val;
    while(q.length!==0){
        let size=q.length;
        for(let i=0;i<size;i++){
            let cur=q.shift();
            if(i===0) result=cur.val;
            if(cur.left!==null) q.push(cur.left);
            if(cur.right!==null) q.push(cur.right);
        }
    }
    return result;
};
```





#### 713. 乘积小于K的子数组

> 给定一个正整数数组 nums。
>
> 找出该数组内乘积小于 k 的连续的子数组的个数。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/subarray-product-less-than-k
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

使用双指针，每次增加right，乘积乘上right，调整left使得当前prod满足条件，则当前的count应该增加`right-left+1`，因为left到right范围内不包含right的子数组已经在前面的right中考虑过了。

- 时间On，空间O1

##### 代码

```c++
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if(k<=1) return 0;
        int count=0;
        int prod=1,left=0,right=0;
        for(;right<nums.size();right++){
            prod*=nums[right];
            while(prod>=k) prod/=nums[left++];
            count+=right-left+1;
        }
        return count;
    }
};
```



##### 695. 岛屿的最大面积

> 给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地) 构成的组合。你可以假设二维矩阵的四个边缘都被水包围着。
>
> 找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为0。)
>
> **示例 1**:
>
> ```
> [[0,0,1,0,0,0,0,1,0,0,0,0,0],
>  [0,0,0,0,0,0,0,1,1,1,0,0,0],
>  [0,1,1,0,1,0,0,0,0,0,0,0,0],
>  [0,1,0,0,1,1,0,0,1,0,1,0,0],
>  [0,1,0,0,1,1,0,0,1,1,1,0,0],
>  [0,0,0,0,0,0,0,0,0,0,1,0,0],
>  [0,0,0,0,0,0,0,1,1,1,0,0,0],
>  [0,0,0,0,0,0,0,1,1,0,0,0,0]]
> ```
>
>
> 对于上面这个给定矩阵应返回 6。注意答案不应该是11，因为岛屿只能包含水平或垂直的四个方向的‘1’。
>
> **示例 2**:
>
> ```
> [[0,0,0,0,0,0,0,0]]
> ```
>
>
> 对于上面这个给定的矩阵, 返回 0。
>
> **注意:** 给定的矩阵grid 的长度和宽度都不超过 50。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/max-area-of-island
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

深度优先搜索。每次搜索到一个1前先把count置为0，然后统计，更新max。

- 时间复杂度Omn，空间Omn

##### 代码

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let max=0;
    let m=grid.length,n=grid[0].length;
    let count;
    function dfs(i,j){
        if(i<0||j<0||i>=m||j>=n) return;
        if(grid[i][j]===1){
            count++;
            grid[i][j]=0;
        }else{
            return;
        }
        if(i+1<m) dfs(i+1,j);
        if(i-1>=0) dfs(i-1,j);
        if(j+1<n) dfs(i,j+1);
        if(j-1>=0) dfs(i,j-1);
    }
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            if(grid[i][j]===0) continue;
            count=0;
            dfs(i,j);
            max=count>max?count:max;
        }
    }
    return max;
};
```









#### 912. 排序数组

>  给定一个整数数组 `nums`，将该数组升序排列。
>
>
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/sort-an-array
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



多种排序一一尝试。



##### 插入排序

> 类似于摸扑克牌后的排序。每次摸到扑克牌，手中的扑克是有序的，需要将新扑克插入到适当的位置。

###### 特点

- 对于部分有序数组更快
- 对于数组元素较少时排序较快
- 空间复杂度O(1)，时间复杂度O(n^2)
- 稳定排序

###### 代码

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



##### 朴素希尔排序

> 插入排序的升级版。源于对部分有序的数组进行插入排序会比较快。



###### 特点

- 空间复杂度O(1)，最差时间复杂度O(n^2)（甚至比插入还蛮，分组都是有序的，一组时进行插入排序，不如不分组）
- **非朴素希尔排序（增量选择使用其他策略，不是简单地折半）时间复杂度为O(n^(3/2)) 或 O(n^(4/3))**

###### 算法

思路：将原始数组进行分组，每个组内进行插入排序。
分组思路：选取跨度，首先跨度是`length/2`，分成`length/2`个组，各组排好序后，跨度减半`length/4`，这时共有`length/4`个组，继续迭代，直到最后剩余一个组**排序后**结束。



###### 代码

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



##### 选择排序

> 选择未排序元素中最小（或最大）的元素，放到已排好序的末尾

###### 特点

- 空间复杂度O(1)，时间复杂度O(n^2)
- 不稳定排序



###### 代码

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



##### 简单冒泡排序

> 像冒泡一样排序。

###### 特点

- 空间复杂度O(1)，时间复杂度O(n^2)
- 稳定排序

###### 代码

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



##### 优化冒泡排序

###### 第一步优化

> 若冒泡过程中数组已经有序，则无需执行后续操作了

####### 思路

若一轮冒泡中没有交换，那说明已经有序了。则添加标志位即可判断此情况。

####### 代码

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



###### 第二步优化

> 已经冒泡结束的有序部分长度，可能小于有序的部分，此时做了无用比较，如下图，4-8已经有序了，8是已经冒泡的部分，下一轮冒泡4-7还得比较，浪费了资源

![img](pics/640.webp)

####### 思路

记录一轮冒泡中最后交换的位置，这个位置就是有序的边界。



####### 代码

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



##### 小范围或双射——计数排序

> 针对数值范围较小的数组，或者数组数值可以一一对应映射到较小范围的数组，可以采用技术排序

###### 特点

- 局限性较强，只适用于数值小范围或双射小范围的数组
- 时间复杂度和空间复杂度都为O(n)

###### 思路

利用有限范围数组进行计数，初始化为0。每遇见一个元素X，对应映射下标Y数组元素计数加一；最后下标Y映射为原来的数值X输出。

###### 代码

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



##### 桶排序

> 类似计数排序。取不同的桶，每个桶放入同范围的数，桶内的元素自动排序。

###### 特点

- 时间复杂度O(n)，空间复杂度O(n+m)，m是桶的个数

###### 代码

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




##### 归并排序

> 顾名思义，先递归，后合并。通过二分递归至每个子数组只有一个元素，然后每两个进行合并成一个较大数组，然后回溯合并较大数组成更大数组，循环往复，直到结束

###### 特点

- 稳定排序
- 空间复杂度O(n)，时间复杂度O(nlogn)
- 类似于二叉树的层次遍历（从下向上）

###### 算法

- `递归`

  1. `给定数组边界：left、right`
  2. `中间值mid=left+(right-left)/2`
  3. `递归左边[left,mid]`
  4. `递归右边[mid+1,right]`
  5. `合并[left,right]`

- `合并`

  > 即合并[left,mid]和[mid+1,right]两个有序数组

###### 代码

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



##### 快速排序

> 分治策略。冒泡的升级版，一堆数据一起冒泡，基准值当水面。

###### 特征

- 时间复杂度O(nlogn)，最差时间复杂度O(n^2)
- 不稳定排序

###### 算法

1. `选基准值pivot`
2. `大于pivot的放右边，小于等于的放左边`
3. `左边和右边分治迭代`

###### 代码

####### 递归版本

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



####### 迭代版本

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





##### 堆排序

> 堆是完全二叉树，可直接用数组来存。堆排序基于堆。

###### 特点

- 不稳定
- 空间复杂度O(1)，时间复杂度O(nlogn)

###### 算法

1. `构建堆`
2. `替换堆顶和末尾元素，末尾部分已有序`
3. `长度减一`
4. `调整，继续执行2，直到全部有序`

###### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {

    function ajust(nums,parent,len){
        let tmp=nums[parent];
        let child=2*parent+1;
        while(child<len){
            if(child+1<len&&nums[child+1]>nums[child]) child++;
            if(tmp>=nums[child]) break;
            nums[parent]=nums[child];
            parent=child;
            child=2*parent+1;
        }
        nums[parent]=tmp;
    }
    
    for(let i=parseInt((nums.length-2)/2);i>=0;i--){
        ajust(nums,i,nums.length);
    }

    for(let i=nums.length-1;i>0;i--){
        let tmp=nums[i];
        nums[i]=nums[0];
        nums[0]=tmp;
        ajust(nums,0,i);
    }
    return nums;

};
```



#### 5296. 两棵二叉搜索树中的所有元素

> 给你 root1 和 root2 这两棵二叉搜索树。
>
> 请你返回一个列表，其中包含 两棵树 中的所有整数并按 升序 排序。.
>
>  
>
> **示例 1：**
>
> ![img](pics/q2-e1.png)
>
> ```
> 输入：root1 = [2,1,4], root2 = [1,0,3]
> 输出：[0,1,1,2,3,4]
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/all-elements-in-two-binary-search-trees
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





##### 思路

二叉搜索树中序遍历有序，假设得到有序数组后就类似于合并两个有序数组，这儿使用一个数组暂存第一棵树的遍历结果，第二棵树遍历同时进行构建结果。

- 时间复杂度O(M+N)，空间O(M+N)

##### 代码

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function(root1, root2) {
    let tmp=[];
    let s=[];
    let st=new Set();
    if(root1) s.push(root1);
    while(s.length!==0){
        let cur=s.pop();
        if(!st.has(cur)){
            st.add(cur);
            if(cur.right) s.push(cur.right);
            s.push(cur);
            if(cur.left) s.push(cur.left);
        }else{
            tmp.push(cur.val);
        }
    }
    let result=[];
    if(root2) s.push(root2);
    while(s.length!==0){
        let cur=s.pop();
        if(!st.has(cur)){
            st.add(cur);
            if(cur.right) s.push(cur.right);
            s.push(cur);
            if(cur.left) s.push(cur.left);
        }else{
            while(tmp.length>0&&tmp[0]<=cur.val) result.push(tmp.shift());
            result.push(cur.val);
        }
    }
    for(let i=0;i<tmp.length;i++) result.push(tmp[i]);
    return result;
};
```



### 困难



#### 10. 正则表达式匹配

> 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
>
> ```
> '.' 匹配任意单个字符
> '*' 匹配零个或多个前面的那一个元素
> ```
>
>
> 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
>
> **说明:**
>
> - s 可能为空，且只包含从 a-z 的小写字母。
>
> - p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/regular-expression-matching
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

##### 思路

tricky，利用JavaScript正则表达式。

##### 代码

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    return (new RegExp("^"+p+"$")).test(s);
};
```



#### 32. 最长有效括号

> 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
>
> **示例 1:**
>
> ```
> 输入: "(()"
> 输出: 2
> 解释: 最长有效括号子串为 "()"
> ```
>
> **示例 2:**
>
> ```
> 输入: ")()())"
> 输出: 4
> 解释: 最长有效括号子串为 "()()"
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/longest-valid-parentheses
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



##### 思路

利用栈，就像检测括号有效性那样，如果当前右括号匹配栈顶左括号，就将左括号弹栈。只不过这次栈内的元素不仅仅是`()`，另外还添加了当前括号的下标。最终将检测栈内剩余的元素两两相邻的下标之差就是合法括号的长度（注意栈内第一个元素前和最后一个元素后）。结果就是这些差值中的最大值。



- 时间复杂度On，空间On

##### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(str) {
    const m={
        ')':'('
    };
    let s=[];
    for(let i=0;i<str.length;i++){
        if(s.length===0){
            s.push({
                idx:i,
                v:str[i]
            });
            continue;
        }
        if(s[s.length-1].v===m[str[i]]){
            s.pop();
        }else{
            s.push({
                idx:i,
                v:str[i]
            });
        }
    }
    if(s.length===0) return str.length;
    let max=s[0].idx;
    for(let i=1;i<s.length;i++){
        let cur=s[i].idx-s[i-1].idx-1;
        if(cur>max) max=cur;
    }
    return str.length-s[s.length-1].idx-1>max?str.length-s[s.length-1].idx-1:max;
};
```



#### 41. 缺失的第一个正数

> 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。



##### 思路

n个数，没有出现最小的正整数的范围是[1,n+1]。创建一个大小为n的数组用于标记，出现过的标记为1。全部标记完后从小向大找，第一个未被标记的对应值为目标值，如果都已经标记则结果就是n+1



- 时间复杂度On，空间On



##### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    let mark=(new Array(nums.length)).fill(0);
    for(let i=0;i<nums.length;i++){
        if(nums[i]>=1&&nums[i]<=nums.length) mark[nums[i]-1]=1;
    }
    for(let i=0;i<mark.length;i++){
        if(mark[i]===0) return i+1;
    }
    return nums.length+1;
};
```





#### 1250. 检查「好数组」

> 给你一个正整数数组 `nums`，你需要从中任选一些子集，然后将子集中每一个数乘以一个 **任意整数**，并求出他们的和。
>
> 假如该和结果为 `1`，那么原数组就是一个「**好数组**」，则返回 `True`；否则请返回 `False`。
>
> **示例 1：**
>
> ```
> 输入：nums = [12,5,7,23]
> 输出：true
> 解释：挑选数字 5 和 7。
> 5*3 + 7*(-2) = 1
> 
> 
> ```

##### 思路

规律是如果这些数的最大公约数是1，那么就是好数组。规律以后再谈

- 时间复杂度On，空间O1

##### 代码


```c++
class Solution {
public:
    bool isGoodArray(vector<int>& nums) {
        int g=nums[0];
        for(int i=1;i<nums.size();i++){
            g=gcd(g,nums[i]);
        }
        return g==1;
    }
    int gcd(int a,int b){
        int c=a%b;
        while(c!=0){
            a=b;
            b=c;
            c=a%b;
        }
        return b;
    }
};
```

