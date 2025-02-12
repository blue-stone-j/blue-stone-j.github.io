---
layout: post
title:  "vscode使用"
date:   2025-02-12 20:50:53 +0800
categories: [Tech]
excerpt: 记录了vscode的使用方法、技巧以及在使用中遇到的问题和解决方案
tags:
  -  vscode
  - 
  - 
---

记录了vscode的使用方法、技巧以及在使用中遇到的问题和解决方案。

# notation

# setting.json

path is `.config/Code/User/setting.json`.

### levels of settings

there are three levels of settings:

1. User settings (settings.json in your global config, which applies to all projects you open).
2. Workspace settings (settings.json in the .vscode folder of your project, which overrides user settings for that specific workspace).
3. Folder settings (if you have a .vscode folder inside a subfolder, these can override both user and workspace settings, but this is less common).

### 添加垂直标尺

文件/File–>首选项/Preferences–>设置/Settings->搜索`editor.rulers` -->更改设置`editor.rulers: [80,120]`，或者其他期望的值，即可。

### 阻止自动生成make文件

`Cmake: Configure On Edit`和`Cmake: Configure On Open`

# dependency packages

### clang-format

1. install `clang-format`

```bash
sudo apt install clang-format
```

2. Select Clang as the Default Formatter

* Ensure the `.clang-format` file is present in your project root directory.
* Use `// clang-format off` and `// clang-format on` to depress format for a code snippet.

##### export PDF

I got error when I tried to export PDF from markdown.

```bash
"princexml" is required to be installed.
```

Download prince [here](https://www.princexml.com/download/15/) and install this package.

# extension

### Better Comments (Markdown Support)

Default highlight.

```cpp
// * Important comment
// ! Warning comment
// ? Question comment
// TODO: Task comment
```

You can extend the comment styles by modifying the `better-comments.tags` setting in `settings.json` like below.

```json
"better-comments.tags": [
    {
        "tag": "TODO",
        "color": "#FFA500", // Orange
        "strikethrough": false,
        "underline": false,
        "backgroundColor": "transparent",
        "bold": true,
        "italic": false
    },
    {
        "tag": "FIXME",
        "color": "#FF0000", // Red
        "strikethrough": false,
        "underline": true,
        "backgroundColor": "transparent",
        "bold": true,
        "italic": true
    },
    {
        "tag": "NOTE",
        "color": "#00FFFF", // Cyan
        "strikethrough": false,
        "underline": false,
        "backgroundColor": "transparent",
        "bold": false,
        "italic": true
    },
    {
        "tag": "DEBUG",
        "color": "#FFD700", // Gold
        "strikethrough": false,
        "underline": true,
        "backgroundColor": "transparent",
        "bold": true,
        "italic": false
    },
    {
        "tag": "OPTIMIZE",
        "color": "#32CD32", // Lime Green
        "strikethrough": false,
        "underline": false,
        "backgroundColor": "transparent",
        "bold": true,
        "italic": true
    }
]
```

### markdownlint

ignore a specific warning.

```json
"markdownlint.config": {
  "MD001": true,   // Enable first heading rule
  "MD013": false,  // Disable the line length rule
  "MD029": false,  // ol-prefix: Ordered list item prefix
  "MD036": false,  // Emphasis used instead of a header
  "MD038": false,  // Spaces inside emphasis markers
  "MD041": false   // Disable first heading rule
}
```

### Markdown All in One

1. make ordered list indices automatically managed while editing Markdown files in Visual Studio Code
2. Table Formatter: Delimiter Row No Padding: the delimiter row (the row with - under the headers) gets spaces to align columns neatly.
3. Table Formatter: Normalize Indentation: it removes those extra spaces, keeping only the necessary spaces

### vscode-icons

display icon for every file and folder

# qa

##### 1. 中文乱码问题

点击[这里](https://juejin.cn/post/7032129567473188872)查看解决方案。这里面也提供了把转换中文编码方式的方法。

##### 2. can't find header file

header file can't be found even if library has been installed correctly and code is compiled successfully. To solve it, you can try close all vscode windows and reopen vscode.

##### 4. plugins

* 如果安装的是`Ubuntu software`(`应用商城`)中自带的`vscode`不完整, 可能无法输入汉语。卸载并从vscode官网重新下载安装包重新安装即可。

##### 6. set

* Editor: Detect Indentation: this will override ``Editor: Tab Size
* Editor: Tab Size: indentation is tabs. This can adjust the number of spaces a tab is equal to.
* `${workspaceFolder}` 表示当前workspace文件夹路径

##### 8. 删除缓存和配置

保存的路径为`~/.vscode` `~/.config/Code` `~/Code` `~/.cache/Code` `~/.cache/vscode`

##### 10. 环境变量

在Windows环境下，如果环境变量发生改变，需要关闭vscode再打开，才能使环境变量生效。只关闭和打开新的终端不能应用最新的环境变量。

##### 12. compare files

* 方法一: 使用VS Code自带的比较功能
  1. 打开两个文件: 在VS Code中，打开你想要比较的两个Python文件。

  2. 右键菜单选择比较: 在资源管理器(Explorer)中，右键点击第一个文件，然后选择`Select for Compare`。然后，右键点击第二个文件，选择`Compare with Selected`。

  3. 查看差异: VS Code将会在一个新的对比窗口中显示两个文件的差异。

* 方法二: 使用VS Code的命令面板
  1. 打开命令面板: 使用快捷键 `Ctrl+Shift+P`(Windows/Linux)或 `Cmd+Shift+P`(Mac)打开命令面板。
  2. 输入比较命令: 输入Compare，然后选择`File: Compare Active File with...`。
  3. 选择文件: 从文件选择器中选择你要比较的另一个文件。
