# CodeWars系列



## 8kyu

### String repeat

> Write a function called `repeatString` which repeats the given String `src` exactly `count` times.
>
> ```javas
> repeatStr(6, "I") // "IIIIII"
> repeatStr(5, "Hello") // "HelloHelloHelloHelloHello"
> ```



#### 思路

首先想到的是`Array`、`Array.prototype.fill`和`Array.prototype.join`方法。但是看别人用的最多的是`String.prototype.repeat(n)`方法。

#### 代码

- Array.prototype.fill

```javascript
function repeatStr (n, s) {
  return Array(n).fill(s).join('');
}
```



- String.prototype.repeat

```javascript
function repeatStr (n, s) {
  return s.repeat(n);
}
```



### Reversed Strings

> Complete the solution so that it reverses the string value passed into it.
>
> ```javascript
> solution('world'); // returns 'dlrow'
> ```



#### 思路

利用`Array.prototype.reverse`，需要先将字符串转换为数组。

#### 代码

```javascript
function solution(str){
  return str.split('').reverse().join('');
}
```



### Keep Hydrated!

> Nathan loves cycling.
>
> Because Nathan knows it is important to stay hydrated, he drinks 0.5 litres of water per hour of cycling.
>
> You get given the time in hours and you need to return the number of litres Nathan will drink, rounded to the smallest value.
>
> For example:
>
> time = 3 ----> litres = 1
>
> time = 6.7---> litres = 3
>
> time = 11.8--> litres = 5

#### 思路

可以使用`parseInt`或者`Math.floor`静态方法进行向下取整，也可以利用逻辑运算隐式转换为整数。

#### 代码

- 逻辑隐式转换

```javascript
function litres(time) {
  return time/2|0;
}
```



- parseInt

```javascript
function litres(time) {
  return parseInt(time*0.5);
}
```



### Square(n) Sum

> Complete the square sum function so that it squares each number passed into it and then sums the results together.
>
> For example, for `[1, 2, 2]` it should return `9` because `1^2 + 2^2 + 2^2 = 9`.

#### 思路

map&reduce

#### 代码

```javascript
function squareSum(numbers){
  return numbers.map(x=>x**2).reduce((s,x)=>s+x,0);
}
```



### Convert a String to a Number!

> Note: This kata is inspired by [Convert a Number to a String!](http://www.codewars.com/kata/convert-a-number-to-a-string/). Try that one too.
>
> ## Description
>
> We need a function that can transform a string into a number. What ways of achieving this do you know?
>
> Note: Don't worry, all inputs will be strings, and every string is a perfectly valid representation of an integral number.
>
> ## Examples
>
> ```javascript
> stringToNumber("1234") == 1234
> stringToNumber("605" ) == 605
> stringToNumber("1405") == 1405
> stringToNumber("-7"  ) == -7
> ```

#### 思路

利用定义的转换函数，或者隐式的ToNumber转换。`parseInt`、`Number`、`+str`、`str|0`等操作。

#### 代码

```javascript
var stringToNumber = function(str){
  // put your code here
  return +str;
}
```



### Count the Monkeys!

> You take your son to the forest to see the monkeys. You know that there are a certain number there (n), but your son is too young to just appreciate the full number, he has to start counting them from 1.
>
> As a good parent, you will sit and count with him. Given the number (n), populate an array with all numbers up to and including that number, but excluding zero.
>
> For example:
>
> ```javascript
> monkeyCount(10) // --> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> monkeyCount(1) // --> [1]
> ```

#### 思路

利用`Array`,`Array.prototype.fill`,`Arrayp.prototype.map`方式生成数组。不过看别人最好的方法应该是使用`Array.from`静态方法因为其中包含了mapFn。

#### 代码

- Array、fill、map

```javascript
function monkeyCount(n) {
// your code here
  return Array(n).fill(0).map((x,i)=>i+1);
}
```

- Array.from

```javascript
function monkeyCount(n) {
// your code here
  return Array.from({length:n},(x,i)=>i+1);
}
```

### Reversed Words

> Complete the solution so that it reverses all of the words within the string passed in.
>
> Example:
>
> ```javascript
> reverseWords("The greatest victory is that which requires no battle")
> // should return "battle no requires which that is victory greatest The"
> ```

#### 思路

按照空格分隔并倒转。

- 时间复杂度On，空间On

#### 代码

```javascript
function reverseWords(str){
  return str.split(' ').reverse().join(' '); // reverse those words
}
```

### If you can't sleep, just count sheep!!

> If you can't sleep, just count sheep!!
>
> ## Task:
>
> Given a non-negative integer, `3` for example, return a string with a murmur: `"1 sheep...2 sheep...3 sheep..."`. Input will always be valid, i.e. no negative integers.

#### 思路

使用`Array.from`静态方法创建数组，提供映射函数，其中使用`Template Literals`，然后使用`Array.prototype.join`方法拼接。

- 时间On，空间On

#### 代码

```javascript
var countSheep = function (num){
  //your code here
  return Array.from({length:num},(x,i)=>`${i+1} sheep...`).join('');
}
```

### Reversed sequence

> Get the number n `(n>0)` to return the reversed sequence from n to 1.
>
> Example : n=5 >> [5,4,3,2,1]

#### 思路

生成数组，提供映射函数。

- 时间On，空间On

```javascript
const reverseSeq = n => {
  return Array.from({length:n},(x,i)=>n-i);
};
```





## 7kyu

### Get the Middle Character

> You are going to be given a word. Your job is to return the middle character of the word. If the word's length is odd, return the middle character. If the word's length is even, return the middle 2 characters.
>
> \#Examples:
>
> ```
> Kata.getMiddle("test") should return "es"
> 
> Kata.getMiddle("testing") should return "t"
> 
> Kata.getMiddle("middle") should return "dd"
> 
> Kata.getMiddle("A") should return "A"
> ```
>
> \#Input
>
> A word (string) of length `0 < str < 1000` (In javascript you may get slightly more than 1000 in some test cases due to an error in the test cases). You do not need to test for this. This is only here to tell you that you do not need to worry about your solution timing out.
>
> \#Output
>
> The middle character(s) of the word represented as a string.

#### 思路

利用`String.prototype.substr`方法。

- 时间O1，空间O1

#### 代码

```javascript
function getMiddle(s)
{
  //Code goes here!
  return s.substr((s.length-1)/2|0,s.length%2?1:2);
}
```

### Isograms

> An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.
>
> ```javascript
> isIsogram("Dermatoglyphics") == true
> isIsogram("aba") == false
> isIsogram("moOse") == false // -- ignore letter case
> ```

#### 思路

使用集合，如果产生的集合大小比原字符串小，则存在重复的。

- 时间On，空间On

#### 代码

```javascript
function isIsogram(str){
  return new Set(str.toLowerCase()).size===str.length;
}
```



## 6kyu

### Find the odd int

> Given an array, find the integer that appears an odd number of times.
>
> There will always be only one integer that appears an odd number of times.

#### 思路

利用异或的交换律，两个相同数异或为0,0与任何数异或等于任何数。

- 时间复杂度On，空间O1

#### 代码

```javascript
function findOdd(A) {
  //happy coding!
  return A.reduce((last,cur)=>last^cur);
}
```

