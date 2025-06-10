---
layout: post
title:  "Linux以及相关qa"
date:   2025-06-10 22:33:30 +0800
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

---

### 二.使用终端

##### 1. 添加到环境变量

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

##### 7. 远程主机界面

连接到远程主机，在远程主机启动程序，并把对应的图像传回本地。

```shell
# install necessary library to local
sudo apt install xvfb

# local setting
Xvfb :1 -screen 0 1024x768x24 &
export DISPLAY=:1

# log in remote
ssh -Y user@remote_ubuntu_host
rviz
```

### 三.设备

##### 1. ADB(Android Debug Bridge)

1. Add a Udev Rule for the Device: To allow users in the plugdev group to access the device, create a Udev rule file.

Run this command to open a new Udev rules file:

```bash
sudo nano /etc/udev/rules.d/51-android.rules
```

Add the following line to the file, replacing YOUR_VID with your device's vendor ID (often `18d1` for Google devices, but you can find this with `lsusb`):

```bash
SUBSYSTEM=="usb", ATTR{idVendor}=="YOUR_VID", MODE="0666"
```

Save the file and close the editor.
2. Reload Udev Rules:
Apply the new rule by reloading the Udev rules and restarting the Udev service:

```bash
sudo udevadm control --reload-rules
sudo service udev restart
```

3. Reconnect the Device:
Disconnect and reconnect your Android device, then run:

```bash
adb kill-server
adb start-server
adb devices 
```

4. You can run `adb devices` to list all avaliable devices or `adb shell` to connect device now.
5. You can use `adb push <source> <destination>` to copy files from the computer to the device and use `adb pull <source> <destination>` copy files from the device to the computer.

##### 2. 网络连接和设备

iwconfig
ethtool

##### 3. infomation about cpu

```bash
lscpu
```

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

##### 2. .desktop File

```bash
[Desktop Entry]
Version=1.0
Name=My Application
Comment=Description of my application
Exec=/path/to/your/executable
Icon=/path/to/your/icon.png
Terminal=false
Type=Application
Categories=Utility;
```

|item|Description|
|---|---|
|Name       |The name of your application.|
|Comment    |A short description of your application.|
|Exec       |The full path to your compiled executable.|
|Icon       |The full path to an icon file for your application (optional but recommended).|
|Terminal   |Set to true if your application runs in a terminal; otherwise, set it to false.|
|Type       |The type of the desktop entry, usually Application.|
|Categories |The category under which your application should appear in the application menu.|

|symbol|placeholders|
|---|---|
|`%f` | A single file name.|
|`%F` | Multiple file names.|
|`%u` | A single URL.|
|`%U` | Multiple URLs.|
|`%d` | The directory of the file to open.|
|`%D` | The directories of the files to open.|
|`%n` | The filename without a path.|
|`%N` | The filenames without paths.|
|`%i` | The icon.|
|`%c` | The translated name of the application.|

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

```bash
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

##### 17 remove boost

使用 `sudo apt remove libboost-all-dev` 卸载 `boost`,提示要卸载一大堆其它的包. 因为这些包都是依赖该`boost`的。

##### 18 remove invalid mount

我有一个移动硬盘名为“mm”。但由于某种未知的意外情况，在挂载的位置已经有了一个名为“mm”的文件夹，这个移动硬盘最后会挂载到文件夹“mm1”下。此时有一个程序读取文件的路径是“mm”，导致无法找到需要的文件而报错。解决方法：先移除硬盘，再把“mm”文件夹移动到其它位置或者删除，然后再挂载移动硬盘。

##### 19 file templates

右键没有新建文件的选项。检查home文件夹下的文件夹`Templates`。如果这里面是空的，就不能通过右键的弹出菜单新建文件。这个文件夹里的文件都可以通过右键菜单之间创建出来。

##### 20 scp in expect

```Bash
invalid command name "scp"
```

如果使用的是“expect”脚本，不能直接使用“scp”，应改为`spawn scp`。

##### 21 给双系统的ubuntu扩容

* <https://blog.csdn.net/qq_39441784/article/details/109567007?spm=1001.2014.3001.5506>
* <https://blog.csdn.net/Williamcsj/article/details/124814716?spm=1001.2014.3001.5506>
* 装机u盘还在的话可以点试用ubuntu进去，用自带的gparted

##### 22 add sudo to user

执行命令`sudo ls`并输入密码后，执行失败出现如下提示

```Bash
不在sudoers文件中
```

修改`/etc/sudoers`文件，允许当前用户使用`sudo`。

##### 23 acivate IP configuration

在`settings->network->wired`中修改完IP地址以后，需要先关闭wired再打开，设置的IP地址才能生效

##### 24 kill nautilus

文件管理卡死，也不能用可视化的桌面关掉。使用命令`ps -A |grep nautilus`查看是哪个文件管理出现问题；使用命令`killall nautilus`关闭文件管理进程。

##### 25 kill desktop

ubuntu桌面卡死。按“ctrl+alt+F1”进入tty终端，然后登录，之后执行命令`sudo pkill Xorg`或者`sudo restart lightdm`。这个命令会重启桌面的可视化程序。

##### 26 recovary grub for ubuntu

Windows10更新后覆盖了`grub`引导，重启后会直接进入Windows系统，没有选择系统的界面，无法进入其它系统。

##### 27 restart bluetooth

Ubuntu18蓝牙关闭后打不开。首先使用命令完全阻止蓝牙： `rfkill block bluetooth`。然后使用命令解除阻止： `rfkill unblock bluetooth`。此时蓝牙应该已经正常打开。如果还是不行，试一下`sudo service bluetooth restart`

##### 28 无法正确识别显示器的分辨率

安装ubuntu后，无法正确识别显示器的分辨率，`1920x1080`的显示器被识别为`1080x768`的分辨率。使用`xrandr`得到如下输出

```bash
xrandr: failed to get size of gamma for output default
Screen 0: minimum 1024x768+0+0 0mm x 0mm
  1024x768     76.00*
