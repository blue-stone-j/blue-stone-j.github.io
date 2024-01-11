---
layout: post
title:  "computer network"
date:   2022-11-20 08:30:00 +0800
categories: [Tech]
excerpt: computer network
tags:
  -  
  - network
  - 
---



### forward proxy
User A send a request to proxy server and specify destination(server B). Proxy server transfer the request to server B and transfer respond to userA after receiving from server B. User A hide behind proxy server from server B. In this case, user A konw there is a proxy server.

### reverse proxy
Client send normal request to proxy server. Then proxy server transfer request and respond. In this case, user A don't know there is a proxy server.

### transparent proxy
Proxy server edit request fields and transfer data. Proxy server is the actual requester.



### ubuntu 20将域名指向指定IP

1. 修改`hosts`文件
```bash
sudo gedit /etc/hosts
```
2. 增加域名如下
```bash
256.543.234.764 s.top
```
3. 重启网络服务
```bash
sudo systemctl restart NetworkManager
```
4. 测试
```bash
ping s.top
```
显示如下说明成功
```bash
PING s.top (256.543.234.764) 56(84) bytes of data.
64 bytes from s.top (256.543.234.764): icmp_seq=1 ttl=48 time=20.6 ms
64 bytes from s.top (256.543.234.764): icmp_seq=2 ttl=48 time=25.3 ms
64 bytes from s.top (256.543.234.764): icmp_seq=3 ttl=48 time=20.7 ms
64 bytes from s.top (256.543.234.764): icmp_seq=4 ttl=48 time=21.0 ms
```