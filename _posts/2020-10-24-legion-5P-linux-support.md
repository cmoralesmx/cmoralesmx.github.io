---
layout: post
title: Legion 5P, Linux support
date: 2020-10-24 20:01:00
description: Linux support in the Lenovo Legion 5P
comments: true
---
The specific model I will cover in this post is a Lenovo Legion 5P-15ARH05H.
The distribution in use is Manjaro Linux with an initial setup done using media
version 20.1

<div class="row mt-3 mb-3">
    <div class="col-sm-2"></div>
    <div class="col-sm-8">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-10-24-manjaro.png">
    </div>
    <div class="col-sm-2"></div>
</div>
Setting up Manjaro was a trivial task. The automated setup completed without a
hitch in about 10-15 minutes without a live internet connection.

After rebooting, I was gladly surprised when I realized the nvidia drivers were
already installed even though the setup was done offline! Not that installing
those drivers was especially hard in the last few years as prior versions
required doing,
```
$ sudo pacman -Syu
$ sudo mhw -a pci nonfree 0300
```
Not having to worry about these after setup seems like a positive step for
Manjaro. Anyway, on with the post.

Apart from the discrete GPU, most of the hardware was correctly identified by
the kernel. There were two hardware-support issues I had to handle myself and
one feature which I think must be changed so I count this as an issue too. 

Next is a list of issues fixed with links to the fixing procedures

## Issues fixed.
- [Noisy PC speaker on errors](#noisy-pc-speaker-on-errors)
- [Touchpad non responsive](/blog/2020/legion-5P-touchpad-nonresponsive-fix)
- Hybrid graphics causing blank HDMI-out
  - [Solution using discrete graphics only](#hdmi-out-with-discrete-graphics-and-brightess-control)
  - [Solution patching the kernel to fix the hybrid mode](/blog/2020/legion-5P-hdmi-out-with-hybrid-graphics)

---
### Noisy PC speaker on errors

The PC speaker can be easily disabled globally, by executing as ROOT
```
# echo "blacklist pcspkr" | tee /etc/modprobe.d/nobeep.conf
```
---
### HDMI-out with discrete graphics and brightness control

To use discrete graphics, this must be enabled in the BIOS of the computer.
After doing that, the discrete GPU will drive the HDMI-out and USB-c ports,
while the Radeon graphics drive the LCD panel, but the discrete card will
perform all the rendering and send the output to the corresponding buffers.
Therefore, all the rendering is hardware-accelerated by the dedicated GPU.

In this mode, the brightness control should work without issues for the internal
panel by adding the following entry to the Xorg.conf:
```text
Option "RegistryDwords" "EnableBrightnessControl=1"
```

This [stackexchange answer](https://unix.stackexchange.com/a/610415) suggests
creating the file `/usr/share/X11/xorg.conf.d/10-nvidia-brightness.conf`
with the following content,
```text
Section "Device"
    Identifier     "Device0"
    Driver         "nvidia"
    VendorName     "NVIDIA Corporation"
    BoardName      "RXT 2060"
    Option         "RegistryDwords" "EnableBrightnessControl=1"
EndSection
```

After doing that and rebooting, brightness control should work.

<div class="row mt-3 mb-3">
  <div class="col-sm-4"></div>
  <div class="col-sm-4">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-10-24-Linux.png">
  </div>
<div class="col-sm-4"></div>
