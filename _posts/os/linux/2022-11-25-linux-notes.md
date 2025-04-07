---
layout: post
title:  Linux笔记
date:   2025-04-08 00:15:12 +0800
categories: [OS]
excerpt: Linux系统的学习笔记
tags:
  - Linux
  - 
class: sys
---

这篇文章总结了Linux笔记，以ubuntu20.04为例。

# 一、文件和磁盘

### 1. 根目录

|文件夹|作用|  
|-|-|  
|bin|二进制文件，保存了能直接执行的命令。但通常是一个链接，通常指向`/usr/bin`|
|sbin| (system) 系统级二进制命令，通常只能root用户才能使用得命令。通常是一个指向`/usr/sbin`的链接|
|lib|库目录，存放库文件。等同于Windows系统下的`System32`文件夹。部分程序需要的共享库也可能放在这个文件夹。通常是一个指向`/usr/lib`的链接|
|lib64|和64位相关的特殊的库文件。通常是一个指向`/usr/lib64`的链接|
|usr|所有应用程序以及所有所需的文件和数据。放置了所有的用户级别的文件|
|boot|启动引导分区|
|dev|device的简称。每个硬件设备都有对应的文件映射，例如cpu对应了文件夹`cpu`|
|etc|系统管理所使用的配置文件。例如安装数据库后对应的配置文件放在这里|
|home|普通用户的主目录|
|root|root用户的主目录|
|opt|optional的简称，给第三方安装包预留的位置|
|media|可移动媒体设备，例如U盘、光驱。通常会把外接设备挂在在这个位置|
|mnt|和`media`作用相同|
|proc|process的简称，进程目录，保存了硬件和当前进程的信息|
|run|系统运行以来的实时信息，重启后就会清空|
|srv|保存系统的服务|
|sys|系统硬件信息的相关文件|
|tmp|temporary的缩写，保存临时文件，可以删除|
|var|variable的缩写，通常保存日志等经常修改的文件|
|/usr/local|针对用户的文件，其中也包含了"bin"、库等文件|

### 3. 目录操作命令

**pwd**  
显示当前工作目录绝对路径  

* `pwd -P`: 显示的是物理路径(例如软链接指向的路径)  

**cd**  
"change directory"的缩写  

* `cd ..`: 到上层目录;
* `cd .`: 从当前目录查找;
* `cd /`: 从根目录查找;
* `cd -`: 返回上次的文件夹;
* `cd ~`: 返回当前用户的home文件夹
* `cd -P directory`: 切换到实际的物理路径(例如软链接指向的路径)  

**ls**  
"list"的缩写  

|选项|描述|
|---|---|
|`-a`| 显示所有文件和文件夹，包括隐藏文件夹(以`.`开头的文件或文件夹)、上级目录对象、当前目录对象|
|`-l`|"l"是“long”的缩写，列出文件的详细信息。也可用命令`ll`。|
|`-al`|上述“a”和“l”的组合|
|`-h`|显示文件大小的单位。结果的“total”只包含了本文件夹内的文件，不包含子文件夹和隐藏文件。|

**创建和删除文件夹**

* `mkdir a b`: 在当前文件夹创建文件夹“a”和“b”
* `mkdir /a`: 在根目录创建文件夹
* `mkdir a a/b b/c`: 创建嵌套文件夹
* `mkdir -p a/b/c`: 如果父文件夹不存在，则同时创建父文件夹
* `rm a/b/c a/b a`: 嵌套删除文件夹
* `rm -r a`: 嵌套删除文件夹

### 4. 文件操作命令

**创建文件**

* `touch file_name`: 在当前文件夹中创建空文件
* `touch path/file_name`: 在指定路径创建文件

**复制文件或目录**  
默认不会修改文件属性。

* `cp 选项 source dest`: 默认带有`-i`参数，即覆盖时询问。
* `\cp 选项 source dest`: 如果有同名文件直接覆盖，不再询问。其中的“\”表示使用linux中的原生命令。

|选项|描述|
|---|---|
|`-r`|recursive的简写,递归地复制文件夹|
|`-i`|覆盖时询问|
|`-u` or `--update`|Copy only when the source file is newer than the destination file or when the destination file is missing.|

这是一个复制文件的辅助功能，用来显示复制的进度。
`rsync` compares file size and modification time and will skip copying if nothing has changed.

```Bash
rsync -ah --progress source destination
```

**删除文件或文件夹**

* `rm -r a`: 删除文件夹
* `rm a`: 删除文件
* `rm -f`: 强制删除，不再提示
* `rm -v a`: 删除文件，显示具体执行过程

**移动文件或文件夹**

* `mv file path`: 把文件移动到指定目录
* `mv file1 file2`: 移动并重命名。“file2”包含路径和文件名

**cat**

* `cat file`: catch的简写
* `cat -n`: 显示所有行的行号  

**more**

