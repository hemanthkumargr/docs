# JRebel Setup

[JRebel](http://zeroturnaround.com/software/jrebel/) is a Java Virtual Machine plugin that enables instant reloading of changes made to a Java class file as well as some property files and static files. We use it heavily in our develop of Broadleaf as it prevents the need for having to restart your server every time you make a change to a file.

> **The latest confirmed working version of JRebel and Broadleaf is 4.5.4**

> We've notoriously had problems with different versions of JRebel having problems with different aspects of Spring, GWT, and other frameworks in use in Broadleaf. Versions newer than the one mentioned above are known to have problems (specifically when loading the admin)

## Using JRebel

We have provided an Ant task in the starter project called `jetty-demo-jrebel`. This will start up your server with JRebel instrumentation. The only prerequisite is that you specify the proper path to your JRebel JAR file in `build.properties` like so:

```text
jrebel.path=/usr/lib/jrebel/jrebel.jar
```

Now, when you start up the project with the `jetty-demo-jrebel` target, you should see the following output in your console:

```text
[artifact:mvn] JRebel: Directory '/DemoSite/site/src/main/resources' will be monitored for changes.
[artifact:mvn] JRebel: Directory '/DemoSite/site/target/mycompany/WEB-INF/classes' will be monitored for changes.
[artifact:mvn] JRebel: Directory '/DemoSite/site/src/main/webapp' will be monitored for changes.
[artifact:mvn] JRebel: Directory '/DemoSite/core/src/main/resources' will be monitored for changes.
[artifact:mvn] JRebel: Directory '/DemoSite/core/target/classes' will be monitored for changes.
```

That means JRebel instrumentation is on and you can live-edit your project!
