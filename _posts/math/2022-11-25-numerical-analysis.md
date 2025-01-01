---
layout: post
title:  "数值分析笔记"
date:   2025-01-01 19:00:46 +0800
categories: [Math]
excerpt: 学习数学分析过程中产生笔记
tags:
  - 数值分析 
  - 数学
  - 
---

这篇文章整理了使用qt中遇到的问题以及解决方案。这些方案并不总是能解决问题，只是提供一个排查问题的方向。

# 第一章、误差 error

## 1 误差背景介绍

### 1. 来源和分类 source and classification

模型误差 modeling error

观测误差 measurement error

方法误差/截断误差 truncation error: 例如泰勒展开选取前几项，后面的余项就是截断误差

舍入误差 roundoff error: 1/3计算时按照0.333，这个误差为舍入误差

### 2. 传播与积累 spread & accumulation
初始扰动会造成误差迅速积累，是不稳定算法(unstable algorithm)

|病态问题|ill-posed problem|
|误差|error|
|绝对误差|absolute error|
|绝对误差限|accuracy|
|相对误差|relative error|
|相对误差限|relative accuracy|
|有效数字|significant digits|

**有效数字和绝对误差**  
有效数字的绝对误差限为最后一位数字的半个单位，同理也可以用误差限计算有效数字的位数。例如用`355/113`作为π的近似值时，可以通过这种方式计算有效数字和误差限。在数值计算中，使用某个符合精度要求且容易计算的数值来近似代替原来的数值，是一个常用的方法。

**有效数字和相对误差**
有效数字的位数和相对误差限是等价的。

### 函数的误差估计(error estimation for functions)
|放大因子|amplification factor|
|绝对条件数|absolute condition number|
|相对误差条件数||

函数f在该点是`well-conditioned`或者`ill-condition`

### 注意事项
1. 避免相近二数相减
![pic1](/assets/images/posts/numrical-analysis/01.jpg)

2. 避免小分母：分母小会造成浮点溢出

3. 避免大数加上小数: 求和时从小到大相加，可使和的误差减小

4. 先化简再计算，减少步骤，避免误差积累

5. 选用稳定算法

# 第二章、插值 interpolation

插值函数
多项式插值
分段插值
三角插值

插值条件,插值节点

插值方法研究的问题
1. 满足插值条件的插值函数是否唯一
对于待求的多项式的系数，x的多项式组成的Vandermond行列式是否为零.
2. 如何构造
待定系数法(多重零点会减少待定系数的数量):需要解线性方程组,可能存在病态问题

拉格朗日多项式(Lagrange Polynomial)
3. 误差估计




# 第三章、函数微积分