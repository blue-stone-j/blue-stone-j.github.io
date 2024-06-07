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
Jekyll 的核心其实是一个文本转换引擎，把markdown标记语言转换为静态页面。

### 1. 安装

### 2. 文件结构

##### 基本文件
|文件|含义|
|---|---|
|`_data`||
|`_drafts`|用于存放未发布的文章|
|`_includes`|用于保存一些包含文件。可以加载这些包含部分到你的布局或者文章中以方便重用|
|`_layouts`|用于存放包裹在文章外部的模板|
|`_posts`|存放文章的路径|
|`_congif.yml`|用于保存配置数据|
|`index.html`|打开链接后显示的第一个界面，即主页面|

##### 静态页面生成
这些文件用于配置静态页面的生成过程以及生成的结果。
|文件|含义|
|---|---|
|`_site`|默认的生成的静态页面的存放路径|
|`.github`|配置在github pages中的页面生成脚本|
|`.sass-cache`|生成静态页面过程中产生的缓存|

##### 可能的文件
这些文件不属于标准的jekyll结构中的文件夹，是自定义的文件夹，但通常由相似的含义。
|文件|含义|
|---|---|
|`assets`|通常用于存放图片、样式表、js脚本等资源|
|`meta`|通常用于存储元数据文件，这些文件用于配置网站或控制Jekyll的某些行为|
|``||
|``||
|``||

### 3. 配置
|配置项|含义|
|---|---|
|`Exclude`|转换时排除某些文件夹或文件|
|`Include`|转换时强制包含某些文件、文件夹|
|`Time Zone`|设置时区, Ruby 用它来处理日期和时间|
|``||

### 4. 变量
预定义的全局变量
|变量|含义|
|---|---|
|`layout`|指定使用该模板文件。指定模板文件时候不需要扩展名|
|`tags`|标签|
|`category`|分类|
|`excerpt`|摘要。如果没有设置，Jekyll把文章开头的第一句话作为摘要|

全站(site)变量
|变量|含义|
|---|---|
|`site.time`|当前时间（跑jekyll这个命令的时间点）|
|`site.pages`|所有 Pages 的清单|
|`site.posts`|一个按照时间倒序的所有 Posts 的清单|
|`site.related_posts`||
|`site.categories.CATEGORY`||
|`site.tags.TAG`||

全局(Global)变量
|变量|含义|
|---|---|
|`site`|来自`_config.yml文件，全站范围的信息+配置|
|`page`|页面专属的信息|
|`content`||
|`paginator`||

页面(page)变量
|变量|含义|
|---|---|
|`page.content`|页面内容的源码|
|`page.title`|页面的标题|
|`page.excerpt`|页面摘要的源码|
|`page.url`|帖子以斜线打头的相对路径|
|`page.date`|帖子的日期|
|`page.id`|帖子的唯一标识码|
|`page.categories`|这个帖子所属的 Categories|
|`page.tags`|这个 Post 所属的所有 tags|
|`page.path`|Post 或者 Page 的源文件地址|

分页器(Paginator)
|变量|含义|
|---|---|
|`paginator.per_page`|每一页Posts的数量|
|`paginator.posts`|这一页可用的Posts|
|`paginator.total_posts`|Posts 的总数|
|`paginator.total_pages`|Pages 的总数|
|`paginator.page`|当前页号|
|`paginator.previous_page`|前一页的页号|
|`paginator.previous_page_path`|前一页的地址|
|`paginator.next_page`|下一页的页号|
|`paginator.next_page_path`|下一页的地址|

### 5. 分页功能
在`_config.yml`里边加一行，并填写每页需要几行：
```
paginate：5
```
下边是对需要带有分页页面的配置：
```
paginate_path："blog/page:num"
```

### 7. 运行
```bash
# 执行一次构建，生成html静态文件，保存在文件夹"_site"中
jekyll build

# 生成文件并启动相应的网络服务，如果本地文件有更改，自动重新生成。默认只监听本地的"127.0.0.1:4000"，只能在本机访问，不能从外部访问。
jekyll serve

# 监听来自指定IP地址的访问，可以从指定的IP地址访问。如果IP为"0.0.0.0"，则可从任意IP访问。
jekyll serve --host 0.0.0.0

# 删除所有生成的文件，包括输出目录、元数据文件、Sass 和 Jekyll 缓存
jekyll clean
```

### 8. 添加latex支持
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

### xx
1. 头信息
任何只要包含YAML头信息的文件在 Jekyll 中都能被当做一个特殊的文件来处理。头信息必须在文件的开始部分，并且需要按照 YAML 的格式写在两行三虚线之间。
```md
---
layout: post
title: Blogging Like a Hacker
---
```
在这两行的三虚线之间，你可以设置一些预定义的变量或者甚至创建一个你自己定义的变量。这样在接下来的文件和任意模板中或者在包含这些页面或博客的模板中都可以通过使用 Liquid 标签来访问这些变量。

# 三、配置

### Github Pages
必须配置action，才能在每次提交后自动编译部署pages。`setting`->`Pages`->`Build and deployment`处添加编译需要的配置文件。直接使用默认的配置文件即可。然后把该文件添加到库并提交commit。这个文件默认保存为`.github/workflows/jekyll-gh-pages.yml`。如果需要更改编译流程，更改这个文件即可。

### 域名配置
这一步的是配置个性化的域名，即不再使用“username.github.io”这个域名(其中`username`为自己的github的用户名)，而是自定义一个域名。
1. 购买域名并在控制台进行配置。
2. 在自己想配置的域名的右侧点击`解析`，在弹出界面中配置。添加需要指向的地址，填“username.github.io”。类型选择“CNAME”。
3. 到github对用的repository中，在`setting`->`Pages`->`Custom domain`中填入需要自己的域名。等待域名检查完成。
4. 这个配置过程在云端也需要一定的时间处理，所以完成上述操作后不一定就能立即使用，但通常3分钟以内云端就能完成。