* `more file`: 按页显示文件
* `=`: 显示当前行号
* `b`: 向上翻页
* `f`: 向下翻页
* `:f`: 显示文件及行号  

**less**

* `less file`: 根据显示需要加载内容，能更快打开大文件并显示
* ` `: 空格为向下翻页
* `enter`: 回车到下一行
* `b`: 向上翻页
* `f`: 向下翻页
* `=`: 显示详细信息
* `G`: 到达文件末尾
* `g`: 到达文件起始
* `/keyword`: 跳转到关键字位置，按“n”向下查找，“N”向上查找
* `?keyword`: 跳转到关键字位置，按“n”向上查找，“N”向下查找
* `q`: 退出  

**head**

* `head file`: 查看文件前10行
* `head -n 5 file`: 查看文件前5行  

**tail**  
实时监控是针对具有某个索引的文件。使用vim编辑保存后的文件，其索引会发生变化，实际上已经变成了另外一个文件，而不是在原文件上修改。因此tail的输出不会发生变化，因为原来的索引对应的文件没变。而重定向则是在原文件上修改，索引对应的文件被修改，因此可以被tail追踪到。

|命令|描述|
|---|---|
|`tail file`|查看文件后10行|
|`tail -n 5 file`|查看文件后5行|
|`tail -f file`|follow的缩写，实时追踪该文档的所有更新|

**echo**

|命令|描述|
|---|---|
|`echo`|覆盖|
|`"hello    world"`|输出字符串|
|`\t`|制表符|
|`\n`|换行|
|`-e`|支持反斜线控制的字符转换|
|`echo $variable`|查询变量|
|`echo '==$a=='`|把“$a”视为字符串|
|`echo "==$a=="`|把“$a”视为变量|

**重定向到文件**

|命令|描述|
|---|---|
|`>`|覆盖|
|`>>`|追加|

**ln 软链接**  
软链接有自己的数据块，存放了链接其它文件的路径，是一个单独的文件，有自己的inode。类似Windows的快捷方式。  
用法：`ln -s 原文件或目录 软链接名`: 在当前目录创建软链接。原文件的路径必须是绝对路径。也可以指定软链接的位置。

|命令|描述|
|---|---|
|`rm -rf 软链接名`|删除软链接|

**history**

|命令|描述|
|---|---|
|`history 10`|显示最近的10条命令|
|`！命令编号`|重复执行相应的命令|
|`history -c`|清空全部历史命令|

**rename**  

```bash
rename 's/slang_/sl_/' *.c  # replace all "slang_" with "sl_"; find all files end with "*c"; if we omit "sl_", all "slang_" will be deleted.
rename 's/^parameter/value/' *.c  # ^ means all files start with "parameter"
rename 's/(stri|stra)ng/bang/' *.c  # replace all "string" and "strang" with "sl_"
rename 'y/a-z/A-Z/' *.prg  # upper all character
rename 's/lifelog(\d{4})\.txt/$1.md/' *.txt   # replace all "*lifelog*.txt"; "(\d{4})" means four characters after "lifelog" and will be store in "$1".
```

### 8. 压缩和解压

**gzip/gunzip压缩**  
基本语法：`gzip file`, 压缩为“*.gz”文件；`gunzip file.gz`, 解压缩  
特点：只能压缩文件；不保留原文件；多个文件会产生多个压缩包

**zip/unzip**  
基本语法：`zip 选项 文件或者目录`，压缩为“*.zip”文件；`unzip 选项 file.zip`,解压文件；会保留原文件

|选项|描述|
|---|---|
|`-r`|压缩文件夹|
|`-d <目录>`|指定解压后文件的存放目录|

解压的使用示例

```bash
unzip yaml-cpp-master.zip
```

**tar**  
打包，不是压缩。  
基本语法：`tar 选项 XXX.tar.gz 要打包的内容`  
独立命令是指，在解压和压缩时必须要用到且只能用到其中一个。可选参数在解压和压缩时可以选择性使用。必需参数只有`-f`，指定使用的文件名字，切记，这个参数是最后一个参数，后面只能接文件名。

|选项|类型|描述|
|---|---|---|
|`-c`|独立命令|产生.tar打包文件|
|`-x`|独立命令|解包.tar文件|
|`-v`|可选参数|显示解压或压缩过程的详细信息|
|`-j`|可选参数|bz2属性|
|`-Z`|可选参数|有compress属性的|
|`-z`|可选参数|打包同时用gzip压缩|
|`-C`|可选参数|解压到指定目录|
|`-O`|可选参数|将文件解开到标准输出|
|`-f`|必需参数|指定压缩后的文件名|

使用示例如下

```bash
tar zxvf FileName.tar.gz # 解压
tar zcvf FileName.tar.gz DirName # 压缩
```

**7z**  
一个解压缩的命令示例如下，会新建一个名为“file”的文件夹并把文件解压到这个文件夹。

```Bash
7z x file.7z
```

如果解压带密码的压缩文件。命令示例如下。假设密码为“blue”。注意密码和 `-p` 参数之间无空格。

