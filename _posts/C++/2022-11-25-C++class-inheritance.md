---
layout: post
title:  "C++ inheritance"
date:   2026-03-28 08:47:41 +0800
categories: [Lan]
excerpt: C++ inheritance
tags:
  - Windows
---

### function hide/override

##### Without virtual keyword

If the base class function is not `virtual`, then function call resolution is done at compile time (static binding). In this case, the function that is called depends on the type of the pointer or reference, not the actual object.

##### With virtual keyword

If the base class function is declared `virtual`, then function call resolution is done at runtime (dynamic binding). In this case, the function called depends on the actual object type, even if accessed through a base class pointer/reference.

##### Explicitly calling base class function

### initialization

| Method                          | Works? | Description                                    |
| ------------------------------- | ------ | ---------------------------------------------- |
| `Derived(int v) : Base(v)`      | ✅      | Best method: call base constructor             |
| Assign `value = v;` inside body | ✅      | Works but less efficient                       |
| `Derived(int v) : value(v)`     | ❌      | Invalid — `value` is not a member of `Derived` |

### static member

In C++, a static data member belongs to the class itself, not to individual objects. A derived class does not get its own copy. It refers to the same static member defined in the base class unless it explicitly declares another one.
