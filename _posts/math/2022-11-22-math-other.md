---
layout: post
title:  "math-other"
date:   2024-11-24 06:54:24 +0800
categories: [Math]
excerpt: math-other
tags:
  - math
  - 
---

M3D Hessian_rot = Jacobian_rot.transpose() * Jacobian_rot; Jacobian_rot is a mutable matrix with 3 columns. Add more data to Jacobian_rot.

1. Positive Semi-Definiteness: Since Hessian_rot is derived from a product of Jacobian_rot, it is positive semi-definite. Adding more rows cannot reduce the eigenvalues of Hessian_rot; it can only increase them or keep them the same.
2. Eigenvalue Magnitudes: 
   * If the new rows of Jacobian_rot introduce significant variation or directions that were not well-represented before, the largest eigenvalue of Hessian_rot will likely increase. 
   * The smallest eigenvalue (if positive) might also increase if the new rows provide more coverage in directions that were previously underrepresented.
   * If the new rows are linearly dependent on existing rows, the eigenvalues may not change significantly.
