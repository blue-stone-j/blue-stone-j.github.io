---
layout: post
title:  "CSS语法"
date:   2024-12-14 18:50:59 +0800
categories: [Design]
excerpt: 部分CSS语法
tags:
  -  
  - Markdowm
  - 
---




##### 1. text-shadow
text-shadow本质上是把修饰的文字再次显示一遍，前两个参数表示再次显示时相对于原本文字的水平和垂直的偏移量，第三个参数为再次显示的文字的颜色。可以多次显示，每个重复显示之间用逗号隔开。如下所示，显示一遍红色字体再显示一遍蓝色字体。
```
text-shadow: 2px 15px red, 0px -15px 5px blue;
```

##### 2. 文本direction
类似于左对齐和右对齐，不是文字从左往右读或从右往左读。

