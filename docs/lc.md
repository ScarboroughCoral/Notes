# LeetCode 题解

## 算法题

### 简单

#### 13. 罗马数字转整数

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

#### [66. 加一](https://leetcode-cn.com/problems/plus-one/)

> 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
>
> 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
>
> 你可以假设除了整数 0 之外，这个整数不会以零开头。
>
> 示例 1:
>
> 输入: [1,2,3]
> 输出: [1,2,4]
> 解释: 输入数组表示数字 123。
> 示例 2:
>
> 输入: [4,3,2,1]
> 输出: [4,3,2,2]
> 解释: 输入数组表示数字 4321。
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
> 示例 1:
>
> 输入: "A man, a plan, a canal: Panama"
> 输出: true
> 示例 2:
>
> 输入: "race a car"
> 输出: false
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



