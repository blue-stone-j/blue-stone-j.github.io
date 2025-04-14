---
layout: post
title:  "visual studio 使用"
date:   2025-04-15 00:33:15 +0800
categories: [Tech]
excerpt: 记录了visual studio的使用方法、技巧以及在使用中遇到的问题和解决方案
tags:
  -  visual studio
  - 
  - 
---

记录了visual studio的使用方法、技巧以及在使用中遇到的问题和解决方案。

A `solution` is a higher-level container that can include one or more projects. It helps manage and build them together, especially when they are interdependent.

It has a `.sln` file, which stores:

* The list of projects
* Their configurations (Debug/Release)
* Their relationships (e.g., one project depends on another)

`.vcxproj` file stores infomation of project.

Think of it like this:

* Solution = a workspace or folder that contains multiple projects
* Project = a specific software component or build target within the solution
