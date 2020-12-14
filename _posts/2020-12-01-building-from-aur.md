---
layout: post
title: Building packages from the AUR
date: 2020-12-01 20:01:00
description: A simple guide for build packages from the AUR without helpers
comments: true
---
<div class="row mt-3 mb-3">
    <div class="col-sm">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-12-01-aur.png">
    </div>
</div>
One of the interesting aspects of Arch Linux is its user-supported resources.
This post will focus on one of those resources, the Arch User Repository (AUR)

<blockquote><p>The Arch User Repository (AUR) is a community-driven repository
for Arch users.
It contains package descriptions (PKGBUILDs) that allow you to compile a package
from source with makepkg and then install it via pacman. The AUR was created to
organize and share new packages from the community and to help expedite popular
packages' inclusion into the community repository</p></blockquote>

Therefore, we can think of it as a massive collection of software (in source
form) not available in the official repositories.

Some may feel building these packages is hard so they recommend the use of
helpers for this task, i.e.: yay, pacman, and similar. But in many cases,
the build process is mostly automated by the build scripts available here.

In my opinion, part of the reason for doing this my way is because I have
set up the build tools to,
- make use of the n-cores in my system to shorten the time needed building
the packages
- use RAM instead of persistent storage for the build process
- optimize the applications for a specific processor architecture
- keep the produced packages in a specific location for later reuse

Those settings are stored in `~/.makepkg.conf` and a good guide for setting
them is available at [this entry](https://wiki.archlinux.org/index.php/makepkg#Tips_and_tricks)
of the Arch Wiki.

The whole process itself is fairly simple, it entails
1. fetching the build package description files from the AUR
1. creating the package (or packages)
1. using pacman to install the produced package (or packages)  

In the next example, five packages are fetched and one gpg key is retrieved
to validate one of the packages. This step is sometimes needed for some
packages if the signing key of the package maintainer changed after the build
file was made available.

To fetch the build scripts we just need to git clone what we need,
```
$ cd ~/aur
$ git clone https://aur.archlinux.org/visual-studio-code-bin.git
$ git clone https://aur.archlinux.org/browsh.git
$ git clone https://aur.archlinux.org/ipscan.git
$ git clone https://aur.archlinux.org/gcc8.git
$ gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys A328C3A2C3C45C06
$ git clone https://aur.archlinux.org/cuda-10.2.git
```
Cloning the needed files should be fairly fast.

Now, each package is built in the same way by issuing the following command
from each of the directories created by the clone process
```
$ makepkg -S
```

After the build is completed, we instruct pacman to install using the packages
produced by using the `-U` flag and the full path of the package,
```
$ sudo pacman -U ~/aur/packages/gcc8-*.tar.zst 
$ sudo pacman -U ~/aur/packages/cuda-10.2-*.tar.zst
$ sudo pacman -U ~/aur/packages/visual-studio-code-bin-1.51.1-1-x86_64.pkg.tar.zst
```

That is it, you should be ready to build your own AUR packages.

