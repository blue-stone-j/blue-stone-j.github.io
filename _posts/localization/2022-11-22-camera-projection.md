---
layout: post
title:  camera-projection
date:   2025-11-12 23:27:32 +0800
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

The FOV of a fisheye lens refers to the angular extent of the scene that can be captured, usually expressed in degrees. This field of view in 3D spaceis a solid angle in 3D, not a flat circle — it’s more like a cone or spherical cap. The field of view of a fisheye camera in the image is usually circular, but depending on lens design and sensor crop, it can also be rectangular with a distorted projection.

Changes in polar angle θ per 1 px radially, it is constant and equals `180/(𝜋𝑓)`.

| Region on Image | Expected Projection Error (Pixels) | Reason                                                       |
| --------------- | ---------------------------------- | ------------------------------------------------------------ |
| Near center     | Small                              | Distortion minimal, linear approximation valid               |
| Toward edge     | Larger                             | Nonlinearity of fisheye projection and parameter sensitivity |
| Extreme corners | Largest                            | Model extrapolation, less calibration coverage               |

### pinhole-fov (Pinhole + Field-of-View Distortion)

Projection model: Pinhole.

Distortion model: FOV (Field-of-View) model proposed by Devernay and Faugeras.

Single parameter: ω (omega), controlling the degree of distortion.

Use case: Wide-angle lenses where radial distortion can be well-approximated by a single parameter.

# distortion model

### pinhole_radial

simpler, only radial distortion.

### pinhole_brown (Brown–Conrady model)

more general, radial + tangential distortions (Brown–Conrady model).

Radial distortion (𝑘1,𝑘2,𝑘3​)<br>
Tangential distortion (𝑝1,𝑝2​), which accounts for lens misalignment or decentering.

`Cal3DS2` implements pinhole intrinsics with radial (k1, k2) and tangential (p1, p2) distortion—i.e., the standard Brown model. It exposes accessors `k1()`, `k2()`, `p1()`, `p2()`.<br>
`Cal3Fisheye` is a different fisheye/equidistant model; do not use it for Brown.<br>
`Cal3_S2` is the simple pinhole model without distortion.

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
