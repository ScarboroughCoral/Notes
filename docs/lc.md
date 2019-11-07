# LeetCode 题解

## 算法题

### 简单

#### [13. 罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)

> 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
>
> I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
> X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
> C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
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

#### [26. 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

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



#### [67. 二进制求和](https://leetcode-cn.com/problems/add-binary/)

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



#### [66. 加一](https://leetcode-cn.com/problems/plus-one/)

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

#### [125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

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



#### [189. 旋转数组](https://leetcode-cn.com/problems/rotate-array/)

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





#### [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)

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



#### [557. 反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

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



#### [724. 寻找数组的中心索引](https://leetcode-cn.com/problems/find-pivot-index/)

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



#### [747. 至少是其他数字两倍的最大数](https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/)

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





#### [1249. 移除无效的括号](https://leetcode-cn.com/problems/minimum-remove-to-make-valid-parentheses/)

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

### 中等

#### [151. 翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

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



#### [498. 对角线遍历](https://leetcode-cn.com/problems/diagonal-traverse/)

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



### 困难

#### [1250. 检查「好数组」](https://leetcode-cn.com/problems/check-if-it-is-a-good-array/)

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

