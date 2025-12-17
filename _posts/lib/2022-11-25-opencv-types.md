---
layout: post
title:  "opencv-types"
date:   2025-12-17 18:52:43 +0800
categories: [Tech]
excerpt: data types in opencv
tags:
  - opencv
  - C++
---

data types in opencv and types conversion.

# cv::Mat

### declaration and initialization

```C++
//元素类型为float；Scalar::all(0)：所有元素赋值为0
cv::Mat matA(3, 3, CV_32F, cv::Scalar::all(0)); 
```

`cvSetZero`: for dense, set all element as 0; for sparse, remove all elements.

```C++
void cvSetZero( CvArr* arr ) ;
```

Initialize from data pointer of `std::vector`.

```C++
std::ifstream file("test.jpg", std::ios::binary);
std::vector<uchar> buffer(std::istreambuf_iterator<char>(file), {});
cv::Mat img = cv::imdecode(buffer, cv::IMREAD_COLOR);
```

| What your `std::vector` contains | Can use `imdecode`? |
| -------------------------------- | ------------------- |
| JPEG/PNG/BMP encoded data        | ✔ Yes               |
| Raw pixel values (RGB, gray)     | ✘ No                |
| Float data                       | ✘ No                |
| Point cloud data                 | ✘ No                |
| Any numeric array                | ✘ No                |

### deconstructor

```C++
// Releases memory and resets the matrix to an empty state
mat.release();
```

### scalar

penCV matrix types follow the naming pattern:

```C++
CV_<bit_depth><S|U|F>C<number_of_channels>
```

* `bit_depth`: number of bits per channel
* `S`: signed integer
* `U`: unsigned integer
* `F`: floating point
* `C<number>`: number of channels

* `CV_8U` = 8-bit unsigned (0–255)
* `CV_8S` = 8-bit signed (−128–127)
* `CV_16U` = 16-bit unsigned
* `CV_16S` = 16-bit signed
* `CV_32S` = 32-bit signed integer
* `CV_32F` = 32-bit floating point
* `CV_64F` = 64-bit floating point

### access

`cvmSet` and `cvmGet` is 访问`CV_32FC1`和`CV_64FC1`型数组的最简便的方式，其访问速度和直接访问几乎相同.

```C++
Scalar value;
// (out, in, in, in)
cvmSet( mat,row, col, value);
// (in,in,in)
value = cvmGet( mat, row, col);

//CV_[The number of bits per item][Signed or Unsigned][Type Prefix]C[The channel number]
//CV_8UC3：8位的 unsigned char 型，每个像素由三个元素组成三通道
```

cv::Mat的赋值`=`，默认是浅拷贝。

### type conversion

##### conversion between mat and array

数组转为`mat`

```C++
unsigned char cbuf[height][width];
cv::Mat img(height, width, CV_8UC1, (unsigned char*)cbuf);
```

`mat`转为数组

```C++
unsigned char *array=new unsigned char[mat.rows*mat.cols];
 
if (mat.isContinuous())
    array = mat.data;
```

##### conversion between mat and std::vector

```C++
cv::Mat a,b;
std::vector<double> vec;

a.convertTo(b,CV_64F);
vec = std::vector<double>(b.reshape(1,b.rows*b.cols)); // 把b转换为一个行矩阵，再转换为向量

a = cv::Mat(vec,true);
```

##### conversion between mat with different types

```C++
cv::Mat mat_23f(2, 3, CV_32F);
mat_23f = (cv::Mat_<float>(2, 3) << 
 1, 2, 3, 
 4, 5, 6);
cv::Mat mat_23d(2, 3, CV_64F);
mat_23f.convertTo(mat_23d, CV_64F);
```

# IplImage

```C++
IplImage image2;
cv_bridge::CvImagePtr cv_ptr;
// initialize cv_ptr
image2.imageData = (char *) cv_ptr->image.data;
```

详细参考[此处](https://answers.ros.org/question/43071/convert-cvimageptr-cvimage-channel-to-iplimage/)

# cv::Vec3x

* `cv::Vec3b` is OpenCV’s small, fixed-size vector type with 3 elements of type `uchar` (`unsigned char`, 0–255).
* `cv::Vec3f`: float
* `cv::Vec3d`: double
* `cv::Vec3i`: int

# color conversion

### CIELAB

The CIE Lab (often written as CIELAB) color space is a perceptually uniform color model designed to approximate how human vision perceives color differences. Equal numerical differences correspond roughly to equal perceived color differences.

| Channel | Meaning     | Typical Range (OpenCV float) | Interpretation                     |
| ------- | ----------- | ---------------------------- | ---------------------------------- |
| **L***  | Lightness   | 0 → 100                      | 0 = black, 100 = white             |
| **a***  | Green–Red   | −128 → +127                  | Negative = green, Positive = red   |
| **b***  | Blue–Yellow | −128 → +127                  | Negative = blue, Positive = yellow |

##### conversion between color and lab

```C++
cv::cvtColor(bgr, lab, cv::COLOR_BGR2Lab);
cv::cvtColor(lab, bgr, cv::COLOR_Lab2BGR);
```

converts an image from the BGR color space (the default used by OpenCV when reading images) to the CIE Lab color space.

##### practical usage

* **Segmentation**: you can threshold only the a and b channels to separate colors regardless of brightness.
* **Color correction**: modify only L for lightness, leaving color intact.
* **Difference measurement**: Use the ΔE metric (e.g., ΔE₀₀) to measure how similar two colors are.
