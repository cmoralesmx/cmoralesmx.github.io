---
layout: post
title: Legion 5P, touchpad nonresponsive fix
date: 2020-11-28 20:01:00
description: Steps to fix the touchpad nonresponsive issue in Lenovo Legion 5P
comments: true
---
The Legion 5P-15ARH05H has an MSFT0001:00 06CB:7F28 touchpad which was not
responding to input. A fix is mentioned in this [linux.org thread](https://www.linux.org/threads/lenovo-legion-5-touchpad.29536/page-2)
It entails enabling pooling on the device. This is achievable by creating the
following two files in `~/Documents`,

`fix_trackpad.service` with the following content,
```systemd
[Unit]
Description=Fix the trackpad on the Legion 5P
 
[Service]
ExecStart=/usr/bin/fix_trackpad.sh
 
[Install]
WantedBy=multi-user.target
```

And `fix_trackpad.sh` with the following content,
```bash
#!/bin/sh
echo 386 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio386/direction
```
Then, issuing the following instructions once to set up the fix to be applied after
every reboot or cold start,

```shell
$ sudo cp ~/Documents/fix_trackpad.sh /usr/bin/
$ sudo cp ~/Documents/fix_trackpad.service /etc/systemd/system/
$ sudo systemctl enable fix_trackpad
```

Yet, additional reading showed pooling is not the best solution for this.

The recommended fix, discussed in [bug #1887190](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1887190/+index?comments=all),
is based on interrupts instead of polling. Interrupts are better than polling
for power management.  
How do we fix this? [comment #189](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1887190/comments/189) 
contains code which is a standalone version of the solution in comment #171.  
This standalone version is only useful if the module `pinctrl-amd` is built
out of the kernel. To check if that is the case, we must execute,
```
$ modinfo pinctrl-amd
```
For arch-based distributions this is the case so the standalone solution works.
Based on these findings, we must compile and install the module.  
The instructions to do so are available on the same comment #189 linked earlier.

