---
layout: post
title:  "Effective C++总结"
date:   2025-06-12 23:43:08 +0800
categories: [Lan]
excerpt: 非C++入门；总结自《Effective C++》第3版中文版
tags:
  - C++ 
  - Effective C++ (3th Edition)
  - 
---
<!-- 正如这本书的名字《高效C++》，这本书的目的在于提高C++编程能力，而不是入门C++。如果你刚接触C++，别的书更适合，例如《快速C++》(accelerated C++)。 -->

# <center>一、习惯C++

# <center>accustoming yourself to C++

《Effective C++》的第一部分，理解C++。

<br />
#### 01.视C++为一个语言联邦
#### view C++ as a federation of languages
C++是一个夹杂很多种特性的语言。如果把C++视为一个由4种编程语言组成的联邦，针对每个次语言(sublanguage)，它的各种特性就很清晰易懂了。

C
>区块(block)、语句(statement)、预处理(preprocessor)、内置数据类型(built-in data type)、数组(array)、指针(pointer)等来自C

Object-Oriented C++
>类(class)，封装(encapsulation)，继承(inheritance)，多态(polymorphism)，虚函数(visual function)等

Template C++
> 泛型编程(generic programming)。由此产生了新的编程范型(programming paradigm)，即模板元编程(template metaprogramming, TMP)

STL(standard template library)
>容器(container)，迭代器(iterator)，算法(algorithm)以及函数对象(function object)

对于同一次语言，所遵守的规则和实现高效的方式大致相同，对于不同次语言，所遵守的规则和实现高效的方式各不相同。因此，在编程时，应时刻注意到自己在使用C++的哪一个次语言，然后充分利用这一次语言的特性来实现准确和高效。

<br />
#### 02.尽量用consts,enums 和 inlines替换#defines
#### prefer consts,enums and inlines to #defines

<font color="green">对于单纯常量，最好用const对象或enums替换#define</font>

```C++
#define PI 3.14
```

PI 可能在预处理器 <font color="#dd0000">???</font><br />

