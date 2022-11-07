---
layout: post
title: Legion 5P with hybrid graphics, no backlight issues
date: 2022-11-07 07:00:00
description: No more backlight control problems, and ready for kernel v6.1!
comments: true
tags: linux
social: true
---

Hereby, I report the Legion 5P (15ARH05H) is no longer having backlight 
control problems with hybrid graphics. This seem to be fixed since mid 2022 with
`nvidia` drivers newer than version `510`. In my case, I stayed with version 
`495.46` for a while, and did the jump to `520.56` back in October. 

<div class="row mt-2 mb-2">
    <div class="col-sm">
        {% include figure.html path="assets/img/2022-11-07-nvidia-smi.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

This change also required an update in the parameters passed to the kernel as 
follows,

For the nvidia drivers `495.46`, I was passing:
```
amdgpu.backlight=0 
```
Now, for the `nvidia` drivers version `520.56`, I am passing:
```
acpi_backlight=video
```

This driver is working correctly with kernel versions `5.15-lts` and `6.0`.

Also, this laptop seems to be unaffected by the changes reported by 
[Hans de Goede](https://hansdegoede.livejournal.com/) for `6.1` and `6.2`.

