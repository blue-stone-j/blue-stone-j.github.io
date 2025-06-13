---
layout: post
title:  "线性代数"
date:   2025-06-13 22:55:21 +0800
categories: [Math]
excerpt: 用普通的直觉代替枯燥的证明
tags:
  - Eigen
  - C++
---

线性代数里的矩阵实在是太枯燥了。它们这是对

### 基础名词的理解

矩阵 = 变换 = 系统；向量 = 状态；基 = 坐标系</br>
向量是状态，矩阵是变换/系统。向量a左乘矩阵A ==> 向量b，矩阵A是一个空间意义上的线性变换，也可以视为一个系统，物体经过这个系统从状态a到了另一个状态b。</br>  
一组基通过线性组合能够完整描述整个向量空间的任一向量。在这个向量空间内，同一组基下，两个向量之间的关系可以用矩阵来描述，这个矩阵就是两个向量之间的线性变换。</br>
描述同一个向量空间，可以使用不同的基。同样的状态在不同的基下，使用不同的向量描述。这时，描述同一状态的不同向量之间的关系和对应的基之间的关系相同。 </br>

任何一个矩阵的操作效果可以分解成一次旋转，一次拉伸和维度改变。

### 1. 相似矩阵

如果把矩阵看做变换，两个相似矩阵实际上是对同一个线性变换的描述。例如对于一个物体的移动，物体的位置坐标是一个向量，移动的距离和方向是一个矩阵(变换)，这个矩阵用来两个位置之间的关系。不同的坐标系下，这个描述移动的矩阵是不同的，但对应的移动是完全相同的。这两个矩阵之间的关系就是`相似矩阵`。</br>

### 3 [相似矩阵的特征值相同](https://www.zhihu.com/question/437714477/answer/2687982681)

相似矩阵是同一变换在不同坐标系下的描述。因为坐标系不同，描述同一变换的矩阵也是不同的。
例如上述的移动，在不同坐标系下，方向和大小都不同。
对于现有的一个矩阵，特征向量的方向=该物体的位置与原点的连线。特征值决定了变换后该物体的位置，而且位置的坐标按照一定倍数变化，这个倍数就是特征值。
另一个矩阵在另一个坐标系下描述这一变化，也就是相似矩阵。因为坐标系不同，该矩阵的特征向量的方向和原矩阵不同。但特征值同样是描述位置的坐标的变化的倍数。
因此相似矩阵的特征值相同。同样的变化倍数，就有同样的特征值。

### 4 SVD 分解(奇异值分解)

简单的理解就是将矩阵分解为正交的向量（让数据去相关），只不过矩阵是2维的，所以需要一个列向量乘行向量来表示，然后乘一个系数（特征值），来表示该部分所占权重。最后多个维度（子空间）的数据叠加起来就能恢复原始真实数据。

SVD分解通常用于数据压缩和数据降维。用于数据降维时，既可以对列降维，也可以对行降维，其中对列的降维等价于PCA的降维。

奇异值描述了矩阵对应的拉伸变换在各个方向的比例，是矩阵的重要特征。奇异值的分布通常非常不均，在很多的情况下前10%甚至1%的奇异值之和就占了全部奇异值之和的99%以上。因此我们可以用前个大的奇异值来近似的描述矩阵。这就是SVD分解用来进行数据压缩的原理。

PCA降维使用的变换矩阵恰好是SVD分解的右奇异矩阵。实际上，由于SVD分解存在着无需通过计算特征值和特征向量的可并行的数值迭代计算算法，sklearn的PCA降维算法正是通过SVD分解计算的。

### 5. singular value and eigen value

Eigen value indicates special situation for a matrix, that vector input and output are in same direction. </br>
Singular value indicate general situation for matrix, vector input will be decomposed into orthogonal vectors, and then these will be stretched in different scales. Singular values are these scales. At last, all these vectors will be composed to construct the vector output.

奇异值分解中, M = UΣV*
V的行（columns）組成一套對 M 的正交"輸入"或"分析"的基向量。這些向量是 M*M 的特徵向量。
U的行（columns）組成一套對 M 的正交"輸出"的基向量。這些向量是 MM* 的特徵向量。

Singular Matrix will reduce dimensions of vector

### 范数

向量 x 在经过矩阵 A 变换前后模长比值的最大值，定义为 A 的范数。

### 条件数

条件数同时描述了矩阵对向量的拉伸能力和压缩能力.

### Meaning of Singular Values of jacobian in a Good Optimization Scenario

1. Sensitivity of Residuals to Parameters

Each singular value quantifies how sensitive the residuals are to movement along the i-th direction in parameter space.

* Large singular value: Changing parameters in this direction significantly changes residuals; Strong constraint, observability, well-constrained parameter direction
* Small singular value: Changing parameters in this direction barely affects residuals; Weak constraint / potentially under-constrained or degenerate

2. Observability and Rank

* The number of non-zero singular values = effective rank of the Jacobian.
* This tells you how many independent pieces of information you have in your data to constrain the parameters.
* A "good" optimization problem will have full rank or close to it.

3. condition number

The ratio $𝜎_{max}$/$𝜎_{min}$ is the condition number.

A large ratio → problem is ill-conditioned → small errors in data or residuals can cause large jumps in the solution.

singular values can diagnose:

1. Rank deficiencies
2. Numerical conditioning
3. Informative vs. uninformative directions
4. Confidence in parameter estimates

If the Jacobian stabilizes, then its singular values also tend to: converge to fixed values, or reveal clearer rank structure as noisy or degenerate modes are reduced.
