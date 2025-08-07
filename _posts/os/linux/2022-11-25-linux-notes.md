---
layout: post
title:  Linux笔记
date:   2025-08-07 19:20:39 +0800
categories: [OS]
excerpt: Linux系统的学习笔记
tags:
  - Linux
  - 
class: sys
---

这篇文章总结了Linux笔记，以ubuntu20.04为例。

### 4. 文件操作命令

**创建文件**

* `touch file_name`: 在当前文件夹中创建空文件
* `touch path/file_name`: 在指定路径创建文件

**复制文件或目录**  
默认不会修改文件属性。

* `cp 选项 source dest`: 默认带有`-i`参数，即覆盖时询问。
* `\cp 选项 source dest`: 如果有同名文件直接覆盖，不再询问。其中的“\”表示使用linux中的原生命令。

| 选项               | 描述                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `-r`               | recursive的简写,递归地复制文件夹                                                                           |
| `-i`               | 覆盖时询问                                                                                                 |
| `-u` or `--update` | Copy only when the source file is newer than the destination file or when the destination file is missing. |

这是一个复制文件的辅助功能，用来显示复制的进度。
`rsync` compares file size and modification time and will skip copying if nothing has changed.

```Bash
rsync -ah --progress source destination
```

# 四、系统管理

### 服务管理

`ls /usr/sbin/ | grep service`
执行系统服务的进程通常称为守护进程, 名称以"d"结尾的服务通常为系统服务。

1. 基本语法: `service service_name start | stop | restart | status`  
2. 查看服务: `ls etc/init.d/service_name`或者`ls usr/lib/systemd/system`  
3. `systemctl start | stop | restart | status service_name`  
4. `.service`结尾的服务文件, `.target`为一组服务的集合。
5. 所有系统服务的守护进程都是由`init.d`进程启动的，`init.d`是linux内核初始化之后启动的第一个进程。

### 运行级别(run level)

开机--->BIOS--->/boot(系统初始化)--->init进程--->判断运行级别--->根据运行级别启动对应的服务

| 运行级别 | 描述                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------- |
| 0        | 系统停机状态                                                                                          |
| 1        | 单用户，root权限，用于系统维护，禁止远程登录；类似Windows的安全模式；启动的服务最少，相当于最小化启动 |
| 2        | 多用户，不支持网络，没有NFS(net file system)                                                          |
| 3        | 多用户，登录后进入命令行模式                                                                          |
| 4        | 未使用，保留                                                                                          |
| 5        | X11控制台，登录后进入图形GUI模式                                                                      |
| 6        | 系统重启                                                                                              |

查看当前运行级别: `systemctl get-default`

进入对应级别: `init 3`(进入级别3)

### 配置开机服务

执行命令`systemctl list-unit-files`查看该服务是否开机自启。“static”表示该服务可能依赖于其它服务，无法确定是否启动。

### 关机重启

1. 命令
   * 执行shutdown之前会执行sync操作，把数据从内存同步到硬盘。为了性能，linux对硬盘预读和延迟写入，只有等缓冲区满了之后才会写到硬盘。  
   * halt: 停机;停止CPU，但不断电，内存仍然工作。  
   * power-off: 关机  
   * reboot: 重启，等同于`shutdown -r now`  
   * `shutdown 选项 时间`:

2. 选项

| 选项         | 功能                           |
| ------------ | ------------------------------ |
| -H           | 相当于`--halt`                 |
| -r           | =`reboot`                      |
| `-P`或者`-h` | =power-off                     |
| `now`        | 立刻关机                       |
| `时间`       | 等待一定时间后关机(单位为分钟) |

3. 命令示例

| 命令             | 作用                             |
| ---------------- | -------------------------------- |
| `shutdown -c`    | 等待一定时间后关机,默认为1分钟   |
| `shutdown 3`     | 等待3分钟后关机                  |
| `shutdown 15:28` | 定时关机                         |
| `shutdown now`   | 立刻关机，但仍然会先执行sync操作 |

### environment variables

| variables      | meaning                                                                         |
| -------------- | ------------------------------------------------------------------------------- |
| `HISTSIZE`     | Specifies the number of commands to keep in memory during a shell session.      |
| `HISTFILESIZE` | Specifies the maximum number of commands that can be saved in the history file. |

# 五、常用命令

“Bourne+shell+Again=bash”
ubuntu默认使用“dash”，也可以改为“bash”。“dash”不支持数组，其余和“bash”基本相同。

### 1. 帮助命令

