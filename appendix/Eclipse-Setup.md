If you would prefer to not use our starter workspace (maybe you have some settings you already like in your Eclipse installation), that's ok! We can get you to the same spot that the starter project gets you with a little bit of work. We will show you how to get your workspace set up to utilize working sets, which will prevent duplicates in common windows.

## Prerequisites

The same prerequisites from the [[Getting Started]] section apply. You'll also need to ensure you have the correct version of the m2eclispe plugin as detailed in the first part of the Getting Started section.

## Getting the Source of Heat Clinic

First, you should decide if you want to fork the [Heat Clinic Demo Site](https://github.com/BroadleafCommerce/DemoSite) or if you want to wipe its history and start your own. If you choose to fork, you will see history of our check-ins on your `upstream` remote, and you'll be able to pull in changes that we make pretty easily. However, if your site will diverge from Heat Clinic drastically, you may be better off cloning the project, deleting the `.git` folder, and initializing a new repository.

## Eclipse Setup

Eclipse does not handle multi-module Maven projects very cleanly. It's extremely common to see duplicates of files in your Open Resource (cmd-shift-r ctrl-shift-r) or Open Type (cmd-shift-t / ctrl-shift-t) dialogs. Fortunately, there is a reasonably clean way to prevent this.

1. Either in Package Explorer or Project Explorer, you will want to click the triangle for options and set the **Top Level Elements** to **Working Sets**
> Note: I prefer package explorer because it lets me decide the order of my working sets -- project explorer will lock you into alphabetical order

2. Create two working sets. One of these will hold the parent Maven project while the other will hold the children modules. For example, you may wish to call one **Maven Parents** and one **My Broadleaf Site**.

3. Next, we need to import the Heat Clinic project. You can do this by going to **File --> Import**, and picking **Existing Maven Projects**.Click **Browse** and pick the `HeatClinic` folder as the project root, and click **Open**. Finally, click **Finish**.

4. You will now have all four projects (DemoSite, site, admin, core) in your `Other Projects` working set. Move `DemoSite` to the parent projects working set and the other three projects to the other working set you created.

5. Add the buildfiles we've provided to your Ant pane. There are three of them; one is located in the root folder, one is in site, and one is in admin. 

6. After that, we need to utilize the working sets in our specific contexts. In both the Open Resource and Open Type windows, you will want to click the triangle in the top-right, click **Select Working Set**, and specify ONLY the working set that contains the three children projects. You will also want to do the same thing in the global File Search dialog.
> You may also want to specify a type filter in your global File Search dialog to speed up searches. Here's the one I use:
```text
*.css, *.html, *.java, *.js, *.jsp, *.sql, *.tld, *.xml, *.properties
```

7. Lastly, you will want to expand the parent working set, **Right Click --> Properties** on the three following folders, and mark them as derived.
    - site/target
    - admin/target
    - core/target

## What Next?

At this point, your environment is set up very similar to the starter workspace, which is an excellent basis for working with Broadleaf. You should continue by following the [[Getting Started]] guide at the **Configuring Project Name** section. Feel free to get in touch with us on the [Broadleaf forums](http://forum.broadleafcommerce.org) if you need help!
