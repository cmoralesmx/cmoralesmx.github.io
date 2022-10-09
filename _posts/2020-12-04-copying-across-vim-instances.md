---
layout: post
title: Copying and Pasting between VIM instances
date: 2020-12-04 20:01:00
description: How to copy and paste text from one VIM instance to another
comments: true
tags: vim
---

One of the many features of the VIM editor is its multiple clipboards, 
"registers" in VIM lingo, for storing text (1 unnamed, 26 named, 10 numbered,
4 read-only, and 2 specials). All of them are accessed independently on-demand
which is very useful for larger editing tasks.

However, when the text must be copied to a file open in a different VIM
instance, the situation is slightly different.

<div class="row mt-3 mb-3">
    <div class="col-sm">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-12-04-vim-nvim.png">
    </div>
</div>
<div class="caption">
Vim and NeoVim side by side
</div>

Depending on how your VIM was built, copying and pasting text between
instances may not be possible. This feature is usually not enabled on basic VIM
installations. Checking if the feature is available can be done by executing,
```vim
:echo has('clipboard')
```
Which returns a boolean value.

If the feature is not enabled, we could compile a custom VIM or use an
alternative version such as gvim or even neoVIM.
Neovim was born as a fork of VIM and is designed to be a drop-in replacement for
the former and has this feature enabled by default.

Both gvim and neovim can be installed with a single instruction,
```
$ sudo pacman -S gvim neovim
```

Then, copying text between different instances of the same application can be
achieved by taking advantage of two special registers, 

- \* for PRIMARY, which is the copy-on-select register and can be pasted using
the mouse.
- \+ for CLIPBOARD, this is accessed with the usual ^C and ^V
- \+ for CLIPBOARD, this is accessed with the usual <kbd>Ctrl</kbd><kbd>Shft</kbd><kbd>C</kbd> and <kbd>Ctrl</kbd><kbd>Shft</kbd><kbd>V</kbd>

These registers are accessed similarly to the rest of the registers. For copying text,
yanking in VIM lingo, to the registers just mentioned, you would do,  
`"*y` for the primary register  
`"+y` for the clipboard register  
<kbd>"</kbd><kbd>*</kbd><kbd>y</kbd> for the primary register  
<kbd>"</kbd> + <kbd>+</kbd> + <kbd>y</kbd> for the clipboard register  

For pasting the text, again, following the usual formula,  
`"+p` would paste from the primary register  
`"+p` would paste from the clipboard register  

Using these registers can be simplified by creating some key-binding such as,
```vim
noremap <Leader>y "*y
noremap <Leader>p "*p
noremap <Leader>Y "+y
noremap <Leader>P "+p
```
You do not know what the <Leader> key is? By default, it is the backslash key
<kbd> \ </kbd>.
Or you can check what it is set to with
```vim
:echo mapleader
``` 
In a future post, I will provide more ideas of its use.

And that is it, copying and pasting text between instances is trivial again.
