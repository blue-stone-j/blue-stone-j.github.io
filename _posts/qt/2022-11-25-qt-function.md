---
layout: post
title:  "qt遇到的问题"
date:   2024-01-05 11:20:55 +0800
categories: [Tech]
excerpt: 整理了使用qt中常用的数据类型、函数等
tags:
  - qt 
  - 
---

这篇文章整理了使用qt中遇到的常用的数据类型、函数、qa等。

## 一、

#### 1 QString
```C++
int num = 5;
QString temStr = QString::number(num); // 数字转为字符串
```

#### 2 信号槽

在qt中，可以通过函数`setObjectName`为控件设置对象名，qt在编译时会根据该字段自动寻找槽函数。例如控件的声明和定义如下
```C++
QPushButton *select_refer;
select_refer = new QPushButton();
select_refer->setObjectName(QStringLiteral("selectRefer"));
```
如果链接的cpp文件中声明和定义了函数`void on_select_refer_clicked()`，则编译时会自动把该函数关联为该控件的点击信号对应的槽函数。


## 三、安装和卸载
#### 1. 卸载
在`Qt`这个根路径下，运行`MaintainTool`这个文件。
