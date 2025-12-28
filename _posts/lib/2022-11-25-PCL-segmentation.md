---
layout: post
title:  "segmentation in PCL"
date:   2025-12-28 20:24:30 +0800
categories: [Tech]
excerpt: segmentation API in PCL
tags:
  - PCL
  - C++
---

# cluster

# segmentation

### Euclidean Cluster Extraction

```C++
#include <pcl/segmentation/extract_clusters.h>
#include <pcl/search/kdtree.h>
#include <pcl/point_types.h>
#include <pcl/point_cloud.h>

pcl::search::KdTree<pcl::PointXYZ>::Ptr tree(new pcl::search::KdTree<pcl::PointXYZ>);
tree->setInputCloud(cloud);

pcl::EuclideanClusterExtraction<pcl::PointXYZ> ec;
ec.setClusterTolerance(0.02);   // 2 cm
ec.setMinClusterSize(50);
ec.setMaxClusterSize(25000);
ec.setSearchMethod(tree);
ec.setInputCloud(cloud);

std::vector<pcl::PointIndices> cluster_indices;
ec.extract(cluster_indices);

int id = 0;
for (const auto &indices : cluster_indices)
{
    pcl::PointCloud<pcl::PointXYZ>::Ptr cluster(new pcl::PointCloud<pcl::PointXYZ>);
    for (int idx : indices.indices)
        cluster->points.push_back(cloud->points[idx]);

    cluster->width  = cluster->points.size();
    cluster->height = 1;
    cluster->is_dense = true;

    std::cout << "Cluster " << id++ << " size = " << cluster->size() << std::endl;
}

```

### Supervoxel Clustering

```c++
pcl::SupervoxelClustering<pcl::PointXYZ> super(0.05 /*voxel res*/, 0.1 /*seed res*/);
super.setInputCloud(cloud);
std::map<std::uint32_t, pcl::Supervoxel<pcl::PointXYZ>::Ptr> supervoxel_clusters;
super.extract(supervoxel_clusters);

```