```Bash
7z x file.7z -pblue
```

**rar**  

|选项|描述|
|---|---|
|`x`|在目标路径里创建一个名为“file”的文件夹，把解压后的文件放在该文件夹。|
|`-e`|把解压后的文件放在当前目录|

```Bash
unrar x file.rar ./
```

### 9. 磁盘管理

执行命令`sudo apt install tree`安装“tree”工具的命令，使用`tree 路径`显示当前文件夹及子文件。
`udisks2`是一个经常使用的磁盘工具，通过命令`sudo apt install udisks2`安装

**du**  
查看文件夹大小

|选项|描述|
|---|---|
|`du`|“disk usage”的缩写。显示当前文件夹的子文件夹的大小。|
|`-h`|“human readable”，显示MB、KB等单位,提高信息的可读性|
|`-a`|递归地显示指定目录中各文件及子目录中各文件占用的数据块数。若既不指定-s，也不指定-a，则只显示Names中的每一个目录及其中的各子目录所占的磁盘块* 数|
|`-c`|在输出末尾显示本文件夹的大小总和（系统默认设置）|
|`-s`|对每个Names参数只给出占用的数据块总数|
|`--max-depth=n`|统计子目录的深度为n层|
|`-b`|以字节为单位列出磁盘空间使用情况（系统默认以k字节为单位）|
|`-k`|以1024字节为单位列出磁盘空间使用情况|
|`-l`|计算所有的文件大小，对硬链接文件，则计算多次|
|`-x`|跳过在不同文件系统上的目录不予统计|

一个使用示例

```Bash
du -h --max-depth=0 # 查看所在文件夹的总大小
du -sh # 查看当前文件夹的大小
```

**df**  
查看磁盘占用情况。

|选项|描述|
|---|---|
|`df`|"disk free"的缩写，列出文件系统的磁盘占用量|
|`-h`||

|结果分析|
|---|---|
|/dev/sda1|“dev”表示设备，“sda”表示磁盘设备的名称，“sda1”表示该磁盘的第一个分区。|
|tmpfs|内存设备对应的文件，包括swap分区|
|/dev/shm|“shared memory”的缩写，默认为系统内存的一半|
|sda|SATA(热插拔,个人用户,容量大,便宜)，SCSI(服务器)|
|hda|IDE接口硬盘|
|vda|虚拟化模拟硬盘|

一个使用示例

```bash
df -hl # 查看磁盘剩余空间
df -h  # 查看每个根路径的分区大小
```

**free**

|选项|描述|
|---|---|
|`free`|显示内存使用情况|
|`-h`||

**lsblk**

|选项|描述|
|---|---|
|`lsblk`|“block”的缩写，查看设备挂载情况|
|`-f`|查看详细的设备挂载情况，显示文件系统信息|

|结果分析|
|---|---|
|UUID|系统为分区创建的唯一标识符|
|sr0|光盘和光驱|

**fdisk**  
该命令必须在root用户权限下才能使用。

|选项|描述|
|---|---|
|`fdisk -l`|查看磁盘分区情况|
|`fdisk 硬盘设备名`| 对新增硬盘进行分区操作|
|`-l`|显示所有硬盘的分区列表|

`mkfs -t 文件系统 指定分区`：“make file system”的缩写，格式化文件系统

**挂/卸载**  
基本语法：`mount -t 文件系统类型 -o 选项 分区或磁盘 挂载点`

|选项|描述|
|---|---|
|`-t vtstype`|通常不用指定文件系统的类型|
|`-o options`|挂载方式，“loop”把文件当成硬盘分区，“ro”只读，“rw”读写|

`umount 设备名称`或者`umount 挂载点`卸载设备，因为设备名称和挂载点是一一对应的。

磁盘自动挂载在文件`/etc/fstab`中。“dump”为1每天定时备份，为0则不备份。“pass”为文件系统检查的优先级。命令`fsck`会在开机后执行，用于检查磁盘，会先检查“pass”为1的磁盘，再检查“pass”为2的磁盘，“pass”为0表示不检查。开机启动挂载的设置也在这个文件。  

以下为一个使用示例。

```Bash
mkdir ~/data # 在 ~ 目录下创建一个 data 的目录
sudo mount /dev/sda1 ~/data # 并将新分区挂载到这里; sda1 不是固定的，要看自己的硬盘盘符; 硬盘中的文件放在文件夹 data 中
sudo udisksctl unmount -b /dev/sda1    # 取消挂载；sda1 是移动硬盘的一个分区的名称，第一个分区通常以`1`结尾，第二个及之后的以此类推；
sudo udisksctl power-off -b /dev/sda   # 安全断电；sda 是移动硬盘这个设备的名称, the second one usually is sdb
```

如果需要在电脑开机时自动挂载硬盘，可以按照以下步骤

