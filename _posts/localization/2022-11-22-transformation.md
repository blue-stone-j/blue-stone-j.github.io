---
layout: post
title:  transformation
date:   2025-12-28 20:24:30 +0800
categories: [Localization]
excerpt: transformation
tags:
  - transformation
---

| Element | Name        | Meaning                                                           |
| ------- | ----------- | ----------------------------------------------------------------- |
| $w$     | Scalar part | Related to the cosine of half the rotation angle                  |
| $x,y,z$ | Vector part | Defines the rotation axis and the sine of half the rotation angle |

q=cos(θ/2)+sin(θ/2)(u<sub>x</sub>i+u<sub>y</sub>j+u<sub>z</sub>k)

where:

* θ is the rotation angle
* u=[u<sub>x</sub>,u<sub>y</sub>,u<sub>z</sub>] is a unit vector along the axis of rotation

| Value                          | Interpretation                           |
| ------------------------------ | ---------------------------------------- |
| $w \approx 1$                  | Rotation angle $\theta \approx 0$        |
| $[x,y,z] \approx 0$            | Rotation axis contribution is negligible |
| Quaternion $\approx [1,0,0,0]$ | Identity quaternion (no rotation)        |

"z is close to 1" means "A 180° rotation around the z-axis"。

# rotation

### rotation matrix

intrinsic frame rotation

1. Rotate the frame around its current Y
2. Then rotate around the updated X

For passive rotations, intrinsic frame rotations compose in the same order:
$$ R_A = R_x(-\alpha)\,R_y(-\beta) $$
$$ \mathbf{p}_{new}^{(A)} = R_x(-\alpha)\,R_y(-\beta)\,\mathbf{p}_{old} $$

extrinsic frame rotation

1. Rotate the frame around world Y
2. Then rotate around world X

Extrinsic frame rotations apply in reverse order:
$$ R_B = R_y(-\beta)\,R_x(-\alpha) $$
$$ \mathbf{p}_{new}^{(B)} = R_y(-\beta)\,R_x(-\alpha)\,\mathbf{p}_{old} $$
