---
layout: post
title: Legion 5P, HDMI-out with hybrid graphics
date: 2020-11-21 20:00:00
description: Steps to fix the HDMI-out port using hybrid graphics in Lenovo Legion 5P
comments: true
tags: linux
---
Firstly, I tested if this was fixed in a different kernel version and by
changing the version of the drivers. I tried with kernel versions 5.4, to 5.10.
Only version 5.6 appeared to have everything working correctly.

Therefore, for a couple of days, I was using kernel v5.6 and everything worked,
switchable graphics worked, the LCD brightness-control worked, and HDMI-out! 
Everything was good until it was not.
Surprisingly, a system update retired v5.6 of my system. I totally forgot this version
of the kernel had reached EOL earlier this year!

So, I had no option but to move to a newer kernel and try to fix this issue.
I opted for v5.9 and proceeded to check the journal after a restart.

The system's journal was recording the following error when the external monitor
was connected,
<div class="l-page-outset">
{% highlight systemd %}
legion5P kernel: Unhandled error in __nv_drm_gem_user_memory_handle_vma_fault: -22
legion5P kernel: WARNING: CPU: 13 PID: 1595 at /storage/manjaro/makepkg/linux59-nvidia->
legion5P kernel: Modules linked in: ccm rfcomm fuse cmac algif_hash algif_skcipher af_a>
legion5P kernel:  cec rc_core drm agpgart syscopyarea sysfillrect sysimgblt fb_sys_fops>
legion5P kernel: CPU: 13 PID: 1595 Comm: Xorg Tainted: P           OE     5.9.8-2-MANJA>
legion5P kernel: Hardware name: LENOVO 82GU/LNVNB161216, BIOS FSCN09WW 06/28/2020
legion5P kernel: RIP: 0010:__nv_drm_gem_user_memory_handle_vma_fault+0x8c/0x90 [nvidia_>
legion5P kernel: Code: 41 bc 00 01 00 00 44 89 e0 41 5c c3 0f 0b 89 c2 48 c7 c6 80 d6 0>
legion5P kernel: RSP: 0018:ffffad7340d03b78 EFLAGS: 00010286
legion5P kernel: RAX: 0000000000000000 RBX: ffffad7340d03bc8 RCX: 0000000000000000
legion5P kernel: RDX: 0000000000000001 RSI: ffffffffb2b8941a RDI: 00000000ffffffff
legion5P kernel: RBP: ffff961954d6a578 R08: 000000000000051f R09: 0000000000000001
legion5P kernel: R10: 0000000000000000 R11: 0000000000000001 R12: 0000000000000002
legion5P kernel: R13: 0000000000000000 R14: ffff961954d6a578 R15: ffffad7340d03bc8
legion5P kernel: FS:  00007f30b43b6540(0000) GS:ffff9619af740000(0000) knlGS:0000000000>
legion5P kernel: CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
legion5P kernel: CR2: 0000557ce4b06db0 CR3: 00000007bb5ae000 CR4: 0000000000350ee0
legion5P kernel: Call Trace:
legion5P kernel:  __do_fault+0x38/0xd0
legion5P kernel:  handle_mm_fault+0x1496/0x1a40
legion5P kernel:  __get_user_pages+0x25f/0x7c0
legion5P kernel:  __gup_longterm_locked+0x61/0x1e0
legion5P kernel:  os_lock_user_pages+0xa5/0x190 [nvidia]
legion5P kernel:  _nv000635rm+0x7a/0xf0 [nvidia]
legion5P kernel:  ? _nv000710rm+0x70c/0x880 [nvidia]
legion5P kernel:  ? _raw_spin_unlock_irqrestore+0x20/0x40
legion5P kernel:  ? rm_ioctl+0x54/0xb0 [nvidia]
legion5P kernel:  ? nvidia_ioctl+0x5b7/0x900 [nvidia]
legion5P kernel:  ? nvidia_frontend_unlocked_ioctl+0x37/0x50 [nvidia]
legion5P kernel:  ? __x64_sys_ioctl+0x83/0xb0
legion5P kernel:  ? do_syscall_64+0x33/0x40
legion5P kernel:  ? entry_SYSCALL_64_after_hwframe+0x44/0xa9
{% endhighlight %}
</div>

I checked the Nvidia developer forum and the manjaro forum, luckly the [solution](https://forums.developer.nvidia.com/t/ryzen-7-gtx-1660ti-blank-screen-on-external-outputs-in-hybrid-graphics-mode/157800/4)
was already known and a [patch](https://patchwork.kernel.org/project/linux-arm-kernel/patch/20200513133245.6408-5-m.szyprowski@samsung.com/)
was available for the kernel.
After checking if the patch was already applied to Manjaro or upstream latest
versions, I could not find anything. So, it was clear I needed to patch and
build my own kernel.

I followed a combination of [this guide](https://archived.forum.manjaro.org/t/how-to-compile-the-mainline-kernel-the-manjaro-way/51700/10)
and [Patching_packages](https://wiki.archlinux.org/index.php/Patching_packages),
the end result was as follows,

1. I cloned the package repo for [v5.9](https://gitlab.manjaro.org/packages/core/linux59) to `~/git/linux59`
2. added a new file with the patch needed
3. added an entry to the `PKGBUILD` file to include the new file with the patch
4. set `CONFIG_TRANSPARENT_HUGEPAGE=n` in `config` (inside the cloned directory)
5. updated the sha512 sums array by executing:
```
$ makepkg -g >> PKGBUILD
```
6. build the kernel package. Here, I had two options, the manjaro way and the
upstream way  
  a. the Manjaro way: 
```
$ cd ~/git && buildpkg -p linux59  
```
  b. the upstream way:
```
$ cd ~/git/linux59 && makepkg -Csf
```
7. archived the produced packages for future use
8. installed the kernel and the headers
```
$ sudo pacman -U linux59-5.9.8-2-x86_64.pkg.tar.zst linux59-headers-5.9.8-2-x86_64.pkg.tar.zst
```
9. rebooted, selecting the new kernel  

The system booted but there was no video. I tried reinstalling the drivers but
the result was the same. Further examination of the journal with,
```console
$ journalctl -b0 -p4
```
Showed that, in my first attempt, I failed to disable the option from **Step 4**.
As a result, the fix was incomplete! Disabling the option still lead to the boot
process ending on a blank screen but a different set of errors were recorded in 
the journal.

Firstly, the error `AMD-Vi: Unable to read/write to IOMMU perf counter` should 
be fixed  by adding a GRUB parameter (iommu=soft).  
Then, `Failed to get backlight or LED device 'backlight:acpi_video0': No such device`, 
should also be fixed by adding a GRUB parameter (acpi_backlight=vendor)

To add those two parameters using GRUB I did,
```
$ sudo vim /etc/default/grub
```
and appended `iommu=soft acpi_backlight=vendor` to the `GRUB_CMDLINE_LINUX_DEFAULT`
variable.  
Then, updated grub by doing:
```
$ sudo grub-mkconfig -o /boot/grub/grub.cfg
```

The following reboot revealed a new problem with `i2c-nvidia-gpu`, which was 
fixed by another kernel patch. The solution was found [here](https://bugzilla.kernel.org/show_bug.cgi?id=206653).

_Note_: At this point, my fork of the kernel with the corresponding patches is 
stored in my [github repo](https://github.com/cmoralesmx/linux59/tree/hybrid_video).
This should simplify keeping up with upstream when future updates arrive and
the patches need to be applied again.

Then, thanks to the message `Nvidia: disagrees about version of symbol module_layout.`,
I learned that the Nvidia drivers installed using the `mhwd` tool from Manjaro
were not compatible with my custom kernel. Therefore, I needed to compile the
required modules.  

I went back to the Manjaro repo and searched for the package 
`hybrid-amd-nvidia-455xx-prime` but there was no such package!
How does Manjaro handle hybrid videon? I traced the installation of the drivers
and found that `/var/lib/mhwd/db/pci/graphic_drivers/hybrid-amd-nvidia-455xx-prime/MHWDCONFIG`
contains all the details needed. The actual packages needed are,
```
DEPENDS="nvidia-455xx-utils nvidia-prime"
DEPENDS_64="lib32-nvidia-455xx-utils"
DEPKMOD="nvidia-455xx"
```
To build these packages, I followed this [short guide](https://medium.com/@evintheair/building-a-custom-kernel-in-manjaro-linux-186da6a1cedf)

For building them, I cloned their build scripts for the individual packages
from Manjaro's repo and each was built as follows,  
```
$ buildpkg -p nvidia-455xx-utils
```
producing: `nvidia-455xx-utils-455.45.01-1-x86_64.pkg.tar.zst`  
```
$ buildpkg -p lib32-nvidia-455xx-utils
```
producing: `lib32-nvidia-455xx-utils-455.45.01-1-x86_64.pkg.tar.zst` and `lib32-opencl-nvidia-455xx-455.45.01-1-x86_64.pkg.tar.zst`
```
$ buildpkg -p nvidia-455xx
```
producing: `linux59-nvidia-455xx-455.45.01-2-x86_64.pkg.tar.zst`

Once built, the packages were moved to `/var/cache/manjaro-tools/pkg/stable/x86_64`

I thought because I was building the packages the Manjaro way, that location
could be a default path prepared to enable installing using `mhwd` in the
traditional way but trying to do so proved this was not the case. My packages
were being ignored.

It turns out my assumption was erroneous. The default location where the built
packages were stored was not directly related to where pacman reads the local
packages from which is `/var/cache/pacman/pkg/`

Therefore, after gathering the needed packages in a specific directory
`~/git/custom_kernel_pkgs/`, I installed them directly by doing,
```
$ sudo pacman -U ~/git/custom_kernel_pkgs/nvidia-455xx-utils-455.45.01-1-x86_64.pkg.tar.zst ~/git/custom_kernel_pkgs/linux59-nvidia-455xx-455.45.01-1-x86_64.pkg.tar.zst  ~/git/custom_kernel_pkgs/opencl-nvidia-455xx-455.45.01-1-x86_64.pkg.tar.zst
```
Another reboot later still got me the same error, 
> `Nvidia: disagrees about version of symbol module_layout.`

What was going on?  

During the attempts building with `buildpkg`, I noticed some packages were
downloaded before preparing the chroot environment but did not pay much
attention to it.

Several failed attempts later, I tried building the Nvidia packages again but
using `makepkg`.

First the `nvidia-utils`,
```
$ cd ~/git/nvidia-455xx-utils/;
$ makepkg -sf
$ mv *.tar.zst ~/git/custom_pkgs/
$ sudo pacman -U ~/git/custom_pkgs/nvidia-455xx-utils-455.45.01-1-x86_64.pkg.tar.zst
```
Then, the `linux59-nvidia-455xx`,
```
$ cd ~/git/nvidia-455xx/
$ makepkg -sf
$ mv *.tar.zst ~/git/custom_pkgs/
$ sudo pacman -U ~/git/custom_pkgs/linux59-nvidia-455xx-455.45.01-1-x86_64.pkg.tar.zst
```

Another reboot and finally, after these attempts and many others non-documented
here, this final attempt was successful!

The HDMI-out was finally working in hybrid graphics mode and there were no
kernel errors due to the Nvidia drivers. Success!

The only thing missing is the display brightness.

A side note: Based on my experience with this last part, I think by building 
the modules with `buildpkg`, the modules were compiled against a stock kernel 
every time. Whereas, using `makepkg` no chroot environment is recreated for 
each build or whatever kernel is in the system is referenced for the build so 
the packages are built against the correct kernel. I still need to check what 
the specific difference is between building with one or the other tool. I may 
cover that in  another post.

That is it for now. Congratulations if you made it to the end

