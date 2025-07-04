---
layout: post
title:  "论文简介"
date:   2025-06-16 00:25:10 +0800
categories: [Tech]
excerpt: 这篇文章整理了SLAM和感知相关论文的简介。
tags:
  - 追踪
  - perception
  - SLAM
  - control
  - index
---

这篇文章整理了SLAM和感知相关论文的简介。对于每篇论文，我给出了自己的分类标签、是否推荐、论文的主要内容和主要贡献。对于有开源代码的论文，我看会添加对应的开源代码的链接。当然，这个链接在论文里也应该能够找到。我对部分开源代码作了详细的注释，我会给出这些带有详细注释的代码的链接。
所有论文按照发表年份从新到旧排列。

#### 示例

[] *****: 该论文的标签,即所属的领域; 推荐星数(必看->值得一看->可供参考->写了点东西->随便看看) <br/>
发表时间 论文名称<br/>
主要特点<br/>

#### 相似词语

`路径跟踪` == `轨迹跟踪`;
`反步法`   == `反推法`  ;

# <center>2024</center>

`点云` `Dynamic Object` `*****`

2024 A Review of Dynamic Object Filtering in SLAM Based on 3D LiDAR

<!-- todo -->

# <center>2022</center>

`毫米波雷达` `视觉` `融合` `***`

2022(*) MmWave Radar and Vision Fusion for Object Detection in Autonomous Driving: A Review

毫米波雷达和视觉的融合三种方式以及对应的经典算法

---

`地面分割` `***`

2022 Patchwork++: Fast and Robust Ground Segmentation Solving Partial Under-Segmentation Using 3D Point Cloud

反射噪声滤除, 基于高度平面度地面似然估计模型, 标准差用作自适应, 临时地面点重置为非地面点

---

# <center>2021</center>

`点云分割` `****`

2021(*) Patchwork: Concentric Zone-based Region-wise Ground Segmentation with Ground Likelihood Estimation Using a 3D LiDAR Sensor

PCA计算单位空间的法向量, 基于垂直度高度平面度地面似然估计模型

---

# <center>2020</center>

`激光SLAM` `*****`

2020(*) RLINS A Lidar-Inertial State Estimator for Robust and Efficient Navigation

基于2018LeGO-LOAM框架, 在优化部分使用迭代卡尔曼滤波计算优化的步长

---

``

`点云` `Dynamic Object` `点云分割` `*****`

2020 Remove, then Revert Static Point cloud Map Construction using Multiresolution Range Images

<!-- todo -->

---

`激光SLAM` `*****`

2020 FAST-LIO A Fast, Robust LiDAR-inertial Odometry Package by Tightly-Coupled Iterated Kalman Filter

基于2014LOAM的特征提取; 使用误差状态卡尔曼的方式计算优化过程中的步长; 提出了新的卡尔曼增益计算方法, 大大减小了计算量

---

`激光感知` `追踪` `****`

2020(*) 3D Multi-Object Tracking: A Baseline and New Evaluation Metrics

卡尔曼滤波预测 --> 用3D相交判定匹配 --> 卡尔曼滤波更新状态; 新的多目标追踪评估工具

---

`激光SLAM` `*****`

2020 LIO SAM - Tightly coupled Lidar Inertial Odometry via Smoothing and Mapping

基于2014LOAM的特征提取, 分块提取特征; 使用了imu预积分作为增量的高频实时里程计; 点云匹配作为精确低频里程计; 对关键帧使用gtsam图优化;

---

`激光SLAM`

2020 Online LiDAR-SLAM for Legged Robots with Robust Registration and Deep-Learned Loop Closure

位置识别约束：2017 SegMatch: Segment Based Place Recognition in 3D Point Clouds

回环检测： 2017 Overlap-based ICP tuning for robust localization of a humanoid robot
点云配准验证：

---
`lidar` `*****`

2020 Performance Analysis of 10 Models of 3D LiDARs for Autonomous Driving

