---
layout: post
title:  "STL algorithm"
date:   2025-03-27 00:56:29 +0800
categories: [Lan]
excerpt: 
tags:
  - STL
  - algorithm
  - C++
---

这篇文章整理了algorithm.

```C++
#include <algorithm>
```

# Empirical Observation

#

### std::unique

```C++
template <class ForwardIterator>
ForwardIterator unique(ForwardIterator first, ForwardIterator last);

template <class ForwardIterator, class BinaryPredicate>
ForwardIterator unique(ForwardIterator first, ForwardIterator last, BinaryPredicate pred);
```

1. In-Place Operation: `std::unique` does not resize the container or physically remove elements. It simply shifts the unique elements to the front.
2. Range Assumption: The range should be sorted if you want to remove all duplicates. Otherwise, only consecutive duplicates are removed.
3. Reclaim Space: If used on a container like `std::vector`, you need to call erase to remove the redundant elements physically.

an example

```C++
#include <iostream>
#include <vector>
#include <algorithm>

bool almost_equal(double a, double b) {
    return std::abs(a - b) < 0.1;
}

int main() {
    std::vector<double> vec = {1.01, 1.02, 2.0, 2.05, 3.0};

    // Remove consecutive "almost equal" duplicates
    auto new_end = std::unique(vec.begin(), vec.end(), almost_equal);

    vec.erase(new_end, vec.end());

    for (double num : vec) {
        std::cout << num << " ";
    }

    return 0;
}
```

### std::max_element

```C++
#include <iostream>
#include <vector>
#include <algorithm> // for std::max_element

// Custom compare function (finds max by absolute value)
bool compareAbs(int a, int b) {
    return std::abs(a) < std::abs(b);
}

int main() {
    std::vector<int> values = {-10, 3, -7, 9, -2, 8};
   {
        // Find the element with the largest absolute value
        auto max_it = std::max_element(values.begin(), values.end(), compareAbs);
    
        if (max_it != values.end()) {
            std::cout << "Maximum value by absolute magnitude: " << *max_it << std::endl;
        } else {
            std::cout << "Vector is empty" << std::endl;
        }
    }
    {   // Find the element with the largest absolute value
        auto max_it = std::max_element(values.begin(), values.end(), 
        [](int a, int b) { return std::abs(a) < std::abs(b); });
    }

    return 0;
}
```
