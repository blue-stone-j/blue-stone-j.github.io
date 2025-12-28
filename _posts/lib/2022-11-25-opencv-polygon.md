---
layout: post
title:  "opencv polygon"
date:   2025-12-28 20:24:30 +0800
categories: [Tech]
excerpt: 
tags:
  - opencv
  - polygon
---


```C++
#include <opencv2/imgproc.hpp>
void cv::approxPolyDP(InputArray curve, OutputArray approxCurve, double epsilon, bool closed);
```

1. The function reads the input points from curve.
2. It computes a simplified polygon according to the Douglas–Peucker algorithm.
3. It writes new points into approxCurve.

Those points are newly created `cv::Point` / `cv::Point2f` objects. Modifying the result polygon does not modify the original.

```C++
std::vector<cv::Point2f> pts2d;
cv::RotatedRect rect = cv::minAreaRect(pts2d);
cv::Point2f corners2d[4];
rect.points(corners2d); // order is arbitrary but consistent

cv::Point2f center2d = rect.center;

// Orientation angle in radians (OpenCV angle in degrees)
float angle_rad = rect.angle * static_cast<float>(CV_PI) / 180.0f;
```
