---
layout: post
title:  camera-projection
date:   2025-06-23 08:18:45 +0800
categories: [Localization]
excerpt: camera-projection
tags:
  - camera
  - projection
---

# projection model

### pinhole-radtan (Pinhole + Radial-Tangential Distortion)

Projection model: Classical pinhole.

Distortion model: Radial-tangential (Brown–conrad model).

### pinhole-equidistant (Pinhole + Equidistant Distortion)

Projection model: Pinhole.

Distortion model: Fisheye / Equidistant, often used in wide-angle or fisheye lenses.

### pinhole-fov (Pinhole + Field-of-View Distortion)

Projection model: Pinhole.

Distortion model: FOV (Field-of-View) model proposed by Devernay and Faugeras.

Single parameter: ω (omega), controlling the degree of distortion.

Use case: Wide-angle lenses where radial distortion can be well-approximated by a single parameter.

# vanishing point

A `vanishing point` is the point in a perspective image where parallel lines in 3D space appear to converge. It represents the projection of a direction vector in 3D space onto the 2D image plane. `vanishing point` can be applied to extract focal length and principal point for camera calibration.

### Pinhole (Perspective) Projection Model

Vanishing point exists for any 3D direction not parallel to the image plane. Parallel lines in 3D space project to lines in the image that converge at a vanishing point. Vanishing points are well-defined and finite (unless the direction is perpendicular to the image plane).

### Fisheye/Equidistant/Stereographic Projection

Straight lines become circular arcs in the image. Vanishing points are typically not finite. Lines that are parallel in 3D curve in the image and do not converge to a single point.

### Orthographic Models

Projects rays parallel to the image plane, not converging. Parallel 3D lines remain parallel in image. Thus, no vanishing point in the image.

### Equirectangular Projection (used in panoramic images)

Longitude–latitude mapping: maps sphere to rectangle. 3D lines often become sinusoidal curves in the image. Vanishing points become distributed or nonexistent depending on direction.
