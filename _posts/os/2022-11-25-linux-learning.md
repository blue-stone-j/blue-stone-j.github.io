---
layout: post
title:  "Linux以及相关qa"
date:   2024-01-05 11:20:55 +0800
categories: [OS]
excerpt: 总结了Linux常用命令、qa
tags:
  - Ubuntu 
  - Linux
  - 
class: sys
---

这篇文章总结了Linux常用命令、qa等。



# 一、命令

### 一.文件

##### 1.如何退出Vim
* **退出**

```bash
ZZ  //保存并退出
```
或者
```bash
ZQ  //不保存并退出
```
更多退出命令可以看终端里的提示，需要注意的是，终端的提示的意思是，首先需要输入一个冒号，然后再输入需要的命令。

* **查找**
```Bash
/
```

##### 2. rename
```bash
rename 's/slang_/sl_/' *.c  # replace all "slang_" with "sl_"; find all files end with "*c"; if we omit "sl_", all "slang_" will be deleted.
rename 's/^parameter/value/' *.c  # ^ means all files start with "parameter"
rename 's/(stri|stra)ng/bang/' *.c  # replace all "string" and "strang" with "sl_"
rename 'y/a-z/A-Z/' *.prg  # upper all character
rename 's/lifelog(\d{4})\.txt/$1.md/' *.txt   # replace all "*lifelog*.txt"; "(\d{4})" means four characters after "lifelog" and will be store in "$1".
```

##### 3. 压缩和解压缩
1. .zip
解压
```bash
unzip yaml-cpp-master.zip
```
1. .tar.gz
```bash
tar zxvf FileName.tar.gz # 解压
tar zcvf FileName.tar.gz DirName # 压缩
```
1. rar
`x`: 在目标路径里创建一个名为“file”的文件夹，把解压后的文件放在该文件夹。<br>
`e`: 把解压后的文件放在当前目录
```Bash
unrar x file.rar ./
```
1. tar
**独立命令**
独立命令是指，在解压和压缩时必须要用到且只能用到其中一个。
* `-x`: 解压
* `-c`: 压缩
**可选参数**
在解压和压缩时可以选择性使用。
* `-z`：有gzip属性的
* `-j`：有bz2属性的
* `-Z`：有compress属性的
* `-v`：显示解压或压缩过程
* `-O`：将文件解开到标准输出
**必需参数**
* `-f`: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。<br>
一个解压缩的命令示例如下，会把文件解压到当前文件夹
```Bash
tar -xvf file.tar
```

1. 7z
一个解压缩的命令示例如下，会新建一个名为“file”的文件夹并把文件解压到这个文件夹。
```Bash
7z x file.7z
```
如果解压带密码的压缩文件。命令示例如下。假设密码为“blue”。注意密码和 `-p` 参数之间无空格。
```Bash
7z x file.7z -pblue
```

