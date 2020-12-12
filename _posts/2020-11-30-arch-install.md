---
layout: post
title: Installing Arch Linux on a Lenovo Legion 5P
date: 2020-11-30 20:01:00
description: The steps I followed for installing Arch Linux on my laptop
comments: true
---
<div class="row mt-3 mb-3">
    <div class="col-sm">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-12-02-arch.png">
    </div>
</div>
<div class="caption">
Arch Linux on Lenovo Legion 5P
</div>
In earlier posts, I documented how I solved a series of issues due to the
Linux support in this laptop. Eventually, I found the lack of the `nvidia-dkms`
package was adding unnecessary work for me. And because using packages from
a different disstribution is not supported or recommended, I decided to
migrate my system to Arch Linux.

Before going any forther, I must apologise, this post is purely technical.
It follows the official [installation guide](
https://wiki.archlinux.org/index.php/installation_guide),
which is a must read for installing Arch, but the purpose of this post is to
act as a personal reference for the future.


## Partition schema 
I have used the following schema on 500Gb and 1Tb drives
```pre
device		size	format	mont point	system
nvme1n1p1 	  260 	fat 	/mnt/boot	/boot
nvme1n1p2	20480	btrfs	/mnt		/
nvme1n1p3	12288	btrfs	/mnt/var	/var
nvme1n1p4	13312	swap	swap		swap
nvme1n1p5	all	btrfs	/mnt/home	/home
```

## Initial steps
Enable the UK keyboard layout  
```
# loadkeys uk
```

Try to connect directly to WiFi as follows,
```
# iwctl --passphrase myPassPhrase station wlan0 connect targetWiFiNetwork
```
If this fails, either enable the WiFi devices
```
# rfkill unblock wifi
```
or try with the interactive way
```
# iwctl
# station wlan0 scan
# station wlan0 get-networks
# station wlan0 connect targetWifiNetwork
# exit
```
Once a connection is established, sync the system clock
```
# timedatectl set-ntp true
```
Then, setup the drive layout
```
# fdisk -l # partition the drives according to the partition scheme shown earlier
# mkfs.btrfs /dev/nvme1n1p2 -f # root
# mkfs.btrfs /dev/nvme1n1p3 -f # var
# mkswap /dev/nvme1n1p4
# swapon /dev/nvme1n1p4
# mount /dev/nvme1n1p2 /mnt
# mkdir /mnt/boot
# mkdir /mnt/var
# mkdir /mnt/home
# mount /dev/nvme1n1p1 /mnt/boot
# mount /dev/nvme1n1p3 /mnt/var
# mount /dev/nvme1n1p5 /mnt/home
# reflector # choose fast servers
```

Procees with the base installation
```
# pacstrap /mnt base linux5.8 linux-firmware amd-ucode btrfs-progs dhclient \
dhcpcd dosfstools efibootmgr iwd lynx man-db man-pages nvme-cli openssh rsync \
sudo texinfo tmux usbutils gvim vpnc zsh xf86-video-amdgpu vulkan-radeon 
```

## Configure the system

Write the current file system structure to fstab
```
# genfstab -U /mnt >> /mnt/etc/fstab
# cat /mnt/etc/fstab
```

Set the timezone and adjust the system clock
```
# arch-chroot /mnt
# ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime # set the timezone
# hwclock --systohc # generate /etc/adjtime
```

Edit `/etc/locale.gen` and uncomment the locales needed,
```text
en_GB.UTF-8 UTF-8
en_US.UTF-8 UTF-8
``` 
Generate the locales,
```
# locale-gen
```
And set the system locale by editing `/etc/locale.conf` adding:
```text
LANG=en_GB.UTF-8
```

Set the keyboard layout persistently
```text
# vim /etc/vconsole.conf
KEYMAP=uk
```

Set the hostname
```
# vim /etc/hostname
```
*Note:* The only content of this file should be the name for this machine

Add default addresses to `hosts` file
```
# vim /etc/hosts
```

```pre
127.0.0.1	localhost
::1		localhost
127.0.1.1	arch-usb.localdomain	arch-usb
```

Generate the initial minimal filesystem `initramfs`
```
# mkinitcpio -P
```

Set the root password
```
# passwd
```

Add a non root user
```
# useradd -m cmoralesmx
# passwd cmoralesmx
# usermod -aG wheel,audio,video,optical,storage cmoralesmx
```

Enable users in wheel group to execute anything as sudo
```
# EDITOR=vim visudo
```
*Note:* Search and uncomment the line about wheel users

Remove unnecesary packages from the install
```
# pacman -R modemmanager, mobile-broadband-provider-info
```

Install a bootloader
*Note:* I was using grub but switched to systemd-boot which seems leaner.

Because I am already using systemd-boot, the loader configuration and the
entries should be available and up to date in `/boot`

Therefore, I just need to install the actual bootloader
```
# bootctl install
```

At this point the base system is ready. For a headless computer this is enough.

Optionally, I could install a Window Manager or a full Desktop Environment.
I will cover that in the [next post](/blog/2020/arch_install_gui)