Significant secondary reflections were observed in the VLP-32c and OS1-16. Usually this occurred for a small subset of points, at close distances, specifically on the high intensity target. Since this reflective material is similar to the one used for traffic signs and other road markers, this problem could lead to both false detections, positive and negative, in the real world and should be addressed.

one previous study noted that reflective surfaces were difficult to detect at a large angle of incidence [27]. This suggest that white, highly reflective paint may not be a good choice for automated vehicles using LiDAR technology.

This work is limited to three targets, one with very high reflectivity (diamond target) and one with very low reflectivity (velvet target). One weakness of our experiments is that these are extreme cases that are uncommon in the real world. However, these experiments serve to set some bounds on LiDAR performance and these particular cases have not been addressed in current literature. Furthermore, the white poster board target is expected to be easily
identifiable with strong but not overwhelming reflectivity [41], and may be referred to for typical behavior.

Many LiDARs performed worse on diamond-grade reflective sheet at close range, usually on the order of an additional 0.02 m RMSE.

The results for range measurement highlight the need for better manufacturing and calibration of LiDARs. All LiDARs had standard deviations much smaller than what was found in the residual error analysis of Section IV-B.
The Velodyne sensors all have single laser precision on the order of ±5 mm, nearly an order of magnitude less than the overall point cloud precision. This tells us the calibration of the sensor is the main source of error.

The vehicle and pedestrian were also segmented manually by establishing the ground plane and creating a bounding box using the known size of the object.

This raises concerns about custom non-reflective paints which may quickly be rendered invisible to LiDARs.

Mechanical LiDARs without adaptive scanning capabilities are simply not well-suited for identifying thin objects at long distances due to limits in horizontal resolution; flash LiDARs may be better suited for this task.

In extended targets where the size of target is larger than the laser footprint, the laser beam divergence has greater influence than for point.

The influence of range and angle of incidence varies in ALS and TLS. Ranges are typically much greater and exhibit less percent variability in ALS than in TLS.

---

# <center>2019</center>

`雷达相机标定` `*****`
2019 Automatic extrinsic calibration between a camera and a 3D Lidar using 3D point and plane correspondences

1. 提取标定板的法向量和中心点。相机使用pnp，雷达聚类后拟合边界后计算中心点和法向量。
2. 法向量的方向用于计算旋转
3. 把雷达坐标系下的中心点坐标转换到相机坐标系，最小化两个中心点的残差

---

`激光SLAM` `*****`

2019(*) Loam livox: A fast, robust, high-precision LiDAR odometry and mapping package for LiDARs of small FoV

算法前端和后端, 基于LOAM的针对小视场角的固态激光雷达的改进方法

---

`点云` `特征提取` `****`

2019 Fast 3D Line Segment Detection From Unorganized Point Cloud

3D 点法线聚平面 -> 2D 最小二乘提取边缘 -> 得到 3D 边缘 -> 扩展&合并

---

`卡尔曼滤波` `组合导航`

2019 基于卡尔曼滤波的车辆组合导航仿真研究

使用MATLAB完成基础卡尔曼滤波的仿真; GPS/DR组合导航

---

`卡尔曼滤波` `组合导航`

2019 抑制卡尔曼滤波发散的组合导航算法研究

抑制发散的两种方法,衰减记忆自适应和渐消记忆;

---

`激光SLAM`

2019 A fast, complete, point cloud based loop closure for LiDAR odometry and mapping

回环检测方法

---

`激光SLAM`

2019 LIC-Fusion: LiDAR-Inertial-Camera Odometry

借鉴LOAM, 在MSCKF中加入基于点线/点面距离的激光测量模型

---

`路径跟踪` `**`

2019 双差动单元四轮驱动AGV路径跟踪策略

前后两个差动单元并建立了运动模型; 为角度和距离纠偏设定了三级优先级交叉纠偏, 每次只纠正角度和距离中的一个;