* 查看硬盘信息: `sudo blkid`
* 编辑硬盘挂载文件 `sudo gedit /etc/fstab`
你可以在这个文件里添加想要自动挂载的硬盘，也可以更改硬盘默认的挂载位置。

**smart**  

```bash
sudo apt-get install smartmontools # 安装工具
sudo smartctl -a /dev/sda1 # 查看磁盘smart信息
```

“gsmartcontrol”可以看做“smartmontools”的前端，提供了可视化的交互界面。

```bash
sudo apt install gsmartcontrol # 安装`smartctl`工具
sudo gsmartcontrol # 运行该工具
```

# 二、vim

vi来自于unix系统。vim则是vi的改进版。更多命令可以看终端里的提示，需要注意的是，终端的提示的意思是，首先需要输入一个冒号，然后再输入需要的命令。

### 基本步骤

1. 使用`vim file_name`打开文件，此时进入普通模式。普通模式下，不能编辑文本，主要操作为删除、复制和粘贴。
2. 按`insert`进入编辑模式，此时可以编辑文本。
3. 按`Esc`退出编辑模式。
4. 如果保存修改，输入`:w`；
5. 如果要退出vim，输入`:q`。

### 快捷键

* `CTRL+S`: stop的缩写，停止向终端停止输出;
* `CTRL+Q`: 恢复向终端输出流。期间的输入会缓存在流中，恢复输出流后一次性输出至终端。

### 普通模式

|命令|作用|
|---|---|
|yy|复制当前行|
|5yy|复制当前行及以下4行|
|p|粘贴复制的内容|
|3p|将粘贴的内容复制3次|
|dd|删除当前行|
|3dd|删除3行(本行及之后)|
|u|撤销之前的一次操作|
|y$|复制光标到本行结尾的字符|
|y^|复制本行至光标处的字符|
|w|跳到当前的下一个单词|
|yw|复制当前单词,包含单词后的空格|
|dw|删除当前光标至所在单词结束,包括单词后的空格|
|x|剪切光标位置的字符|
|X|退格(删除)|
|r|改写光标处的字符|
|R|替换|
|^|移动到行首|
|$|移动到行尾|
|J|文档末尾|
|L|文档末行行首|
|3J|跳转到第三行|

### 编辑模式

|命令|作用|
|---|---|
|i||

### 命令模式

|命令|作用|
|---|---|
|:w|保存|
|:q!|强制退出|
|:wq!|强制保存并退出,可用于修改只读文件|
|set nu|显示行号|
|set nonu|隐藏行号|
|:/|查找; 光标跳转到首个结果; 按n跳转到下一个结果|
|:noh|取消高亮状态|
|:s/boot/booot|把当前行的首个boot替换为booot|
|:s/boot/booot/g|把当前行的boot替换为booot|
|%s/boot/booot|把每行的首个boot替换为booot|


# 三、网络配置

B类地址构建的子网：172.17  
c类地址构建的子网：192.168  

WSL：Windows system for linux  
ifconfig： interface configuration

### 网络IP

DHCP：动态分配IP

1. 桥接：虚拟接直连外部物理网络，主机起到网桥作用。可直接访问外部网络，并且对外部网络可见。IP地址由路由分配  
2. NAT：network address transition。虚拟机和主机构建专用网络。外部无法直接访问虚拟机。创建该虚拟机的PC也无法直接访问虚拟机。在PC再虚拟一个网卡，接到虚拟子网的路由器上。  
3. 仅主机模式：vm不再连接网卡，不能访问外部网络。  

centos3: vim /etc/sysconfig/network-scripts/ifcfg.ens33
ubuntu: vim /ect/netplan/01-network-manager-all.yaml
静态IP分配：“dchp”改为“static”。然后在文档结尾添加如下文本。

```Bash
# IP地址
IPADDR=192.168.1.100
# 网关
GATEWAY=192.168.1.2
# 域名解析器
DNS1=192.168.1.2
```

需要执行`service network restart`重启网络服务才能使用更改后的配置。

### 主机名

1. 执行`hostname`查看当前主机名  
2. `vi /etc/hostname`修改当前主机名；`hostnamectl`查看当前主机配置。修改后需要重启后修改才能生效。  
3. `hostnamectl set-hostname spark10`可以实时修改主机名  
4. `vim /etc/hosts`添加IP和主机名的映射；

### 远程登录

xshell工具

### ssh和scp端口

有时网络连接不止需要IP地址，还需要特定端口。指定端口时，ssh可以用大写的“P”也可以用小写的“p”，但scp只能用大写的“P”。

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

|运行级别|描述|
|---|---|
|0|系统停机状态|
|1|单用户，root权限，用于系统维护，禁止远程登录；类似Windows的安全模式；启动的服务最少，相当于最小化启动|
|2|多用户，不支持网络，没有NFS(net file system)|
|3|多用户，登录后进入命令行模式|
|4|未使用，保留|
|5|X11控制台，登录后进入图形GUI模式|
|6|系统重启|

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