##### 1. man

**主要描述**

| 信息        | 功能               |
| ----------- | ------------------ |
| NAME        | 命令名称和单行描述 |
| SYNOPSIS    | 怎样使用命令       |
| DESCRIPTION | 详细描述           |
| EXAMPLES    | 例子               |

**使用**

1. 格式为`man [OPTION...] [SECTION]`。
1. 使用man查找一个命令，例如`man ls`，`man man`。  
2. 内建命令(如cd,read,echo等都是shell内建命令), 都没有单独的man手册。可以通过命令`man bash-builtins`查看，会出现所有的内建命令，命令按照首字符排序。内建命令随bash的加载和shell启动后即常驻系统内存。而其它命令需要从外部调用，相当于普通程序，称为外部命令。  
3. 使用`type`判断命令是否为内建命令，例如`type ls`。
4. `man --help cd`，这种方式既可以查内建命令，也可用于外部命令。

##### 2. 其它命令

* help: `help cd`查看命令，但只能用于内建命令
* info: `info ls`查看命令，只能用于外部命令。
* `alias`:

### 2. 快捷键

| 快捷键     | 功能                                   |
| ---------- | -------------------------------------- |
| ctrl+c     | 停止当前程序                           |
| ctrl+l     | 清屏，等同于clear                      |
| 上下方向键 | 查找执行过的命令，也可修改执行过的命令 |
| ctrl+z     |                                        |
| reset      | 重启当前shell环境                      |
| tab键      | 自动补全                               |
|            |                                        |

### 5. 时间和日期

**date**  
用法：`date 选项 格式`

| 参数       | 功能                   |
| ---------- | ---------------------- |
| `date`     | 当前时间               |
| `+%Y`      | 当前年份               |
| `+%y`      | 当前年份的后两位       |
| `+%m`      | 当前月份               |
| `+%d`      | 当前日                 |
| `+%M`      | 当前分钟               |
| `+%S`      | 当前秒                 |
| `+%s`      | 当前秒数的时间戳       |
| `+%Y-%m`   | 自定义输出格式         |
| `"+%Y %m"` | 如果有空格，必须用引号 |

| 选项                            | 功能                                         |
| ------------------------------- | -------------------------------------------- |
| -d<时间字符串>                  | 显示指定的时间字符串表示的时间，不是当前时间 |
| `date -d '1 days ago'`          | 显示前一天的时间                             |
| `date -d '1 days ago'`          | 显示明天的时间                               |
| `date -d '1 hours ago'`         |                                              |
| -s<日期时间>                    | 设置系统时间                                 |
| `date -s "2027-06-19 20:52:18"` |                                              |
| `ntpdate 时间服务器`            |                                              |

**cal**  
“calendar”的缩写。

| 选项       | 功能                 |
| ---------- | -------------------- |
| `cal`      | 显示当前月           |
| `cal -3`   | 显示上月、本月、下月 |
| `cal -m`   | 周一在首行           |
| `cal 2021` | 显示2021年日历       |

### 6. 用户权限

**添加用户**  

| 命令                                         | 功能                                                                                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `useradd 用户名`                             | 添加新用户                                                                                           |
| `useradd -g 组名 用户名`                     | 添加新用户到指定组                                                                                   |
| `useradd -d /data/dave tony `                | 添加新用户tony并指定其home文件夹                                                                     |
| `passwd 用户名`                              | 为用户设置密码                                                                                       |
| `id tony`                                    | 查找用户。“uid”为用户名，“gid”为组名                                                                 |
| `cat /etc/passwd`                            | 查看用户。大量默认用户用于运行系统服务，称为伪用户。自定义用户从“1000”开始。通过哪个进程与系统交互。 |
| `su 用户名`                                  | “switch user”的缩写，切换到指定用户                                                                  |
| `su root`                                    | 切换到root用户                                                                                       |
| `exit`                                       | 用户切换实际是会话的嵌套，这个命令会退回到上一用户                                                   |
| `who am i`                                   | 查看创建会话的用户的信息                                                                             |
| `whoami`                                     | 查看当前用户名称                                                                                     |
| `sudo usermod -aG sudo username`             | add user to sudo group so that user can use `sudo`                                                   |
| `sudo usermod -d /new/home/path -m username` |                                                                                                      |

**root**

| 命令              | 功能                                         |
| ----------------- | -------------------------------------------- |
| `sudo`            | 临时赋予root权限                             |
| `userdel tony`    | 删除用户“tony”。但该操作不能删除其home文件夹 |
| `userdel -r tony` | 删除用户“tony”,同时删除其home文件夹          |

