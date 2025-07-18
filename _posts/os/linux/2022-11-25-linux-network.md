---
layout: post
title:  netwok in Linux
date:   2025-07-18 23:47:10 +0800
categories: [OS]
excerpt: linux network 
tags:
  - Linux
  - network
class: sys
---

### tcpdump

##### install

```bash
sudo apt install tcpdump
```

##### capture

```bash
# to see which interfaces you can capture traffic on
sudo tcpdump -D

# Capture packets on an interface. Replace eth0 with your actual interface
sudo tcpdump -i eth0
# Limit the number of packets
sudo tcpdump -i eth0 -c 10
# Save to a file
sudo tcpdump -i eth0 -w capture.pcap
# Read from a saved file
tcpdump -r capture.pcap
```

##### filter

```bash
# filter by host
sudo tcpdump -i eth0 host 192.168.1.100
# filter by port
sudo tcpdump -i eth0 port 80
# filter by protocol
sudo tcpdump -i eth0 tcp
# combined filter
sudo tcpdump -i eth0 tcp and port 80 and host 192.168.1.100
```

##### notes

1. Use sudo: Capturing packets requires root privileges.
2. Permission: If you want to avoid sudo every time, you can add your user to the wireshark group (not recommended unless you understand the risks).

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