|选项|功能|
|---|---|
|-H|相当于`--halt`|
|-r|=`reboot`|
|`-P`或者`-h`|=power-off|
|`now`|立刻关机|
|`时间`|等待一定时间后关机(单位为分钟)|

3. 命令示例

|命令|作用|
|---|---|
|`shutdown -c`|等待一定时间后关机,默认为1分钟|
|`shutdown 3`|等待3分钟后关机|
|`shutdown 15:28`|定时关机|
|`shutdown now`|立刻关机，但仍然会先执行sync操作|

### environment variables

|variables|meaning|
|---|---|
|`HISTSIZE`|Specifies the number of commands to keep in memory during a shell session.|
|`HISTFILESIZE`|Specifies the maximum number of commands that can be saved in the history file.|

# 五、常用命令

“Bourne+shell+Again=bash”
ubuntu默认使用“dash”，也可以改为“bash”。“dash”不支持数组，其余和“bash”基本相同。

### 1. 帮助命令

##### 1. man

**主要描述**

|信息|功能|
|---|---|
|NAME|命令名称和单行描述|
|SYNOPSIS|怎样使用命令|
|DESCRIPTION|详细描述|
|EXAMPLES|例子|

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

|快捷键|功能|
|ctrl+c|停止当前程序|
|ctrl+l|清屏，等同于clear|
|上下方向键|查找执行过的命令，也可修改执行过的命令|
|ctrl+z||
|reset|重启当前shell环境|
|tab键|自动补全|
|||

### 5. 时间和日期

**date**  
用法：`date 选项 格式`

|参数|功能|
|---|---|
|`date`|当前时间|
|`+%Y`|当前年份|
|`+%y`|当前年份的后两位|
|`+%m`|当前月份|
|`+%d`|当前日|
|`+%M`|当前分钟|
|`+%S`|当前秒|
|`+%s`|当前秒数的时间戳|
|`+%Y-%m`|自定义输出格式|
|`"+%Y %m"`|如果有空格，必须用引号|

|选项|功能|
|---|---|
|-d<时间字符串>|显示指定的时间字符串表示的时间，不是当前时间|
|`date -d '1 days ago'`|显示前一天的时间|
|`date -d '1 days ago'`|显示明天的时间|
|`date -d '1 hours ago'`||
|-s<日期时间>|设置系统时间|
|`date -s "2027-06-19 20:52:18"`||
|`ntpdate 时间服务器`||

**cal**  
“calendar”的缩写。

|选项|功能|
|---|---|
|`cal`|显示当前月|
|`cal -3`|显示上月、本月、下月|
|`cal -m`|周一在首行|
|`cal 2021`|显示2021年日历|

### 6. 用户权限

**添加用户**  

|命令|功能|
|---|---|
|`useradd 用户名`|添加新用户|
|`useradd -g 组名 用户名`|添加新用户到指定组|
|`useradd -d /data/dave tony `|添加新用户tony并指定其home文件夹|
|`passwd 用户名`|为用户设置密码|
|`id tony`|查找用户。“uid”为用户名，“gid”为组名|
|`cat /etc/passwd`|查看用户。大量默认用户用于运行系统服务，称为伪用户。自定义用户从“1000”开始。通过哪个进程与系统交互。|
|`su 用户名`|“switch user”的缩写，切换到指定用户|
|`su root`|切换到root用户|
|`exit`|用户切换实际是会话的嵌套，这个命令会退回到上一用户|
|`who am i`|查看创建会话的用户的信息|
|`whoami`|查看当前用户名称|
|`sudo usermod -aG sudo username`|add user to sudo group so that user can use `sudo`|
|`sudo usermod -d /new/home/path -m username`||

**root**

|命令|功能|
|---|---|
|`sudo`|临时赋予root权限|
|`userdel tony`|删除用户“tony”。但该操作不能删除其home文件夹|
|`userdel -r tony`|删除用户“tony”,同时删除其home文件夹|

**用户组**  
每个用户都有一个默认组，组名和用户名同名。一个组可以属于多个组。

|命令|功能|
|---|---|
|`sudo cat /etc/group`|显示所有组|
|`groupadd 组名`||
|`usermod -g 组名1`|把用户添加到指定组|
|`groupmod -n 组名2`|修改组名|
|`groupdel 组名1`|删除用户组|

**文件属性**

|`drwxr-xr-x  2 jpw jpw 131072 5月  30 21:29 business/`|
|文件属性 硬链接的数量/子文件夹的数量 属主 属组 文件大小 最后更改时间 文件名|

