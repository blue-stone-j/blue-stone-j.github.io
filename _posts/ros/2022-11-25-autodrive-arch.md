---
layout: post
title:  "auto-drive architecture"
date:   2025-06-23 08:18:45 +0800
categories: [OS]
excerpt: 深蓝的自动驾驶基础架构。
tags:
  - Ubuntu 
---


# 第二章 数据的产生

### 1. 来源

1. 传感器
2. 外部参数：汽车的重量惯性尺寸动力、环境变量、交通规则等
3. 系统环境：网络设置，软件版本等
4. 网络数据：地图、行程等(业务数据)
5. 交互数据：HMI等(业务数据)

### 2. 数据格式

##### 格式要求

1. 向前和向后的兼容性(才能进行增量更新等)
2. 跨平台/语言支持
3. 序列化和反序列化的压缩率和效率，提高数据传输效率
4. 对高级特性的支持：反射，字段检查，自描述等

##### 常见格式

|              | 兼容性 | 跨平台 | 跨语言 | 序列化时间 | 压缩率 | 高级特性   |
| ------------ | ------ | ------ | ------ | ---------- | ------ | ---------- |
| C/C++ struct | 无     | 低     | 无     | 0          | 0      | 无         |
| json         | 高     | 高     | 高     | 高         | 极低   | 外部支持多 |
| ros msg      | 无     | 中     | 中     | 较高       | 低     | 一般       |
| protobuf     | 高     | 高     | 高     | 低         | 较高   | 较多       |
| thrift       | 高     | 高     | 较高   | 低         | 较高   | 较多       |

1. C/C++ struct
2. json
3. ros msg
4. protobuf
5. thrift

### 3. 数据的存储

##### 要求

1. 存储时计算资源占用
2. 实时性
3. 结构化
4. 访问接口
5. 大数据支持
6. 特性支持

##### 常用格式

1. log
2. rosbag
3. raw data
4. 网络回传

### 4. 数据质量

数据闭环的高效运转。

1. rosbag的消息时间是record命令收到该条消息的时间。
2. ros的传输模式无法保证同一话题的消息到两个节点的顺序一致。例如当前帧A节点先收到，下一帧B节点先收到。
3. ros无法保证不同节点收到的两条不同话题的消息顺序相同。例如节点A先收到话题1的消息，后收到话题2的消息，节点B先收到2后收到1.

复现性需求：debug，版本对比，仿真

在框架层提供严格的复现支持

# 第三章 数据的采集的存储

### 实时数据

##### 应用

1. 硬件健康监控和报警
2. 车载计算平台运行环境监控与告警，例如过热
3. 车队运营状态监控：硬件维护周期，安全员休息

##### 数据特点

1. 高并发，数据频率高
2. 不同模块有不同的告警规则
3. 实时数据、离线数据、告警等共同复现场景

##### 数据通信挑战

1. 带宽和质量，不同的数据需要的传输可靠性不同。例如对于监控不需要严格的可靠传输。
2. 网络传输的安全和保密。
3. 实时监控报警，例如基于flink的规则引擎

### 离线数据

##### 离线数据的应用

1. 异常操作记录
2. 传感器和算法产生的数据
3. 完整的系统日志

##### 离线数据的数据特点

1. 数据多
2. 运维节点进行数据回收
3. 种类齐全，需要经过数据处理才能进入数据仓以方便检索

##### 挑战

1. 回收站点的自动化上传：数据自动化传输中断，实现插盘即传
2. 终端宕机、网络条件差等情况下的超大数据文件的高效可靠：包含同步分片、传输、校验、落库的传输链路
3. 数据访问接口的多样性要求及对多种异构数据的访问要求：包含运行数据、索引、标记、日志、车辆任务、车辆运行环境等多维度数据的仓库，提高不同维度的数据检索和使用。

##### 分类

1. 传感器数据包：GB或10GB级别
2. 系统模块日志：100MB或GB几倍
3. 事件记录
4. 配置文件

# 第四章 Devops自动化实践

### 主流CI/CD工具

1. Jenkis
2. Gitlab-CI

### 阶段

1. Build：使用`yml`文件自动化构建
2. Code Analisis：静态代码检测，检查出代码中存在的错误、缺陷或风格。可以在`yml`文件中配置，在`build`部分之前。
3. Unit Test：Gtest，pytest，Junit

