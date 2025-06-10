---
layout: post
title:  "install qt"
date:   2025-06-10 22:33:30 +0800
categories: [Tech]
excerpt: how to install qt
tags:
  - qt 
  - 
---

### Ubuntu 18.04 (Bionic) and Ubuntu 20.04 (Focal)

 This command works as expected and installs Qt 5.12 (or similar) from the official Ubuntu repositories.

```bash
sudo apt install qt5-default qtbase5-dev qtchooser qttools5-dev-tools
```

```bash
sudo apt-get install -y libqt5svg5-dev
sudo apt-get install -y libqt5x11extras5-dev
sudo apt install libqt5charts5-dev
```

### Ubuntu 22.04 (Jammy) and later

```bash
sudo apt install qtbase5-dev qtchooser qttools5-dev-tools qttools5-dev
```

### ubuntu 24

```bash
sudo apt install qtbase5-dev qt5-qmake qttools5-dev-tools
```

### qt 5.15.2

📌 Why is Qt 5.15.2 considered the best?
Last free and open-source LTS version before the LGPL license was restricted.

Widely adopted by large open-source projects like CloudCompare, ROS, KDE, etc.

Supported by nearly all Linux distributions (Ubuntu, Debian, Fedora).

Compatible with modern C++ compilers (GCC 9+, Clang 10+, MSVC 2017/2019).