|字符|描述|
|---|---|
|_首字符: 文件类型_||
|c|字符设备文件，例如鼠标键盘|
|b|block设备文件，例如硬盘|
|-|普通文件|
|d|文件夹|
|l|链接文档|
|_1-3: 属主权限(Users)_||
|r|read|
|w|write|
|x|execute|
|_4-6: 属组权限(Group)_||
|r|read|
|w|write|
|x|execute|
|_7-9: 其它用户权限_||
|r|read|
|w|write|
|x|execute|
|||
|字符对文件和目录的含义||
|w||
|文件|可以修改文件，但不代表可以删除文件。有当前文件夹的写入权限才能删除文件。|
|目录|在目录内可以创建、删除、重命名|
|r||
|文件|读取查看文件|
|目录|可读取和查看目录内容|
|x||
|文件|可被系统执行|
|目录|可进入该目录|

**文件权限**  
_chmod_

|属主|属组|其它用户|
|u|h|o|

|`chmod {ugoa}{+-=}{rwx} 文件或目录`|a表示全部; +为增加权限; -为撤销权限; 每个{}中选取一项组成参数|
|`chmod {mode}{mode}{mode} 文件或目录`|4为r,2为写,1为执行,mode用一个数字表示权限(二进制编码)|
|`chmod -R {mode}{mode}{mode} 文件或目录`|4为r,2为写,1为执行,mode用一个数字表示权限(二进制编码);针对文件夹内的所有文件|

_chown_

|命令|描述|
|---|---|
|`chown 选项 最终用户 文件或目录`|“change owner”的缩写|
|`-R`|递归操作|

If you try to change owner of file or directory stored in ntfs system(Windows), it's possible to fail.

_chgrp_

|命令|描述|
|---|---|
|`chgrp 最终用户组 文件或目录`|“change group”的缩写|

