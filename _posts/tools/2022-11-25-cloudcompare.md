---
layout: post
title:  "cloudcompare"
date:   2025-04-08 00:15:12 +0800
categories: [Tech]
excerpt: 记录了cloudcompare的使用方法、技巧以及在使用中遇到的问题和解决方案
tags:
  -  
  - 
  - 
---

记录了cloudcompare的使用方法、技巧以及在使用中遇到的问题和解决方案。

# compile and install

### qa
##### FBX
error during compilation
```bash
CMake Error at plugins/core/IO/qFBXIO/CMakeLists.txt:21 (message):
  No FBX SDK include dir specified (FBX_SDK_INCLUDE_DIR)

CMake Error at plugins/core/IO/qFBXIO/CMakeLists.txt:38 (message):
  FBX SDK library not found: can't link
```
solution:</br>
1. Download `the Autodesk FBX SDK` [here](https://aps.autodesk.com/developer/overview/fbx-sdk). Choose the version that matches your system architecture (e.g., Linux, Windows, macOS) and install it.
2. Follow the instructions in `<yourFBXSDKpath>\Install_FbxFileSdk.txt` to install it.
3. Set `include` and `lib` path in file `plugins/core/IO/qFBXIO/CMakeLists.txt`.

##### las
error during compilation
```bash
plugins/core/IO/qLASIO/cmake/FindLASzip.cmake:28 (find_package_handle_standard_args)
plugins/core/IO/qLASIO/CMakeLists.txt:9 (find_package)
```
For Ubuntu, run `sudo apt-get install liblaszip-dev` to install it.

##### Add support for RDB
```bash    
CMake Error at plugins/core/IO/qRDBIO/CMakeLists.txt:51 (find_package):
  By not providing "Findrdb.cmake" in CMAKE_MODULE_PATH this project has
  asked CMake to find a package configuration file provided by "rdb", but
  CMake did not find one.

  Could not find a package configuration file provided by "rdb" with any of
  the following names:

    rdbConfig.cmake
    rdb-config.cmake
```

##### OpenCASCADE

1. Install Dependencies: 
```bash
sudo apt install cmake g++ make libx11-dev libfreetype6-dev libgl1-mesa-dev libglu1-mesa-dev
```
2. Download the Source Code
```bash
git clone https://github.com/Open-Cascade-SAS/OCCT.git
cd OCCT
```
3. Create a Build Directory
```bash
mkdir build && cd build
```
4. Configure the Build
```bash
cmake .. -DCMAKE_INSTALL_PREFIX=/usr/local
```
5. Build the Source:
```bash
make
```
6. Install OpenCASCADE
```bash
sudo make install
```
7. Update the Library Path (if needed): If OpenCASCADE libraries are not in a standard location, add them to your `LD_LIBRARY_PATH`:
```bash
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
```



##### 