**用户组**  
每个用户都有一个默认组，组名和用户名同名。一个组可以属于多个组。

| 命令                  | 功能               |
| --------------------- | ------------------ |
| `sudo cat /etc/group` | 显示所有组         |
| `groupadd 组名`       |                    |
| `usermod -g 组名1`    | 把用户添加到指定组 |
| `groupmod -n 组名2`   | 修改组名           |
| `groupdel 组名1`      | 删除用户组         |

**文件属性**

|`drwxr-xr-x  2 jpw jpw 131072 5月  30 21:29 business/`|
|文件属性 硬链接的数量/子文件夹的数量 属主 属组 文件大小 最后更改时间 文件名|

| 字符                   | 描述                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| 首字符: 文件类型       |                                                                          |
| c                      | 字符设备文件，例如鼠标键盘                                               |
| b                      | block设备文件，例如硬盘                                                  |
| -                      | 普通文件                                                                 |
| d                      | 文件夹                                                                   |
| l                      | 链接文档                                                                 |
| 1-3: 属主权限(Users)   |                                                                          |
| r                      | read                                                                     |
| w                      | write                                                                    |
| x                      | execute                                                                  |
| 4-6: 属组权限(Group)   |                                                                          |
| r                      | read                                                                     |
| w                      | write                                                                    |
| x                      | execute                                                                  |
| 7-9: 其它用户权限      |                                                                          |
| r                      | read                                                                     |
| w                      | write                                                                    |
| x                      | execute                                                                  |
|                        |                                                                          |
| 字符对文件和目录的含义 |                                                                          |
| w                      |                                                                          |
| 文件                   | 可以修改文件，但不代表可以删除文件。有当前文件夹的写入权限才能删除文件。 |
| 目录                   | 在目录内可以创建、删除、重命名                                           |
| r                      |                                                                          |
| 文件                   | 读取查看文件                                                             |
| 目录                   | 可读取和查看目录内容                                                     |
| x                      |                                                                          |
| 文件                   | 可被系统执行                                                             |
| 目录                   | 可进入该目录                                                             |

**文件权限**  
_chmod_

|属主|属组|其它用户|
|u|h|o|

|`chmod {ugoa}{+-=}{rwx} 文件或目录`|a表示全部; +为增加权限; -为撤销权限; 每个{}中选取一项组成参数|
|`chmod {mode}{mode}{mode} 文件或目录`|4为r,2为写,1为执行,mode用一个数字表示权限(二进制编码)|
|`chmod -R {mode}{mode}{mode} 文件或目录`|4为r,2为写,1为执行,mode用一个数字表示权限(二进制编码);针对文件夹内的所有文件|

_chown_

| 命令                                      | 描述                 |
| ----------------------------------------- | -------------------- |
| `chown [option] 用户组:用户名 文件或目录` | “change owner”的缩写 |
| `-R`                                      | 递归操作             |

If you try to change owner of file or directory stored in ntfs system(Windows), it's possible to fail.

_chgrp_

| 命令                          | 描述                 |
| ----------------------------- | -------------------- |
| `chgrp 最终用户组 文件或目录` | “change group”的缩写 |

