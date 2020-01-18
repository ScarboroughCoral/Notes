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

