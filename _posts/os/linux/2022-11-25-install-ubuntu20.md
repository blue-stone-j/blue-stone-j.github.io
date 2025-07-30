---
layout: post
title:  "ubuntu20 安装及配置"
date:   2025-07-30 22:02:02 +0800
categories: [OS]
excerpt: 安装Ubuntu 20系统，然后安装常用库。
tags:
  - Ubuntu 
  - Linux
  - 
---

这篇文章整理了安装Ubuntu 20的相关库的过程。有些步骤在网上已经有很好的教程，我就不再详写这些步骤，直接放出我认为好用的教程链接，并附加注意事项。建议开始每个步骤前先看注意事项。

由于库之间有复杂的必要的依赖关系，因此，库的安装必须要按照一定的顺序，而且要使用正确的版本。

# 安装nvidia驱动

nvidia驱动的版本可以高一点，可以兼容低版本的cuda。

开关机之后驱动就没有了。状况如下：

1. 输入命令`nvidia-smi`显示`NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver. Make sure that the latest NVIDIA driver is installed and running`。
2. 输入命令`nvcc -V`没报错 说明cuda还是在的。
3. 输入`whereis nvidia`显示`nvidia: /usr/lib/x86_64-linux-gnu/nvidia /usr/lib/nvidia /usr/share/nvidia /usr/src/nvidia-535.54.03/nvidia`。

解决方案：

```bash
sudo apt-get install dkms #DKMS全称是Dynamic Kernel Module Support，它可以帮我们维护内核外的这些驱动程序，在内核版本变动之后可以自动重新生成新的模块。
sudo dkms install -m nvidia -v 535.54.03 #410.78是安装驱动的版本
```

