---
layout: post
title:  "Linux configuration"
date:   2025-04-06 20:48:21 +0800
categories: [OS]
excerpt: how to configure Linux
tags:
  - Linux
  - 
class: sys
---

# network

### /etc/resolv.conf

A nameserver line specifies the IP address of a DNS (Domain Name System) server that the system should use to resolve domain names into IP addresses. It should be host IP for a docker container. `resolv.conf` can be overwritten by network management tools such as NetworkManager, systemd-resolved, or DHCP clients.

This IP configuration may be take as `nameserver`, rather than `172.27.64.1`

```bash
# nameserver 192.168.65.7
nameserver 172.27.64.1
```

I change it to

```bash
# nameserver 192.168.65.7
nameserver 172.27.64.1
```

and it works.