---

# <center>2018</center>

`雷达相机标定` `***`
2018 LiDAR and Camera Calibration using Motion Estimated by Sensor Fusion Odometry
无目标标定。通过一系列运动，先通过p3p算法计算相机的位姿变换，然后计算雷达的位姿变换。最后通过这些位姿变换的pair计算外参。没有找到代码，低价值论文。

---

`控制算法` `**`

2018 基于视觉的AGV控制系统研究

硬件选型; 运动和误差模型+直流电机特性->整体控制原理图; 相机投影坐标; 统计滤波(中值滤波); 基于二维最大熵阈值法的图像分割; Canny算子边缘检测算法; 位置和角度偏差的计算和模糊控制

---

`机器人` `****`

2018 全地形轮式移动机器人设计与性能分析(硕士毕设)

机器人选件; 差速运动学模型(ADAMS)和动力学模型; 越障的动力学模型(MATLAB); 通过性(ADAMS),稳定性灵活性机动性分析; 控制系统的软硬设计(使用软件控制的,参考价值不大)

---

`路径跟踪` `轨迹规划` `*`

2018 基于运动控制和频域分析的移动机器人能耗最优轨迹规划

结合轨迹跟踪和电机相应的运动控制模型; 轨迹跟踪中的电机能耗模型; 能耗最优轨迹规划

---

`多足机器人运动模型` `***`

2018 基于水下六足机器人腿部运动控制问题研究

机器人和腿部的坐标关系; 多足机器人的运动循环; simulink仿真;

---

`激光SLAM` `*****`

2018 LeGO-LOAM Lightweight and Ground-Optimized Lidar Odometry and Mapping on Variable Terrain

分割地面点; 通过欧式聚类的方法聚类, 然后根据类的点数滤除小物体, 每个类拥有自己的标签; 分块提取特征; 根据里程计的回环检测

---

`路径跟踪` `**`

2018 基于磁导引AGV的路径跟踪控制策略研究

磁导引的运动学模型; 转向和速度的模糊控制; 前舵机后驱动

---

`机械臂运动模型` `***`

2018 SCARA机器人的运动控制分析与计算

机械臂运动模型分析;

---

2018(x) 一种GNSS与SINS组合导航算法研究

---

`路径规划` `***`

2018 轮式AGV沿葡萄园垄道行驶避障导航算法与模拟试验

避障; 避障路径和全局路径规划的切换;

---

`SLAM`

2018 SLAM estimation method for uncertain model noise parameters

1 引言
自适应噪声参数的3种估计滤波方法: 估计模型的噪声统计参数的自适应滤波算法[贝叶斯、最大似然、方差匹配、相关法; 通常收敛快于噪声变化; 时间不变噪声参数](1,2); 基于 innovation 和残差的协方差纠正算法[3,4](根据innovationsequence调整协方差矩阵或增益矩阵; 半自适应[5,6]); interacting multiple model 方法[7,8];

若噪声统计参数为常量、高斯分布, 则根据最大后验估计原则的三种方法[9-11]

2 模型噪声参数不定的slam估计问题描述
高斯噪声;系统噪声参数模型的不确定性表达式

3 未知的恒常噪声模型参数的slam估计模型
体积卡尔曼滤波(CKF: cubature KF)
3.1模型描述
卡尔曼滤波最小化残差: 二阶 string-interpolation 滤波, 无迹卡尔曼, spherical diameter volume filter
3.2 最大后验估计的自适应体积卡尔曼滤波
b198 m498 f238 y250

---

`点云` `mirror`

2018 Reflection Removal for Large-Scale 3D Point Clouds

A method to remove virtual points generated from mirror reflection.

Assume that points on mirror always can be found. Then estimate mirror plane model from these points. At last, use 3D feature descriptors to evaluate geometric similarity to judge whether a point is reflection.

In this work, also assume that only a single dominant glass plane exists.

---

