---
layout: post
title:  "vscode使用"
date:   2025-01-11 22:47:47 +0800
categories: [Tech]
excerpt: 记录了vscode的使用方法、技巧以及在使用中遇到的问题和解决方案
tags:
  -  
  - 
  - 
---

记录了vscode的使用方法、技巧以及在使用中遇到的问题和解决方案。

##### 1. 中文乱码问题
点击[这里](https://juejin.cn/post/7032129567473188872)查看解决方案。这里面也提供了把转换中文编码方式的方法。

##### 2. 代码风格化
把代码按照一定的规则风格化。可以在vscode中设置并同步，也可以使用一个文件来实现这个功能。我写了这个文件的模板，详细介绍了各项设置，可以在[这里](https://github.com/blue-stone-j/example/blob/main/.clang-format)获取。这个文件对其所在的目录内的文件和文件夹都生效。例如这个文件在`/Documents`文件夹下，则对`/Documents`文件夹内的所有`cpp`文件生效，包括子文件夹中的文件。Use `// clang-format off` and `// clang-format on` to depress format for a code snippet.

##### 3. 

##### 4. plugins
* 推荐添加的插件：`C/C++`(选择首个)；`Markdown all in one`；`CMake`；
* 如果安装的是`Ubuntu software`中自带的`vscode`，可能无法输入汉语。卸载并从官网重新下载安装即可。
* 
* vscode-icons: display icon for every file and folder

##### 6. set
* 添加垂直标尺：文件–>首选项–>设置->搜索`editor.rulers` -->更改设置`editor.rulers: [80,120]`，或者其他期望的值，即可。
* Editor: Detect Indentation: this will override ``Editor: Tab Size
* Editor: Tab Size: indentation is tabs. This can adjust the number of spaces a tab is equal to.
* `${workspaceFolder}` 表示当前workspace文件夹路径

##### 7. 代码注释高亮
better comments(https://www.cnblogs.com/suwanbin/p/13263732.html)

##### 8. 删除缓存和配置
保存的路径为`~/.vscode` `~/.config/Code` `~/Code` `~/.cache/Code` `~/.cache/vscode`

##### 9. 阻止自动生成make文件
`Cmake: Configure On Edit`和`Cmake: Configure On Open`

##### 10. 环境变量
在Windows环境下，如果环境变量发生改变，需要关闭vscode再打开，才能使环境变量生效。只关闭和打开新的终端不能应用最新的环境变量。

##### 11. 中文输入法无法使用
通过ubuntu的应用商城安装的vscode不完整，卸载后下载安装包重新安装即可。

##### 12. compare files
* 方法一: 使用VS Code自带的比较功能
  1. 打开两个文件: 在VS Code中，打开你想要比较的两个Python文件。

  2. 右键菜单选择比较: 在资源管理器(Explorer)中，右键点击第一个文件，然后选择`Select for Compare`。然后，右键点击第二个文件，选择`Compare with Selected`。

  3. 查看差异: VS Code将会在一个新的对比窗口中显示两个文件的差异。

* 方法二: 使用VS Code的命令面板
  1. 打开命令面板: 使用快捷键 `Ctrl+Shift+P`(Windows/Linux)或 `Cmd+Shift+P`(Mac)打开命令面板。
  2. 输入比较命令: 输入Compare，然后选择`File: Compare Active File with...`。
  3. 选择文件: 从文件选择器中选择你要比较的另一个文件。

##### 13. export PDF
I got error when I tried to export PDF from markdown.
```
"princexml" is required to be installed.
```
Download prince [here](https://www.princexml.com/download/15/) and install this package.

##### 14. clang-format
1. install `clang-format`
```
sudo apt install clang-format
```
2. Select Clang as the Default Formatter
3. Ensure the `.clang-format` file is present in your project root directory.
