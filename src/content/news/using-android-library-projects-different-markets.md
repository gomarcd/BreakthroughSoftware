---
title: 'Using Android Library Projects to Configure an App for Different Markets'
description: 'One of the great benefits of developing for Android is that you have a lot of markets to select from, and you can distribute on all of them. The downside is that this can become cumbersome to manage, with changes that have to be made to the app for each market in areas such as strings and URLs, and differences in how certain aspects of the app should work, like advertising and billing.'
publishedDate: 2013-01-22
tags: ["ADT", "Git", "library projects", "Proguard"]
---

One of the great benefits of developing for Android is that you have a lot of markets to select from, and you can distribute on all of them. The downside is that this can become cumbersome to manage, with changes that have to be made to the app for each market in areas such as strings and URLs, and differences in how certain aspects of the app should work, like advertising and billing.

## The first strategy: using Git branching
We have used Git branches to help manage this in the past. With Git, you can easily and quickly create subbranches, so to separate by free and paid, for example, you can have a “free” branch and a “paid” branch, and then you can further subdivide these by market.

While Git is great at easily configuring a build for a different market, it can become difficult to keep track of all of the changes and to merge changes from one branch to another. Here are some of the issues that we’ve come across:

- Changing the package name means that all of your references to the R class need to be updated (I believe this can be worked around by calling aapt with –rename-manifest-package if you build with Ant or Maven, but unfortunately the Android Developer Tools (ADT) don’t support this workaround at the moment).
- Anything could possibly be changed between different branches, and it can be difficult to quickly get a “big picture” on the actual differences in configuration between branches.
- Propagating changes and dealing with merge conflicts can become a time-consuming chore.

## The second strategy: using Android library projects
Instead of using Git branches, this can also be done by using Android’s library projects. The way this works is that most of the application goes into a core library project, and then there are separate projects for each configuration. This can follow the Git branching model, with a base library project for “free” and for “pro”, and different application projects for each market.

With this model, it becomes very easy to make changes to the core and have these changes reflected in each application project, as well as easily see what each configuration contains. The trick to getting this to work well is to use the new manifestmerger.enabled property; by adding manifestmerger.enabled=true to each project in the project.properties, the ADT will automatically merge most attributes from a parent project down into a child project.

There are some drawbacks to this model:

- Not all attributes get copied, so there’s still some copy/pasting of attributes between manifests.
- The build takes longer, and sometimes the build inexplicably fails. This can sometimes be fixed by closing and re-opening the project, or cleaning the projects and building again.
- If you have more than one layer of projects, then automatic running & debugging may no longer work.

In addition, because the customization with library projects is less ad-hoc than when using Git branches, we had to make the following changes to our code:

- We used polymorphism and factory methods instead of if statements or directly changing the code between branches; this required quite a few changes to structure things to make this possible, but the code is better for it.
- The R class constants are no longer final, so switches were replaced with if-else statements.

Proguard seems to work fine with several layers of library projects. We had issues with the “new” style of using proguard-project.txt, so we reverted to our old Proguard setup for each project.

All in all, library projects have some drawbacks, but they can also be a clean approach to build and market customization, and they should continue to improve over time.