# <center>2017</center>

`路径跟踪` `控制算法` `****`

2017 室内移动机器人路径规划及轨迹跟踪控制研究

A*算法和启发函数改进; 极多项式曲线, 三次样条曲线平滑轨迹; 差速运动模型; 基于李雅普诺夫的跟踪算法和稳定性证明; 控制系统硬件设计(电子元件选型);

---

`配准`

2017 Overlap-based ICP tuning for robust localization of a humanoid robot
定位模块的两个组件：

1.惯性状态估计器：2014 Drift-free humanoid inertial estimation drift while in black we see the corrected estimate state estimation fusing kinematic, inertial and LIDAR sensing

2.AICP

a. pre-filtering: 体素滤波 --> 提取大平面(去除人和cluster;鲁棒匹配) -->

---

`点云` `Dynamic Object` `点云分割` `*****`

2017 The peopleremover – removing dynamic objects from 3D point cloud data by traversing a voxel occupancy grid

<!-- todo -->

---

`路径跟踪` `控制算法` `***`

2017 双磁导引轮式AGV路径跟踪算法的研究

四轮机器人运动模型、阿克曼转向模型; PID控制转角和速度

---

`点云分割`

2017(*) SegMatch: Segment Based Place Recognition in 3D Point Clouds

1.分割：2011 On the Segmentation of 3D LIDAR Point Clouds

2.特征提取：
基于特征值的描述子：2014 Semantic 3d scene interpretation: a framework combining optimal neighborhood size selection with relevant features
基于形状直方图：2011 Ensemble of shape functions for 3d object classification

3.seg匹配：kd树得到候选 --> 随机树分类器 ？？？

4.RANSAC几何确认？？？

---

`机器人` `控制算法` `****`

2017 轮式移动机器人运动控制系统的设计

硬件选型; 差速转向运动模型; 软件和架构设计;

---

`机器人` `控制算法`

2017 四驱轮式移动机器人建模与运动控制研究

摩擦力分析; 运动学模型和动力学模型; 基于速度差分的PID控制; 两个控制器控制两侧, 同侧最慢轮速作为反馈, 可有效协调车轮力矩的分配, 可减少车体抖动

---

`路径跟踪` `**`

2017 差速轮式移动机器人的导航算法研究及仿真实验

差速轮式; 陀螺仪和轮速计融合; 直线和圆弧导航

---

`路径跟踪` `控制算法` `*****`

2017 轮式移动机器人轨迹跟踪的PID控制方法

PID控制; 主从追随; 阿克曼转向;

---

`点云分割` `****`

2017(*) Fast Segmentation of 3D Point Clouds: A Paradigm on LiDAR Data for Autonomous Vehicle Applications

高度选取地面种子点并用法向量扩展为地面; 改进的欧氏聚类: 二维图从上至下赋标签并从下至上更新标签;

---

# <center>2016</center>

`机械设计` `力学` `***`

2016 基于SolidWorks Simulation小型载重仓储机器人车架静力学分析

算是一个使用SolidWorks完成静力学分析的教程

---

`机器人` `控制` `*`

2016 基于LabVIEW的轮式模块化机器人设计及控制系统研究

四轮对称驱动的运动模型,包括四轮速度分配; 摩擦力的动力学分析,包括轮子底盘电机; 各模块的详细设计; 车体稳定性分析; 位置和姿态分别控制; 基于labview的编程实现; 各模块硬件设计;

---

2016 Low-drift and real-time lidar odometry and mapping
同上 2014 LOAM Lidar Odometry and Mapping in Real-time

---

`机器人` `控制` `****`

2016 四驱轮式移动机器人运动控制系统研究与设计

运动学模型, 动力学模型, 驱动电机模型; 基于反步法的轨迹跟踪控制律; 轨迹跟踪控制律; 运动控制系统(各模块的硬件设计及选件, 软件整体架构)

---

# <center>2015</center>