一旦用`#defines`定义了宏，就在编译中一直有效(除非被#undef)。这意味着没有提供封装性。

在class编译期需要使用一个常量值时，#define可以定义该常量。另一种做法是把这个常量用枚举表示，即`the enum hack`，其原理是“一个属于枚举类型(enumerated type)的数值可当作`int`使用”。例如如下代码

```C++
class Game
{
private:
  enum { Num = 5 }; // “the enum hack”——令`Num`成为5的一个记号名称
  int score[Num];
};
```

事实上，enum hack是 template metaprogramming 的基础技术。

---
<font color="green">使用 "template inline函数" 代替 "用#define实现宏(macros)"</font>

```C++
#define MAX(a,b) f((a) > (b) ? (a) : (b))
int a = 5, b = 10;
MAX(++a, b);    // a在判断和选择值的过程中各累加一次
MAX(++a, b+10); // a在判断过程中累加一次
```

以上用法的结果是不可预料的。而使用template inline函数可获得宏带来的效率以及可预料的行为和类型安全性(type safety)

```C++
template<typename T>
inline void Max(const T& a, const T& b)
{
  f(a > b ? a : b);
}
```

<br />
#### 03.尽量用const
#### use const whenever possible

```C++
char greeting[] = "hello";
char* p = greeting;             // 指针和数据都不是常量
const char* p = greeting;       // 数据是常量
char* const p = greeting;       // 指针是常量
const char* const p = greeting; // 指针和数据都是常量
```

`const` 在`*`左侧，数据是常量；`const` 在 `*` 右侧，指针是常量。和类型名称的位置无关。<br />

STL的迭代器也有类似用法

```C++
const std::vector<int>::iterator iter = vec.begin(); // iter不能变，所指向的数据可以变
const_iterator std::vector<int>::iterator iter = vec.begin(); // iter指向的数据不能变
```

---
const成员函数
之后的内容已经不明白其作用了，暂时跳过<font color="#dd0000">???</font><br />
两个函数只是常量性(constness)不同，也可以被重载。<br />
bitwise(physical) constness和logical constness。<br />
常量性转除(casting away constness)只能由const_cast完成。<br />
应该避免用const版本调用non-const 版本。<br />
编译器强制实施bitwise constness，但编写程序时应使用“概念上的常量性”(conceptual constness)。 <br />
当const和non-const成员函数有着实质等价的实现时，令non-const版本调用const版本可避免代码重复<br />

<br />
#### 04.确定对象被使用前已初始化
#### make sure that objects are initialized before they're used

构造函数的执行顺序：
>按顺序执行编写的成员初始化 --> 按顺序初始化剩余的成员变量 --> 进入函数体

有两种编写成员初始化的方法：
使用成员初值列完成初始化的代码示例如下：

```C++
Entry::Entry(int a)
: am(a), bm(0) // am,bm 是int型的成员变量
{}
```

另外一种是在声明时初始化，代码示例如下：

```C++
class Entry
{
 public:
  const int a = 10;
};
```

也就是说成员变量在进入构造函数的函数体之前就已经完成初始化，这个初始化是“成员初值列”(member initialization list)。在函数体内的操作是赋值(assignment)而不是初始化。
如果成员变量是const或reference，则一定需要初值，不能被赋值。

初始化次序大致固定：先初始化基类(base class)，再初始化派生类(derived class)；类的成员变量总是以声明次序被初始化。建议 在编写初始化列时 按照声明次序条列成员。

编译单元(translation unit) 是指产出单一目标文件(single object file)的那些源码。基本上它是单一源码文件加上其所含入的头文件(#include files)。

如果某编译单元内的某个non-local static 对象的初始化使用了另一编译单元内的某个 non-local static 对象，它用到的这个对象可能未初始化，因为C++对“定义于不同编译单元内的 non-local static 对象”的初始化顺序无明确定义。但可以使用某些方式确定不同编译单元的的依赖关系和编译顺序，例如使用CMake。<br />

```C++
class Base
{
 public:
  Base& construct()
  {
    static Base base;
  }
}
```

在以上代码中，在成员函数`construct`内声明一个`Base`的 static 对象，并返回一个指向该对象的引用(reference)，然后用户调用这个成员函数，而不直接操作该对象。这是单例(Singleton)模式的一个常见实现手法。

这种方式在多线程系统种带有不确定性，其中一个解决办法是，在程序的单线程启动阶段(single-threaded startup portion)手动调用 reference-returning 函数。
<br /> <br />

---

<br />

# <center>二、构造、析构和赋值运算

# <center>constructor,deconstructor, assignment operators

《Effective C++》的第二部分。

<br />
#### 05.了解C++默认调用了哪些函数
#### what functions C++ silently writes and calls
如果自己没有声明，编译器会声明一个 default 构造函数、 copy 构造函数、 copy assignment 操作符和一个析构函数，这些函数都是 public 且 inline。编译器给出的析构函数是一个non-virtual 函数。

对于内含 reference 成员”的 class ，直接赋值意味着 reference 改指向不同对象，这是C++不允许的，无法通过编译。因此，如果在“内含 reference 成员”的 class 内支持赋值操作(assignment)，必须自己定义 copy assignment。

<br />
#### 06.当不适用编译器生成的函数时，应明确写出
#### explicitly disallow the use of compiler-generated functions you do not want

如果不希望类具有某一功能，比如禁用 copy 构造函数和 copy assignment 操作符。因为编译器产出的函数都是 public，将 copy 构造函数和 copy assignment 操作符声明为 private可以防止编译器生成相关函数。如果这些函数仅声明没有实现，当用户试图复制改对象时，编译器会报相关函数未定义的错误。如果在成员函数和友元函数中复制，那么连接器会报出错误。这样就禁用了类的复制功能。

在基类中把 copy 构造函数和 copy assignment 操作符声明为 private ，那么即使在派生类的成员函数和友元函数中复制，编译器也会报错。这种方式提前了错误发现的时间。

<br />
#### 07.为多态基类声明虚析构函数
#### declare destructor virtual in polymorphic base classes

当派生类经由一个基类指针被删除，而该基类带着一个非虚析构函数，实际执行时通常是派生类的成分没有销毁。如果基类为虚析构函数，那么删除派生类的对象时就会调用派生类的析构函数。

任何一个类只要带有虚函数，很可能会用作基类，那么就应该有一个虚析构函数。<br />

为了在运行期决定哪一个虚函数被调用，对象必须存储相关的信息，该信息由 vptr(virtual table pointer) 指针指出。vptr 指向一个由函数指针构成的数组，称为 虚表(virtual table, vtbl)；每个有虚函数的类都有一个虚表。这意味着，有虚函数的对象必须占用更多的空间存储指针。<br />

一个类如果不会用作基类，那么使用虚函数会增加对象的存储空间却毫无用处。而该对象也不再和其它语言(如 C)内的相同声明具有相同结构，因此不再具有移植性。

标准string不含任何虚函数，含有非虚析构函数。因此不能继承。

<br />
#### 08.为多态基类声明虚析构函数
#### prevent exception from leaving destructors

```C++
~Entry()
{
  ... // (1)
  if(maybe())
  {
    throw(); // 抛出异常
  }
  ... // (2)
}
```

观察以上析构函数，如果抛出异常，意味着 (2) 的程序将不会再执行。如果(2)中执行的是一些成员的析构，那就意味着本该再(2)中析构的成员没有析构，从而产生了内存泄露。

有两个办法避免这一问题。<br />

1.在析构中出现异常强制结束程序

```C++
~Entry()
{
  ... // (1)
  if(maybe())
  {
    std::abort(); // 强制结束程序
  }
  ... // (2)
}
```

2.吞下异常

```C++
~Entry()
{
  ... // (1)
  try {}
  catch(...)
  {
    // 制作转运记录，记下该异常
  }
  ... // (2)
}
```

另外的办法，则是把这段可能出现异常的程序移出析构函数，在执行析构函数前单独执行，由客户对该异常作出反应。

<br />
#### 09.不要再构造和析构过程中调用虚函数
#### never call virtual functions during construction or destruction
```C++
class Base
{
  public:
  Base(std::string sensorID)
  {
    readParam(sensorID);
  }
  virtual readParam(std::string sensorID)
  {
    ... // 读取默认参数
  }
}
class Derived: public Base
{
  public:
  Derived(std::string lidarID)
  {
    ...
  }
  readParam(std::string lidarID)
  {
    ... // 读取雷达参数
  }
}
```
在这个例子中，基类的虚函数是读取默认传感器参数的，派生类重写的函数是读取激光雷达的参数。构造派生类对象时，先调用基类的构造函数，然后再调用派生类的构造函数。基类构造函数中使用了虚函数，调用的是基类自己的虚函数，而不是派生类中重写后的函数。而我本想使用的是重写后的函数，因此这种写法是有问题的。对于析构函数也是如此。

这种情景的特点是，基类成分在初始化的过程中需要用到派生类的属性。那么一种解决办法就是把该属性作为参数传入基类的构造函数。看以下代码，利用辅助函数把派生类对应的传感器类型传入基类的构造函数。我在此处省去了在基类中如何修改的代码。

```C++
class Derived: public Base
{
  public:
  Derived(std::string lidarID)
    : Base(sensorType(lidarID)) // sensorType(lidarID) 为一个可以返回传感器类型的函数
  {
    ...
  }
  readParam(std::string lidarID)
  {
    ... // 读取雷达参数
  }
}
```

<br />

#### 10.令 operator= 返回一个指向 *this 的引用

#### have assignment operators return a reference to *this

这一条包括 `operator+=` `operator-=` `operator*=`等等。虽然这一条并不具有强制性，但考虑到内置类型和标准程序库提供的类型如 string vector complex 等都遵守这一做法，还是尽量遵守比较好。

<br />

#### 11.在 operator= 中处理“自我赋值”

#### handle assignment to self in operator=

```C++
*px = *py; // 潜在的自我赋值
```

别名(aliasing): 有一个以上的方法指向某个对象。当代码中操作 pointers 或 reference 时，就有可能出现不同变量名指向同一个对象。防止这种情况的传统做法是在 operator= 的函数中先进行“证同测试”(identity test)。

```C++
Widget& Widget::operator=(const Widget& rhs)
{
  if(this == &rhs) // 证同测试
  {
    return *this; 
  }
  ... // 其它程序
}
```

<br />

#### 12.复制对象时要复制每一个成分

#### copy all parts of an object

手动写的复制函数和 operator= 存在忘记复制某个成员的可能，而且编译器不会提示此类错误。
考虑到派生类不能访问基类中的 private 成员，因此为派生类写复制函数时，应该让派生类的复制函数调用基类中的相应函数。

复制构造函数和 复制赋值(copy assignment)操作符 之间不应该有调用关系。如果两者有相同的代码块，应该用这个相同的代码块建立新的成员函数并调用。
<br /> <br />

---

<br />

# <center>三、资源管理

# <center>resource management

常见的资源有内存、文件描述器(file descriptors)、互斥锁(mutex locks)、图形界面中的字型和笔刷、数据库连接、网络 sockets。管理资源的一个重点在于，当不再需要某个资源时，确保该资源被释放。

<br />

#### 13.用对象管理资源

#### use objects to management resources

“以对象管理资源” 也成为 “资源获取即初始化” (resource acquisition is initialization, RAII)。在获得资源后就立即放入对象中，可能时初始化某个对象或是为某个对象赋值。这样，对应的资源会在析构函数中释放，从而防止资源泄漏。<br />

两个常用的 RAII 类是 auto_ptrs 和 shared_ptr。<br />

auto_ptrs 是个 “ 类指针(pointer-like)对象”,其析构函数自动对指向的对象调用 delete。如果通过 复制构造函数 或 复制赋值(copy assignment)操作符 复制它，它会变为 null。 而复制得到的指针将取得资源的唯一拥有权。<br />

shared_ptr 是一种“引用计数型智能指针”(reference-counting smart pointer, RCSP)，能计算共有多少对象指向某个资源，并在无人指向它时自动删除该资源。但它无法打破`环状引用`(cycles of reference)。

<br />

#### 14.注意在资源管理类中复制行为

#### care about copying behavior in resource-managing classes

为保证不会忘记把一个锁住的 Mutex 解锁，可以建立一个 class 用来管理锁。

```C++
class Lock
{
public:
  explicit Lock(Mutex* pm)
    : mutexPtr(pm)
  {
    lock(mutexPtr); // 获得资源
  }
  ~Lock() 
  {
    unlock(mutexPtr); // 释放资源
  }
private:
  Mutex *mutexPtr;
};
```

当运行如下复制代码时，可能会导致未知的风险。

```C++
Mutex m;
Lock m1(&m); // 锁定 m 
Lock m2(m1); // 
```

此时有两种选择。<br />

**禁止复制**：例如把复制操作声明为 private。<br />

**引用计数法(reference-count)**：通常使用 share_ptr 来实现这一特性。<br />
当用于 mutex 时，在引用次数为 0 时，我们希望的动作是解除锁定，而 share_ptr 的默认动作是删除 mutex.
此时，可以为 share_ptr 的对象指定删除器(deleter)，当该对象的引用次数为 0 时调用该删除器。示例代码如下：

```C++
class Lock
{
public:
  explicit Lock(Mutex* pm)
    : mutexPtr(pm, unlock) // 把 unlock 作为删除器
  {
    lock(mutexPtr.get()); // 获得资源
  }
private:
  std::share_ptr<Mutex>  mutexPtr;
};
```

**复制底部资源**：复制资源时，不论指针还是指针所指的内容都会被制作出一个复件，即 `深拷贝`(deep copying).<br />

**转移底部资源的所有权**：如果要求 指向该内容的 永远只有一个对象，可以用 auto_ptrs 实现。

<br />

#### 15.在资源管理类中提供对原始资源的访问

#### provide access to raw resource in resource-managing classes

APIs往往要求访问原始资源(raw resources)
考虑以下这个用于字体的 RAII class

```C++
FontHandle getFont(); 
void releaseFont(FontHandle fh);
class Font // RAII 类
{
 public:
  explict Font(FontHandle fh) // 获得资源
    : f(fh) // pass-by-value
  { }
  ~Font() { releaseFont(f); } // 释放资源
  FontHandle get() const { return f; }      // 显式转换函数：安全
  operator FontHandle() const { return f; } // 隐式转换函数：方便
 private:
  FontHandle f; // 原始字体资源
}

Font f1;
FontHandle f2 = f1; // 如果定义了隐式转换函数，会把f1的FontHandle复制给f2。此时f1和f2拥有同一个FontHandle。如果f1销毁，f2就会成为dangle
```

#### 16.成对使用new和delete时要采取相同形式

#### use the same form in corresponding uses of new and delete

```C++
std::string* str1 = new std::string;
std::string* str2 = new std::string[100];
delete str1; // 删除一个对象
delete [] str2; // 删除一个由对象组成的数组
```

new时使用了`[]`，delete也应使用`[]`。反之亦然。

#### 17.以独立语句将newed对象置入智能指针

#### store newed objects in smart pointers in standalone statements

```C++
int priority();
void process(std::tr1::shared_ptr<Widget> pw, int priority);
```

在调用`process`之前，编译器必须完成“调用priority”(1)、执行“new Widget”(2)、“调用tr1::shared_ptr构造函数”(3)，执行顺序不是固定的。按照213的顺序，如果1产生异常，会导致`new Widget`返回的指针丢失，从而引起资源泄漏的风险。

对于跨越语句的的操作，编译器不能重排执行顺序；在同一个语句内，则可能为多项操作重新排序。应改成以下形式以防止可能的指针丢失。

```C++
int priority();
(std::tr1::shared_ptr<Widget> pw（new Widget)；
void process(std::tr1::shared_ptr<Widget> pw, int priority);
```

<br />

# <center>四、设计与声明

# <center>designs and declarations

#### 18.让接口容易正确使用，不易误用

#### make interfaces easy to use and hard to use incorrectly

理论上，如果使用某个接口没有获得预期的行为，则该代码不应通过编译；如果通过编译，就应该表现出想要的行为。任何接口如果要求使用时必须记得某些事情，就可能会导致错误使用。

为防止忘记delete指针，可以在创建时使用`factory`返回一个指向该对象的智能指针shared_ptr。

对于`cross-DLL problem`问题，对象可能在其中一个DLL中new，在另一个DLL中delete。使用智能指针shared_ptr也能避免这类资源泄漏。

#### 19.设计类犹如设计类型

#### treat class design as type design

设计每个类时都应考虑以下几个问题：

* 如何销毁和创建
* 初始化和赋值
* 用copy构造函数定义值传递(pass-by-value)
* 成员变量的合法值，例如月份不能为13
* 继承关系图(inheritance graph)
* 是否允许隐式转换以及隐式转换的类型
* 是否需要重载操作符及如何重载
* 访问限制，`public`，`private`，`protected`
* 未声明接口(undeclared interface)
* 一般化。是否应该定义为类模板(class template)

#### 20.尽量用常量引用传递代替值传递

#### prefer pass-by-reference-to-const to pass-by-class

* 因为值传递过程需要构造出新的对象，因此通常比常量引用传递更费时。
* 派生类的对象在值传递过程中可能会被视为基类的对象，从而导致派生类特有的部分被删除。即切割问题(slicing problem)。

因为引用往往由指针实现，因此传递引用实际上传递的是指针。对于int等内置类型和小的自定义类型来说，值传递的效率更高。即便是小的自定义类型，考虑到将来可能会变得很大，因此仍然建议引用传递。

对于STL的迭代器和函数对象，值传递往往更好。

#### 21.必须返回对象时，不要尝试返回引用

#### don't try to return a reference when you must return an object

返回局部变量时，应该返回值而不是引用或指针。

#### 22.将成员变量声明为private

#### declare data members private

将成员变量声明为private，然后通过函数访问成员变量。这样可以更精确地控制对成员变量的处理。如果更改类中代码，只要保证该函数(接口)的用法不变，就不需要更改使用该接口的代码，提高了可维护性。

public意味着不封装，即成员函数和成员变量可能被使用。如果更改，可能意味着类外调用这些函数和变量的代码都需要更改、测试、写文档、编译，这个工作量可能很大。protected在封装性上几乎和public相同。

#### 23.尽量用非成员、非友元代替成员函数

#### prefer non-member non-friend functions to member functions

封装即不可见。对该成员不可见的代码越多，改变的弹性越大。当成员变量为public时，可以有无限的函数访问该成员，该成员就毫无封装性，没有任何改变的弹性。当成员变量为private时，可以访问的函数为数量有限的成员函数，具有更好的封装性。同样的，非成员非友元函数不会增加访问private成员的函数数量，因此提供了更好的封装性。

注意，此处的非成员函数是相对于这个类来说的，但并不意味着这个函数不能是任何类的成员。

#### 24.若所有参数都需要类型转换，应该使用非成员函数

#### declare non-member functions when type conversions should apply to all parameters

<font color="#dd0000">???</font><br />

#### 25.考虑写一个不抛出异常的swap函数

#### consider support for a non-throwing swap

缺省情况下swap由stl提供的swap算法完成。只要相应的类型支持拷贝(通过拷贝构造函数和拷贝赋值操作符完成)。

对于“以指针指向一个对象，该对象保存真正的数据”的类型，stl的swap函数会执行深度拷贝，即拷贝该指针指向的对象。而实际上，只需要交换该指针即可。这种情况下设计swap函数的常见表现形式是`pimpl手法`(pointer to implementation).

```C++
class Widget
{
 public:
  Widget(const Widget& rhs);
  void swap(Widget& other)
  {
    using std::swap; // 
    swap(pImpl, other,Pimpl); // 交换指针
  }
 private:
  WidgetImpl* pImpl;
};

namespace std
{
  template<> // std::swap的特化版本。使用该模板函数时，若对应的类型为Widget时，调用这个特化版本的函数
  void swap<Widget>(Widget& a, Widget& b)
  {
    a.swap(b);
  }
}
```

因为C++不能偏特化(partially specialize)模板函数，只能偏特化模板类。因此当Widget本身是一个模板类时，上述的方法就失效了，可以采用以下方案。

```C++
namespace std
{
  template<typename T> // std::swap的一个重载版本
  void swap(Widget<T>& a, Widget<T>& b)
  {
    a.swap(b);
  }
}
```

<br />

# <center>五、实现

# <center>Implementations

#### 26.尽量延后变量定义式的出现时间

#### postpone variable definitions as long as possible

* 太早定义变量，可能还未使用就退出函数了，造成构造和析构的浪费
* 使用默认构造然后再赋值，效率低于使用初值实参构造。
* 循环中使用的变量在何处声明和定义，取决于`构造+析构`(在循环体内声明)和`赋值`(在循环体外声明)的成本对比。循环体外声明的可读性和维护性更好，有限使用。

#### 27. 尽量少做转型动作

#### minimize casting

C风格转型和函数风格转型

* const_cast: cast away the constness
* dynamic_cast: safe downcasting 归属继承体系中的某个类型；有时很影响效率
* reinterpret_cast: 低级转型，实际结果可能取决于编译器，不可移植
* static_cast: 强迫隐式转换(implicit conversions),也可以非常量转为常量

单一对象可能拥有一个的地址。`Base* `和`Derived*`指向它时的地址可能不同。

#### 28. 避免返回handles指向对象的内部成分

#### avoid returning "handles" to object internals

引用指针迭代器都是`handles`。
成员变量的封装性最多只等于"返回其引用"的函数的访问级别。
避免返回handles指向对象的内部成分，增加封装性，使const是const，也避免虚吊`dangling handles`。

#### 29. strive for exception0safe code

如果抛出异常，可能会导致`mutex`无法解锁。

exception-safe functions

* 基本保证：若抛出异常，程序内的任何东西都保持在有效状态下
* 强烈保证：如果函数成功则进入新状态，否则退回旧状态。往往用`copy-and-swap`实现出来。
* nothrow: 绝不抛出异常。作用于指针、整型等内置类型的操作都有nothrow保证
空白异常明细(empty exception specification)
delete在reset函数内被使用。

`pimpl idiom`手法(pointer to implementation)。
如果函数只操作局部状态(local state),相对容易提供强烈保证。
软件系统内有一个函数不具备异常安全性，整个系统都不具备异常安全性。

#### 30. understand the ins and outs of inlining

inline造成的代码膨胀可能会导致额外的换页行为(paging)，降低指令高速缓冲装置的击中率(instruction cache hit rate).
函数定义在类的定义内为隐喻声明为inline。
整个编译过程，内联多数发生在编译过程，也可能发生在连接过程，发生在哪一过程取决于build environments。
inline函数实际是否内联，取决于调用的实施方式。例如如果用到了该函数的地址，就不会内联。
如果f是一个内联函数，如果客户把f编进了客户端程序中，如果f更改了，那么所有客户端程序都需要重新编译。如果f为非内联函数，客户端程序只需要重新连接。如果采用动态连接，更是不需要任何操作。

大部分调试器不能调试内联函数，因为不能在不存在的函数内设立断点，因此部分调试版程序中禁止发生内联。

#### 31 将文件间的编译依存关系降至最低

#### minimize compilation dependencies between files

编译器必须在编译期间知道对象的大小。
让头文件尽可能自我满足，可以依赖其它文件内的声明式而非定义式。
为声明式和定义式提供不同的头文件。程序库的头文件应该以`full and declaration-only forms`的形式存在。客户应该总是`#include`一个声明文件，该声明文件对应的定义则在其它头文件内。
`handles class`和`interface class`解除了接口和实现之间的耦合关系，从而降低文件间的编译依存性。
`handles class`：访问间接性，动态内存分配开销和`bad_alloc`异常。
`interface class`：函数调用的间接跳跃(indirect jump);派生对象的虚指针表。
具象类(concrete classes)

<br />

# <center>六、继承与面向对象设计

# <center>Inheritance and object-oriented design

#### 32 make sure public inheritance models "is-a"

public继承主张，所有对基类的操作都可以对派生类使用。对于继承自基类的、不可在派生类中操作的虚函数，不在派生类中具体实现该虚函数即可。

#### 33 avoid hiding inherited names

当编译器在局部作用域内查找到带着该变量名的变量，就不会再在其它作用域中查找变量，虚函数和非虚函数也遵从此规则。派生类的作用域嵌套在基类的作用域中。如果派生类中的某个成员函数和基类中的某个成员函数重名，但不想重载基类中的函数，则可以用`using Base::mf1`来避免重载。然而这种方法会使得基类中所有名为`mf1`的函数为可见，即使使用了private继承。在派生类中使用如下的转交函数代替`using`，可避免这一问题。

```C++
virtual void mf1() // forwarding function
{Base::mf1();} // 可能会在编译时被优化为inline，从而避免调用开销
```

#### 34 differentiate between inheritance of interface and inheritance of implementation

在基类中定义纯虚函数，派生类中声明该函数，从而使得派生类既有接口、也有函数缺省实现、也可以很容易地重载该函数。通常只具体指定接口继承。

基类中的虚函数，可以使派生类无需声明就获得函数的缺省实现，也可以重载。如果在某个派生类中需要重载该函数但被忘记，可能会导致错误。通常具体指定接口继承及缺省实现继承。

如果成员函数是非虚函数，通常该函数应在不同派生类中有相同的行为。具体指定接口继承和强制实现继承。

#### 35 consider alternatives to virtual functions

1. 通过public的非虚成员函数间接调用私有虚函数，称为`non-virtual interface`(NVI)手法，是`Template Method`设计模式的一个表现形式。这个非虚函数即为虚函数的wrapper。

2. 通过函数指针实现`strategy`设计模式。构造函数接受一个指针指向需要的函数，在该函数中传入`this`指针来操作。但这个函数只能使用该类的public接口。通过声明该函数为友元函数弱化类的封装，可以解决这个问题。

3. 使用`std::tr1::function`模板类实现`strategy`设计模式。

4. 古典`strategy`模式。将继承体系内的虚函数替换为另一个继承体系内的虚函数。

#### 36 never redefine an inherited non-virtual function

基类指针永远指向基类中的定义的非虚函数，即使该指针指向派生类，且该函数已经在派生类中重新定义。因为非虚函数是静态绑定(statically bound)。虚函数是动态绑定(dynamically bind)，则指向对应的类中定义的函数。

#### 37 never redefine a function's inherited default parameter value

虚函数是静态绑定，函数的缺省参数值是静态绑定。因此派生类的虚函数的缺省参数值依然来自于基类中。

#### 38 model "has-a" or "is-implemented-in-terms-of" through composition

???

#### 39 use private inheritance judiciously

private继承而来的所有成员，在派生类中都是private。private继承时，编译器不会自动将派生类的对象转换为基类对象。private继承意味着`is-implemented-in-terms-of`(根据某物实现出)，这一点和复合(composition)很类似。尽量使用复合。

#### 40 use multiple inheritance judiciously

为避免变量的歧义，需要在菱形继承中使用虚继承。虚继承的成本很高，会增加大小、速度、初始化、赋值等成本，非必要不使用。如果使用虚继承，尽量避免在虚基类中放置数据。

<br />

# <center>七、模板与泛型编程

# <center>Templates and Generic Programming

#### 41 understand implicit interfaces and compile-time polymorphism

类的接口是显式的，多态通过虚函数发生于运行期。模板参数的接口是隐式的，多态是通过模板实例化和函数重载解析发生于编译期。

#### 42 understand the two meanings of typename

从属名称(dependent names)和嵌套从属名称(nested dependent name)。声明模板参数时，关键字`typename`和`class`可互换。使用`typename`表示嵌套从属类型名称，但不能在基类的初始化列表和成员初始化列表中以它作为基类修饰符。`typename`在不同的编译器中的处理方式不同，可能会带来移植性问题。

#### 43 know how to access names in templatized base class

1. 在基类调用动作前加上`this->`  
2. 使用`using`声明式  
3. 明确指出被调用的函数位于基类内

#### 44 factor parameter-independent code out of templates

非类型模板参数带来的膨胀，通过把该参数作为成员变量或者函数参数，可以使用到该参数的函数只拥有单一版本，减少可执行文件大小，减小内存占用，强化指令高速缓存区内的引用集中化(locality of reference)。

#### 45 use member function templates to accept "all compatible types"

#### 46 define non-member functions inside templates when type conversions are desired

在模板推导过程中从不将隐式类型转换函数纳入考虑。如果需要隐式类型转换，可以通过非成员函数执行类型转换。

#### 47 use traits classes for information about types

traits 技术，是一种约定俗称的技术方案，用来为同一类数据（包括自定义数据类型和内置数据类型）提供统一的操作函数，例如 advance(), swap(), encode()/decode() 等。

#### 48 be aware of template metaprogramming

使程序在编译器执行。

<br />

# <center>八、定制new和delete

# <center>Customizing New and Delete

#### 49 understand the behavior if the new-handler

《完全没懂，跳过》

#### 50 understand when it makes sense to replace new and delete

《完全没懂，跳过》

台湾翻译版太难懂，不看了
