---
layout: post
title: The Cloud Resume Challenge, AWS
date: 2022-10-17 13:01:00
description: My experience completing the Cloud Resume Challenge in AWS
comments: true
tags: cloud, aws
---

I stumbled upon the [Cloud Resume Challenge](https://cloudresumechallenge.dev/) 
while preparing for my first `AWS`
certifications. However, I decided to prioritize and sit the examinations first
before delving into this task.

Once I achieved both the Solutions Architect and the Developer certifications,
it was time to work on this.

## What is the Cloud Resume Challenge?

{% include figure.html path="assets/img/2022-10-17-cloudresume.png" class="camg" %}

It is an experience-building activity aimed at presenting your resume using 
cloud technologies. It seems simple, right? Well, not quite. You are required
to complete the tasks following **best practices**, which makes for a more dense
project. The challenge consists of [sixteen steps](https://cloudresumechallenge.dev/docs/the-challenge/aws/)
taking you through the learning journey of automating the full life cycle of a 
web application using cloud technologies. Of course, before reaching such 
automation, a manual process must already be in place.

Thus, you first learn to manually deliver your application to the cloud, in 
this case, a static website. Then, you make it publicly available through a 
custom domain name. And the whole task is completed by setting up every service
needed yourself.
Cloud technologies have simplified and reduced the cost of implementing this
type of comprehensive project compared to doing the same on your hardware.
However, weak spots exist in this version of the process due to the high human 
involvement required.

Fortunately, you can reduce those weaknesses by automating the manual process.
So, you learn to do such automation. By doing that, you also gain experience in the 
**best practices** prevailing among cloud leaders. These allow them to quickly 
react to changes in user demand, to deliver software more often and with higher
quality, and to anticipate and recover from failure faster.
Thus, you have the chance to gain a solid set of skills.

If done correctly, the challenge takes you from zero to fluent in the cloud
ecosystem of your choice within a few weeks.

## What was my motivation for this challenge?

Not long ago, I stumbled upon a blog post describing how `Amazon` evolved their 
practices and tools until they successfully coped with the unprecedented surge in 
demand they observed on their first Black Friday sales.

The post in question was not a heavily-technical one providing a high-level 
overview of `AWS` and how their publicly available platform and 
knowledge base can power others to achieve similar features. Yet, this post solved
many of the questions I had from my time in the industry.

For better or worst, my professional path revolved around early-stage start-ups
(one of which was my own), highly interested in delivering software quickly but
still adamant about adopting modern development practices. Thus, I experienced 
developing and deploying applications following mostly manual methods, and 
similarly, when executing operational activities, all done with no automation.
Usually, the manual execution led to failures and sometimes
even delaying the projects.

Thus, the post I mentioned gave me hope for a better way of doing software projects.
That was exciting news! Therefore, I wanted to get involved as soon as possible. 
Yet, with no expertise or colleges working in this area, the chances of making 
this a reality looked grim. 

Fortunately, this changed when I learned about this challenge! It seemed like 
an opportunity to dive into this area and increase my familiarity with the 
tools and techniques. Thus, I decided to tackle this project and opted to do so
in AWS and here you will read my experience doing so.

## My Experience

Tackling this project helped me realize the theoretical foundation gained 
preparing to sit the certifications was insufficient for this new task. But, 
I am always happy to learn new things and hone my skills. 

Nevertheless, I had to fulfil the prerequisites before getting involved with the challenge,

### Prerequisites
*The certification*, the challenge calls for the Cloud Practitioner certification,
yet as I said earlier, I had already obtained the Solutions Architect and 
Developer certifications which I decided to use instead.

*The resume*, my resume needed to be a static website created only with 
internet-native technologies, such as `Hypertext Mark-up Language (HTML)` for
the text and semantic content and `Cascading Style Sheets (CSS)` for the 
styling. Such a simple site may seem extremely basic, yet the technology stack
needed for such a website is also greatly simplified. Given the complexity of
the project I was about to tackle, this simplification was beneficial.

To my advantage, I was already using a static site generator to produce a
personal blog which hosted an academic version of my resume. Thus, I
devised a strategy to reuse parts of that site instead of creating one from
scratch. For this, I took the last version of my site and branched from
there, isolating the relevant content for the resume while the parent branch
preserved the rest. After a few tweaks on both versions, I had the single
repository ready and set up to produce the two sites needed. Being honest, 
I was not totally pleased by having both sites using the same layout and graphic
design, but this had to do.

<div class="row mt-5 justify-content-md-center">
    <div class="col-6 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-cmca.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-6 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-resume-cmca.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3 mb-5">
    <div class="col mt-md-0" style="text-align: center">
      My former website, on the left, and the resume site, on the right.
    </div>
</div>

I later added a second statically generated site acting as a landing page
for my resume. I am providing further detail near the end of the post.

*Account setup*, I already had an `AWS` account, so I did not create a new one
for the challenge. Yet, I **must** touch on the **security considerations**
I followed. 

Firstly, I set up the `root account` with a secure password and `2FA`, two-factor
authentication, which transforms the standard login into a two-step process and
requires the account owner to approve each login attempt via a physical device. 

Secondly, I set up a `budget` with `billing and usage alerts`. This way, I 
would get prompt notification of unusual increases in usage. 

For the challenge, I created two pairs of `IAM users` and `roles` in this
account, each for specific tasks. The first one for executing 
administrative duties on the `AWS console` without programmatic access. The second
one for developer-related activities with programmatic access to a subset of 
services. I also set up the latter for usage in the `AWS CLI`, which I had
available on my local system since before the challenge.

Finally, I locked away the `root account`, which I did not use anymore during
the project.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-aws-signin.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
Securing a new or current account this way is **crucial** to prevent misuse,
overcharges, and headaches. Plus, this is a first step towards the `principle of
least privilege` which aims at reducing security exposure by providing just the
right credentials for the activities to execute next.

> Please note this post does not include any code, and I do not provide a detailed
recap of how I solved the most challenging bits. I decided this to prevent 
diluting the experience for others taking the challenge. All my code is 
available in a private repository in my GitHub account. I can provide access 
upon request for legitimate purposes.

## Stage 1, Manual labour

The first six steps of the challenge took me through the manual part of
the process. 

I started by uploading the resume site to an `Amazon Simple Storage Service (S3)` 
_bucket_ with public website hosting enabled. Doing so makes the website available
via an `S3` website *endpoint*. Yet, the requirement calls for a custom domain
name. Custom domain names must be set up with a `DNS` server, raising a new 
difficulty. 

Routing traffic from a `DNS` server directly to an `S3` bucket is impossible. 
Thus, I set up a `CloudFront` distribution, a `Content Delivery Network` 
providing fast access to your content from geographic regions distant from the 
physical location of the hardware hosting the website and acting as an 
intermediary between `Route53` and `S3`. 

Having my site hosted in the North-East region of the United States, any access
from a different AWS region would face longer load times. 
Thankfully, the `CloudFront` distribution mitigated that by replicating the 
content to many servers to many servers across America and Europe.
Thus, the website will load faster for anyone within these regions.

And, just like that, the website was now live!

Nevertheless, communication with a website should occur over an encrypted channel.
This type of encryption requires a `Transport Layer Security (TLS)` certificate.
In my case, `AWS Certificate Manager` produced the certificate for the website, and
I only needed to set up `CloudFront` to use the certificate.

Completing these activities would have been enough for a website hosted on the
`AWS` public cloud with encryption enabled. Yet, there was a lot more ground to 
cover in the challenge.

Usually, cloud applications interact with other services to improve the user
experience. I needed to add a visitor counter and keep track of this number,
meaning I needed to involve a programming language and a database. However, 
static site servers do not provide database access. 

I learnt about `DynamoDB`, a fully-featured `NoSQL` database for the cloud. 
This type of database differs from the formerly most common `SQL` or 
`relational` databases in several aspects, the most relevant of which is the way
they store data and how they represent relationships. 

Regardless, accessing data from a database directly from the front end is
not a good practice. 

I needed to implement a database-enabled back-end service, 
so the website could interact with it to store and retrieve data. Usually, 
this means setting up a database server and configuring your application to 
access the resource. From previous experience, I was aware these activities were not trivial.

Luckily, **serverless technologies** abstract the details of building and running 
applications in the cloud. Thus, you can focus on implementing an application 
without worrying too much about the server side. Plus, in some 
cases, such as `AWS Lambda Functions`, they allow the application to be as minimal
as a single function, which can have many benefits. 

But `AWS Lambda Functions` cannot operate autonomously to handle the current 
scenario. They need a directory and routing service to receive and process the 
external requests and invokes the correct function based on the parameters it 
receives. `API Gateway` is the service that does this in `AWS`.

For implementing the functions enabling this interaction with `DynamoDB`, I took 
advantage of `boto3`, a `Python` framework from `AWS` exposing their services
for easy consumption and integration. Doing so allowed me to easily and quickly 
complete the back-end application to enable the website to read and write data 
to and from the database.

However, following best practices, I must have thoroughly tested the `Lambda 
functions` before release. Thus, I added unit test to make sure the code was 
working correctly. This testing should be executed routinely as the 
code base changes to check the functionality covered still works as expected.
At this point in the challenge, I was manually executing these tests.

After that, I set up `API Gateway` to invoke the `Lambda functions` in response to 
the requests coming from my website.

And that was all the work needed for the first part. It was a long and winding
process, but I had a working site hosted on the `AWS` cloud accessible via a
custom domain name. Plus, I had certainty the code was working, and future
changes that may break the functionality would not get released **if and only if**
I were to run the tests before updating the public website.

The infrastructure of my solution follows, providing a high-level overview of 
what services are involved and how they relate to each other.

&nbsp;<br/> 

<div class="row mt-3" style="text-align: center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-the-crc-stack.png" class="img-fluid rounded" %}
        The infrastructure for my solution to the challenge
    </div>
</div>

&nbsp;<br/> 


The key takeaways for me from this first stage were,

1. Securing and locking the `root account` is a **MUST**.
1. `IAM` users for the win!
1. **NEVER** embed credentials or secrets in code.
1. `Origin-Access Identity` is a more secure way of hosting a website on `S3`.
1. A standard `DNS` server cannot choose the best server to use per request based
on specific rules, but other services, such as `CloudFront` can.
1. A `CloudFront` distribution is a valid target for traffic from a `DNS` server, and it can take an `S3` bucket as its origin.
1. Requests from `CloudFront` to `S3` are `HTTP`, not `HTTPS`. `Amazon S3` does 
not expose an `HTTPS` *endpoint*.
1. In some scenarios, `Lambda` functions may need `CORS` headers.
1. A `CloudFront` distribution allows specifying domain name aliases to enable access to the cached content via custom domain names.
1. Always mind the delay between creating or updating a `CloudFront` distribution
and the files being ready at the edge locations.

Configuring all the services is a time-consuming activity, plus with so many
details to set up, the surface of exposure is considerable. Let's improve this.

&nbsp;<br/> 


## Stage 2, Automation

To start this second part, I learnt to avoid manually configuring the `API`
resources by leveraging the `AWS Serverless Application Model (SAM)` framework.

`AWS SAM` uses text-based templates to declare all the resources comprising
a serverless application. These templates are part of a technology enabling
the creation and provisioning of `AWS` infrastructure deployments predictably and
repeatedly, also known as `Infrastructure as Code (IaC)`. `IaC` intends to treat
infrastructure the same way developers treat code. Among others, `IaC` enables
versioning of the source template to keep track of the changes to the 
infrastructure as the projects evolve. Thus, from this point, I started using
the `Git` system for this project and `GitHub` to host the remote code repository.

Now, that I was doing `IaC`, I was also executing part of the practices known as
`DevOps`, short for development and operations. Other of these practices
involve automating the integration and delivery pipeline. There are many tools 
available for these activities, such as `AWS CodePipeline`, or the more manual 
trio made of `AWS CodeCommit`, `AWS CodeBuild`, and `AWS CodeDeploy`, as well
as non-AWS tools. I covered this part of the challenge using `GitHub Actions`.
These are scripts running on `GitHub` servers and executing sequential tasks in
response to code submissions. The `GitHub Actions` were responsible for
running the unit tests and requiring all tests to pass before proceeding with 
the delivery of the `AWS SAM` template. Thus, this step added some certainty to my
project in the remote case I submitted breaking changes.

However, the `GitHub Actions` needed programmatic access to the `AWS` resources 
in my account to complete their execution. I enabled this by 
creating a set of credentials in `AWS IAM` with **restricted authorization** for 
the services required. Provisioning credentials requires careful
consideration due to the inherent **security implications** involved. It may be
easy to hardcode the credentials directly in the code. However, this is a highly
unsafe decision even when working with private repositories and goes against best 
practices. The safer option, and my course of action, is to use 
`GitHub Actions secrets` to store this sensitive data in encrypted storage and 
request the values from within the `GitHub Actions`.

For the next step, I focused my efforts on the front end. Thus, I created a 
second `GitHub` repository for the website and a new set of `GitHub Actions`.
These `GitHub Actions` would synchronize the website files in `Amazon S3` 
whenever a new commit changed the statically generated site in `GitHub`. In 
this case, I added a second task to *invalidate* the files in the `CloudFront`
distribution cache after each update forcing an update from the new files
in `S3`. Not doing so could have undesired consequences for my website.

At this point, I had almost completed the challenge. Yet, I was discontent 
with having my resume exposed directly without a landing page. So, I created a new 
version of the former landing page of my original static website and added 
another `GitHub Action` to the corresponding repository for publishing this
landing page too.

Finally, I had the resume published on a subdomain and the landing page on the
top-level domain.

> This last step allowed me to experience more tools and techniques for 
hosting the website, distributing the content, monitoring, and cost 
optimizations beyond what the challenge required. More details are in the last 
section of the post.

And, just like that, I was done with the challenge, well, almost. The final
activity was to write a post about this experience. Thus, this post was born.

The key takeaways for me from this second stage were,

1. `AWS SAM` is a subset of `CloudFormation` and may be easier for some scenarios.
1. `AWS SAM` and `CloudFormation` templates can directly deliver code to a target.
1. It is possible to embed code in `SAM` and `CloudFormation` templates, but it is best to keep it short.
1. Targeting remote services for `Unit Testing` can quickly elevate costs.
1. **Mocking** services for testing prevents unnecessary delays and charges, among other things.
1. I must aim for modular template designs that enable reuse.
1. It is best to use `CloudFormation` template parameters instead of hard-coded values.
1. Stringent rules in the `CI/CD` pipeline, such as enforced style checks, can help maintain code standards.
1. Failing to specify an alternate `CNAME` in a `CloudFormation` distribution leads to `403 errors`.
1. Newly created certificates involve a manual validation step unless you automate the process.
1. Having `CloudFormation` generate new certificates without specifying a timeout for the template execution may lead to a never-ending process due to pt.10.
1. Taking care of the template runs is also taking care of the operational cost!.

The challenge is designed to provide sufficient experience to hit the ground 
running as a junior cloud engineer. However, given the wide spectrum of what is
possible with cloud technologies, it is also possible to take the project as a 
starting point and execute further exploration according to your own interests.

## Going beyond the requirements of the challenge

Given my interests and time constraints, I explored a couple of optimization 
strategies and a more secure way for hosting the static website. A brief of 
these follows,

### A more secure way of hosting a static website in `S3`

I created an additional statically generated site to serve as the landing page 
for my resume. I also hosted this as a static site in `S3`, yet, instead of 
enabling `Static website hosting`, I set up an `Origin-Access Identity`
in `CloudFront`. This feature enabled `CloudFront` to send authenticated
requests to `Amazon S3` and set `S3` to allow access to authenticated
requests from `CloudFront` only. This way, no `S3 website endpoint` is created either.
Besides, this change also allowed me to explore using subdomains in `Route53` 
to expose the resume site while preserving the top-level domain for the 
landing page.


### Using subdomain-specific `TLS` certificates in `CloudFront`

`TLS` certificates encode information about the domain name they are validating,
and they cannot change once they are issued. You must create a new certificate 
whenever changes are needed, such as updating some of its information. Thus, I 
needed  to identify the simplest and most cost-effective option for updating 
the certificate that would better fit my scenario. For this, I also needed to
consider each new certificate involves a manual authorization step in 
Route53.

I decided to use two certificates instead of only one. I linked the first 
certificate to the top-level domain and the second to the subdomains. This 
option was also a good fit for the independent CI/CD pipelines producing the
static sites and the infrastructure of my solution.

<div class="row mt-3 mb-5" style="text-align: center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-tls-certs.png" class="img-fluid rounded" %}
        Information about both certificates side by side
    </div>
</div>


### Optimizing operational costs

As the project evolved, I continuously did access and cost assessments to 
identify opportunities for optimization. Doing so was key after one of the last
updates, where I introduced new templates for both static sites. The new 
templates increased the footprint of the static sites quite sharply, which 
triggered the alerts I set up. 

After assessing the situation and identifying the culprits, I implemented a 
cost-reduction strategy via offloading resources to third-party CDNs 
and asset optimization. 

Thus, achieving a reduction of the operational cost by 50%

<div class="row mt-3 mb-3" style="text-align: center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-cost-1.png" class="img-fluid rounded" %}
        The landing page website file size before and after optimizations
    </div>
</div>
<div class="row mt-3 mb-3" style="text-align: center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-cost-2.png" class="img-fluid rounded" %}
        The resume website file size before and after optimizations
    </div>
</div>
## Closing words

Implementing the manual process was good as a learning exercise but distant
from the best practices for cloud solutions.
Applying `IaC` is not extremely difficult, and the gains far outweigh not
doing so.

Automated infrastructure provisioning is the way of the cloud.


<div class="row mt-3" style="text-align: center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/2022-10-17-aws-banner.png" class="img-fluid rounded" %}
    </div>
</div>
