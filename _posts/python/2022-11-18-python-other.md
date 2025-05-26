---
layout: post
title:  "python-other"
date:   2025-05-26 20:11:05 +0800
categories: [Lan]
excerpt: 这篇文章是python的基础语法
tags:
  - python
---

### while-else

```python
while condition:
    # loop body
    if some_condition:
        break  # exits the loop early
else:
    # this block executes only if the loop wasn't broken
```

### get_nowait()

`get_nowait()` is a non-blocking method commonly used with queue-like objects, especially those from the queue module in multithreaded programs or multiprocessing.Queue in multiprocessing contexts.

```py
from multiprocessing import Queue
from queue import Empty

q = Queue()
q.put("data")

try:
    item = q.get_nowait()
    print(item)
except Empty:
    print("Queue is empty")
except BrokenPipeError:
    print("Receiver process has closed.")
except EOFError:
    print("Queue connection broken (EOFError).")
except OSError as e:
    print(f"Other OS error: {e}")
```

### judge whether a value is nan in python?

```py
import numpy as np

x = np.nan
if np.isnan(x):
    print("x is NaN")
```
