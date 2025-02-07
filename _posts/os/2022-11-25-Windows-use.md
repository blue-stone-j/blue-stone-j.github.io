---
layout: post
title:  "Windows 使用"
date:   2025-02-07 23:15:06 +0800
categories: [OS]
excerpt: 使用 Windows 系统时遇到的小问题以及解决方案
tags:
  - Windows
  - 
  - 
---

使用 Windows 系统时遇到的小问题以及解决方案。

#### 01

无法连接网络，经 Windows 自带的网络诊断得到如下信息：
>该设备未设置为接受端口4780上的链接  

**原因分析**  
这种情况多出现在你使用了ssr或者是其他的梯子之后，没能正确关闭软件（比如没退出软件就直接关机）。

**解决方法**  
设置 -> 网络 -> 手动设置代理 -> 使用代理服务器 -> 关

![pic1](/assets/images/posts/Windows-use/01-01.jpg)

#### 02

在Windows下，文件在文件列表里能看到文件名、大小、日期等信息，但是打开、重命名或删除等操作的时候，出现“该文件已经被移动重命名或被删除”，出现类似下图所示的警告，可能是文件名存在问题。

![pic2](/assets/images/posts/Windows-use/02-01.PNG)

Windows系统下的文件名中不能含有 `\``/``:``*``?``"``<``>``|`这些符号。正常情况下，重命名后的文件名也不能包含这些符号，如果包含这些符号会出现下图的警告。
![pic3](/assets/images/posts/Windows-use/02-02.PNG)
但在其它操作系统中，文件名可能允许存在这些符号。例如Ubuntu系统中，允许文件名中出现`:`。如果在Ubuntu系统中命名的文件包含`:`，这些文件在Windows下打开就会出现这种文件明明存在却打不开的情况。

#### 03

使用`NetAssist`(网络调试助手)时，把该软件作为服务端，连接时出现错误提示

```C++
bind() failed: The specified address is not available from the local machine.(不能关联到指定地址)
```

修改自己电脑的IP，和在该软件中设定的服务端的IP地址保持一致。子网掩码可选择`255.255.255.255`。

如果使用其它网络调试工具，例如modbus，因为是一样。在无法创建服务端时，检查本地IP是否和要创建的服务端的IP一致。

#### 04

Windows10 不能自动识别并挂在exfat文件系统的移动硬盘。可能是因为驱动器存在问题。可以通过扫描并修复驱动器。也可以在`磁盘管理`中手动挂载，`分配路径和驱动器号`。

##### 05 two same icon on desktop

把C盘Documents and Settings下的All Users.WINDOWS中的桌面文件夹覆盖到了当前用户名下的桌面文件夹中，然后我的桌面上出现了2个一样的图标,删一个另一个也没了。

在升级系统或移动文件夹时把不同用户下的“桌面”文件夹重叠到一起了，解决办法：点 开始－运行－输regedit打开注册表，然后在 HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders 右边窗口找到Desktop键，点右键删除，或者修改成D:\桌面（或者D:\desktop或者 E:\Love You 等等，选在哪个盘下叫什么，你自己根据情况自己定，只要不冲突就行）然后重启动就可以了！ 

##### 06 format large U disk to FAT32

Download a format tool from [here](http://ridgecrop.co.uk/index.htm?guiformat.htm).