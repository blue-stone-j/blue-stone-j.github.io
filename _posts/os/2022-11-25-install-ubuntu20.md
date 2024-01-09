---
layout: post
title:  "ubuntu20 安装及配置"
date:   2022-11-20 08:30:00 +0800
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

# 安装cuda
不同版本的库依赖的cuda版本是不一样的。我的选择理由有
1. ubuntu20中默认的PCL库为1.10，cuda11.04是合适的版本之一
2. nvidia发布了cuPCL，其测试的环境为cuda11.04

综上所述，我选择安装cuda11.04.

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
解决方式可以参照这个链接：https://www.cnblogs.com/jiangyibo/p/16828214.html。其本质是因为编译生成库文件或可执行文件时，必须链接`cpp`文件。但是源码里面没有对应的`cpp`文件。这个解决方案中创建了空`cpp`文件并链接过去。

# pcl
ubuntu20 的默认安装是不包含gpu和cuda模块的。如果要使用这两个模块，必须通过源码编译安装，在编译时也要选择对应的模块。

### 1. 下载1.10.1
注意不要使用1.10.0这个版本，这个版本的源码存在bug，无法正确完成编译安装。

### 2. 执行cmake
执行`ccmake .. -DCMAKE_BUILD_TYPE=Release`配置cmake。

1. 如果报和 `ccmake` 相关的错误，按照终端提示输入 `sudo apt-get install cmake-curses-gui` 安装后再运行
2. `By not providing "Findrealsense2.cmake" in CMAKE_MODULE_PATH this project has asked CMake to find a package configuration file provided by "realsense2", but CMake did not find one.`: `sudo apt install ros-$ROS_DISTRO-realsense2*`
3. `Unsupported gpu architecture 'compute_30'`: gpu的硬件架构不支持'compute_30'，把配置cmake的界面中的`CUDA_ARCH_BIN`对应的右侧里的"3.0"删除，这样就不需要针对“3.0”这个架构生成库文件。
4. `/home/hyc-pc/software/pcl/cuda/common/include/pcl/cuda/point_cloud.h(199): error: shared_ptr is not a template`: 这是1.10.0版本存在的bug，下载1.10.1再安装。
