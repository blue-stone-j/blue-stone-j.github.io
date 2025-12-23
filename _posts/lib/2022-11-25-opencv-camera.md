---
layout: post
title:  "opencv-camera"
date:   2025-12-23 20:18:44 +0800
categories: [Tech]
excerpt:
tags:
  - opencv
  - camera
---

# projection

```c++
std::vector<cv::Point3d> objectPoints = { Pc };
std::vector<cv::Point2d> imagePoints;

cv::Vec3d rvec(0, 0, 0);   // rotation vector, camera -> world, zero = identity
cv::Vec3d tvec(0, 0, 0);   // translation, camera origin in world, zero = no shift

// 1. Extract R_wc and t_wc from Affine3d
Eigen::Matrix3d R_wc = T_wc.rotation();      // or T_wc.linear()
Eigen::Vector3d t_wc = T_wc.translation();

// 2. Convert to world->camera
Eigen::Matrix3d R_cw = R_wc.transpose();
Eigen::Vector3d t_cw = -R_cw * t_wc;

// 3. Convert to OpenCV types
cv::Mat R_cv(3, 3, CV_64F);
for (int r = 0; r < 3; ++r)
    for (int c = 0; c < 3; ++c)
        R_cv.at<double>(r, c) = R_cw(r, c);

cv::Vec3d tvec(t_cw.x(), t_cw.y(), t_cw.z());

// 4. Rodrigues: rotation matrix -> rotation vector
cv::Vec3d rvec;
cv::Rodrigues(R_cv, rvec);

cv::fisheye::projectPoints(
    objectPoints,
    imagePoints,
    rvec,
    tvec,
    K,
    D
);
```

### undistortion

##### new camera intrinsic matrix for fisheye camera

* K: Original intrinsic matrix
* D: Distortion coefficients from cv::fisheye::calibrate
* imageSize: Image size
* balance: 0 or 1, tradeoff between "keeping field of view" vs. "removing black borders"
* K_new: Output "optimal" matrix for undistortion

```C++
#include <opencv2/calib3d.hpp>

cv::Mat K_new;
cv::fisheye::estimateNewCameraMatrixForUndistortRectify(
    K, D, imageSize, cv::Matx33d::eye(), K_new, balance, imageSize, 1.0);
```

```C++
cv::Mat K, D; // original intrinsics and distortion (fisheye)
cv::fisheye::estimateNewCameraMatrixForUndistortRectify(K, D, image_size, cv::Matx33d::eye(), K_new);
cv::Mat map1, map2;

cv::fisheye::initUndistortRectifyMap(K, D, cv::Matx33d::eye(), K_new, image_size, CV_16SC2, map1, map2);
```

Then:

* K_new is the intrinsic matrix of the undistorted image
* Distortion coefficients are `[0, 0, 0, 0]` (the undistorted image is rectified and has no distortion)

##### new camera intrinsic matrix for pinhole camera

```C++
cv::Mat new_K = cv::getOptimalNewCameraMatrix(K, distort_coeffs, image_size, alpha, new_image_size);
cv::Mat map1, map2;
cv::initUndistortRectifyMap(K, distort_coeffs, cv::Mat(), new_K, new_image_size, CV_16SC2, map1, map2);
```

After this:

* Intrinsic: new_K
* Distortion: `[0, 0, 0, 0, 0]`

##### remap(undistort)

```C++
cv::remap(img, undistort, map1, map2, cv::INTER_LINEAR, cv::BORDER_CONSTANT);
```

| Border type              | Behavior                           | Typical use                 |
| ------------------------ | ---------------------------------- | --------------------------- |
| `cv::BORDER_CONSTANT`    | Fill with constant (default black) | Undistortion, rectification |
| `cv::BORDER_REPLICATE`   | Repeat nearest edge pixel          | Avoid black borders         |
| `cv::BORDER_REFLECT`     | Mirror at border                   | Image processing, filtering |
| `cv::BORDER_WRAP`        | Wrap around                        | Rare, not for vision        |
| `cv::BORDER_TRANSPARENT` | Do not modify dst                  | Compositing                 |

### pnp

`cv::solvePnP` assumes the pinhole camera model with radial/tangential distortion, not a fisheye projection. The result of `cv::solvePnP` gives the camera pose with respect to the world frame expressed in the camera frame. The returned translation vector describing the transformation from the world coordinate system to the camera coordinate system.
