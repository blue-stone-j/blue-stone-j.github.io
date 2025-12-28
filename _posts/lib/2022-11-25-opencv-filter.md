---
layout: post
title:  "opencv filter"
date:   2025-12-28 20:24:30 +0800
categories: [Tech]
excerpt: 
tags:
  - opencv
  - filter
  - blur
---

| Method                   | Smoothness  | Edge Preservation | Good For               |
| ------------------------ | ----------- | ----------------- | ---------------------- |
| **blur**                 | low         | none              | simple blur            |
| **GaussianBlur**         | medium      | some              | general smoothing      |
| **medianBlur**           | medium      | good              | impulse noise          |
| **bilateralFilter**      | medium      | excellent         | retaining edges        |
| **fastNlMeansDenoising** | medium–high | good              | denoising with texture |
| **pyrDown**              | low–medium  | some              | multi-scale, resizing  |

```C++
cv::Mat src;
cv::Mat dst;

// Replaces each pixel with the average of its neighborhood
cv::blur(src, dst, cv::Size(5,5)); // simple average
cv::boxFilter(src, dst, -1, cv::Size(5,5), cv::Point(-1,-1), true);

// Replaces each pixel with the median in its neighborhood
// Very effective for removing salt-and-pepper noise
cv::medianBlur(src, dst, 5);

// Weights depend on both spatial distance and intensity difference
cv::bilateralFilter(src, dst, 9, 75, 75);


cv::fastNlMeansDenoising(src, dst, 10, 7, 21);
cv::fastNlMeansDenoisingColored(src, dst, 10, 7, 21);

// Custom Convolution
cv::Mat kernel = (1.0/9.0) * (cv::Mat_<float>(3,3) <<
    1,1,1,
    1,1,1,
    1,1,1);
cv::filter2D(src, dst, -1, kernel);

cv::pyrDown(src, dst);    // smooth + resize
```
