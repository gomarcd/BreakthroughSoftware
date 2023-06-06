---
title: 'How the Android License Verification Library is Lulling You into a False Sense of Security'
description: 'Are you an Android developer? Have you ever wondered why your app keeps getting hacked, ending up on shady forums and websites?'
publishedDate: 2012-04-06
tags: ["Android LVL", "Android Market", "AntiLVL", "Google Play", "obfuscation", "Proguard", "security through obscurity"]
---

Are you an Android developer? Have you ever wondered why your app keeps getting hacked, ending up on shady forums and websites?

Some of you might remember the old copy protection measure that Google used to have. You can still find it on your publisher page, with the following warning in red: “The copy protection feature will be deprecated soon….” Enter Android’s **L**icense **V**erification **L**ibrary (LVL): a new tool to save the day!

## Android’s License Verification Library (LVL): A false sense of security
How does the license verification library work? It manages a connection between your app and the Android Market (now Google Play), and performs a license check with the server to see if the user has a valid license for your app (i.e. it was purchased legitimately through the market). In other words, it’s a form of **D**igital **R**ights **M**anagement (DRM).

Unfortunately, the license verification library is also a joke to crack and bypass.

It literally takes a pirate no more than a few seconds to run a tool that will decompile your application, detect your licensing code, patch it to bypass all of the checks, repackage everything into a new APK and resign it. This tool is called AntiLVL. By the way, it can also bypass much of Proguard’s obfuscation, and even techniques using reflection.

For obvious reasons, I won’t link to it here, but you can find it if you do a bit of searching. This is also just one tool that’s freely available to download; who knows what other tools are hidden from public release.

## What does Google recommend?
Unfortunately, you have to do a lot of digging to find out what you should do, and just how vulnerable you are. Google doesn’t offer much in the way of help and advice directly from their website, except for “well, you should probably not use it as-is and obfuscate the code somewhat.” They also give advice like “In most cases, you should add the license check to your application’s main Activity, in the onCreate() method,” which directly contradicts the advice given by Google engineers in the talk, “[Evading Pirates and Stopping Vampires using License Verification Library, In-App Billing, and App Engine](http://www.google.com/events/io/2011/sessions/evading-pirates-and-stopping-vampires-using-license-verification-library-in-app-billing-and-app-engine.html),” where they recommend that you don’t add the checks to non-obfuscated methods such as `onCreate()`.

I highly recommend you view the presentation or watch the video. I would not necessarily use them directly as-is, but you can take the ideas and go with variants.

## What are the weakest points?
Here are some of the checks that are removed very quickly and easily by tools such as AntiLVL:

**Non-obfuscated code**

A trivial check will easily take care of methods with names such as checkLicense().

**Unmodified code**

The default signatures of some methods are very easy to trap. For example, ServerManagedPolicy.allowAccess() has a call to System.currentTimeMillis() at the top of the method body. AntiLVL finds this code, and replaces it with a force return true.

Another bit of easily-hacked code is the enum Policy.LicenseResponse. This enum contains three constants, “LICENSED”, “NOT_LICENSED”, and “RETRY”. Even with Proguard obfuscation enabled, these constants get embedded into your code as strings, containing the same value as the enum! AntiLVL replaces the “NOT_LICENSED” string with “LICENSED”, which causes other checks to pass.

**Package checks**

AntiLVL can check if you’re trying to validate that your classes or signature have been modified and intercept those validation calls, even if you’re using reflection.

**And much more…**

There is a lot more that AntiLVL can detect and modify; you can download it and look at the XML files inside the jar to see what else it can detect. There’s also a sample project with all of the usual tricks, which are easily detected and cracked by AntiLVL.

## What can I do?
The minimum you can do is download AntiLVL, run it in a virtual machine with no connection to the Internet if you don’t trust the code, and test it against your APK until it can no longer crack it automatically.

Here are some ideas:

- Wrap all logging calls in a static boolean, set to false when you build the release version of your app.
- Encode all hard-coded strings using a two-way encoder/decoder function, such as a [Caesarian Shift](http://rumkin.com/tools/cipher/caesar.php). Change all string constants and hard-encode the encoded value into your Java source file. Decode before using.
- If you only need to test equality, use a hash such as SHA1, and compare the hashed values.
- Don’t do: public static final String SOME_STRING = SHA1.encode(“Unhashed Value”);
- Do: public static final String SOME_STRING = “5dad4014ec894587f83626ee31a8dd418d1371f1”;
- It’s better if you use a combination of techniques, since the pirates can easily search for the known hashes to figure out which bit of code is which.
- Remove ILicensingService from your ProGuard config with this one change:
 
Change:

```
boolean bindResult = mContext.bindService(
new Intent(ILicensingService.class.getName())
```

To:

```
boolean bindResult = mContext.bindService(
new Intent(“com.android.vending.licensing.ILicensingService”)
```

That string can also be encoded in the source and decoded using the techniques described above, to make it a bit less obvious.

- Move your functions around, inline some stuff, change switch statements to if statements, move statements around, and reverse the roles of some methods.
- Increase your Proguard obfuscation:

``` 
-repackageclasses
-allowaccessmodification
```

Of course, none of this will help if the pirate finds where the license check code is being called in your app. He can cut out this weakest link, and not worry about the rest. All of these measures will only slow down the pirates, but they won’t stop them.

## Is it worth it?
You have to acknowledge that your app will get pirated. Even the biggest companies cannot prevent their stuff from getting pirated. Here are a couple practical ways to at least mitigate the damage:

- Place some logic on the server. Whether it be leader boards or other features, tying some logic into the server cuts pirate users out of some of the loop.
- Add additional features in the form of server downloads. Without a valid key, the user can’t download these additional features.

Why is it that some people don’t think twice about spending $40 on a movie night, but are too cheap to pay $2 for an app? Do they hate developers that much? While these people should be ashamed of themselves, perhaps other people live in an area where paid downloads are not an option, or they might not actually have the means to buy a lot of apps.

These users can be used as a source of good will, to help spread awareness of your app. Obviously, as a developer you need to eat, but not everyone’s going to go to some shady website to download code they can’t necessarily trust. There is a lot to be said for the convenience of regular updates and downloads from a trusted site.

## What Google should have really done
If all the logic is in the client, then cracking an app is not a question of if, but when. The question is, how difficult can we make it for the pirates?

I think the current implementation of “copy protection” on Android is a complete joke and lulling many developers into a false sense of security. Your app is cracked in seconds, uploaded onto forums and download sites in minutes, and may even be re-uploaded to the market under a different name. Even worse, the verification process penalizes legitimate users when the market screws up the license check, and this happens more often than you think.

One thing Google could have done to make things a lot harder for the pirates is use a bytecode tool to generate the license library on the fly, using random permutations and injecting it everywhere into the bytecode, instead of asking the developer to use a very easily hacked method of adding some classes to their project. These checks could be generated in a slightly different form for each new release, making it much harder to replay a crack against your next release.

With an open platform, we have to accept the fact that a crack will happen. You’d need to have an AI built into the OS smart enough to determine that a modified cracked copy side-loaded onto the device is derived from a market release, and even then, that wouldn’t help you on a rooted device.

**What are your thoughts on the Android License Verification Library and the current direction of the Android Market? If you haven’t yet seen it, I recommend looking at “[Evading Pirates and Stopping Vampires using License Verification Library, In-App Billing, and App Engine!](http://www.google.com/events/io/2011/sessions/evading-pirates-and-stopping-vampires-using-license-verification-library-in-app-billing-and-app-engine.html)”**