新创建的不同用户不能使用`tab`补全，且不显示当前所在路径。解决方案点击[此处](https://www.cnblogs.com/qqhfeng/p/12708970.html). 原因是新创建的用户使用的shell为`bin/sh`，需要改为`bin/bash`。

### 10. 进程管理

启动之后一直存在、常驻内存的进程，称为“服务”。

**ps**  
"process status"的缩写。  

| 选项                 | 描述                                     |
| -------------------- | ---------------------------------------- |
| `ps`                 | 显示的是当前用户和与当前终端相关联的进程 |
| `ps aux \| grep xxx` | 查看所有系统进程，可显示CPU和内存占用    |
| `ps -ef \| grep xxx` | 查看子父进程之间的关系                   |
| `-a`                 | 列出带有终端的所有用户进程               |
| `-x`                 | 所有用户进程，包括没有终端的             |
| `-u`                 | 面向用户友好的显示风格                   |
| `-e`                 | 列出所有进程                             |
| `-f`                 | 显示完整格式的进程列表，可以显示PPID     |

`ps aux`结果分析

| item      | meaning                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| USER或UID | 调用进程的用户                                                                                                               |
| VSZ       | 虚拟内存。 LRU(less recently use)算法把不常用的内存会直接放到虚拟内存                                                        |
| RSS       | 实际占用的物理内存                                                                                                           |
| TTY       | 。调用进程的终端。“?”表示后台的进程，没有对应的终端。“tty1”是图形化终端，tty2-6是本地的字符界面终端，pts/0-255表示虚拟终端   |
| STAT      | status.S睡眠状态，T暂停状态，Z僵尸状态(进程即将结束,但还有资源未清楚)，s包含子进程，l多线程，+前台显示，<高优先级，N低优先级 |
| START     | 该进程的启动时间                                                                                                             |
| TIME      | 进程占用CPU的运算时间，不是系统时间                                                                                          |
| COMMAND   | “[kthread]”所有内核线程的调用和管理                                                                                          |
| PPID      | 父进程的ID                                                                                                                   |
| STIME     | 启动时间                                                                                                                     |

**kill终止进程**  
基本语法：`kill [选项] PID`或者`Kill 进程名`

| 选项           | 描述                                                 |
| -------------- |
| `-9`           | 强行终止进程；活动的进程必须使用这个选项才能终止进程 |
| `kill -l`      | 显示kill信号描述                                     |
| `killall sshd` | 关闭所有sshd进程                                     |

**进程树**  
使用命令`pstree`显示进程树，包含所有进程的父子关系

| 选项 | 描述             |
| ---- | ---------------- |
| `-p` | 显示进程的PID    |
| `-u` | 显示进程所属用户 |

**进程监控**  
“top=table of process”:进程表  
基本命令：`top [选项]`

| 结果   | 描述                                   |
| ------ | -------------------------------------- |
| cpu    |                                        |
| `us`   | 未经修改优先级的用户进程的占比         |
| `sy`   | 系统进程                               |
| `ni`   | nice的缩写该值越高，优先级越低         |
| `wa`   | wait的缩写，等待的时间占比，等待IO操作 |
| `hi`   | hardware interrupt缩写，硬件中断       |
| `si`   | software interrupt缩写，软件中断       |
| `st`   | steal的缩写，虚拟机占用                |
| 进程   |                                        |
| `PR`   | priority缩写，系统任务调度的优先级     |
| `NI`   | 用户指定的nice值                       |
| `VIRT` | virtual memory usage，虚拟内存         |
| `RES`  | resident memory usage，物理内存        |
| `SHR`  | 共享内存                               |

| 命令      | 描述               |
| --------- | ------------------ |
| `shift+m` | 按内存占用排序     |
| `shift+p` | 按CPU占用排序      |
| `shift+n` | 进程号从大到小排序 |
| `q`       | 退出top            |
| `u`       | 查看指定用户进程   |
| `k`       | kill指定进程       |

| 选项 | 描述                     |
| ---- | ------------------------ |
| `-d` | 设定更新间隔，单位为秒   |
| `-i` | 不显示限制或者zombie进程 |
| `-p` | 指定PID监控指定进程      |

**网络**  
基本语法：  
`netstat -anp | grep PID`：指定进程的网络信息  
`netstat -anp | grep 端口号`：查看网络端口

| 选项 | 描述                                                   |
| ---- | ------------------------------------------------------ |
| `-a` | all的缩写                                              |
| `-n` | 不显示别名，例如，网址就是别名，使用这个选项直接显示IP |
| `-l` | 只列出在监听的服务状态                                 |
| `-p` | 显示调用的进程                                         |

| 结果            | 描述                       |
| --------------- | -------------------------- |
| `Proto`         | protocol缩写，协议         |
| `Recv-Q`        | 已接收但没拷贝的字节数     |
| `Send-Q`        | 已发送但对方未确认的字节数 |
| `Local Address` | 套接字，`IP:port`          |

### 11. 定时任务

##### cron

重启crond服务：`systemctl restart cron`  

基本语法：`crontab`

| 选项 | 描述                       |
| ---- | -------------------------- |
| `-e` | 编辑定时任务               |
| `-l` | 列出所有定时任务           |
| `-r` | 清楚当前用户的所有定时任务 |

时间的格式：共5个时间需要填，分别为`分时天月周`

| 符号   | 描述                                                            |
| ------ | --------------------------------------------------------------- |
| `*`    | 不对这个时间作设置                                              |
| `,`    | 多个时间并列                                                    |
| `2-5`  | 表示时间范围，从2到5，单位取决于其所在的位置                    |
| `*/10` | *表示对应的时间，每隔这个时间就执行一次，单位取决于其所在的位置 |

```bash
# 分钟（0-59）、小时（0-23）、日（1-31）、月（1-12）、星期几（0-7，其中0和7都代表星期日）以及要执行的命令
* * * * * command-to-execute
```

##### use systemd to manage perdioc task

在`/etc/systemd/system/`目录下创建一个`.service`文件，如`mytask.service`。这个文件定义了要执行的任务。

```bash
[Unit]
Description=My custom task

[Service]
Type=oneshot
ExecStart=/path/to/your/script.sh
```

在相同目录下创建一个与服务文件同名但以`.timer`为后缀的文件，如`mytask.timer`。

```bash
[Unit]
Description=Runs my custom task

[Timer]
OnCalendar=*-*-* 12:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

`OnCalendar`指定了任务运行的时间。上面的例子表示每天中午12点。
使用`systemctl enable mytask.timer`启用定时器，这样在系统启动时定时器也会自动启动。使用`systemctl start mytask.timer`立即启动定时器。使用`systemctl list-timers`查看所有定时器及其下一次触发时间。

# 九、文本处理工具

**cut**  

|`cut [option] filename`|按照规则把文件的每行剪切为strings并输出|
|`-f 2,3,5-9,11-`|按列号提取|
|`-d " "`|按分隔符分割列，默认按照制表符`\t`(tab)分割|
|`-c`|按字符切割后加数字表示取第几列|

**awk**  
基本用法：`awk [option] '/[pattern]/{action}'`，其中“pattern”为正则匹配，“action”为执行的代码段

| 选项                                         | 描述                               |
| -------------------------------------------- | ---------------------------------- |
| `-F`                                         | 指定输入文件分隔符                 |
| `-v`                                         | 使用一个用户定义的变量             |
| 示例                                         |                                    |
| `awk -F ":" 'BEGIN{action1}' 'END{action2}'` | 在所有数据读取之前和之后执行的操作 |
| `awk -v i=1 -F ":" '{print 3+i}'`            |                                    |
| 内置变量                                     |                                    |
| `FILENAME`                                   | 包含路径的文件名                   |
| `NT`                                         | 列数                               |
| `NR`                                         | 行号                               |

# 其它

inode: 保存了文件的元信息，文件类型、文件权限、文件的链接数(硬链接的数量)、创建时间、文件索引编号等等。

硬链接指向的是文件的inode，因此只能针对文件，不能指向目录。当文件的硬链接数量为0时，说明该文件已经被删除。

登录桌面时的用户；图形化桌面环境也是root用户。

端口号：0-65535，默认使用，ssh用22，网页用80，mysql用3306

使用`sudo ntpdate ntp.aliyun.com`手动同步时间

run `grep "#define BOOST_VERSION" /usr/include/boost/version.hpp` to check out version of boost.

### shortcut

customized shortcut can be stored in folder `~/.local/share/applications`, such as `~/.local/share/applications/myapp.desktop`.

### pack deb

##### step

1. set variables for dpkg: add lines below to `.bashrc`

```bash
DEBEMAIL="email@moxa.com"
DEBFULLNAME="name family"
export DEBEMAIL DEBFULLNAME
```

2. compile and install files into folder `helloworld-1.0.0`.
3. `tar -zcvf helloworld-1.0.0.tar.gz helloworld-1.0.0/`
4. `cd helloworld-1.0.0`
5. init dpkg

```bash
dh_make -f ../helloworld-1.0.0.tar.gz -n -s -y
# -s：Automatically set the package class to Single binary, skipping the question.
# -n：Create a native Debian packages
# -y：Automatic yes to prompts and run non-interactively. The package class needs to be set for dh_make to run fully automatically.
```

6. 如果你的软件包需要那些标准的 `make install` 没有安装的文件, create file `install`.
7. create deb file: `dpkg-buildpackage -us -uc`

##### NOTE

1. If you run the step5, and then you copy or move a file named `install` from `ntfs` file system to folder `debian`, you may get error like below

```bash
debian/install: 1: assets/add.jpeg: Permission denied
QStandardPaths: wrong ownership on runtime directory /run/user/1000, 1000 instead of 0
```
<!-- However, you can do like this: create the file `install`, and store the whole folder `debian`. The folder can be reused. -->

### bash

##### add cmake path

```bash
export PATH="$PATH:/path/to/your/folder"
```

##### add library path

```bash
export LD_LIBRARY_PATH="/path/to/your/libraries:$LD_LIBRARY_PATH"
```
