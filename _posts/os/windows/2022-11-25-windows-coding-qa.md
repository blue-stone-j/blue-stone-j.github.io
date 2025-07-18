---
layout: post
title:  "windows coding qa"
date:   2025-07-18 23:47:10 +0800
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

##### _ITERATOR_DEBUG_LEVEL

```plaintext
error LNK2038: mismatch detected for '_ITERATOR_DEBUG_LEVEL': value '0' doesn't match value '2'
```

library with type `release` can't be linker to library with type `debug`.