新创建的不同用户不能使用`tab`补全，且不显示当前所在路径。解决方案点击[此处](https://www.cnblogs.com/qqhfeng/p/12708970.html). 原因是新创建的用户使用的shell为`bin/sh`，需要改为`bin/bash`。

### 7. 搜索查找

**find**  
基本用法：`find 搜索范围 选项`

|选项|示例|描述|
|---|---|
|`-name <查询方式>`|`find . -name md*`|指定文件名和查找模式，|
|`user <用户名>`|`find .. user Joe`|”属于指定用户的所有文件|
|`-size <文件大小>`|`find / -size +10M`|大于10M的文件|

以下为一个使用示例，查看当前文件夹中名为“gtsam”的文件。

```Bash
find . -name "gtsam"
```

**locate**  
利用事先建立的所有文件名及其路径的locate数据库。查询速度快，但可能会过时，因为该数据库默认每天更新一次。更新命令为`updatedb`。  
基本用法：`locate file`；`which locate`或`whereis locate`查找该命令的位置

**grep过滤查找**  
管道符`|`表示将前一个命令的结果输出传递给后面的命令处理。  
基本语法：`grep 选项 查找内容 源文件`

|选项|描述|
|---|---|
|`-n`|显示匹配行及行号|

</br>
基本语法：`wc file`，“word count”的缩写，输出的结果依次为行数、单词数、字节数

### 10. 进程管理

启动之后一直存在、常驻内存的进程，称为“服务”。

**ps**  
"process status"的缩写。  

|选项|描述|
|---|---|
|`ps`|显示的是当前用户和与当前终端相关联的进程|
|`ps aux \| grep xxx`|查看所有系统进程，可显示CPU和内存占用|
|`ps -ef \| grep xxx`|查看子父进程之间的关系|
|`-a`|列出带有终端的所有用户进程|
|`-x`|所有用户进程，包括没有终端的|
|`-u`|面向用户友好的显示风格|
|`-e`|列出所有进程|
|`-f`|显示完整格式的进程列表，可以显示PPID|

`ps aux`结果分析

|item|meaning|
|---|---|
|USER或UID|调用进程的用户|
|VSZ|虚拟内存。 LRU(less recently use)算法把不常用的内存会直接放到虚拟内存|
|RSS|实际占用的物理内存|
|TTY|。调用进程的终端。“?”表示后台的进程，没有对应的终端。“tty1”是图形化终端，tty2-6是本地的字符界面终端，pts/0-255表示虚拟终端|
|STAT|status.S睡眠状态，T暂停状态，Z僵尸状态(进程即将结束,但还有资源未清楚)，s包含子进程，l多线程，+前台显示，<高优先级，N低优先级|
|START|该进程的启动时间|
|TIME|进程占用CPU的运算时间，不是系统时间|
|COMMAND|“[kthread]”所有内核线程的调用和管理|
|PPID|父进程的ID|
|STIME|启动时间|

**kill终止进程**  
基本语法：`kill [选项] PID`或者`Kill 进程名`

|选项|描述|
|---|
|`-9`|强行终止进程；活动的进程必须使用这个选项才能终止进程|
|`kill -l`|显示kill信号描述|
|`killall sshd`|关闭所有sshd进程|

**进程树**  
使用命令`pstree`显示进程树，包含所有进程的父子关系

|选项|描述|
|---|---|
|`-p`|显示进程的PID|
|`-u`|显示进程所属用户|

**进程监控**  
“top=table of process”:进程表  
基本命令：`top [选项]`

|结果|描述|
|---|---|
|cpu||
|`us`|未经修改优先级的用户进程的占比|
|`sy`|系统进程|
|`ni`|nice的缩写该值越高，优先级越低|
|`wa`|wait的缩写，等待的时间占比，等待IO操作|
|`hi`|hardware interrupt缩写，硬件中断|
|`si`|software interrupt缩写，软件中断|
|`st`|steal的缩写，虚拟机占用|
|进程||
|`PR`|priority缩写，系统任务调度的优先级|
|`NI`|用户指定的nice值|
|`VIRT`|virtual memory usage，虚拟内存|
|`RES`|resident memory usage，物理内存|
|`SHR`|共享内存|

|命令|描述|
|---|---|
|`shift+m`|按内存占用排序|
|`shift+p`|按CPU占用排序|
|`shift+n`|进程号从大到小排序|
|`q`|退出top|
|`u`|查看指定用户进程|
|`k`|kill指定进程|

|选项|描述|
|---|---|
|`-d`|设定更新间隔，单位为秒|
|`-i`|不显示限制或者zombie进程|
|`-p`|指定PID监控指定进程|

**网络**  
基本语法：  
`netstat -anp | grep PID`：指定进程的网络信息  
`netstat -anp | grep 端口号`：查看网络端口

|选项|描述|
|---|---|
|`-a`|all的缩写|
|`-n`|不显示别名，例如，网址就是别名，使用这个选项直接显示IP|
|`-l`|只列出在监听的服务状态|
|`-p`|显示调用的进程|

|结果|描述|
|---|---|
|`Proto`|protocol缩写，协议|
|`Recv-Q`|已接收但没拷贝的字节数|
|`Send-Q`|已发送但对方未确认的字节数|
|`Local Address`|套接字，`IP:port`|

### 11. 定时任务

重启crond服务：`systemctl restart cron`  

基本语法：`crontab`

|选项|描述|
|---|---|
|`-e`|编辑定时任务|
|`-l`|列出所有定时任务|
|`-r`|清楚当前用户的所有定时任务|

时间的格式：共5个时间需要填，分别为`分时天月周`

|符号|描述|
|---|---|
|`*`|不对这个时间作设置|
|`,`|多个时间并列|
|`2-5`|表示时间范围，从2到5，单位取决于其所在的位置|
|`*/10`|*表示对应的时间，每隔这个时间就执行一次，单位取决于其所在的位置|

# 六、shell编程

### 1. 命令运行

|命令|描述|
|---|---|
|`source hello_word.sh`|shell的内嵌命令，运行时没有启动子shell嵌套环境|
|`. hello_word.sh`|`.`是一个命令，和`./hello_word.sh`中的`.`不同|
|`sh hello_word.sh`|启动了一个子shell进程，然后在子进程中执行脚本|
|`./hello_word.sh`|启动了子shell并执行脚本|

只执行`bash`命令则是启动并进入了一个子shell，之后的命令会在这个子shell中进行。

### 2. 变量

所有变量搜默认为字符串类型。  

**系统预定义变量**  
系统预定义变量的变量名通常为大写，常用系统变量有`$PWD`,`$HOME`,`$SHELL`,`$USER`，`$PATH`(保存命令的路径)。  
执行命令`env`可以查看所有系统全局变量。执行命令`set`可以查看所有变量，包括系统定义和用户定义。  

**自定义变量**  

|功能|命令|
|---|---|
|定义变量|`a=2`或`a="hello world"`，注意等号前后不能有空格|
|声明为全局变量|`export a`，此时可以在子shell中使用。但子shell对该变量的修改只在子shell中生效|
|只读变量|`readonly b=5`|
|删除变量|`unset a`，不能删除只读变量|
|命名|不能以数字开头，环境变量名建议大写|

**特殊变量**  
用于为脚本输入参数。

|命令|描述|
|---|---|
|`$n`|使用时把“n”改为数字. `$0`为该脚本名称；`$1`-`$9`he `${10}`表示对应位置的参数|
|`$#`|获取输入参数的个数|
|`$*`|命令行中的所有参数，把所有参数视作一个整体|
|`$@`|命令行中的所有参数，所有参数构成一个集合|
|`$?`|最后一次执行命令返回的状态，0表示正确执行|

### 3. 运算符

|功能|命令|
|---|---|
|数值计算命令|`expr 1 + 2`, `expr 5 \* 2`，注意运算符和数字之间的空格，不能省略。星号需要转义符，加号不需要|
|数值计算|`a=$((1+5))`或者`a=$[2+3]`，注意数字和运算符之间没有空格|
|数值赋值|`a=$(expr 1 + 2)`或者"a=\`expr 1 + 2\`"(中间的小点是反引号，反引号内的字符串当作shell命令来执行，返回值是命令的执行的结果，起到的是一个命令的替换作用)|

### 4. 流程控制

**条件判断**  
基本语法：`test $a = hello `或者`[ $a = hello ]`(满足条件时返回值为0;注意命令中的空格)；  

|常用判断条件|描述|
|---|---|
|整数||
|`-eq`|equal缩写|
|`-ne`||
|`-lt`|less than缩写|
|`-le`|less or equal缩写|
|`-gt`||
|`-ge`|great缩写|
|文件权限|
|`-r`||
|`-w`||
|`-x`||
|文件类型||
|`-e`|eistence缩写，文件是否存在|
|`-f`|是否为常规文件|
|`-d`|是否为目录|
|`-z`||
|``||

示例：

|`[ $a -lt 20] && echo "1" || echo "2"`|为真输出1，否则输出2|
|`[ $a -lt 10 -a $a -gt 5]`|`-a`为与，`-o`为或|
|`[ -z $a ]`|zero缩写，字符串是否为空，或者数字值为0|

**if分支**  
单分支

```bash
if condition;then
  pass 
fi
```

or

```bash
if condition
then
  pass 
fi
```

多分支

```bash
if condition1
then
  pass1 
elif condition2
  pass2
else
  pass3
fi
```

**case分支**

```bash
case $var in
"var1")
  pass1
;;
"var")
  pass2
;;
*)
  pass
;;
esac
```

**for循环**  

```bash
for((初始值;判断;变量变化)) # 因为(()),因此内部可以直接使用数学上的运算式
do
  pass
done
```

或者

```bash
# for var in {1..100} # 遍历从1到100这个序列
# for var in `ls` # 
for var in var1 var2 var3
do
  pass
done
```

**while循环**  

```bash
while condition
do
  pass
done
```

### 读取控制台输入

基本语法：`read option argument`(选项 赋值的变量)

|选项|描述|
|---|---|
|`-p`|读取值时的提示符|
|`-t`|等待的时间，默认一直等待|

# 七、函数

### 系统函数

**basename**  

|命令|描述|
|---|---|
|`basename string`|字符串剪切，只保留字符串最后一个`/`后的字符，通常用于从完整文件路径中获取文件名|
|`basename string suffix`|把字符串中的后缀删除|

**dirname**  

|命令|描述|
|---|---|
|`dirname string`|字符串剪切，只保留字符串最后一个`/`前的字符，通常用于从完整文件路径中获取文件路径|

### user function

声明和定义函数后，才能调用函数。函数返回值只能通过命令`$?`获取，返回值为函数中`return`语句的返回值，返回值只能为0-255。如果没有`return`,则返回函数中最后一个命令的执行结果。实际上return的是一个状态码，因此取值范围很小，如果数值太大，不会报错，会返回溢出后的值。

```bash
function add()
{
  s=$1 # $1为传入的参数
  echo $s 
  # return 0 # 如果是返回状态码，建议使用return
}
sum=$(add $a)
echo $sum
```

# 八、正则表达式

正则表达式使用一些特殊字符来匹配对应字符串。部分工具引入了扩展的正则规则，这些规则并不通用，其它工具可能无法正确识别这些正则规则。

|特殊字符|描述|
|---|---|
|`^sh`|以“sh”开头|
|`end$`|以“end”结尾|
|`^$`|匹配空行|
|`r..t`|匹配以r开头t结尾中间有两个字符的行|
|`ro*t`|*前的字符匹配至少一次，例如“rot”“root”“rooot”|
|`^a.*b`|以a开始以b结束|
|`[a-f,g-p]`or`[3-5]`|该字符只能处于这个范围|
|`[ab]*`or`[a,b]*`|这个范围内的字符出现任意次|
|`'\$'`|对$转义|

# 九、文本处理工具

**cut**  

|`cut [option] filename`|按照规则把文件的每行剪切为strings并输出|
|`-f 2,3,5-9,11-`|按列号提取|
|`-d " "`|按分隔符分割列，默认按照制表符`\t`(tab)分割|
|`-c`|按字符切割后加数字表示取第几列|

**awk**  
基本用法：`awk [option] '/[pattern]/{action}'`，其中“pattern”为正则匹配，“action”为执行的代码段

|选项|描述|
|`-F`|指定输入文件分隔符|
|`-v`|使用一个用户定义的变量|
|示例|
|`awk -F ":" 'BEGIN{action1}' 'END{action2}'`|在所有数据读取之前和之后执行的操作|
|`awk -v i=1 -F ":" '{print 3+i}'`||
|内置变量||
|`FILENAME`|包含路径的文件名|
|`NT`|列数|
|`NR`|行号|

# 其它

inode: 保存了文件的元信息，文件类型、文件权限、文件的链接数(硬链接的数量)、创建时间、文件索引编号等等。

硬链接指向的是文件的inode，因此只能针对文件，不能指向目录。当文件的硬链接数量为0时，说明该文件已经被删除。

登录桌面时的用户；图形化桌面环境也是root用户。

端口号：0-65535，默认使用，ssh用22，网页用80，mysql用3306

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
