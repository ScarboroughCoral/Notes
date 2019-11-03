# 计算机系统实例之JS



## 33-concept-js

### 0x01 call stack



### 0x05 “= =” vs “= = =” vs typeof

#### reference

-  [*== vs === JavaScript: Double Equals and Coercion*](<https://www.codementor.io/javascript/tutorial/double-equals-and-coercion-in-javascript>)
- [*Checking Types in Javascript*](<http://tobyho.com/2011/01/28/checking-types-in-javascript/>)

#### “= =” 运行机制

![1571807907052](pics/1571807907052.png)

#### 类型检查

1. `typeof`适用于原始类型，但`typeof null==="obect"`。所有引用类型都是object，除了`typeof function==="function"`。

2. `instanceof`适用于所有`native types`，除了原始类型（除了null、undefined不是所有对象的实例，其他数值、字符串、布尔检测对应对象全返回false，eg：`3 instanceof Number // false`）

3. 在一个页面创建iframe，instanceof应用应该用iframeWindow下的判断，eg：

   ```javascript
   var iframe = document.createElement('iframe')
   document.body.appendChild(iframe)
   var iWindow = iframe.contentWindow // get a reference to the window object of the iframe
   iWindow.document.write('<script>var arr = [1, 2, 3]</script>') // create an array var in iframe's window
   iWindow.arr // [1, 2, 3]
   iWindow.arr instanceof Array // false
   iWindow.arr instanceof iWindow.Array // true
   Array === iWindow.Array // false
   
   ```

4. 用属性constructor判断，只能判断被创建的函数，此方法原型链不适用。

5. 检测内置类型（native types）的比较好方法：`Object.prototype.toString.call(xxx)==="[object XXXType]"`，eg：`Object.prototype.toString.call(1)==="[object Number]"`。用户自定义对象将返回`"[object Object]"`。IE存在问题（检测新打开的window内的对象，the following eg）。

   ```javascript
   var pWindow = open("")
   pWindow.document.write('<script>var arr = [1, 2, 3]</script>')
   Object.prototype.toString.call(pWindow.arr) // you get "[object Object]" in IE; "[object Array]" else where.
   ```

6. 检测类型的另一种方法：`Function.prototype.toString.call(x.constructor)`将返回构造函数的源码，利用正则匹配函数名字即为类型。和上面一样IE存在问题（检测新打开的window内的对象会报错应当传入函数而不是object，just likc the last eg）。

### 0x17 原型链和原型继承

> 总结：***没有类，只有对象！***

#### 继承的实现

函数X有个原型对象`prototype`，用X函数创建的对象x有一个对象`__proto__`指向函数X的`prototype`，即`x.__proto__===X.prototype`为true。

假设`Y extends X`：则继承通过：

- **①子类函数Y的`__proto__`指向父类函数X**，
- **②子类函数Y的`prototype`对象里的`__proto__`指向父类函数的`prototype**`

#### 继承后类成员的访问（利用②）

假设有此场景：用某函数Func对象object访问成员属性或方法member。

1. 查看object对象内有没有member成员，如果有则直接访问；没有则下一步
2. 通过object的`__proto__`属性访问创建函数Func的`prototype`属性内有没有member，如果有则直接访问；没有则下一步
3. 通过查看创建函数Func的prototype属性里的`__proto__`来查看更高原型内有无member，往复如此，直到找到，或者到顶层，如果有则访问；没有则undefined(变量) or typeerror(是个函数)

#### 继承后类的静态成员的访问（只能通过函数访问，函数创建的对象无法访问，因为不在链上）（利用①）

假设有此场景：用某函数Func访问静态变量staticMember

1. 查看Func函数下有没有staticMember，如果有则直接访问，否则下一步
2. 通过Func函数下的`__proto__`属性来访问“父类”函数下有没有staticMember，如果有则直接访问，否则下一步
3. 循环往复，直到找到，或者到顶层，有则访问，无则undefined(变量) or typeerror(是个函数)







