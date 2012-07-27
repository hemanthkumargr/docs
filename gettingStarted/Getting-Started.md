## <a name="wiki-overview"></a> Overview

Thanks for wanting to try out Broadleaf Commerce! By following this tutorial, you'll have your very own eCommerce site up and running in no time. We'll get your environment up and running, show you where things live, and walk you through a few examples of some of the cool things you can do with Broadleaf.

## <a name="wiki-prerequisites"></a> Prerequisites

- First, you'll need the Java 6 SDK, which you can find [on Oracle's official Java site](http://www.oracle.com/technetwork/java/javasebusiness/downloads/java-archive-downloads-javase6-419409.html#jdk-6u32-oth-JPR)

## <a name="wiki-eclipse"></a> IDE Setup

Once you have the Java SDK installed, we're ready to get your IDE up and running. Let's start by downloading Eclipse.

Download Link: [Eclipse IDE for Java EE Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/indigosr2)

Once Eclipse is done downloading, extract the archive and start it up. You'll be prompted for a workspace:

![Initial Prompt](images/workspace-initial-prompt.png)

Go ahead and accept the initial value.

> Note: Don't save this as the default workspace -- we're going to be setting up a new workspace shortly.

Click on **Help --> Eclipse Marketplace** and search for **Maven Integration**. Make sure you pick the plugin provided by Eclipse.org as highlighted below:

![Maven Integration Plugin](images/eclipse-install-maven.png)

Click **Install** followed by **Next**. After that, **Accept the License Terms** and **Finish**.

Once the plugin is done installing, you will be prompted to restart Eclipse. Go ahead and do so.

You'll once again be asked for a workspace. This time, we're going to pick a different one. To make getting started with Broadleaf as easy as possible, we've already set up a workspace with some reasonable defaults and tweaks to help you out. Let's download it! 

Download Link: [Broadleaf Eclipse Workspace](https://github.com/downloads/BroadleafCommerce/DemoSite/DemoSite-2.0.0-M1-1-eclipse-workspace.zip)

> Note: If you're not prompted for a workspace, simply go to **File --> Switch Workspace** and select the path

Extract this archive to the location you want your workspace to live in, and point Eclipse to the appropriate path. This time, your workspace should look like this:

![Eclipse Initial Workspace](images/eclipse-initial-workspace.png)

## <a name="wiki-configuring-names"></a> Configuring Project Name

> Note: Some have reported issues at this step.    You can safely skip the "Configuring Project Name" step in its entirety.    We are investigating.

The workspace project and maven artifact all refers to "com.mycompany". For your convenience, we've provided an Ant task that will perform all necessary rename and move operations to customize the project to your organization. Simply run the `change-identifier` Ant task and type in a suitable name. 

> **Note: The name should be two alphabetic strings separated by a dot. For example, "com.heatclinic"**

![Project Change Identifier](images/project-change-identifier.png)

You will be prompted to confirm your selection. It should identify the Maven Group as the string you typed in and the Company Name as the part after the dot.

![Project Change Identifier Confirm](images/project-change-identifier-confirm.png)

Once that task is run, **Right click inside Package Explorer --> Refresh**.

> Note: You will only be allowed to configure the project name via this script once.

![Project Refresh](images/project-refresh.png)

## <a name="wiki-starting-site"></a> Running Site

Now that we have our workspace properly configured, we're able to get our demo site up and running. First, we will have to let Maven fetch the necessary dependencies and install our own project locally. To do that, **Right click on blc-project --> Run As --> Maven Install**.

![Eclipse Maven Install](images/eclipse-maven-install.png)

> Note: Running a Maven install is only necessary initially. To shorten your development iteration times, you utilize JRebel, which will allow you to modify files without having to restart the server. We've detailed out [[how to setup JRebel | JRebel Setup]] for you.

This process will take a few minutes to execute, and will end on the following success message:

```text
[INFO] Reactor Summary:
[INFO] 
[INFO] ecommerce ......................................... SUCCESS [0.346s]
[INFO] core .............................................. SUCCESS [2.765s]
[INFO] admin ............................................. SUCCESS [15.536s]
[INFO] site .............................................. SUCCESS [11.230s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3:50.548s
[INFO] Finished at: Fri Jul 06 10:52:46 CDT 2012
[INFO] Final Memory: 27M/81M
```

At this point, we're ready to start up! Let's run the `jetty-demo` Ant task for the site.

![Jetty Demo](images/jetty-demo.png)

You'll see some logging messages in the Console scroll by, and eventually stop on

```text
[artifact:mvn] 2012-07-06 11:03:20.005:INFO::Started SelectChannelConnector@0.0.0.0:8080
[artifact:mvn] [INFO] Started Jetty Server
```

That's it! The server's up! Let's check it out: [http://localhost:8080/](http://localhost:8080/)

![Startup Site](images/startup-site.png)

## <a name="wiki-starting-admin"></a> Running Admin

Once the site has been started up, we can start up the admin as well 

> Note: The site startup will conveniently populate some database tables, including the admin users tables. Therefore, the site must be running before starting up the admin.

This time, we'll hit the `jetty-demo` Ant task for the admin.

![Jetty Demo Admin](images/jetty-demo-admin.png)

This console will end up on

```text
[artifact:mvn] 2012-07-06 11:07:11.218:INFO::Started SelectChannelConnector@0.0.0.0:8081
[artifact:mvn] [INFO] Started Jetty Server
```

And now we can hit the admin! [http://localhost:8081/admin](http://localhost:8081/admin)

![Startup Admin](images/startup-admin.png)

## <a name="wiki-next-steps"></a> Next Steps

So now that you have your own Broadleaf site set up, what's next? We recommend getting familiar with the framework and starting to make your own personalizations. Here are some cool things to try out:

<div class="half-column">
    <h3> Configuration 
        <span class="small">(What you need to do to get a real site running)</span>
    </h3>

    <ul>
        <li>
            Load Data
            <ul>
                <li>Learn how to use your own database server and set up a clean slate for your products.</li>
            </ul>
        </li>
        <li> 
            Customize the UI
            <ul>
                <li> Learn about the Broadleaf UI strategy and patterns</li>
                <li> Customize key pieces of the Heat Clinic template and discover the Broadleaf Content Management System</li>
            </ul>
        </li>
        <li> 
            Configure Checkout
            <ul>
                <li> Add a shipping partner</li>
                <li> Configure taxes</li>
                <li> Handle payments</li>
            </ul>
        </li>
        <li> 
            Migration Notes
            <ul>
                <li> Ensure your security is set up properly</li>
                <li> Configure emails</li>
            </ul>
        </li>
</div>

<div class="half-column">
    <h3>Customization 
        <span class="small">(Some fun things to try out to get your feet wet)</span>
    </h3>

    <ul>
        <li> 
            [[Storing additional customer properties | Adding Customer Attribute Tutorial]]
            <ul>
                <li> Modify the registration form to prompt for user for referral code</li>
                <li> Store the code in a CustomerAttribute</li>
            </ul>
        </li>
        <li> 
            [[Extend the Customer entity | Extending Customer For Heat Clinic Tutorial]]
            <ul>
                <li> Add a few properties to the Customer to keep track of Heat Clinic metrics</li>
            </ul>
        </li>
        <li> 
            [[Hook into the order submit workflow | Order Submit Workflow For Heat Clinic Tutorial]]
            <ul>
                <li> Keep track of how hot your customers like their sauces</li>
            </ul>
        </li>
        <li> 
            Hook into the add to cart workflow
            <ul>
                <li> Learn about workflows and the add to cart workflow and set up a custom activity</li>
            </ul>
        </li>
    </ul>
</div>

<div style="clear: both;">&nbsp;</div>
