---
layout: post
title:  "Windows Command"
date:   2026-04-12 14:27:13 +0800
categories: [OS]
excerpt:
tags:
  - Windows
  - 
  - 
---

```powershell

# Prompt #

dir | findstr ".cpp"

# Case-insensitive search
dir | findstr /i "cpp" 

# Matches lines starting with test
dir | findstr /r "^test"

# Invert match (exclude lines)
dir | findstr /v "Debug"

```

```powershell
dumpbin /exports xx.dll
dumpbin /linkermember:2 xx.lib

# check architecture of target
dumpbin /headers your_program.exe | findstr machine
```
