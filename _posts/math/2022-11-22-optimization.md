---
layout: post
title:  "优化"
date:   2025-06-13 22:55:21 +0800
categories: [Math]
excerpt: 优化算法
tags:
  - 数学
  - 优化
  - 
---

#### 01

梯度(grad)
海森矩阵(Hessian)

极值:strong local minimum, weak local minimum, strong global minimum

海森矩阵半正定为局部极小值存在的必要条件

**凸集**  
$αx+(1-α)y ∈ F$  
集合上任意两点的连线，其上的点都在集合F上  

**凸函数**  
函数上两点的连线形成新函数，该新函数的值高于对应的函数值
任意一点的切线都能使得函数完全位于切线的一侧。  
仅有一个极值点，即局部极小值为全局极小值。  

**非线性优化的通用流程**  
>1.初值<br>
>2.找增量△x_i使函数值变小<br>
>3.更新变量<br>
>4.到达迭代次数或增量足够小，终止

方向h和步长α

* 梯度下降
* 最速梯度下降法

1. 末端会有很多锯齿，收敛速度慢
2. 初始值会影响迭代次数和结果。选择的初始值不仅仅是越靠近最优结果越好
确定α：
精确线搜索：计算量大；变为关于步长的函数，然后求导计算步长
非精确线搜索：关于步长的函数，选取两条线，这两条线中间的那段步长函数对应的步长值

牛顿法
转换为求二阶展开式的最小值;二阶展开式对h求导
可以同时考虑坡度和方向
黑森矩阵必须为正定矩阵，才能收敛到极小值；若为负定矩阵，则会收敛到局部极大值。在二阶导负定时，使用最速梯度。需要计算海森矩阵及其逆，计算量大

高斯牛顿法
转换为求一阶展开式的最小值;一阶展开式的平方对h求导；h=-(JTJ)^(-1)*(JTF(x))。
用一阶导近似二阶导，降低计算量。
需要JTJ半正定，很难满足;由于泰勒展开的性质,当步长较大时,近似实际上失效

LM算法
h=-(JTJ+μI)^(-1)*(JTF(x)),μ>0
(JTJ+μI)正定，从而保证h是梯度下降的方向；μ大，(JTJ+μI)接近单位阵，整体接近梯度下降法；μ小，更接近高斯牛顿法
根据近似情况选取步长
终止条件：一阶导数足够小；步长足够小；达到最大迭代次数。

`Marginalization` is the process of integrating out or eliminating variables from a probabilistic distribution (or its optimization counterpart) to obtain a reduced problem over a smaller subset of variables. For example, in sliding window visual-inertial odometry, old poses and features can be marginalized out to keep only recent states. After marginalization, a prior residual is added to the cost function to account for the removed variables' influence.

The resulting system after marginalization becomes less sparse, which can degrade solver efficiency.
