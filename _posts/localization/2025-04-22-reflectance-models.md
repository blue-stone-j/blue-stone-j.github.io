---
layout: post
title:  reflectance models for lidar
date:   2025-04-22 23:59:18 +0800
categories: [Tech]
excerpt: reflectance models for lidar
tags:
  - reflection
  - lidar
---

Surface can reflect beam from lidar.

|Reflectance Type |example| Effect When direction of light and viewpoint are the same|
|---|---|---|
|Lambertian | unpolished chalk |No change — still view-independent|
|Phong | polished plastic or wood with a shiny coating|Specular highlight is maximized|
|Blinn-Phong | |Specular term maximized (via halfway vector)|
|Cook-Torrance |brushed metal, skin, or real-world materials under realistic lighting |Strong specular peak (especially at oblique angles)|

Here is a picture for reflectance models. ![Reflectance Models](/assets/images/posts/reflectance-models/Reflectance%20Models.png). A python script to generate this image is provided below.

```python
import numpy as np
import matplotlib.pyplot as plt

# Define angles from 0 to 90 degrees (converted to radians)
theta_deg = np.linspace(0, 90, 500)
theta_rad = np.radians(theta_deg)

# Lambertian: Intensity ~ cos(theta)
lambertian = np.cos(theta_rad)

# Phong: Specular ~ cos(theta)^n, assume n = 20 for shiny surface
n_phong = 20
phong_specular = np.cos(theta_rad) ** n_phong

# Blinn-Phong: also uses cos(theta)^n; here we approximate similar behavior
# This assumes halfway vector H close to the normal; use same exponent for comparison
blinn_phong_specular = np.cos(theta_rad) ** n_phong

# Cook-Torrance (simplified model): peak at grazing angles
# We'll model a simplified specular peak near 0 degrees (oblique incidence)
cook_torrance = np.exp(-((theta_rad - 0) / 0.2)**2)  # Gaussian centered at 0 rad

# Plot all
plt.figure(figsize=(10, 6))
plt.plot(theta_deg, lambertian, label='Lambertian (Diffuse)', linewidth=2)
plt.plot(theta_deg, phong_specular, label='Phong (n=20)', linestyle='--', linewidth=2)
plt.plot(theta_deg, blinn_phong_specular, label='Blinn-Phong (n=20)', linestyle='-.', linewidth=2)
plt.plot(theta_deg, cook_torrance, label='Cook-Torrance (simplified)', linestyle=':', linewidth=2)

plt.xlabel('Angle between Light/View Direction and Surface Normal (degrees)')
plt.ylabel('Relative Reflected Intensity')
plt.title('Reflectance Models: Lambertian vs. Non-Lambertian')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
```
