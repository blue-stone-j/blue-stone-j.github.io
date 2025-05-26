---
layout: post
title:  camera-projection
date:   2025-05-26 20:11:05 +0800
categories: [Localization]
excerpt: camera-projection
tags:
  - camera
  - projection
---

# projection model

### pinhole-radtan (Pinhole + Radial-Tangential Distortion)

Projection model: Classical pinhole.

Distortion model: Radial-tangential (Brown–Conrady model).

### pinhole-equidistant (Pinhole + Equidistant Distortion)

Projection model: Pinhole.

Distortion model: Fisheye / Equidistant, often used in wide-angle or fisheye lenses.

### pinhole-fov (Pinhole + Field-of-View Distortion)

Projection model: Pinhole.

Distortion model: FOV (Field-of-View) model proposed by Devernay and Faugeras.

Single parameter: ω (omega), controlling the degree of distortion.

Use case: Wide-angle lenses where radial distortion can be well-approximated by a single parameter.

# vanishing point

### Pinhole (Perspective) Projection Model

A `vanishing point` is the point in a perspective image where parallel lines in 3D space appear to converge. It represents the projection of a direction vector in 3D space onto the 2D image plane. `vanishing point` can be applied to extract focal length and principal point for camera calibration.
