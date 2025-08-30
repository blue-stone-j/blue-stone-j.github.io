---
layout: post
title:  "STL vector"
date:   2025-08-30 09:57:15 +0800
categories: [Lan]
excerpt: 
tags:
  - STL
  - vector
  - C++
---

这篇文章整理了`std::vector`.

# Empirical Observation

### 1. make_move_iterator and push_back

`std::vector::insert` with `std::make_move_iterator` is generally faster than `push_back` in a loop theoretically. But it's not. </br>
I need to copy variable A(`std::vector<pcl::Point>`) to another variable B. I find that `make_move_iterator` is a little slower than `push_back`. Length of A is about 20000.

In general, `emplace_back` is preferred if the type stored in the container is expensive to move or copy

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

### 2. iterator

```C++
#include <iterator>
// generate a iterator for container c and this iterator will add element to c. c must support push_back
back_inserter(c);

// generate a iterator for container c and this iterator will add element to c. c must support push_front
front_inserter(c);

// generate a iterator for container c and add elemnet before it
inserter(c,it);
```

### 3 initialize vector

[here](https://www.geeksforgeeks.org/initialize-a-vector-in-cpp-different-ways/).

### 4 reserve

When a `std::vector` is empty, calling `std::vector::reserve` is a constant-time operation, O(1).