解决方案来自这个[链接](https://www.jianshu.com/p/3cedce05a481)。

`lspci | grep -i nvidia`

```bash
01:00.0 VGA compatible controller: NVIDIA Corporation Device 25a2 (rev a1)
01:00.1 Audio device: NVIDIA Corporation Device 2291 (rev a1)
```

在这个[网站](https://admin.pci-ids.ucw.cz/read/PC/10de)查询"25a2",可以查到显卡型号为“GA107M [GeForce RTX 3050 Mobile]”。

# 安装cuda

不同版本的库依赖的cuda版本是不一样的。我的选择理由有

1. ubuntu20中默认的PCL库为1.10，cuda11.04是合适的版本之一
2. nvidia发布了`cuPCL`，其测试的环境为cuda11.04

综上所述，我选择安装cuda11.04.

### use docker from nvidia

This image includes: `nvcc` and development libraries.

```bash
docker pull nvidia/cuda:12.9.0-devel-ubuntu20.04

docker run --rm -it --gpus all nvidia/cuda:12.9.0-devel-ubuntu20.04 bash
```

# qt

ubuntu20 默认的qt版本为5.12.8。如果没有特殊要求，最好使用这个版本，可以通过命令行安装到默认位置。这样在安装依赖qt的库时，就可以自动找到qt的相关路径，不需要自己配置路径。

1. 安装Qt工具包: `sudo apt-get install qtbase5-dev qtchooser qt5-qmake qtbase5-dev-tools`
2. 安装Qt Creator: `sudo apt-get install qtcreator`
3. 安装Qt5: `sudo apt-get install qt5*`

# vtk

pcl1.10对应的vtk至少要8.2.0。

### 1. 执行cmake配置

```bash
ccmake .. 
-DCMAKE_BUILD_TYPE:STRING=Release 
-DBUILD_SHARED_LIBS:BOOL=ON 
-DVTK_Group_Qt:BOOL=OFF 
-DVTK_Group_Rendering:BOOL=ON 
-DVTK_Group_StandAlone:BOOL=ON 
-DVTK_Group_Tk:BOOL=OFF 
-DCMAKE_INSTALL_PREFIX=/usr/local/vtk-8.2
```

使用以上命令可以进入一个GUI界面，选择需要安装的模块。如果右侧的部分路径以`NOTFOUND`结尾，说明没有找到相应的依赖库的路径，需要手动配置。也可以直接按`c`进行配置，然后根据报错逐个解决。这里是我安装是遇到的一些问题及解决方案。

1. `X11_Xt_LIB could not be found. Required for VTK X lib.`: `sudo apt-get install libxt-dev `
1. `Qt5X11Extras_DIR`: `sudo apt install libqt5x11extras5-dev`
2. `qt5uiplugin_dir-notfound`: `sudo apt-get install qttools5-dev`
3. `CMake could not find OpenGL in Ubuntu` or `Could NOT find OpenGL (missing: EGL)`: `sudo apt-get install libegl1-mesa-dev`

### 2. 编译安装

```bash
make -j8
sudo make install
```

# flann

1. 执行`ccmake .. -DCMAKE_BUILD_TYPE=Release`配置cmake。
2. `NVCC_COMPILER_BINDIR`: 这个如果是空的，不用管
3. `CUDA_TOOLKIT_ROOT_DIR`: `/usr/local/cuda`。如果没有自动找到，就这样配置路径。这个路径是安装cuda的默认路径。如果你使用了其它路径，自己作相应的改动。
4. 我使用的cuda为11.04，编译`flann 1.9.1`失败，编译`1.9.2`成功。
5. cmake编译flann的时候报错如下：

```bash
No SOURCES given to target: flann_cpp
```

解决方法如下

```bash
touch src/cpp/empty.cpp
sed -e '/add_library(flann_cpp SHARED/ s/""/empty.cpp/' \
-e '/add_library(flann SHARED/ s/""/empty.cpp/' \
-i src/cpp/CMakeLists.txt
```

参考自这个链接：<https://www.cnblogs.com/jiangyibo/p/16828214.html>。其本质是因为编译生成库文件或可执行文件时，必须链接`cpp`文件。但是源码里面没有对应的`cpp`文件。这个解决方案中创建了空`cpp`文件并链接过去。

# Sophus

如果使用默认的安装位置，可以在文件`/usr/local/share/sophus/cmake/SophusConfigVersion.cmake`中查看版本信息。我安装的版本为`1.22.10`。该库不支持Debug模式，编译时如果使用debug模式，得到的可执行文件无法执行。

正常运行该版本的`Sophus`需要安装`fmt-9.0.0`。为了不让使用FMT库的时候出现`undefined reference to 'fmt::v7::'` ，在所有使用了FMT库的前面使用宏定义：

```C++
#define FMT_HEADER_ONLY
```

# other common libraries

```bash
sudo apt install wget
sudo apt install git

# SuiteSparse is a collection of sparse matrix algorithms.
sudo apt install libsuitesparse-dev

sudo apt-get install libssl-dev

sudo apt install libgoogle-glog-dev

# a C++ library developed by Google to handle command-line flags and arguments in a structured and type-safe way.
# allows you to declare and parse command-line options (flags) without manually parsing argv[].
sudo apt install libgflags-dev

sudo apt install libgtest-dev

# default version 1.71
sudo apt install libboost-all-dev

# a C++ library developed by Google that provides highly memory-efficient hash table implementations
# googlhash, used by eigen
sudo apt install libsparsehash-dev

# Automatic Differentiation by OverLoading in C++, used by eigen
sudo apt install libadolc-dev

# a high-performance numerical library for solving large, sparse, nonsymmetric systems of linear equations of the form Ax = b. used by eigen
sudo apt install libsuperlu-dev

# a helper tool used when compiling and linking programs.
sudo apt install pkg-config

# FFTW (Fastest Fourier Transform in the West) is a highly optimized C library for computing discrete Fourier transforms (DFTs) in one or more dimensions
# used by eigen
sudo apt install libfftw3-dev

# MPFR (Multiple Precision Floating-Point Reliable) is a C library for arbitrary-precision floating-point arithmetic, with correct rounding.
# used by eigen
sudo apt install libmpfr-dev

# GMP (GNU Multiple Precision Arithmetic Library) is a C library for arbitrary-precision arithmetic
sudo apt install libgmp-dev

# mpreal is a C++ wrapper for the MPFR library, designed to provide an easy and natural interface for arbitrary-precision floating-point arithmetic
# used by eigen
git clone https://github.com/advanpix/mpreal.git
cd mpreal
mkdir build && cd build
cmake ..
make
sudo make install

# METIS is a software library for partitioning graphs, computing fill-reducing orderings for sparse matrices, and related problems.
# used by ceres
sudo apt-get install libmetis-dev

# This tool is commonly used on Debian-based Linux distributions (like Ubuntu) to display Linux Standard Base (LSB) and distribution-specific information, such as the release number and codename.
sudo apt install lsb-release

# cereal： a header-only C++11 serialization library that makes it easy to serialize and deserialize data (e.g., to JSON, XML, or binary formats).
sudo apt install libcereal-dev

# protobuf: on Ubuntu 20.04, the default version of protobuf is 3.6.1 and the corresponding shared library version is libprotobuf.so.23
# check version of protobuf
protoc --version
```

# configuration

The default version of `glibc` (GNU C Library) on Ubuntu 20.04 (Focal Fossa) is `2.31`. `GLIBC_2.2.5,` is a backward-compatible symbol version that has existed for many years. All modern `glibc` versions (including 2.31) support `GLIBC_2.2.5`.

### keyring

Open application `Passwords and Keys`.