```

以下是一种解决方案。
open the file

```bash
sudo gedit /etc/default/grub
```

find the line

```bash
#GRUB_GFXMODE=640x480
```

edit 640x480 to your resolution eg: 1920x1080, remove the #

for example:

```bash
GRUB_GFXMODE=1920x1080 
```

Update by the command

```bash
sudo update-grub
```

Then reboot your computer.

```bash
sudo reboot
```

参考链接：[1](https://askubuntu.com/questions/441040/failed-to-get-size-of-gamma-for-output-default-when-trying-to-add-new-screen-res)和[2](https://blog.csdn.net/xj626852095/article/details/47703565)。

##### 29 AppImage

在新安装的ubuntu上运行AppImage文件时遇到如下错误。

```bash
dlopen(): error loading libfuse.so.2

AppImages require FUSE to run. 
You might still be able to extract the contents of this AppImage 
if you run it with the --appimage-extract option. 
See https://github.com/AppImage/AppImageKit/wiki/FUSE 
for more information
```

这里的问题是 Ubuntu 缺少 FUSE（用户空间中的文件系统）库。FUSE 库为用户空间程序提供了一个接口，可以将虚拟文件系统导出到 Linux 内核。这就是 AppImage 在虚拟文件系统上的工作方式。由于缺少这个关键库，AppImage 无法按预期工作。在 Ubuntu 中打开终端并使用以下命令安装 FUSE 库支持：

```bash
sudo apt install libfuse2
```

##### 30 remove software

It ocurred when I run cmd `sudo dpkg -r foxglove-studio.deb`.

```bash
dpkg: error: you must specify packages by their own names, not by quoting the names of the files they come in
```

Actually, I should run cmd `sudo dpkg -r foxglove-studio`.

##### 31 dpkg configuration

It ocurred when I used `apt` to install package.

```bash
E: dpkg was interrupted, you must manually run 'sudo dpkg --configuration -a' tp correct the problem.
```

reason: The error indicates that a previous installation or update process was interrupted, and dpkg is left in an inconsistent state.

solution: run command `sudo dpkg --configuration -a`, and set password for secure boot.

##### 32

```bash
rm: cannot remove No such file or directory
```

use `rm -f`.

##### 33

`Ceres` depends on glog. I did something:

1. install glog 0.4.0
2. install ceres 2.1.0
3. uninstall glog 0.4.0
4. install glog 0.6.0
5. failed to compile a C++ package because glog cloudn't be found.
solution: compile and install ceres again.

##### 34 no grub of Ubuntu after motherboard replacement

1. prepare a USB drive intalled `Ubuntu Live`
2. power-off computer, insert drive, power-on computer
3. select drive to boot, select `Try Ubuntu`
4. connect to network
5. open a terminal and input `sudo add-apt-repository ppa:yannubuntu/boot-repair`, `sudo apt-get update`, `sudo apt-get install -y boot-repair` in sequence.
6. run `boot-repair` to start this tool and select `Recommended repair`. 
7. reboot when repairing is completed.

##### 35 can't get into ubuntu when boot

infomation displayed on screen like below

```bash
dev nvme0n1p11 clean
```

Because I deleted folder `/etc/systemd/system` accidently. Copy same folder from another computer to solve it.

##### 36 ssh server on ubuntu

```bash
ssh: connect to host 172.16.1.12 port 22: Connection refused
```

1. Verify Ubuntu server is reachable using `ping 172.16.1.12`
2. Check SSH server on Ubuntu using `sudo systemctl status ssh`. If you see `Unit ssh.service could not be found.`, install it using `sudo apt install openssh-server`. Then start and enable it

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

Check again using `sudo systemctl status ssh`. It should show`Active: active (running)`

##### lsb_release: not found

This tool is commonly used on Debian-based Linux distributions (like Ubuntu) to display Linux Standard Base (LSB) and distribution-specific information, such as the release number and codename. You can install it using `sudo apt install lsb-release`.
