---
layout: post
title:  "qt学习"
date:   2024-01-05 11:20:55 +0800
categories: [Tech]
excerpt: 整理了使用qt中常用的数据类型、函数、qa等
tags:
  - qt 
  - 
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




## 二、QA

整理了使用qt中遇到的问题以及解决方案。这些方案并不总是能解决问题，只是提供一个排查问题的方向。

#### 1 无法解析的外部符号

原因分析：  
1.类内使用了信号与槽，但未包含 Q_OBJECT 宏，因此需在类内加上Q_OBJECT  
2.所需的库.lib文件未包含到项目；编译使用的64bit，但引用的库是32bit的；  
3.项目未包含所需Qt模块；  
4.类中定义了slot或函数，却没有实现。  

#### 2

使用QT同时编译pcl和opencv出现`error: field ‘pa ram_k_’ has incomplete type ‘flann::SearchParams’`。<br />
错误原因：pcl和opencv中均包含flann库。而我在引用库时习惯性把整个库包含进来，导致出现两个名称相同的flann库，于是产生了这个错误。<br />
解决方案：不要把整个大库包含进来，只包含需要的部分。此处我使用了pcl的flann库，然后包含opencv中需要的那部分。<br />


## 三、安装和卸载
#### 1. 卸载
在`Qt`这个根路径下，运行`MaintainTool`这个文件。
