---
layout: post
title:  "Markdown语法"
date:   2025-05-02 22:32:01 +0800
categories: [Design]
excerpt: 总结了Markdown语法，可用作语法字典
tags:
  - Markdown
---

这篇文章分类总结了常用的Markdown的语法，包括如何嵌入H5，可以用作Markdown的语法字典。

# 一、字体

##### 1.字体颜色

```html
<font color=Blue>我是蓝色</font>
```

##### 2.字体大小

##### 3. 高亮代码块

* 脚本语言

````md
```Bash
```
````

* C++

````md
```C++
```
````

##### 4. 加粗

````md
**加粗**
````

##### 5. math formula

markdown expression

```md
Fractions: $\frac{a}{b}$
Superscripts: $x^2$
Subscripts: $x_i$
Square root: $\sqrt{x}$
Summation: $\sum_{i=1}^n i$
```

result below
$\frac{a}{b}$
$x^2$
$x_i$
$\sqrt{x}$
$\sum_{i=1}^n i$

## 二、段落

1. 无序列表

> "*" + " " + 列表内容

2. 首行缩进
在段落首行缩进的位置，先写下面这个代码(包括分号)，然后再继续写后面的内容就可以了。这个代码写一次是空一格，两个就是空两格。

```md
&emsp;
```

3. 居中

```Bash
# <center>一、习惯C++
```

4. 换行

```md
</br>
```

1. 表格
使用jekyll时，如果选择kramdown作为引擎，表示表格时，如果使用表头，则表格前两行的结尾需要两个空格作为换行&#10004;

### icon

**Arrows**

| Symbol | Name             |MD Decimal Entity |MD Hexadecimal Entity |Unicode character | GitHub Emoji Code|
| ------ | ---------------- | -------------- | ------------------ |-----------|-----------|
| ←      | Left Arrow       | `&#8592;`      | `&#x2190;`         |||
| ↑      | Up Arrow         | `&#8593;`      | `&#x2191;`         |||
| →      | Right Arrow      | `&#8594;`      | `&#x2192;`         |||
| ↓      | Down Arrow       | `&#8595;`      | `&#x2193;`         |||
| ↔      | Left-Right Arrow | `&#8596;`      | `&#x2194;`         |||
| ↕      | Up-Down Arrow    | `&#8597;`      | `&#x2195;`         |||

**Mathematical Symbols**

| Symbol | Name                | MD Decimal   |MD Hexadecimal |Unicode character | GitHub Emoji Code|
| ------ | ------------------- | --------- | ----------- |-----------|-----------|
| ±      | Plus-Minus          | `&#177;`  | `&#xB1;`    |||
| ×      | Multiplication      | `&#215;`  | `&#xD7;`    |||
| ÷      | Division            | `&#247;`  | `&#xF7;`    |||
| ∞      | Infinity            | `&#8734;` | `&#x221E;`  |||
| ≈      | Approximately Equal | `&#8776;` | `&#x2248;`  |||
| ≠      | Not Equal           | `&#8800;` | `&#x2260;`  |||

**Currency Symbols**

| Symbol | Name   |MD Decimal Entity |MD Hexadecimal Entity |Unicode character | GitHub Emoji Code|
| ------ | ------ | -------------- | ------------------ |-----------|-----------|
| $      | Dollar | `&#36;`        | `&#x24;`           |||
| €      | Euro   | `&#8364;`      | `&#x20AC;`         |||
| £      | Pound  | `&#163;`       | `&#xA3;`           |||
| ¥      | Yen    | `&#165;`       | `&#xA5;`           |||
| ₹      | Rupee  | `&#8377;`      | `&#x20B9;`         |||

**Punctuation**

| Symbol | Name         |MD Decimal   |MD Hexadecimal |Unicode character | GitHub Emoji Code|
| ------ | ------------ | --------- | ----------- |-----------|-----------|
| ©      | Copyright    | `&#169;`  | `&#xA9;`    |||
| ®      | Registered   | `&#174;`  | `&#xAE;`    |||
| ™      | Trademark    | `&#8482;` | `&#x2122;`  |||
| §      | Section Sign | `&#167;`  | `&#xA7;`    |||
| ¶      | Pilcrow      | `&#182;`  | `&#xB6;`    |||

**Stars and Shapes**

| Symbol | Name                |MD Decimal ` | MD Hexadecimal ` |Unicode character | GitHub Emoji Code|
| ------ | ------------------- | --------- | ------------- |-----------|-----------|
| ★      | Black Star          | `&#9733;` | `&#x2605;`    |||
| ☆      | White Star          | `&#9734;` | `&#x2606;`    |||
| ■      | Black Square        | `&#9632;` | `&#x25A0;`    |||
| □      | White Square        | `&#9633;` | `&#x25A1;`    |||
| ▲      | Black Triangle Up   | `&#9650;` | `&#x25B2;`    |||
| ▼      | Black Triangle Down | `&#9660;` | `&#x25BC;`    |||

**Hearts and Smileys**

| Symbol | Name              |MD Decimal   |MD Hexadecimal |Unicode character | GitHub Emoji Code|
| ------ | ----------------- | --------- | ----------- |-----------|-----------|
| ♥      | Black Heart       | `&#9829;` | `&#x2665;`  |||
| ♡      | White Heart       | `&#9825;` | `&#x2661;`  |||
| ☺      | White Smiley Face | `&#9786;` | `&#x263A;`  |||
| ☹      | Black Sad Face    | `&#9785;` | `&#x2639;`  |||

**Miscellaneous**

| Symbol | Name      |MD Decimal     |MD Hexadecimal |Unicode character | GitHub Emoji Code|
| ------ | --------- | ----------- | ----------- |-----------|-----------|
| 🔒      | Lock      | `&#128274;` | `&#x1F512;` |||
| 🔖      | Bookmark  | `&#128278;` | `&#x1F516;` |||
| 🏷️      | Label Tag | `&#127991;` | `&#x1F3F7;` |||
| 🚀      | Rocket    | `&#128640;` | `&#x1F680;` |||
| 📦      | Package   | `&#128230;` | `&#x1F4E6;` |||
| ✅      | *Correct* or *Check Mark*     | `&#9989;` | `` |u2705|`:white_check_mark:`|
| ❌      | Wrong  | `&#10060;` | `` ||u274C|

### Unicode emoji character

| Symbol | Name     |MD Decimal | MD Hexadecimal |Unicode character | GitHub Emoji Code|
|---|---|---|---|-----------|-----------|
|📝|*Memo* or *Writing Hand* |||U+1F4DD |`:memo:`|
|📌|pushpin emoji|||U+1F4CC |`:pushpin:`|
