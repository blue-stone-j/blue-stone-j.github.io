---
layout: post
title:  "矩阵分解"
date:   2025-06-13 22:55:21 +0800
categories: [Math]
excerpt: 矩阵分解
tags:
  - matrix
  - decomposition
---

# 直接分解法

### LU分解

LU分解(LU Decomposition)可以将一个矩阵分解为一个单位下三角矩阵和一个上三角矩阵的乘积（有时是它们和一个置换矩阵的乘积）。LU分解主要应用在数值分析中，用来解线性方程、求反矩阵或计算行列式。

### Cholesky分解

Cholesky分解把矩阵分解为一个下三角矩阵以及它的共轭转置矩阵的乘积。

# 正交分解法

### QR分解

任何的实方阵都可以做QR分解：
$$ A=QR $$
其中 Q 是正交阵， R 是 upper triangle 矩阵.

### Schur分解

任意矩阵A,一定存在酉矩阵U，使得 U<sup>-1</sup>AU 为上三角矩阵.

# 基于向量变换分解

### 奇异值分解（SVD）

可以用于降维算法中的特征分解.

##### 物理意义

**左部正交矩阵U的物理意义**  
U矩阵的列向量被称为左奇异向量，它们构成了原矩阵A的列空间（即所有线性组合的列向量形成的空间）的一组正交基。这意味着左奇异向量代表了矩阵A能够“达到”的所有方向。在很多应用中，比如数据降维和特征提取，左奇异向量提供了一种方式来识别数据集中最重要的特征。

**右部正交矩阵的物理意义**  
矩阵的列向量（即V的行向量）被称为右奇异向量，它们构成了原矩阵A的行空间的一组正交基。右奇异向量代表了矩阵A中的数据可以通过哪些基本方向组合而成。在数据处理的背景下，这意味着它们可以提供对原始特征空间的一种理解，即原始数据的构成方式。

**Σ的物理意义**  
对角矩阵Σ包含了奇异值，它们按从大到小的顺序排列。每个奇异值代表了相应的奇异向量在变换中的“重要性”或“能量”。较大的奇异值对应于更重要的特征方向。

**物理意义**  
矩阵和向量的乘法，相当于如下过程

1. 通过右部正交矩阵旋转，调整了输入向量的方向，而不改变向量之间的相对位置和距离。
2. 奇异值矩阵在变换后的新方向上“拉伸”或“压缩”。
3. 通过左部正交矩阵，把已经被拉伸或压缩的向量转移到最终的位置

### 特征分解

### Jordan分解

# 其他分解法

### LDL分解

LDL分解是经典Cholesky分解的一个变形. 对于实数矩阵，该种分解的形式可被改写成
$$ A=LDLt $$
其中，L 为下三角矩阵，且对角元素必须为1；D为对角矩阵。