##### 4. 安装对应版本的软件、库、依赖
```Bash
sudo apt-get install sphinx-common=1.3.6-2ubuntu1
```
use cmd blow to install software. You can also refer [here](https://phoenixnap.com/kb/dpkg-command)
```Bash
dpkg -i *.deb
```

##### 5. 侧边栏
按`F9`可以消失或出现侧边栏。

##### 6. 查找文件
* 查找文件所在的位置
```Bash
find . -name "gtsam"
```
* 输出文件当前路径
```Bash
pwd
```

##### 7. 所在文件夹的总大小
```Bash
du -h --max-depth=0
```

##### 8. show progress when copy
```Bash
rsync -ah --progress source destination
```

##### 9. 批量删除某个名称的文件夹
```Bash
find . -type d -name .git -prune -exec rm -r {} \;
```
* `.`: 指定查找的范围，即在呢个文件夹内查找
* `-name`: find命令的参数，后面接要查找的文件夹名称
* `.git`: 我们想要删除的文件夹的名称，此处我想删除的文件夹为“.git”
* `-exec`: 
* `{}`: can be read as "for each matching file/ folder" 
* `\;` is a terminator for the `-exec` clause

下面的这个命令也可以使用。
```Bash
rm -rf `find . -type d -name a`
```

##### 10
有时网络连接不止需要IP地址，还需要特定端口。指定端口时，ssh可以用大写的“P”也可以用小写的“p”，但scp只能用大写的“P”。

---



### 二.使用终端

##### 1. 
为了添加到环境变量，以使每个终端都生效，常输入类似下面的命令。
```bash
echo "source /home/nnnn/Documents/mws/devel/setup.bash " >> ~/.bashrc
```
最好不要在root用户状态下输入。

##### 2. 如何退出root用户
输入以下命令可以从root用户变为普通用户，或者从普通用户退出终端。
```bash
exit
```

##### 3.如何合并多个终端
假设现有两个终端窗口A和B。在终端窗口A新建一个空白标签页（tab），将A窗口的其它标签页移动到另一个窗口B，然后关闭A窗口。间接实现终端的合并。

##### 4.使程序在后台运行
方式一：`cmd &`。程序仍然会输出在当前终端。在关闭当前终端后，程序会随之退出。<br />
方式二：`nohup cmd &`。默认情况下，该命令的所有输出都被重定向到nohup.out文件中。关闭时需要输入`exit`退出。如果点击右上角的关闭按钮，会导致该程序直接结束，不会在后台运行。

##### 5. 快捷键
`CTRL+S`表示停止向终端停止输出; `CTRL+Q`恢复向终端输出流。期间的输入会缓存在流中，恢复输出流后一次性输出至终端。<br />
`CTRL+D`表示关闭当前所在的终端页面。

##### 6. 代理
查看当前代理
```
env|grep -i proxy
```
设置代理
```
export http_proxy=118.210.42.251:44367
或：
export https_proxy=118.210.42.251:44367
```
取消代理
```
unset http_proxy
或：
unset https_proxy
```
以上操作只对当前终端有效。

##### 7. 远程主机界面
连接到远程主机，在远程主机启动程序，并把对应的图像传回本地。
```shell
sudo apt install xvfb
Xvfb :1 -screen 0 1024x768x24 &
export DISPLAY=:1

ssh -Y user@remote_ubuntu_host
rviz
```


### 三.设备
##### 1.移动硬盘
首先确认已经安装了`udisks2`。如果没有可通过`sudo apt install udisks2`安装。首先确认需要移除的移动硬盘的标号，可通过`fdisk -l`查看连接的磁盘设备。然后使用以下命令移除硬盘
```Bash
mkdir ~/data # 在 ~ 目录下创建一个 data 的目录
sudo mount /dev/sda1 ~/data # 并将新分区挂载到这里; sda1 不是固定的，要看自己的硬盘盘符; 硬盘中的文件放在文件夹 data 中
sudo udisksctl unmount -b /dev/sda1    # 取消挂载；sda1 是移动硬盘的一个分区的名称，第一个分区通常以`1`结尾，第二个及之后的以此类推；
sudo udisksctl power-off -b /dev/sda   # 安全断电；sda 是移动硬盘这个设备的名称, the second one usually is sdb
```
电脑开机时自动挂载硬盘。
* 查看硬盘信息: `sudo blkid`
* 编辑硬盘挂载文件 `sudo gedit /etc/fstab`
你可以在这个文件里添加想要自动挂载的硬盘，也可以更改硬盘默认的挂载位置。

```Bash

```

##### 3. 查询磁盘剩余空间

```bash
du -sh // 查看当前文件夹的大小
```
du 命令用于查看当前目录的总大小：
* -s：对每个Names参数只给出占用的数据块总数。  
* -a：递归地显示指定目录中各文件及子目录中各文件占用的数据块数。若既不指定-s，也不指定-a，则只显示Names中的每一个目录及其中的各子目录所占的磁盘块* 数。  
* -b：以字节为单位列出磁盘空间使用情况（系统默认以k字节为单位）。  
* -k：以1024字节为单位列出磁盘空间使用情况。  
* -c：最后再加上一个总计（系统默认设置）。  
* -l：计算所有的文件大小，对硬链接文件，则计算多次。  
* -x：跳过在不同文件系统上的目录不予统计。  
* -h：以K，M，G为单位，提高信息的可读性。

```bash
df -hl # 查看磁盘剩余空间
df -h  # 查看每个根路径的分区大小
```

##### 4. 查看固态盘总写入量等信息
安装`smartctl`工具。
```bash
sudo apt install gsmartcontrol
```
使用以下命令查看磁盘信息。其中`/dev/nvme0`为硬盘的标号。
```bash
sudo smartctl -a /dev/nvme0
```

##### 5. 网络连接和设备
iwconfig
ethtool

### 4 customize
##### 1. Hide Mounted Drives on the Ubuntu Dock
```Bash
gsettings set org.gnome.shell.extensions.dash-to-dock show-mounts false
```
show it
```Bash
gsettings set org.gnome.shell.extensions.dash-to-dock show-mounts true
```
For now it is not possible to whitelist mounts so that only specific drives show up in the Dock. You can either hide mounted drives from the Ubuntu Dock entirely, or not at all.


# 三、脚本示例
##### 01 录制特定时间的bag包
如果文件夹存在不执行操作，不存在就创建文件夹; 计算该文件夹内的文件个数(不包括文件夹)。
* `ls -l`,统计当前文件夹,不包括子文件夹; `ls -lR`, 统计当前文件夹,包括子文件夹;
* `"^-"`,统计文件个数; `"^d"`,统计文件夹个数
* `wc -l`, 统计输出信息的行数，因为已经过滤得只剩一般文件了，所以统计结果就是一般文件信息的行数，又由于一行信息对应一个文件，所以也就是文件

```Bash
mkdir -p cloud_rtk
cd cloud_rtk

num=`ls -l |grep "^-"|wc -l`

rosbag record --duration=2 -o $num /lidar1/points
```

##### 02 远程下载或上传文件
* 首行是标记使用的脚本的类型，此处为`expect`脚本，也可使用`bash`脚本。
* spawn: 执行一个命令
* `expect EOF` means that all interacts are finished and return to original terminal/user. also `eof`
* send: 用于向进程发送字符串. Quotation `""` can't be omitted and must be English punctuation

```Bash
#! /usr/bin/expect

set timeout 30 # 设置超时时间, unit is second

spawn scp source_filepath destination_filepath # fork一个子进程执行scp

expect "password:" # 捕获到密码; note the colon is Chinese or English

send "password\n" # 输入密码并回车
expect EOF
```

##### 03 远程连接并执行命令
* `sleep`是指停止1秒后再继续执行后面的脚本
* `send`后的字符串末尾的`\n`是转义字符，相当于输入命令后的回车键。
* 末尾处的`exit`表示退出此次登录, it's executed by the user we login。
* `interact` means that stay at current user. For example, if we omit `exit`, we will stay at the user we login.

```Bash
#!/usr/bin/expect

set timeout 100
set username [xxxx]
set password [123456]
set ip   [1.1.1.1]

spawn ssh -l $username $ip

expect {
    "(yes/no)?" {
        send "yes\n"
        expect "password:"
        send "$password\n"
    }
    "password:" {
        send "$password\n"
    }
}

sleep 1
send "cd /home/nnnn/bag\n"
sleep 1
send "rosbag record -a\n"
sleep 2
exit
interact
```

##### 04 执行任务并定时关闭
首行是标记使用的脚本的类型，此处为`bash`脚本。<br />
两个命令间用`&`连接，前面的命令执行后挂在后台并立即开始执行后面的命令。用`&&`连接，只有前面的命令执行完毕并退出后才会执行后面的命令。<br />
第一行开启`roscore`后，计时两秒后结束`roscore`。`kill -2`相当于`Ctrl+C`。`-2`就是`Ctrl+C`发出的`siginit`。
```Bash
#!/bin/bash
roscore &
sleep 3 && kill -2
```

##### 05 解压文件名有规律的系列文件
这一系列的文件名为“17.7z”、“18.7z”...“21.7z”。解压密码为“blue”。
```Bash
#!/bin/bash

set -u

for i in {17..21}
do
  filename=$i".7z"
  7z x $filename -pblue
done
```
解压所在文件夹内的所有以“.7z”结尾的文件，解压密码为“blue”。
```Bash
ls | while read line
do
  file=$line
  if echo $file | grep -q -E '\.7z$'
  then
    echo $file
    7z x $file -pblue
  fi
done
```

##### 06 内嵌expect脚本并检查IP地址连通性
* ping [-dfnqrRv][-c<完成次数>][-i<间隔秒数>][-I<网络界面>][-l<前置载入>][-p<范本样式>][-s<数据包大小>][-t<存活数值>][主机名称或IP地址]
* [参考链接](https://www.runoob.com/linux/linux-comm-ping.html)  

```Bash
ip="11.11.11.11"
if ping -c 1 -w 1 ip >/dev/null;then
echo "可以连接，继续检测"
/usr/bin/expect<<-EOF   #shell中使用expect
spawn git push
expect {
  "yes/no" {
    send "yes\n"
    expect "password:"
    send "$password\n"
  }
  "password:" {
    send "$password\n"
  }
}
interact
expect eof
EOF

else
  echo "无法连接"$ip
fi
```

##### 07 修改某文件夹下的特定文件
遍历所在指定文件夹及其所有子文件夹中的markdown文档，并把第四行修改为<日期+时间+时区>
```bash
#!/bin/bash

files=$(find "." -type f)

# 遍历文件
for file in $files; do
    # 检查文件名是否符合特定首尾条件
    if [[ "$file" == *_posts* && "$file" == *.md ]]; then
        # 获取文件的最近修改时间
        last_modified=$(stat -c "%Y" "$file")

        # 将时间戳转换为日月年时分秒的格式
        last_modified_formatted=$(date -d @"$last_modified" +"%Y-%m-%d %H:%M:%S %z")

        # 替换文件的第四行为最近修改时间
        sed -i "4s/.*/date:   $last_modified_formatted/" "$file"

        echo "Updated date in $file to $last_modified_formatted"
    fi
done

```


# 十、question&answer

覆盖范围包括常用命令和功能包的使用，比如vim等等。

##### 1

错误提示如下

```bash
E:The package xterm needs to be reinstalled, but I can't find an archive for it.
```

输入以下命令解决

```bash
sudo dpkg --remove --force-all xterm
```

##### 2

无法用robotstudio打开工作空间，可能是因为工作空间需要root权限。可以通过更改文件夹权限的方式解决。

```bash
chmod -R 777 /home/nnnn/Documents/mws
```

运行以上命令会把文件夹mws的权限更改为“任何人可执行任何操作”，因此请确定真的需要更改权限时再使用这一命令。

##### 3

运行以下命令

```bash
nautilus /media/nnnn/software/
```

错误提示如下

```bash
Nautilus-Share-Message: Called “net usershare info” but it failed
```

输入以下命令解决

```bash
sudo apt install samba” and "$ sudo mkdir -p /var/lib/samba/usershares/"
```

##### 4. vim 突然不响应了

`CTRL+S`表示停止向终端停止输出; `CTRL+Q`恢复向终端输出流。期间的输入会缓存在流中，恢复输出流后一次性输出至终端。

##### 5

运行以下命令

```bash
sudo apt-get update; // 或更新源时
```

错误提示如下

```bash
problems: E:Failed to fetch https://download.docker.com/linux/ubuntu/dists/xenial/InRelease  Unable to find expected entry 'stable/source/Sources' in Release file (Wrong sources.list entry or malformed file), E:Some index files failed to download. They have been ignored, or old ones used instead.
```

原因分析：通常是因为 Great Wall

##### 6

运行以下命令

```bash
sudo apt-get install libreadline7 libreadline-dev
```

错误提示如下

```bash
E: Unable to locate package libreadline7
```

原因分析：安装的为版本7，安装版本6即可

##### 7

错误提示如下  

```bash
E: Unable to correct problems, you have held broken packages 
```

原因分析：这个包有如下两个情况之一：①你想安装的软件所需要的依赖项你的系统已经安装了，但是系统已经安装的依赖项版本与它想要的版本不一致导致；②它有和它的情况相同的依赖项。这是一个递归查找依赖的过程。最后会找到一个包，已经安装，但版本不符合，可以选择卸载已经安装的版本并重新安装。当然如果运气不好，可能会把系统删坏，那就再想办法修复系统好了。

##### 8

运行以下命令

```bash
apt install progress
```

错误提示如下

```bash
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?
```

原因分析：没有root权限，使用`sudo`获取root权限即可

##### 9 ubuntu 20 找不到设置 cannot find setting

这是因为有个包丢失了，重新安装即可。可使用如下命令

```bash
sudo apt install gnome-control-center
```

##### 10

问题如下：
我先把 Windows10 和 Ubuntu 18 装在了第一个硬盘，然后又在第二个硬盘安装了 Ubuntu20。结果win10和u18都能正常进入，但无法进入u20，尽管这个系统已经正确安装。

在安装Ubuntu20时，我把它装在了第二个硬盘。对于`安装启动器的设备`，我尝试了装u20的分区和装u20的硬盘，安装后在grub界面有`Ubuntu`，但都无法打开。最后我把该选项选为第一个盘，即win10所在的盘。注意，不是选某个分区，而是选择那个硬盘设备。

##### 11 搜狗输入法不能汉字

已经按照官网的步骤安装、重启、配置，但是调为搜狗 输入法时仍然不能输入汉字。可能是忘记安装相关的依赖项。在终端执行以下命令安装依赖项后即可使用。

```
sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2

sudo apt install libgsettings-qt1
```

##### 13 终端出错"Segmentation fault (core dumped)"

在终端的命令行里，只剩下`cd`这个命令可用，输入其它命令都返回`Segmentation fault (core dumped)`。
经排查分析，是`GLIBC`的版本不正确。终端在打开的时候会执行`source ~/.bashrc`，把环境变量添加进终端。在我的系统里，如果`.bashrc`不特别说明，则调用`GLIBC 2.27`。我由于某种原因，需要 2.28 ，所以我安装了 2.28 ，并在`.bashrc`末尾添加了`export LD_LIBRARY_PATH=/usr/local/glibc-2.28/lib:$LD_LIBRARY_PATH`，这样在打开终端在添加GLIBC时会添加v2.28的路径。然后因为系统内核不支持这个新版本，于是就出现了上述错误。删除添加的环境变量以使用旧版本的GLIBC，终端的命令行再次可用。

##### 14 NTFS下的文件被锁定为只读
在Windows和ubuntu双系统的前提下会发生。通常是因为没有正确关闭Windows导致的，例如系统卡死直接按电源键强制关机，NTFS分区会存放Widnows未释放缓存，导致Ubuntu无法写入。。重新进入win然后正常关机即可解决。


##### 15 Ubuntu系统键盘鼠标失灵方案
通常是因为`xserver-xorg-input-all`这个驱动包因为某种原因被删除了。
1. 建议插网线，准备重装某些东西。
2. 进入`recovery mode`，选择`network`那一项，连接网络。确认网络已经连接后进入下一步。
3. 选择 `drop`，进入命令行。使用命令`sudo apt install xserver-xorg-input-all`。安装完成后正常重启即可。

##### 16 鼠标半失灵
键盘可以正常使用。鼠标可以移动，左右按键只能用于切换软件界面，但在一个软件界面中什么都无法执行。同时按住`Ctrl+Alt+delete`，然后选择`取消`，问题就解决了。

##### 17 
使用 `sudo apt remove libboost-all-dev` 卸载 `boost`,提示要卸载一大堆其它的包. 因为这些包都是依赖该`boost`的。

##### 18 
我有一个移动硬盘名为“mm”。但由于某种未知的意外情况，在挂载的位置已经有了一个名为“mm”的文件夹，这个移动硬盘最后会挂载到文件夹“mm1”下。此时有一个程序读取文件的路径是“mm”，导致无法找到需要的文件而报错。解决方法：先移除硬盘，再把“mm”文件夹移动到其它位置或者删除，然后再挂载移动硬盘。

##### 19 
右键没有新建文件的选项。检查home文件夹下的文件夹`Templates`。如果这里面是空的，就不能通过右键的弹出菜单新建文件。这个文件夹里的文件都可以通过右键菜单之间创建出来。

##### 20
```Bash
invalid command name "scp"
```
如果使用的是“expect”脚本，不能直接使用“scp”，应改为`spawn scp`。

##### 21 给双系统的ubuntu扩容
* https://blog.csdn.net/qq_39441784/article/details/109567007?spm=1001.2014.3001.5506
* https://blog.csdn.net/Williamcsj/article/details/124814716?spm=1001.2014.3001.5506
* 装机u盘还在的话可以点试用ubuntu进去，用自带的gparted

##### 22
执行命令`sudo ls`并输入密码后，执行失败出现如下提示 
```Bash
不在sudoers文件中
```
修改“/etc/sudoers”文件，允许当前用户使用`sudo`。

##### 23
在`settings->network->wired`中修改完IP地址以后，需要先关闭wired再打开，设置的IP地址才能生效

##### 24
文件管理卡死，也不能用可视化的桌面关掉。使用命令`ps -A |grep nautilus`查看是哪个文件管理出现问题；使用命令`killall nautilus`关闭文件管理进程。

##### 25
ubuntu桌面卡死。按“ctrl+alt+F1”进入tty终端，然后登录，之后执行命令`sudo pkill Xorg`或者`sudo restart lightdm`。这个命令会重启桌面的可视化程序。

##### 26 
Windows10更新后覆盖了`grub`引导，重启后会直接进入Windows系统，没有选择系统的界面，无法进入其它系统。

##### 27
Ubuntu18蓝牙关闭后打不开。首先使用命令完全阻止蓝牙： `rfkill block bluetooth`。然后使用命令解除阻止： `rfkill unblock bluetooth`。此时蓝牙应该已经正常打开。如果还是不行，试一下`sudo service bluetooth restart`