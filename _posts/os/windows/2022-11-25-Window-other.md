---
layout: post
title:  "Windows other"
date:   2025-06-02 01:11:23 +0800
categories: [OS]
excerpt:
tags:
  - Windows
  - 
  - 
---

### Environment variable

Environment variable won't take effective instantly. It would be better to restart vscode entirely to make them effective.

##### add qt

Add path like `C:\Qt\5.15.2\msvc2019_64\bin` into `Path`. Restart PowerShell and run `qmake -v`. If you get output like `QMake version: 3.1`, qt has been added.

##### micro store proxy

```bash
0x80190001
```

turn off net proxy and try again.
