# 剑指offer 题解



## 数组中重复的数字

> 在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。
>
> [牛客网](https://www.nowcoder.com/practice/623a5ac0ea5b4e5f95552655361ae0a8?tpId=13&tqId=11203&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking&from=scarboroughcoral)



### 思路

因为数组长度为n，而且元素值刚好是0~n-1的范围，对应数组下标，因此可以利用这么一个特点，将当前元素与以当前元素值为下标的元素进行交换，如果存在重复的值时交换的位置必定存在重复的元素。

- 时间On，空间O1

### 代码

```javascript
function duplicate(numbers, duplication)
{
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False
    for(let i=0;i<numbers.length;i++){
        while(numbers[i]!==i){
            if(numbers[numbers[i]]===numbers[i]){
                duplication[0]=numbers[i];
                return true;
            }
            let tmp=numbers[i];
            numbers[i]=numbers[numbers[i]];
            numbers[tmp]=tmp;
        }
      
    }
    return false;
}
```



## 二维数组中的查找

>  在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
>
> [牛客网](https://www.nowcoder.com/practice/abc3fe2ce8e146608e868a70efebf62e?tpId=13&tqId=11154&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking&from=scarboroughcoral)



### 思路

因为每行从左到右递增，每列从上向下递增，那么如果从右上角开始查找，如果目标值比当前元素值大就一定在下面，目标值比当前值小一定在左边。也就是说：如果目标值比当前元素值大那就向下找，目标值比当前元素之小那就向左查找。

- 时间复杂度O(M+N)，空间O1



### 代码

```javascript
function Find(target, array)
{
    // write code here
    if(array.length===0||array.length===0||array[0].length===0) return false;
    let rl=array.length;
    let cl=array[0].length;
    let i=0,j=cl-1;
    while(array[i][j]!==target){
        if(array[i][j]<target){
            i++;
        }else{
            j--;
        }
        if(i>=rl||j<0) return false;
    }
    return true;
}
```



## 替换空格

> 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
>
> [牛客网](https://www.nowcoder.com/practice/4060ac7e3e404ad1a894ef3e17650423?tpId=13&tqId=11155&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking&from=scarboroughcoral)

### 思路

首先想到可以使用`String.prototype.replace`方法。也可以利用双指针直接操作的方式。

### 代码

- String.prototype.replace

```javascript
function replaceSpace(str)
{
    // write code here
    return str.replace(/\s/g,'%20');
}
```

- 直接操作

```javascript
function replaceSpace(str)
{
    let a=str.split('');
    let spaceCount=a.filter(x=>x==' ').length;
    if(spaceCount===0) return str;
    let l=a.length-1;
    a.push(...(Array(spaceCount*2).fill('')));
    let r=a.length-1;
    while(l>=0){
        if(a[l]!==' '){
            a[r--]=a[l--];
            continue;
        }
        a[r--]='0',a[r--]='2',a[r--]='%';
        l--;
    }
    return a.join('')
}
```



## 树的子结构

> 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）
>
> [牛客网](https://www.nowcoder.com/practice/6e196c44c7004d15b1610b9afca8bd88?tpId=13&tqId=11170&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking&from=scarboroughcoral)

### 思路

递归处理。

- 时间复杂度ONM，空间ON，M和N分别是两棵树节点个数。

### 代码

```javascript
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    function helper(a,b){
        if(!b) return true;
        if(!a) return false;
        if(a.val!==b.val) return false;
        return helper(a.left,b.left)&&helper(a.right,b.right);
    }
    if(!pRoot2||!pRoot1) return false;
    return helper(pRoot1,pRoot2)||HasSubtree(pRoot1.left,pRoot2)||HasSubtree(pRoot1.right,pRoot2)
}
```

## 从尾到头打印链表

> 输入一个链表，按链表从尾到头的顺序返回一个数组。
>
> [牛客网](https://www.nowcoder.com/practice/d0267f7f55b3412ba93bd35cfa8e8035?tpId=13&tqId=11156&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking&from=scarboroughcoral)

### 思路

使用递归。递归基本条件是遍历到最后节点直接返回当前节点的数组（或者遍历到null返回空数组），递推关系是当前结果是将剩余节点先放入然后放入当前节点的数组。

- 时间复杂度On，空间On

### 代码

```javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
    if(!head) return [];
    return [...printListFromTailToHead(head.next),head.val]
}
```

## 面试题07. 重建二叉树

> 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
>
>  例如，给出
>
> 前序遍历 preorder = [3,9,20,15,7]
> 中序遍历 inorder = [9,3,15,20,7]
> 返回如下的二叉树：
>
>     	3
>        / \
>       9  20
>         /  \
>        15   7
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 思路

递归构建。前序遍历数组第一个元素是根节点，然后这个元素在中序遍历中的左侧是左子树，右侧是右子树，当然需要考虑当前子树的左右边界。这样递归的进行就可以了。

- 时间复杂度On，空间On

### 代码

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    let m=new Map();
    inorder.forEach((x,i)=>m.set(x,i));
    function helper(preL,preR,inL){
        if(preL>preR) return null;
        let x=new TreeNode(preorder[preL]);
        let inIdx=m.get(x.val);
        let leftSize=inIdx-inL;
        x.left=helper(preL+1,preL+leftSize,inL);
        x.right=helper(preL+leftSize+1,preR,inL+leftSize+1);
        return x;
    }
    return helper(0,preorder.length-1,0)
};
```

## 面试题11. 旋转数组的最小数字

> 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 思路

二分查找。查找规律。

首先排除旋转数组刚好旋转回未旋转的样子，那么第一个元素一定是最小元素。

l，r分别设为当前查找子数组的左右边界，mid为中间下标，即`mid=l+(r-l)/2`向下取整。如果mid对应数值比r数值要大，那最小值一定存在于mid右侧；如果mid对应数值比r数值要小，那么mid一定在mid以及mid的左侧。如果mid对应数值和r相等，那么没法判断，调整边界r--。

- 时间复杂度Ologn，空间O1

### 代码

```js
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    //is not rotated
    if(numbers[0]<numbers[numbers.length-1]) return numbers[0]
    //is rotated
    let l=0,r=numbers.length-1;
    while(l<r){
        let mid=l+((r-l)/2|0);
        if(numbers[mid]>numbers[r]) l=mid+1;
        else if(numbers[mid]<numbers[r]) r=mid;
        else r--;
    }
    return numbers[l]
};
```



## 面试题57 - II. 和为s的连续正数序列

> 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
>
> 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。
>
>  
>
> 示例 1：
>
> 输入：target = 9
> 输出：[[2,3,4],[4,5]]
> 示例 2：
>
> 输入：target = 15
> 输出：[[1,2,3,4,5],[4,5,6],[7,8]]
>
>
> 限制：
>
> 1 <= target <= 10^5
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 思路

双指针。

阈值是右指针小于$\lceil target\rceil+1$。

每次检测当前序列s和target：

1. 如果`s===target`则加入序列并更新双指针和sum值（左右指针都向右移动，sum值减去左边的旧值加上右边新值）
2. 如果`s>target`则更新双指针和sum值（左指针右移，sum减去左边的旧值）
3. 如果`s<target`则更新双指针和sum值（右指针右移，sum加上右边的新值）

### 代码

```javascript
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let result=[];
    let th=Math.ceil(target/2)+1;
    let i=1,j=2;
    let s=i+j;
    while(j<th){
        if(s===target){
            result.push(Array.from({length:j-i+1},(x,idx)=>idx+i));
            j++;
            s+=j-i;
            i++;
        }else if(s>target){
            s-=i;
            i++;
        }else{
            j++;
            s+=j;
        }

    }
    return result;
};
```

## 面试题59 - II. 队列的最大值

> 请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的时间复杂度都是O(1)。
>
> 若队列为空，pop_front 和 max_value 需要返回 -1
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 思路

在push和pop时更新max值。并不满足题意

- max_value、push_back时间复杂度O1，pop_front时间复杂度On，空间复杂度O1

### 代码

```javascript

var MaxQueue = function() {
    this.q=[];
    this.max=-1;
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
    return this.q.length?this.max:-1;
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
    if(this.max<value) this.max=value;
    this.q.push(value)
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
    if(this.q.length===0) return -1;
    let val=this.q.shift();
    if(val===this.max) this.max=Math.max.apply(null,this.q);
    return val;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */
```

