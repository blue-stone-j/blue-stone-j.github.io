---
layout: post
title:  "ubuntu 安装及配置"
date:   2025-06-15 21:55:07 +0800
categories: [OS]
excerpt: 安装Ubuntu 18和16的系统，然后添加常用工具。
tags:
  - Ubuntu 
  - Linux
  - 
---

这篇文章整理了整个安装了Ubuntu 16、18、20及相关软件的过程。软件不是必备的，但提供了很多便利。有些步骤在网上已经有很好的教程，我就不再详写这些步骤，直接放出我认为好用的教程链接，并附加注意事项。建议开始每个步骤前先看注意事项。

## 一、准备工作

准备工作有制作安装盘和为新系统腾出空间两个部分，可参考[Ubuntu18.04安装教程-1.2](https://blog.csdn.net/baidu_36602427/article/details/86548203)

##### 注意事项<br />

* 制作安装盘的过程会删除该u盘中原来的所有数据。
* 腾出空间的操作，指的是删除卷，将空间完全释放出来。新建一个空卷会导致无法安装新系统。
* win的磁盘的文件系统类型为NTFS；如果你之前一直使用的win，那么移动硬盘的文件系统类型应该也是NTFS，这一点你可以自行确认；ubuntu的文件格式是ext3和ext4。

ubuntu系统可以访问NTFS的磁盘，但win不能访问ext的磁盘。意味着你可以将文件放在NTFS磁盘中，使文件可以在两个系统中传递和共用，从而减少ubuntu系统的空间需求。我给Ubuntu分配了100G空间，实际上完全没必要这么大。

## 二、安装过程

安装过程可参考[此处](https://blog.csdn.net/baidu_36602427/article/details/86548203)

##### 安装注意事项

* boot选项异常  <br />
  如果之前曾安装过ubuntu但没有正确删除，例如直接在Windows下格式化了Ubuntu对应的盘。那么在boot选项下仍然会有Ubuntu选项。可以选择忽略原来的Ubuntu，选择自己的U盘。删除原来的Ubuntu boot选项的方法可以参考[“删除Win10 EFI启动分区中的Ubuntu启动引导项 ”](https://blog.csdn.net/Spacegene/article/details/86659349)的 2.2
* 修复18的花屏<br />
  如果在安装时出现花屏的情况，参照[这个方法](https://zhuanlan.zhihu.com/p/439088148)解决

>提示: /etc/default/grub, nomodeset, sudo update-grub

* when choose option of installation, I can see "multiple operation systems". that means that I have installed two OS at least. choose the first option, alongside with them.
* 安装类型和空间分配  
  如果选择第三项，自己分配空间。对于新手，我的建议是选择第一个，在安装过程中会自行分配各个空间和挂载点。如果安装第二个Ubuntu系统，你会遇到要求选择一个挂载点的界面，选择准备好的空间(在Windows下划分出的未分配的空间)后把`/`挂在上去。(对于`安装启动器的设备`，选择安装Windows所在的盘，具体可参考[十.10](http://blue-stone.top/blog/linux%E5%AD%A6%E4%B9%A0/)。 )<br /><br />
* 用户名和密码  
  从外界访问时，首先找到按照`计算机名`找到计算机，然后在该计算机内按照`用户名/username`找到用户。第一行的`姓名/name`是让人看的，之后系统会以这个名字称呼你。密码长度自己把握。因为在使用中经常需要输入密码，因此我倾向于使用短密码。在完成安装后也可以按照[这个方法](https://blog.csdn.net/garvie/article/details/55113691)更改为短密码。
  
* if install new ubuntu in a partition where an old ubuntu exit, you will face `initramfs`. I failed to solve it. Then I reboot, use `windows` format this partition, install ubuntu again. Of course, You can choose to solve `initramfs`.

* 如果之前曾安装过ubuntu, and then format this partition。 possible that you can't boot OS and come in `grub`. You can press `F10` to choose a boot option to avoid it.
