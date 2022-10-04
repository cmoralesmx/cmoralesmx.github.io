---
layout: post
title: Using git to track your dot files
date: 2020-12-03 22:01:00
description: How to use git for tracking changes to your configuration files
tags: linux, git
---

<div class="row mt-3 mb-3">
    <div class="col-sm">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-12-03-git.gif">
    </div>
</div>
<div class="caption">
Using git to track your dot files
</div>

In GNU/Linux, user-specific application configuration is traditionally stored
as plain text in dot files (so-called because their filename starts with a dot).
Given their file format is plain text, it is common to track their status using
a version control system such as Git.

One approach to do so is known as "bare repository and alias", which entails
doing the following, 
1. Initialize an empty -or bare- repository.
1. Create an alias for this repo to avoid polluting the standard git
1. Prevent files we haven not added explicitly from showing
1. Register the new alias on profile initialisation files to engage our setup
on each run automatically

To do so, we must execute the following,
```console
$ git init --bare $HOME/git/dotfiles
$ alias config='/usr/bin/git --git-dir=$HOME/git/dotfiles/ --work-tree=$HOME'
$ config config --local status.showUntrackedFiles no
$ echo "alias config='/usr/bin/git --git-dir=$HOME/git/dotfiles/ --work-tree=$HOME'" >> $HOME/.bashrc
```
After this setup, git is ready to start tracking changes to any file inside
$HOME. However, instead of the usual git commands, we use the ones we just setup

```bash
$ config setup  # instead of git setup
```

Then, we can add our files now
```
$ config add .gitconfig
$ config commit -m "Add gitconfig"
$ config add .bashrc
$ config commit -m "Add bashrc"
$ config add .makepkg.conf
$ config commit -m "Add makepkg"
$ config push
```

Of course, a remote must be set up before pushing the changes.
We can do so as follows,
```
$ config remote add origin --your-remote-here--
$ config add README.md
$ config push --set-upstream origin master 
```

From now on, we can use this repo to easily track our dot files
