For the purpose of this exercise, we'll be extending the Customer Care module that is in charge of display Customers and Orders in the admin.  With this, you will be able to customize anything and everything about the display, or add a custom subtab to display other entities in the Customer Care module (besides just

The first step is to actually subclass the CustomerCareModule class with our own class, like so:

```java
package com.mycompany.admin;

public class MyCustomerCareModule extends CustomerCareModule {

    public void onModuleLoad() {
        super.onModuleLoad();
        //custom code to add more sections or change the presenter or view of the Customer or Order sections
    }
```

After this is subclass, create a new file in the admin project under `src/main/resources/com/mycompany/admin` called `customerCareModule.gwt.xml`.  The contents of this file should look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE module PUBLIC "-//Google Inc.//DTD Google Web Toolkit 2.0.1//EN"
"http://google-web-toolkit.googlecode.com/svn/tags/2.4.0/distro-source/core/src/gwt-module.dtd">
<module>
	<inherits name="com.google.gwt.user.User" />
	<inherits name="org.broadleafcommerce.admin.customerCareModule" />
	
	<entry-point class="com.mycompany.admin.MyCustomerCareModule" />
	<source path="client" />
</module>
```

> Note: the admin folder might not already be created. This folder should be added and should be on the same level as the `gwt` folder that holds the `myCompanyAdmin.gwt.xml` file.

Now open up `myCompanyAdmin.gwt.xml` and remove the line that references the Broadleaf Customer Care GWT module, and change it to reference your customer care GWT module:

```xml
<!-- Commented out in order to have custom override -->
<!-- <inherits name="org.broadleafcommerce.admin.customerCareModule" /> -->
<inherits name="com.mycompany.admin.customerCareModule />
```

After your admin project is recompiled it should load your customized module rather than just the core Broadleaf one.