---
layout: post
title:  "windows coding qa"
date:   2025-06-27 00:16:38 +0800
categories: [OS]
excerpt: windows coding qa
tags:
  - qa
---

##### not found metis

I use `gtsam` on my project. `gtsam` hs been installed correctly. When I ran the generated exe file, I get a window that show a error message.

```bash
can't find metis.dll
```

Reason and solution: `gtsam` was installed but not added into `PATH`. I found the file `metis.dll` where `gtsam` was installed and copied it to the folder that the exe file locates. It worked.
