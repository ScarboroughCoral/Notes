# 语言相关

## 基础

### static

- 已初始化的全局和静态变量数据存在`.data`节中，未初始化或初始化为0的全局和静态变量放入`.bss`节（目标文件不占空间）
- 作用域
  - 静态全局变量对于其他文件不可见
  - 静态局部变量只局部可见

### explicit

> 不够详细，待细化

**除非你想要隐式转换，否则最好用这个声明构造函数。（effective）**

作用于构造函数或转换函数。避免隐式转换。

## Effective

### 导论

#### 一些术语

- 声明（declaration），告诉编译器目标的名字和类型。

```c++
extern int x;

std::size_t numDigits(int number);

class Widget;

template<typename T>
class GraphNode;
```



- 定义（definition），告诉编译器声明目标时所省略的细节。

```c++
int x;//在内存中某个地方放置数据就是定义。
std::size_t numDigits(int number){
    std::size_t digitsSoFar=1;
    whie((number/=10)!=0) digitsSoFar++;
    return digitsSoFar;
}
```



- 初始化，给目标一个初始值。
- 拷贝构造函数（copy constructor），用同类型的对象进行初始化。**pass-by-value传参时经常会调用，用户自定义对象一般来说最好用pass-by-reference-to-const**
- 拷贝赋值运算符（copy assignment operator），拷贝同类型的对象数据

```c++
class Widget{
    public:
    	Widget();
    	Widget(const Widget& rhs);
    	Widget& operator=(const Widget& rhs);
}

Widget w1;//调用默认构造函数
Widget w2(w1);//调用拷贝构造函数
w1=w2;//调用拷贝赋值运算符
Widget w3=w1;//调用拷贝构造函数！！！！！！！！！！！！
```

