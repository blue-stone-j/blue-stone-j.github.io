---
layout: post
title:  installation on linux
date:   2025-07-30 22:02:02 +0800
categories: [OS]
excerpt: linux network 
tags:
  - Linux
  - apt
  - dpkg
class: sys
---

### apt-file

```bash
# install apt-file
sudo apt install apt-file

# shows all the files a package would install (binaries, headers, docs, etc.).
sudo apt-file update
```

### dpkg

```bash
# list all files and paths installed by the package
dpkg -L libopencv-dev

# find the package responsible for a particular file
dpkg -S /usr/include/opencv2/opencv.hpp
```
