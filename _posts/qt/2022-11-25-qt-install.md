---
layout: post
title:  "install qt"
date:   2025-04-15 00:33:15 +0800
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
