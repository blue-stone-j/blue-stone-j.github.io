---
layout: post
title:  "C++ inheritance"
date:   2025-09-10 23:14:20 +0800
categories: [Lan]
excerpt: C++ inheritance
tags:
  - Windows
---

### function hide/override

##### Without virtual keyword

If the base class function is not `virtual`, then function call resolution is done at compile time (static binding). In this case, the function that is called depends on the type of the pointer or reference, not the actual object.

##### With virtual keyword

If the base class function is declared `virtual`, then function call resolution is done at runtime (dynamic binding). In this case, the function called depends on the actual object type, even if accessed through a base class pointer/reference.

##### Explicitly calling base class function
