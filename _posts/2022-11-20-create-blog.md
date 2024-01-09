---
layout: post
title:  "从零创建博客"
date:   2022-11-20 08:30:00 +0800
categories: [Tech]
excerpt: 从零开始创建博客，也给出了一些小问题的解决方案
tags:
  - blog 
  - Markdowm
  - jekyll
---

这篇文章总结了从零开始创建博客的过程，也介绍了一些相关的小知识点。考虑到某些步骤已经有了很好的教程，我就不再详述这些步骤，直接给出相关的链接。当然，我给出的是其中一种创建和使用的方法，你可以在学习的过程中接触更多的方法。

## 一、创建托管

创建托管的步骤基本就在[这里](https://pages.github.com/)。

## 二、选择模板

#### 1. 推荐一个模板并成功使用
###### (1) 推荐 ice-bear
我使用的模板为`ice-bear`，来自于

###### (2) Jekyll的使用

2. 介绍该模板的文件结构，各文件的作用，Jekyll


![pic1](/assets/images/posts/Windows-use/01-01.jpg)


### Github Pages
必须配置action，才能在每次提交后自动编译部署pages。`setting`->`Pages`->`Build and deployment`处添加编译需要的配置文件。直接使用默认的配置文件即可。然后把该文件添加到库并提交commit。

### 域名配置
这一步的是配置个性化的域名，即不再使用“username.github.io”这个域名(其中`username`为自己的github的用户名)，而是自定义一个域名。
1. 购买域名并在控制台进行配置。
2. 在自己想配置的域名的右侧点击`解析`，在弹出界面中配置。添加需要指向的地址，填“username.github.io”。类型选择“CNAME”。
3. 到github对用的repository中，在`setting`->`Pages`->`Custom domain`中填入需要自己的域名。等待域名检查完成。
4. 这个配置过程在云端也需要一定的时间处理，所以完成上述操作后不一定就能立即使用，但通常3分钟以内云端就能完成。