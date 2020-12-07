---
layout: post
title: Home network fully running on GNU/Linux
date: 2020-10-27 20:01:00
description: Brief detail of my local network which runs on GNU/Linux
comments: true
---
<div class="row mt-3 mb-3">
  <div class="col-sm-2"></div>
  <div class="col-sm-8">
    <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-10-27-network.jpeg">
  </div>
  <div class="col-sm-2"></div>
</div>
It has been a few years now since I setup the network at my place. It has been
working boringly reliable so I keep forgeting to write about it.

Anyway, the nework is composed of:  
1x local server  
1x Raspberri Pi  
2x GPU computing nodes  
Nx laptop and other small devices  

## Local server
It started as a third generation Intel Core i5 with 16 GB of RAM, 2x 500GB SSD,
1x 320GB SHDD (savaged from an old laptop) and three Radeon RX 450.
Initially, the GPUs were dedicated to full-time hash computing. Everything was
installed creatively on top of and around a Mini-ITX case.
Later, those AMD cards where joint by an Nvidia GTX 1070 for CUDA computing and
gaming. This server was dual booting Manjaro and Windows 10 until I found about
[Lutris](https://lutris.net/). Then, it was running GNU/Linux full time.  

Eventually, the GPU setup changed to 1x RX480 and 2x Nvidia 1070 cards.  

During the last year of its existence, this server was running a Ryzen 5 3600
CPU with 1x GTX 1070 mini, 1x RTX 2070 Super, and was dedicated to computational
intensive tasks using multiprocessing and CUDA.

<div class="row mt-3 mb-3">
  <div class="col-sm-2"></div>
  <div class="col-sm-8">
    <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-10-27-server.jpg">
  </div>
  <div class="col-sm-2"></div>
</div>
<div class="caption">
The local server during its last days of operation. It was retired on September 2020.
</div>

## Raspberry Pi 4
Although, this was one of the last additions to the local network, it became
central to it. This Single Board Computer (SBC) device acts as a WiFi access point sitting between
the local network and the wired switch serving internet to the flats in the
same building.  
Some of the services hosted by this device are:

- Network-wide AD-blocking based on dnsmasq using the [notracking host-blocklist](https://github.com/notracking/hosts-blocklists)
- File sharing via the torrent protocol. I am usually seeding some GNU/Linux
distributions
- Media streaming of the collection of movies and music
- An instance of Redis for doing some test
<div class="row mt-3 mb-3">
  <div class="col-sm-3"></div>
  <div class="col-sm-6">
    <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-10-27-RaspberryPi4.jpg">
  </div>
  <div class="col-sm-3"></div>
</div>
<div class="caption">
Stock image of a Raspberry Pi 4 SBC
</div>

## Computing nodes

Since lockdown started, I was able to have access to an additional desktop
computer with an Nvidia GTX 1070 and a laptop with an RTX 2070. These two
systems act as headless nodes for CUDA taks. Their addition was key for a
period of my project when I needed to execute many week-long tasks on CUDA
enabled GPUs and the resources at the University's HPC were scarce.

## Laptops and other devices

There are at least two basic laptops, two mobile phones, one tablet and a
few other devices that connect to the same network.