### CD中的常见制品

##### 制品类型

1. Docker Image
2. Debian 包
3. Pypi包
4. npm包

##### 制品库

1. Nexus
2. Harbor：用于存储和分发docker镜像

### 部署方式

1. 蓝绿部署
2. 灰度发布：测试-->少量用户(A/B测试)-->100%转移到新版本
3. 滚动发布：逐渐增大灰度部署的范围

# 第五章 基础设施自动化实践

实践的示例来自于深蓝学院，点击[此处](https://www.shenlanxueyuan.com/course/485/task/17479/show)跳转。

应用层：应用程序的代码和配置
服务层：操作系统及系统配置
基础设施层：操作系统镜像、VPC、安全组SLB等

基础设施即代码(IaC,Infrastructure as Code)

技术方案

1. Packer：专注于自动化创建镜像
2. Terraform：基础设施代码化

用模板文件管理，可以版本控制和自动化；方便在不同平台部署。

### Packer

可以使用json配置文件

### Terraform

##### 常用命令

1. `init`：初始化
2. `plan`：模拟运行，不会改变系统
3. `apply`：执行实际的变更操作
4. `destroy`：销毁Terraform管理的资源

可以使用json配置文件。云平台的资源可以抽象为Terraform中的资源。

### 最佳实践

1. 模块化
2. 带版本的模块
3. 模板中避免硬编码，避免关键信息泄露等等安全隐患
4. 定义tags，跟踪成本或区分
5. 结合KMS加密

目前自动化由devops工程师管理，后续通过对这些模块的抽象，使开发人员能够使用自动化工具。

# 第六章 数据的扩展-自动驾驶仿真系统

### 仿真的优势

1. 测试效率高
2. 覆盖更全面
3. 可横向对比

### 仿真系统的要求

1. 结果一致性：车-仿真和仿真-仿真一致性

### 模拟器中模拟对象的类型

1. 物理层面：传感器仿真和车辆模型(方向盘油门加速度和速度)
2. 行为层面：周围的车、人、红绿灯

### 仿真常见的来源

1. 路测数据
2. 场景编辑
3. 随机生成

### 仿真目标

ISO21448预期功能安全标准，针对软件设计缺陷的安全标准。

# 第七章 数据的展示之渲染技术和数据可视化

### 仿真系统的组成

1. 仿真平台：
2. 仿真算法：批量化运行与成果展示的系统的总称
3. 工具链系统

渲染：可视化和用户层的接口

### 组成

1. 场景模型：主车，周围环境物体的点云和bounding box
2. 效果：决策和环境预测
3. 观察者：摄像机

渲染可视化：场景模型投影到观察平面；为模型赋予颜色

### 变换

1. 模型变换(modeling transformation)：把物体从模型坐标系移动到世界坐标系中的相应位置
2. 观察变换(view transformation)：把物体移动到相机坐标系中
3. 投影变换(projection transformation)：投影到[[-1,1],[-1,1]]的二位平面上
4. 视口变换(viewport transformation)：把二维图像映射到当前窗口并显示

### 着色模型

1. 从模型到实体的表面着色
2. 三个重要的实体：相机、物体、光源

分类

1. 经验规律模型
2. 假想规律模型
3. 物理模型

双向反射分布函数(Bidirectional Reflectance Distribution Function)

Lambertian模型(漫反射着色模型)：描述哑光模型，反射强度和视角无关，与法线和光源方向夹角的余弦值成正比

Blinn-phone模型(高光反射模型)：描述玻璃、金属等包含高光的表面，通过视角、光线和法向量之间的夹角关系计算出一个反射值，非线性变化。

### 栅格化

application(场景加载,时间轴更改,渲染对象选定和编辑)-->geometry(变换和着色)-->rasterizing(为像素分配颜色)

抗走样(anti-aliasing)

1. 提高采样率：多次采用并混合采样颜色，SSAA
2. 部分提高采样率：多次采集深度，着色只计算一次MSAA
3. ...

### 光线追踪

### 数据类型与展示方法

展示数据：为非开发人员提供可视化信息
调试数据：为开发人员提供，展示场景的状态信息和发展规律，展示所有必要的数据及运行参数，并允许用户配置

相机类代码示例(github.com/yc-feej/Camera3D.git)

# 第八章 数据的利用
