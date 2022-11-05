---
layout: post
title: Cannot SSH to EC2 from Windows
date: 2022-01-12 08:00:00
description: Fix common problems trying to SSH to EC2 instances from Windows
comments: true
tags: cloud, aws
social: true
---

Usually, I am contacted to help resolve issues connecting to `EC2` instances from
`Windows` computers. Two of the most common causes for these problems are,
- The use of an incorrect `username` for the target instance
- The credentials file has the wrong permissions

For the first point, it is important to remember the `username` is related to the 
`AMI image` used to create the EC2 instance. Only the `Amazon AMI images` do 
have the username `ec2-user`, whereas `Ubuntu` images have the user `ubuntu`.
Here's a list of the default usernames in `AWS`
[source](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html)

- For `Amazon Linux 2` or the `Amazon Linux AMI`, the user name is `ec2-user`.
- For a `CentOS AMI`, the user name is `centos` or `ec2-user`.
- For a `Debian AMI`, the user name is `admin`.
- For a `Fedora AMI`, the user name is `fedora` or `ec2-user`.
- For a `RHEL AMI`, the user name is `ec2-user` or `root`.
- For a `SUSE AMI`, the user name is `ec2-user` or `root`.
- For an `Ubuntu AMI`, the user name is `ubuntu`.
- For an `Oracle AMI`, the user name is `ec2-user`.
- For a `Bitnami AMI`, the user name is `bitnami`.

For the second point, evidenced by the message `Permissions for X are too open`,
as seen in the next image.

<div class="row mt-2 mb-2">
    <div class="col-sm">
        {% include figure.html path="assets/img/2022-01-12-error-message.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

We need to make sure the credentials file's permissions allow full control only
to the desired windows user. This is done in Windows from the `Windows Explorer`
as follows,

1\. Locate the credential file and `right-click` on it  
2\. From the pop-up menu, select `Properties`, and then, in the `Properties`   
dialogue box, click the `Security` tab. Then, click on "Advanced"  

<div class="row mt-2 mb-2">
    <div class="col-sm">
        {% include figure.html path="assets/img/2022-01-12-file-properties.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

3\. Set the desired user as the `Owner` of the file and disable inheritance.  
4\. Then, remove all entries in the `Permission entries` except the desired windows user.  
5\. The desired windows user should be allowed `Full control`.  

<div class="row mt-2 mb-2">
    <div class="col-sm">
        {% include figure.html path="assets/img/2022-01-12-file-permissions.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

6\. The connection should now be successful  

<div class="row mt-2 mb-2">
    <div class="col-sm">
        {% include figure.html path="assets/img/2022-01-12-corrected.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I have found that these two cases solved many of the problems for my clients.
Nevertheless, please get in contact If you are still having difficulties 
connecting to your `EC2` instances or if you need support. I can help you solve
any issue you may be facing with your `AWS` resources.
