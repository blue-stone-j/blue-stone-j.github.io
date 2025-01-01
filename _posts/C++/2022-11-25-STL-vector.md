---
layout: post
title:  "STL vector"
date:   2025-01-01 19:00:46 +0800
categories: [Lan]
excerpt: 
tags:
  - STL
  - vector
  - C++
---

这篇文章整理了vector.


# Empirical Observation

### 1. make_move_iterator and push_back
`std::vector::insert` with `std::make_move_iterator` is generally faster than `push_back` in a loop theoretically. But it's not. </br>
I need to copy varible A(`std::vector<pcl::Point>`) to another varible B. I find that `make_move_iterator` is a little slower than `push_back`. Length of A is about 20000.

### 2. reserve
When copy or push large data to vector, reallocation will take much time. Using `reserve` to allocate sufficient capacity can reduce time cost significantly.

```C++
#include <vector>
```

### member

### 1. erase
删除容器中的元素
```C++
erase(pos,n);     // 删除从pos开始的n个字符，比如erase(0,1)就是删除第一个字符
erase(position);  // 删除position处的一个字符(position是个string类型的迭代器)
erase(first,last);// 删除从first到last之间的字符（first和last都是迭代器）
```

### 1. iterator
```C++
#include <iterator>
// genarate a iterator for container c and this iterator will add element to c. c must support push_back
back_inserter(c);

// genarate a iterator for container c and this iterator will add element to c. c must support push_front
front_inserter(c);

// genarate a iterator for container c and add elemnet before it
inserter(c,it);
```

### 2 initailize vector
[here](https://www.geeksforgeeks.org/initialize-a-vector-in-cpp-different-ways/).

### reserve
When a std::vector is empty, calling std::vector::reserve is a constant-time operation, O(1).

indexing overhead.