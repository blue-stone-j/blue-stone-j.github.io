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

# 一、创建托管

创建托管的步骤基本就在[这里](https://pages.github.com/)。

# 二、Jekyll的使用

### 1. 安装和简介

### 2. 文件结构
<!-- 2. 介绍该模板的文件结构，各文件的作用，Jekyll -->

### 3. 运行
```bash
# 生成html静态文件，保存在文件夹"_site"中
jekyll build
# 生成文件并启动相应的网络服务，如果本地文件有更改，自动重新生成。默认只监听本地的"127.0.0.1:4000"，只能在本机访问，不能从外部访问。
jekyll serve
# 监听来自指定IP地址的访问，可以从指定的IP地址访问。如果IP为"0.0.0.0"，则可从任意IP访问。
jekyll serve --host 0.0.0.0
```

### 4. 添加latex支持
markdown和jekyll都没有对数学公式的原生支持，上下标等通过html实现比较负责，而且影响编辑时的可读性。添加latex支持支持后，可以使用Latex语法的公式。此处以`mathjax`为例添加该支持。在根目录中找到`_layouts`文件夹，在`defalult.html`中添加如下代码。把这段代码和`body`块保持同级即可。
```html
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
      TeX: {
        equationNumbers: {
          autoNumber: "AMS"
        }
      },
      extensions: ["tex2jax.js"],
      jax: ["input/TeX", "output/HTML-CSS"],
      tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true,
      "HTML-CSS": { fonts: ["TeX"] }
    }
  });
  MathJax.Hub.Register.MessageHook("Math Processing Error",function (message) {
        alert("Math Processing Error: "+message[1]);
      });
  MathJax.Hub.Register.MessageHook("TeX Jax - parse error",function (message) {
        alert("Math Processing Error: "+message[1]);
      });
</script>
<script
  type="text/javascript"
  async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"
></script>
```
# 三、配置

### Github Pages
必须配置action，才能在每次提交后自动编译部署pages。`setting`->`Pages`->`Build and deployment`处添加编译需要的配置文件。直接使用默认的配置文件即可。然后把该文件添加到库并提交commit。这个文件默认保存为`.github/workflows/jekyll-gh-pages.yml`。如果需要更改编译流程，更改这个文件即可。

### 域名配置
这一步的是配置个性化的域名，即不再使用“username.github.io”这个域名(其中`username`为自己的github的用户名)，而是自定义一个域名。
1. 购买域名并在控制台进行配置。
2. 在自己想配置的域名的右侧点击`解析`，在弹出界面中配置。添加需要指向的地址，填“username.github.io”。类型选择“CNAME”。
3. 到github对用的repository中，在`setting`->`Pages`->`Custom domain`中填入需要自己的域名。等待域名检查完成。
4. 这个配置过程在云端也需要一定的时间处理，所以完成上述操作后不一定就能立即使用，但通常3分钟以内云端就能完成。