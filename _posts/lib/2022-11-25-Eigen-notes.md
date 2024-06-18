---
layout: post
title:  "Eigen学习"
date:   2022-11-20 08:30:00 +0800
categories: [Tech]
excerpt: 常用Eigen函数；Eigen的数据结构；等等。
tags:
  - Eigen
  - 
  - 
  - C++
---
这篇文章整理了常用Eigen函数(用途、参数的意义，必要时也会列出该函数所在的头文件)以及一些其它关于Eigen库的知识。

### 一、基础知识

##### 1. 参考资料
* [1]http://zhaoxuhui.top/blog/2019/08/21/eigen-note-1.html

##### 3. 模块组成
* Core：Matrix和Array类，基础的线性代数运算和数组操作；
* Geometry：旋转，平移，缩放，2维和3维的各种变换；
* LU：求逆，行列式，LU分解；
* Cholesky：LLT和LDLT Cholesky分解；
* Householder：Householder变换；
* SVD：SVD分解；
* QR：QR分解。
* Eigenvalues：特征值，特征向量分解。
* Sparse：稀疏矩阵的存储和运算。
* Dense：包含了Core、Geometry、LU、Cholesky、SVD、QR、Eigenvalues等模块。
* Eigen：包含了Dense和Sparse模块。

##### 2.安装及CMake声明与使用
[reference-1,2](https://zhaoxuhui.top/blog/2019/08/21/eigen-note-1.html#1%E5%BA%93%E7%9A%84%E5%AE%89%E8%A3%85)

##### 3.使用
```C++
#include <Eigen>
Eigen::MatrixXd mat(line, row); // 矩阵
```

##### 4. 类型
todo: 
* Matrix
* Vector
* Affine
* Isometry
* Array
* Quaternion

### 二、创建及元素获取
本部分主要介绍Eigen中矩阵与向量的定义 index.
##### 1.
```C++
Matrix<Scalar, RowsAtCompileTime, ColsAtCompileTime, Options>
```
* Scalar：指定元素类型，比如，float, double, bool, int 等。
* RowsAtCompileTime：指定行数或者设置成动态（Dynamic）；
* ColsAtCompileTime：指定列数或者设置成动态（Dynamic）；
* Options：标志位，可以是ColMajor或RowMajor，默认是ColMajor；


```C++
Matrix<double, 3, Dynamic> m;
Eigen::MatrixXf matrix1(2,3);  // 定义了矩阵的大小，但是没有初始化;元素类型是float
Eigen::VectorXd vector1(4);    // 列向量;元素类型是double
Eigen::RowVectorXi vector1(4); // 行向量;元素类型是int
Eigen::Affine3f affine1;       // 3D 
```
##### 2. 初始化
```C++
mat << 1, 2, 3,
       4, 5, 6;
mat.setIdentity(rows, cols); 
mat.setZero(rows, cols);
mat.setOnes(rows, cols);  
mat.setRandom(rows, cols);
```

##### 3. 特殊矩阵
* MatrixXd::Random(m,n)：创建m×n维double类型的随机数矩阵
* MatrixXd::Constant(m,n,p)：创建m×n维double类型元素全为p的矩阵
* MatrixXd::Zero(m,n)：创建m×n维元素全为0的矩阵
* MatrixXd::Ones(m,n)：创建m×n维元素全为1的矩阵
* MatrixXd::Identity(m,n)：创建m×n维的单位阵
* VectorXd::LinSpaced(size,low,high)：创建一个size长度的从low到high的向量或一维矩阵

##### 4. 元素获取
**矩阵元素获取**
* mat.rows() : 获取矩阵的行数
* mat.cols() : 获取矩阵的列数
* mat.size() : 获取矩阵的元素个数
* mat.data() : 返回一个指向矩阵或向量的首地址的指针, 以把这个返回值当做数组来使用。
* mat.row(p) : 单独取出第p行
* mat.col(p) : 单独取出第p列
* mat.topLeftCorner(p,q) : 取出左上角p行q列的元素, [参考](https://eigen.tuxfamily.org/dox/group__TutorialBlockOperations.html)
* mat(2,3) : 第3行第4列的元素
**向量元素获取**
* vec.segment(i,n) : 取向量第i到第i+n个元素，n is excluded
* vec.segment<n>(i) : 动态向量
* vec.head(n) : 前 n 个元素
* vec.tail(n) : 后 n 个元素
* vec.x() : 获取向量 vec 的第一个元素
* vec.w() : 获取向量 vec 的第4个元素
* vec(3) : 获取向量 vec 的第4个元素
* vec[3] : 获取向量 vec 的第4个元素

### 三、 数据操作及本身运算
##### 1. type conversion
* `Eigen::Affine3f`和`Eigen::Matrix4f`的转换
```C++
Eigen::Affine3f A;
Eigen::Matrix4f M;
M = A.matrix();
A = M;
```
* 矩阵|数组 <-->  普通数组 C++数组
```C++
Eige::Array arr;
float *a; a = mat.data(); // share memory
mat = arr.matrix(); // share memory
arr = mat.array();
```

* std::vector和Eigen::Matrix的转换
```C++
std::vector<double> ext;
Eigen::Matrix3d mat;
mat=Eigen::MatrixXd::Map(ext.data( ), 3, 3);
Eigen::VectorXd pf = Eigen::Map<Eigen::VectorXd, Eigen::Unaligned>(ext.data(), ext.size());
ext = std::vector<double>(&mat[0], mat.data()+mat.cols()*mat.rows());
```


##### 2. 自身赋值
Eigen使用了lazy evaluation(懒惰评估),默认都是存在混淆混叠的，也就是在计算过程中会覆盖原来位置的值。
* `eval()`  
自己对自己进行赋值的时候，先把结果存到临时变量,避免Eigen中的混叠（aliasing）问题.
```C++
mat = 0.5 * (mat + mat.transpose()).eval(); 
```
* `InPlace()`  
强调改变矩阵自身
```C++
Matrix3d T;
T.col(0) = e1;
T.col(1) = e2;
T.col(2) = e3;
T.transposeInPlace();
```

* `noalias()`  
为了避免混淆，Eigen会在计算中创建一个临时变量来存储计算的中间值。使用这个函数则明确表示不存在混淆，使eigen在计算时不再创建临时变量，可以提高计算效率。

##### 3. 矩阵本身运算
* transpose() : 
* inverse() : 逆矩阵
* conjugate() : 共轭矩阵,实数的共轭还是其本身。
* adjoint() : 伴随矩阵
* trace(): 矩阵的迹
* eigenvalues() : 特征值
* determinant() : 行列式的值
* diagonal() : 矩阵对角线元素 consist a new diagonal matrix
* sum() : 所有元素求和
* prod() : 所有元素求积
* mean() : 所有元素求平均
* minCoeff() : 所有元素最小值
* minCoeff(&i,&j) : 元素最小值的位置，i、j为int类型或为Eigen的Index类型。
* maxCoeff() : 所有元素最大值
* maxCoeff(&i,&j) : 所有元素最大值的位置
* nonZeros() : 非零元素个数
* squaredNorm() : 矩阵(向量)的平方范数，对向量而言等价于其与自身做点积，数值上等于各分量的平方和。
* norm() : 矩阵(向量)的平方范数开根号(对于向量即求模长)
* lpNorm<p>() : p范数
* lpNorm<Infinity>() : 无穷范数
* normalize() : 矩阵(向量)的正则化(归一化)，使所有元素的平方和等于1。
* (mat>0).all() : 矩阵元素条件判断，mat中所有元素是否都大于0，是返回1，否则返回0。
* (mat>0).any() : 矩阵元素条件判断，mat中所有元素是否有大于0的，有返回1，否则返回0。
* (mat>0).count() : 矩阵符合条件的元素计数，返回mat中大于0元素的个数。
* colwise() : 返回矩阵每列的值(把每列作为元素，todo)
* rowwise() : 返回矩阵每行的值
* fill() : 将所有元素均赋值为 n
* mat1.transpose().colwise().reverse() : Rot90
* eeshape() : 不改变矩阵元素个数的情况下，改变矩阵中元素的大小,例如转置

##### 4. Array本身运算
* abs() : 
* sqrt() : 
* pow() : 
* arr1.min(arr2) : 将两个Array中相应位置的最小值组成一个新Array
* arr1.max(arr2) : 将两个Array中相应位置的最大值组成一个新Array
* square() : 

##### 4. 向量本身运算
```C++
vec.setRandom(); // 设置随机数
```

##### 5. Eigen::Map
Eigen::Map 的作用是将一个已有的 C 数组映射为一个 Eigen 的向量或者矩阵。可以使用 Eigen 向量和矩阵的各种操作函数,依然使用已有数组的空间。
```C++
Map<MatrixXd> md1(data, 2, 4);
```


##### 9. Eigen与OpenCV的数据类型转换
```C++
Eigen::Matrix<float, 2, 3> matrix_23f;
matrix_23f << 1, 2, 3, 
			  4, 5, 6;
cv::Mat mat_23f;
cv::eigen2cv(matrix_23f, mat_23f);

cv::Mat mat_23f(2, 3, CV_32F); // 也可以不加括号后面的，直接定义 cv::Mat mat_23f;
mat_23f = (cv::Mat_<float>(2, 3) << 
	1, 2, 3, 
	4, 5, 6);
Eigen::Matrix<float, 2, 3> matrix_23f;
cv::cv2eigen(mat_23f, matrix_23f);
```

##### example
* 把extRotV中的数据按行优先的方式放入3×3矩阵中;extRot为该矩阵的映射;extRot可以使用Eigen矩阵的各种操作函数
```C++
extRot = Eigen::Map<const Eigen::Matrix<double, -1, -1, Eigen::RowMajor>>(extRotV.data(), 3, 3);
```

* 从矩阵isamNoise(0,0)处起，向右向下得到3×3的矩阵;取该矩阵的对角元构建对角矩阵;把对角矩阵的主元放入数组;把数组元素强制转换为float
```C++
Eigen::Vector3f rpyN = isamNoise.block<3, 3>(0, 0).diagonal().array().cast<float>();
```

* <矩阵块的大小>(矩阵块的起始位置，必须是静态变量) = (数值初始化向量).转换为对角矩阵

```C++
imuNoise.block<3, 3>(acc, acc) = Eigen::Vector3f(accSquare, accSquare, accSquare).asDiagonal();
```

### 四、 矩阵运算
##### 1. 向量的叉乘和点乘
```C++
Eigen::Vector3d a,b;
a.dot(b);
a.cross(b);
kroneckerProduct(mat1，mat2); //???
```

##### 2. 
* 特征值,特征向量
```C++
Eigen::EigenSolver<Eigen::Matrix2d> eigen_solver(mat);
Eigen::MatrixXd eig_value = eigen_solver.pseudoEigenvalueMatrix();
Eigen::MatrixXd eig_vector = eigen_solver.pseudoEigenvectors();
```

##### 3. 

```C++
MatrixXf m(2,2);
MatrixXf n(2,2);

result = m.array() * n.array(); // 相乘结果还是 Array
result = m.cwiseProduct(n); // 对应项相乘
```

##### 6. rotation
* 角轴 <--> 四元数

```C++
Eigen::AngleAxisd rollAngle(Eigen::AngleAxisd(rpy[0],Eigen::Vector3d::UnitX()));
Eigen::AngleAxisd pitchAngle(Eigen::AngleAxisd(rpy[1],Eigen::Vector3d::UnitY()));
Eigen::AngleAxisd yawAngle(Eigen::AngleAxisd(rpy[2],Eigen::Vector3d::UnitZ()));
Eigen::Quaterniond q3 = yawAngle*pitchAngle*rollAngle;

Quaternionf q1;
q1 = AngleAxisf(roll, Vector3f::UnitX()) * AngleAxisf(pitch, Vector3f::UnitY()) * AngleAxisf(yaw, Vector3f::UnitZ());

AngleAxisf aa1;
aa1 = q; // 赋值是可以的，不过必须要像这样分两行写，而不能写成一行 `AngleAxisf aa = q`。
AngleAxisf aa2(q);
```

* 旋转阵 --> 四元数

```C++
Matrix3f rot = Matrix3f::Identity();
Quaternion q3;
q3 = rot; // 赋值可以，不过必须要像这样分两行写，而不能写成一行 `Quaternion q2 = rot`
Quaternion q4(rot);

Matrix3f rot1 = q.toRotationMatrix();
```
* 旋转阵 --> 欧拉角
```C++
Vector3f angles = rot1.eulerAngles(0, 1, 2); 
```

##### 7. Enclidean Transformation Matrix
```C++
Eigen::Isometry3d T = Eigen::Isometry3d::Identity(); // 虽然称为 3d ，实质上是 4*4 的矩阵
T.rotate ( rotationAxis ); // 按照 angle-axis 记录的旋转阵进行旋转
T.pretranslate ( Eigen::Vector3d ( 1,3,4 ) ); // 在变换阵的”左边“添加一个平移
T.translate( Eigen::Vector3d ( 1,3,4 ) ); // 在变换阵的”右边“增加一个平移???
```
* 
* 

### 五、求解
```C++
// Solve Ax = b. Result stored in x. Matlab: x = A \ b.
x = A.ldlt().solve(b));  // A sym. p.s.d.    #include <Eigen/Cholesky>
x = A.llt().solve(b));  // A sym. p.d.      #include <Eigen/Cholesky>
x = A.lu().solve(b));  // Stable and fast. #include <Eigen/LU>
x = A.qr().solve(b));  // No pivoting.     #include <Eigen/QR>
x = A.svd().solve(b));  // Stable, slowest. #include <Eigen/SVD>
// .ldlt() -> .matrixL() and .matrixD()
// .llt()  -> .matrixL()
// .lu()   -> .matrixL() and .matrixU()
// .qr()   -> .matrixQ() and .matrixR()
// .svd()  -> .matrixU(), .singularValues(), and .matrixV()
```
* 
* 
* 
* 
* 
* 

### 六、 calculate
##### 1. 
----------------------------------------
reshape()
resize()
conservativeResize()
cwiseProduct()
cwiseAbs()
cwiseSqrt()
cwiseMin()

## 一、基础知识

#### 2

欧氏变换矩阵使用 Eigen::Isometry

```C++
```




### 2. 运算
















