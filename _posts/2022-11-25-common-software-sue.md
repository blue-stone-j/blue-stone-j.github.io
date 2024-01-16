---
layout: post
title:  "常用软件使用"
date:   2022-11-20 08:30:00 +0800
categories: [Tech]
excerpt: 记录了常用软件的使用方法、技巧以及在使用中遇到的问题和解决方案
tags:
  -  
  - 
  - 
---

记录了常用软件的使用方法、技巧以及在使用中遇到的问题和解决方案。

# <center>一、编辑器
### 一、VSCode

##### 1. 中文乱码问题
点击[这里](https://juejin.cn/post/7032129567473188872)查看解决方案。这里面也提供了把转换中文编码方式的方法。

##### 2. 代码风格化
把代码按照一定的规则风格化。可以在vscode中设置并同步，也可以使用一个文件来实现这个功能。我写了这个文件的模板，详细介绍了各项设置，可以在[这里](https://github.com/blue-stone-w/example/blob/main/.clang-format)获取。这个文件对其所在的目录内的文件和文件夹都生效。例如这个文件在`/Documents`文件夹下，则对`/Documents`文件夹内的所有`cpp`文件生效，包括子文件夹中的文件。

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

### 2. 录屏
##### (1) Ubuntu默认录屏
系统自带的默认录屏工具，开始录屏/结束录屏：`Ctrl + Alt +Shift + r`
* 录屏默认的时长30秒，超时会自动结束
* 录屏后文件默认存放在主目录内的视频目录中
* 录屏是直接录制
* 不能录制声音
控制台输入`gsettings set org.gnome.settings-daemon.plugins.media-keys max-screencast-length 300`，可以更改下次录屏的默认时间为300s。
##### (2) kazam
安装命令：`sudo apt-get install kazam`
使用命令：`kazam`

### 3. 汉字
* 需要安装fcitx，下载[搜狗输入法](https://shurufa.sogou.com/linux)`sogou`，具体安装方法可在[官网](https://shurufa.sogou.com/linux/guide)找到。其中20有个单独的安装介绍。
* 安装中有一个步骤是卸载系统自带的`ibus`，这个卸载不是必要的。
* amd64选择x86_64这个版本。
* 如果安装之后在“已安装的软件”中找不到，直接试试能不能用，如果能用就不要管能不能找到。

### 4 qt
qt5.15及之后的版本是在线安装，之前的版本是离线安装。在线安装可点击[此处](https://www.qt.io/download-qt-installer?utm_referrer=https%3A%2F%2Fwww.qt.io%2Fdownload-open-source%3Futm_referrer%3Dhttps%253A%252F%252Fwww.qt.io%252Fdownload)下载`online-installer`。离线安装可点击[此处](https://download.qt.io/archive/qt/)下载安装包。建议直接使用在线安装器安装5.15及之后的版本。

`ubuntu 18`和5.15存在兼容性问题，可能会出现错误提示`version GLIBC_2.28' not found`。可以参考[Getting GLIBC_2.28 not found](https://stackoverflow.com/questions/72921215/getting-glibc-2-28-not-found)。你可以使用命令`ldd --version`查看已安装的GLIBC的版本。

```C++
ldd --version
ldd (Ubuntu GLIBC 2.27-3ubuntu1.6) 2.27
```

可以看到，我安装的版本是2.27。这个东西和系统底层有关，如果对系统内核不熟悉，建议不要升级至`GLIBC 2.28`，在我电脑上，升级后导致所有命令都无法输入。如果你已经升级了，很可能会遇到所有命令都提示`"Segmentation fault (core dumped)"`，点击[这里](http://blue-stone-w.top/blog/linux%E5%AD%A6%E4%B9%A0/)然后搜索`GLIBC`可能会找到解决方法。

### 5 bcompare
##### a.比较按钮无法选中
第一次使用Kompare。文件选择好了，编码选择好了，diff也选择好了，可是比较按钮还是灰色的无法选中。<br>

这是个很神奇的Bug 在选择完文件后在任意一个文件路径里打个空格那个按钮就可以用了.[reference](https://forum.suse.org.cn/t/topic/11552)

### 6 pycharm
社区版
```Bash
sudo snap install pycharm-community --classic
```
专业版
```Bash
sudo snap install pycharm-professional --classic
```
教育版
```Bash
sudo snap install pycharm-educational --classic
```

### 9. gedit
* preference-->Editor-->tab stop
* preference-->plugins-->


# <center>二、仿真和调试
### 一、gazebo
##### 1. 注意版本对应
`Ubuntu18`是`gazebo9`；

##### 2. gazebo不能保存world文件
如果点击图标打开`gazebo`或者在终端输入`gazebo`打开，在保存`world`时，界面会卡死。使用命令`sudo gazebo`打开也许可以解决问题。

##### 3. gazebo找不到载入`world`选项
`gazebo`界面中没有该选项，只能在命令行打开时就载入`world`文件。例如该文件名为`my_world`，则在打开时使用如下命令
```
sudo gazebo my_world
```
### 2 rviz
##### 1.
enlarge tf: if axis of tf is too small, change `Marker Scale`. It can also change the radius of links between frames. 
##### 2.
start rviz with existing configuration.
```Bash
rviz -d calib.rviz
```~
### 2. glog 
##### 1. install
```Bash
sudo apt install libgoogle-glog-dev
```

# <center>3  ROS and lib
### 1. ROS kinetic(16)&melodic(18)
这两个版本的ros安装方法相似，安装方法参考[此处](https://www.guyuehome.com/10082)
```C++
sudo rosdep init //这两个执行错误可以不用管，不是必须执行的<br />
rosdep update
```
**提示事项**<br />
*过程中可能需要装python，按照提示信息安装即可。<br />
*如果提示没有海龟包，自行[下载](https://blog.csdn.net/qqliuzhitong/article/details/114305249)即可。

### 2. ROS2 
[安装教程](https://zhuanlan.zhihu.com/p/149187701)(其中有一处错误，melodic对应Bionic18.04，而Foxy对应Focal20.04)

### 3. sophus
```Bash
git clone https://github.com/strasdat/Sophus.git
cd sophus
mkdir build
cd build
cmake ..
make
sudo make install
```

### 4. yaml
[30分钟学会Yaml-cpp 0.6.0](https://zhuanlan.zhihu.com/p/96831410). 这个教程里说版本要大于`0.6.0`，个人推荐安装这个版本，版本不要太新。


### 8. PCL
[Ubuntu18.04下安装PCL1.9.1](https://blog.csdn.net/yingmai7741/article/details/86531850)

[Ubuntu16.04下安装PCL1.7并测试](https://blog.csdn.net/HHT0506/article/details/104439748#commentBox)

### 10. ceres-solver
18.04[安装依赖和安装检验](https://blog.csdn.net/YMWM_/article/details/101601345)（检验时注意文件夹路径）
 <br />
下载包： https://blog.csdn.net/p942005405/article/details/100654730 <br />
make -j4： https://zhuanlan.zhihu.com/p/110160075 <br />

16.04安装点击[此处](https://www.cnblogs.com/ambition921009/p/10551885.html)
<br />
在ubuntu16.04下安装时.遇到这个错误：
```
could not find a configuration file for package "Eigen3" that is compatible with requested version "3.3".
```
解决方法在[此处](https://zhuanlan.zhihu.com/p/151675712)<br /><br />
检验方法同上, but note the localation and path of problem.txt, should use my problem.txt

### 11. Eigen
安装教程点击[此处](https://zhuanlan.zhihu.com/p/110160075)
version id 3.2.92, may be old for ceres.

### 13. opencv
注意cmake是否需要安装。<br />
全部步骤点击[此处](https://zhuanlan.zhihu.com/p/76737748) ；<br />
上述过程1-6以及测试使用[此处](https://zhuanlan.zhihu.com/p/52513112)的方法；<br />
配置和测试使用[此处](https://zhuanlan.zhihu.com/p/110160075)的方法.

[ubuntu16.04 安装 OpenCV](https://zhuanlan.zhihu.com/p/157195781)

### 14. Docker
18.04[设置存储库及安装检验](https://www.jianshu.com/p/83483c35bfcd)
其中安装步骤的5-6-7使用[此处](https://zhuanlan.zhihu.com/p/57413820)的方法；
安装检验使用[此处](https://www.myfreax.com/how-to-install-and-use-docker-on-ubuntu-18-04)的方法；

16.04的安装参照[这个链接](https://zhuanlan.zhihu.com/p/84000436)

ceres报错：Eigen3版本和ceres版本存在冲突，解决方法在[此处](https://zhuanlan.zhihu.com/p/149775218)。
 (in fact it's about "ceres报错：Eigen3版本和ceres版本冲突问题", it shouldn't be here.)


# <center>四、 net, browse, cloud
设备间连接和传递文件；连接网络

### 1.easyconnect
如果单位对版本有要求，尽量使用单位要求的版本。在`Ubuntu 20.04`中安装`easyconnect`，在安装完成后无法打开。这是正常的，因为有版本依赖问题。
参考[这里](https://blog.csdn.net/h106140873/article/details/114263954)解决。对应的文件可以在[这里](https://pan.baidu.com/s/1MparKP20EnAXMmabokhJ7w?pwd=1234)下载。

### 2. samba
这是一种用于在`iPhone`和`Ubuntu`之间传递文件的方法。具体方法在[这里](https://blog.csdn.net/qq_43419705/article/details/108690683)。If you want to add or delete user, [this](https://www.thegeekdiary.com/how-to-add-or-delete-a-samba-user-under-linux/) can help you. 

### 3. firefox
* 显示书签
* 缩放zoom设为`1.2~1.5`。
* 可从`html`文件中导入书签。
* 打开的视频默认是静音的，如有需要可打开声音。
* set proxy: setting-->search "proxy"
* `Highlight or Hide Search Engine Results`一个可以用来在搜索结果中屏蔽特定网站的插件

### 4. 显示网速
按照[这个方法](https://www.yisu.com/ask/6880.html)安装和使用sysmonitior工具。也可以添加显示cpu温度的选项，温度过高时及时降功率，延长器件寿命。可以使用如下代码输出网速等信息。
```
Net: $(speed(net.down))   $(speed(net.up))   CPU: $(percent(cpu.inuse))     Mem $(percent(size(mem.user)/size(mem.total)))
```
对于Ubuntu20, use
```
net: {net} cpu: {cpu} mem: {mem}
```

### 6. Chrome
缩放zoom设置为`1.25~1.5`。

### 7. github
This software is to manage git. Click [here](https://desktop.github.com/) to download it.

### 8.
some net tools such as `ifconfig`
```
sudo apt install net-tools
```

### 9. 钉钉
IOS系统的手机用相机拍摄视频后，在相册中直接上传到钉钉，从钉钉下载该视频会下载失败。在手机上把视频保存到文件，在文件app中把视频上传到钉钉后，可以从钉钉下载。

# <center> 5 other
### 1. expect
这是在Linux系统中常用的一个交互命令工具。
```Bash
sudo apt install expect -y
```

### 2. browse
如果需要科学上网，往往通过代理实现。firefox可以在设置中单独设置代理。Chrome、edge、星愿浏览器都只能使用系统代理。