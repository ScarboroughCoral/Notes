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

