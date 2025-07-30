---
layout: post
title:  installation and usage of library
date:   2025-07-30 22:02:02 +0800
categories: [OS]
excerpt: linux network 
tags:
  - Linux
  - library
  - runtime
class: sys
---

### check dependencies

```bash
ldd /path/to/libsomething.so
```

### find library links

```bash
# at runtime (which processes are using the library)
lsof | grep libsomething.so

# static inspection of ELF headers for a binary
readelf -d /path/to/binary | grep NEEDED
# or
ldd /path/to/binary | grep something
```

### link library

```bash
# “-lsomething” flag links with libsomething.so
g++ main.cpp -lsomething
```

### find library

search for the actual `.so` file of a library

```bash
ldconfig -p | grep libsomething
```
