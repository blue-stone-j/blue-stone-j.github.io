---
layout: post
title:  transformation
date:   2025-07-30 22:02:02 +0800
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
