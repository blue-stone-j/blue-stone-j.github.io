---
layout: post
title:  Multi-view Geometry
date:   2025-06-23 08:18:45 +0800
categories: [Tech]
excerpt: 多视图几何
tags:
  - 视觉
  - 相机
  - 几何
---

# <center>一、综述和基础知识

### 1. 常用坐标系

* 世界坐标系：这个坐标系是自己规定的，通常根据具体任务确定，单相机任务常用相机坐标系作为世界坐标系，单目SLAM时可能把起始位置作为世界坐标系的原点。
* 相机坐标系：原点在光学镜头的中心，xy轴和图像的xy轴平行，z轴正方向向外。
* 图像坐标系：位于成像平面，图像经过镜头后投影在这个平面。只有xy方向，单位仍然为长度单位，例如毫米mm
* 像素坐标系：只有uv方向，单位为一个像素

### 2. 常用矩阵

**关键矩阵**描述的是两张图像的像素点之间的对应关系。

| 矩阵       | 名称               | 性质                                                                                                                                                                             |
| ---------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 基础矩阵 F | fundamental matrix | 同一个点在两个相机成像平面之间的对应，是二维平面坐标到二维平面坐标的关系;反映【空间一点P的像点】在【不同视角摄像机】下【图像坐标系】中的表示之间的关系；是有方向的，逆方向为转置 |
| 本质矩阵 E | essential matrix   | 反映【空间一点P的像点】在【不同视角摄像机】下【摄像机坐标系】中的表示之间的关系；是三维坐标到三维坐标间的关系,只是这个三维坐标都在图像平面上                                     |
| 单应矩阵 H | homography matrix  | 同一个平面的点在不同图像之间的映射关系，像素到像素的对应                                                                                                                         |

---
