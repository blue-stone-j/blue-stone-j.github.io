---
layout: post
title:  "Ceres学习"
date:   2022-11-20 08:30:00 +0800
categories: [Tech]
excerpt: Ceres安装；常用求导方法函数；等等。
tags:
  - Ceres
  - 
  - 
  - C++
---

这篇文章整理了关于Ceres安装和使用的知识。

## 一、基础知识

#### 1. 


#### 2



```C++

```



## 二、

覆盖范围包括，比如 等等。


Problem problem;

// Add residual terms to the problem using the autodiff wrapper to get the derivatives automatically.
problem.AddResidualBlock(new AutoDiffCostFunction<F1, 1, 1, 1>(new F1), nullptr, &x1, &x2);
// AutoDiffCostFunction<函数，残差的数量，第一个参数块，第二个参数块>
