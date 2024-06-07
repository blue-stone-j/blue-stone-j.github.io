---
layout: post
title:  "optimization lib"
date:   2024-01-05 11:20:55 +0800
categories: [Tech]
excerpt: lua配置文件和lua库的使用
tags:
  - gtsam
  - g2o
  - ceres
---

# gtsam

### qa
1. 遇到错误
```bash
Thrown when a linear system is ill-posed. The most common cause for this erro is having underconstrained varible.
```
可能的错误原因
* 检查key的格式，递增是否正确
* 检查noise model是否设置正确
* pose发生了很大变化，一般是位姿设置正确造成的


# g2o


# ceres

```C++
Problem problem;

// Add residual terms to the problem using the autodiff wrapper to get the derivatives automatically.
problem.AddResidualBlock(new AutoDiffCostFunction<F1, 1, 1, 1>(new F1), nullptr, &x1, &x2);
// AutoDiffCostFunction<函数，残差的数量，第一个参数块，第二个参数块>
```