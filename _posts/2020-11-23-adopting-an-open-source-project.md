---
layout: post
title: Adopting an Open Source Software project
date: 2020-10-22 21:01:00
description: How I ended up as a maintainer of an OSS project
comments: true
tags: code
---
A few days ago, I needed to produce some bar plots. However, the distribution
of the data I was working with was much higher on one side of the plot while
the other had very low numbers. Plus, on the end with lower frequencies, it was
very hard to spot the differences between frequencies lower than 10.  
My supervisors suggested splitting the vertical axis and skipping part of the
larger bars to bring both ends of the higher and lower frequency bars closer
together. 
The suggestion made sense but I was not sure how I was going to split those
plots programmatically. Bear in mind, this was just a couple of days after
starting using R for plotting.

Alright, but, *why was I using R in the first place?*

Well, a few days earlier I was happily immersed in the Python stack for all my
plotting needs. More specifically, I was using [holoviews](http://holoviews.org/)
with the bokeh back end.
I found this solution was simplifying my analytics pipelines while making it
easy to produce interactive graphs in the Jupyter lab. All was good! Until...
My progress was stopped by a [bug](https://github.com/holoviz/holoviews/issues/3892)
with no known solution yet. This bug crashes the plotting application whenever
an offset on the y-axis of the label is specified. Therefore, I needed to adapt.
Firstly, I tried to work around it by changing to the matplotlib back end.
The results were slightly better. At least something was being plot. Although,
the error bars and labels were failing to align with their corresponding bars.
And the plots produced looked a bit basic or dull.

<div class="row mt-3 mb-3">
    <div class="col-sm-2">&nbsp;</div>
    <div class="col-sm">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-11-23-adopting-oss-project-1.png">
    </div>
    <div class="col-sm-2">&nbsp;</div>
</div>
<div class="caption">
Plotting with holoviews using the matplotlib backed with misaligned labels
and error bars.
</div>

Therefore, I went searching for alternatives. I was trying to avoid getting
into the R programming language. From previous experiences, I felt this language 
a bit weird compared to what I am used to in Python. But given my current
circumstances, I gave it another try. 
A couple of the packages available were able to produce plots more closely
resembling what I needed, these were the core plotting functions and `ggplot2`
with the last requiring the least involvement for producing more visually
appealing plots than the former. The only feature missing was the splitting
of the axis.  

<div class="row mt-3 mb-3">
    <div class="col-sm-2">&nbsp;</div>
    <div class="col-sm">
        <img class="img-fluid rounded z-depth-1"
src="{{ site.baseurl }}/assets/img/2020-11-23-adopting-oss-project-2.png">
    </div>
    <div class="col-sm-2">&nbsp;</div>
</div>
<div class="caption">
A similar plot using R with ggplot2. All the elements are correctly aligned.
</div>

A few hours later, I stumbled upon the `gg.gap` package which was designed for
doing this specific task on plots produced by the `ggplot2` package. I was
getting closer to solving my need. Yet again, I found a bug. The `gg.gap`
package was erroneously duplicating the subtitle and the footer of the plots
and placing them inside the split it was correctly generating in the plot
I was providing. After browsing for solutions, I found other users were
having the same problem and the authors had been quiet about the project for a
year or so.
So, because this package got me the closest to the solution, I decided to try
and solve the problem.

To solve the problem I needed to understand the code, but for me, it was being
a very difficult task. Yes, I was new-ish to R but the static analyser was
calculating a cyclomatic complexity of 67 for the main function. That was not
helping my case.
Eventually, I had a good grasp of the code and was confident I could solve my
problem. Yet, as I was familiarising with the code, I noticed adding features
beyond the simple fix I needed would be less daunting after some refactoring.
I decided to focus my efforts on applying Clean Code principles and following
the [tidyverse style guide](https://style.tidyverse.org/).

After a few days of work, version 1.0 was ready and it was time to make the
package available via CRAN. To do so, I followed the next three guides,
- [Fong Chun Chan's "Making Your First R Package"](https://tinyheero.github.io/jekyll/update/2015/07/26/making-your-first-R-package.html)
- [Hilary Parker's "Writing an R package from scratch"](http://hilaryparker.com/2014/04/29/writing-an-r-package-from-scratch/)
- [Hadley Wickham's "R packages"](http://r-pkgs.had.co.nz/)  

Although I created the package manually, I found the process was not that
hard thanks to those guides. (Yet, I had to fix a few errors in the package).

Now, the package can be installed by issuing at the R prompt,
```R
install.packages("gggap")
```

Some examples of the package in action follow.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/2020-11-23-gggap_ex_1.png">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/2020-11-23-gggap_ex_2.png">
    </div>
</div>
<div class="caption">
The original bar plot is on the left and the one produced by gggap on the right.
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/2020-11-23-gggap_ex_3.png">
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/2020-11-23-gggap_ex_4.png">
    </div>
</div>
<div class="caption">
The functionality of the gggap package is not limited to bar plots. Here, we see it in action with a faceted scatter plot. The original plot is on the left and the one produced by gggap on the right.
</div>
