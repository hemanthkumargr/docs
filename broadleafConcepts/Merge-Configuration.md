**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

Merge configuration is handled through your web.xml file. The merge facility in Broadleaf primarily operates by intelligently mixing one or more Spring application context files. The final merged version of the application context is then passed to Spring for processing. 

For BroadleafCommerce to know what files to merge with its internal application context information, you must specify a list in your `web.xml` file for your web module (WAR). Let's take a look at an example.

First, we provide a context param entitled `patchConfigLocation` which denotes a list of your applicationContext files. Add as many as you like - they will all be merged into the Broadleaf configuration. 

```xml
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
        /WEB-INF/applicationContext-custom.xml
        /WEB-INF/applicationContext-email.xml
        /WEB-INF/applicationContext-search.xml
        /WEB-INF/applicationContext-security.xml
    </param-value>
</context-param>
```

Once that's done, you will need to specify the class `org.broadleafcommerce.common.web.extensibility.MergeContextLoaderListener` as a listener for your web app. This class is responsible for initiating the merge between the internal Broadleaf application context information and your application context files.

```xml
<listener>
    <listener-class>org.broadleafcommerce.common.web.extensibility.MergeContextLoaderListener</listener-class>
</listener>
```