`单目视觉` `视觉测距` `****`

2015 轮式移动机器人单目视觉的目标测距方法

相机模型; 单目视觉测距的方法;

---

`卡尔曼滤波`

2015 APPLICATION OF KALMAN FILTER IN NAVIGATION PROCESS

运用卡尔曼滤波减少震动、车轮半径等误差

---

2015 Line segment extraction for large scale unorganized point clouds

---

`点云`

2015 MIRROR IDENTIFICATION AND CORRECTION OF 3D POINT CLOUDS

This paper describes a complete solution to correct point clouds that contain a mirror of known size. In practice, It's almost impossible to know the size of mirror. So I just skip this paper.

---

`*****`
2015 A Review of LIDAR Radiometric Processing From Ad Hoc Intensity Correction to Rigorous Radiometric Calibration

---

# <center>2014</center>

`激光SLAM` `*****`

2014 LOAM Lidar Odometry and Mapping in Real-time

基础的LOAM框架, 使用edge点和plane平面点

# <center>2013</center>

`组合导航`

2013 GPS和INS组合导航算法研究

常用坐标系的转换; 陀螺仪的初始化和自校准; 采用四元法的姿态矩阵更新; 紧组合和松组合的推导; 使用不同的坐标系改善了求解中的病态矩阵

# <center>2012</center>

`标定`

2012(*) Automatic Camera and Range Sensor Calibration using a single Shot

根据棋盘格的角点特征，把棋盘格的角点分为4类。从图像中的识别所有角点，然后使用棋盘格生成的方法，按照棋盘格的边的方向，从某个角点出发生成该点所在的棋盘格。依次遍历所有角点，这样就一次从一张图片中识别出多个棋盘格。

使用一张图片中的所有棋盘格，可以用于相机间的标定和相机激光雷达的标定。

2012

# <center>2011</center>

`视觉SLAM` `*****`

2011 ORB an efficient alternative to SIFT or SURF

介绍ORB特征

---

`点云分割` `激光雷达`

2011 On the Segmentation of 3D LIDAR Point Clouds

稠密点云：

方法一：体素滤波 ---> 提取地面:相邻体素垂直方向的均值和方差 ---> 聚类:去除地面后，欧氏聚类

方法二Base-Of Method：找到roof，并把roof及以下的作为base，放进同一个seg

方法三Base-Of With Ground Method：使用方法一去除地面点后，使用方法二

稀疏点云：

1. Gaussian Process Incremental Sample Consensus (GP-INSAC)
   多源三维数据；具体过程看不懂
2. Mesh Based Segmentation
   距离图像构建地形mesh ---> 使用地形mesh梯度提取地面点(梯度提取:梯度足够小的点中最长的flat序列，近且低且最近点为地面点，梯度较大且与地面点相邻) ---> 体素滤波 ---> 欧氏聚类
   假设：距离最近的激光点在地，地面点构成了最长的flat序列

---

# <center>2010</center>

`点云分割` `*****`

2010 Fast Segmentation of 3D Point Clouds for Ground Vehicles

分割地面点; line fit; used in lego-loam

---

`点云分割` `*****`

2010(*) LSD: A Fast Line Segment Detector with a False Detection Control

利用灰度图的灰度梯度提取直线

---

---

# <center>2009</center>

`pnp` `*****`

2009 EPnP: An Accurate O(n) Solution to the PnP Problem

Excellent work. You can't miss it if you are on computer version.

---

# <center>2007</center>

`RTK`

2007(*) 网络RTK定位原理与算法研究

---

# <center>1997</center>

`组合导航`

1997(*) 车载 GPS DR 组合导航系统的研究及其滤波算法

GPS_DR利用测量值和观测方程求取状态转移矩阵

---

# <center>1991</center>

`力学` `**`

1991(*) 机器人机电一体化设计方法与应用研究 运动学及力学分析

考虑了阻尼和弹性的运动学及力学分析
