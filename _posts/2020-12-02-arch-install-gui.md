---
layout: post
title: Installing Arch Linux in a Lenovo Legion 5P, adding a GUI
date: 2020-12-02 20:01:00
description: The second part of installing Arch on my laptop, the Graphical User Interface
comments: true
---
<div class="row mt-3 mb-3">
    <div class="col-sm">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-12-02-arch-gui.png">
    </div>
</div>
<div class="caption">
Arch Linux in a Lenovo Legion 5P
</div>
Following from the previous post where I documented the installation of the
base Arch system, this post covers the steps taken to install a Graphical User
Interface (GUI) to interact with my laptop.

Again this post is intended to act as a personal guide for the future. So
minimal description of the steps is available. If you are installing Arch, it
would be wise to follow the official Install Guide.

Because this second part deals with the GUI and the packages I use, if you
decide to replicate the following steps most likely the software installed will
not fully cover your needs.

For systems were a GUI is essential, we can choose to install a Window Manager
or a full Desktop Environment. I prefer xmonad and xfce4 correspondingly. Both
of these depend on Xorg as the display server.

## Xorg
```
$ sudo pacman -S xorg xorg-xinit base-devel git firefox inetutils parted gvfs
$ sudo pacman -S linux-headers nvidia-dkms nvidia-settings opencl-nvidia opencl-headers 
```

## xfce4, xmonad, and utilities
```
$ sudo pacman -S xfce4 xfce4-goodies networkmanager dnsmasq bluez bluez-utils pavucontrol
$ sudo pacman -S xmonad xmonad-contrib dmenu picom nitrogen xterm xmobar neovim
$ sudo pacman -S network-manager-applet nm-connection-editor
$ sudo pacman -S networkmanager-vpnc networkmanager-openvpn
$ sudo systemctl enable NetworkManager.service
$ sudo systemctl start NetworkManager.service
$ sudo pacman -S blueman pulseaudio-blueman pulseaudio-bluetooth
$ sudo systemctl enable bluetooth.service
$ sudo systemctl start bluetooth.service
$ sudo pacman -S qbittorrent remmina r tk openblas poppler gpicview peek doxygen dejagnu
$ sudo pacman -R poppler-glib poppler-qt5 qpdfview
$ sudo pacman -S poppler
$ sudo pacman -S texlive-core texlive-fontsextra pandoc ruby
$ sudo pacman -S ttf-freefont ttf-liberation ttf-droid
```

## Packages from the AUR
these are already built
```
$ sudo pacman -U ~/aur/packages/gcc8-*.tar.zst 
$ sudo pacman -U ~/aur/packages/cuda-10.2-*.tar.zst
$ sudo pacman -U ~/aur/packages/visual-studio-code-bin-1.51.1-1-x86_64.pkg.tar.zst
```
*Note:* The following patch must be installed after installing a new kernel.
In my case, the last step also installed a patched kernel against which this module
was built. If for any reason the patched module and the kernel lost sync, the
module must be compiled again for the new kernel

### fix for the trackpad
I need to replace `pinctrl-amd.ko.xz` with a patched version.
The original module is `/lib/modules/$(uname -r)/kernel/drivers/pinctrl/pinctrl-amd.ko.xz`

The following steps backup and replace that file
```
$ sudo cp /lib/modules/$(uname -r)/kernel/drivers/pinctrl/pinctrl-amd.ko.xz /lib/modules/$(uname -r)/kernel/drivers/pinctrl/pinctrl-amd.ko.xz.ORIGINAL
$ sudo cp ~/git/linux59_patches/touchpad/opt2_interrups/standone_pinctrl-amd/pinctrl-amd.ko /lib/modules/$(uname -r)/kernel/drivers/pinctrl/pinctrl-amd.ko.xz
```
The trackpad should work after a reboot.

### Auto mounting shared storage
The following code must be added to /etc/ntfs
```
# /dev/nvme0n1p6
UUID=13CA580F431F8673 /mnt/shared_data ntfs umask=000 0 1
```

### wine and lutris
I must enable multilib first
```
$ sudo vim /etc/pacman.conf
```
Now, I can install the packages
```
$ sudo pacman -S wine lutris lib32-vulkan-icd-loader lib32-libxrandr
```
However, I must disable non-essential libraries adding library override for
mscoree=d;mshtml=d

That is it. After a reboot the system should be ready.
