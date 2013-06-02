# Enable GWT Logging to Server

###
When debugging the Admin, it is sometimes desireble to see the gwt logging output on the server logs.  By default, the Admin/GWT logs only show up when Admin is started with hosted mode. 

To enable server loggging, the gwt module .gwt.xml file must be modified so that remote logging is turned on.
For example , add the following lines to your mycompanyAdmin.gwt.xml file: 

```xml 
    <inherits name="com.google.gwt.logging.Logging"/>
    <set-property name="gwt.logging.enabled" value="TRUE"/>
    <set-property name="gwt.logging.simpleRemoteHandler" value="ENABLED" />
```

Notice that gwt.logging.simpleRemoteHandler is set to enabled.   



Now in your Admin code, you can log using the java.util.logging package like so in your client code:  

```java
try {
    java.util.logging.Logger.getLogger("myClassName").log(Level.INFO,"Starting calculation");
    …    
} catch (exception ex) {  
    java.util.logging.Logger.getLogger("myClassName").log(Level.SEVERE,"Error during Calculation",ex);
}
```

You will see that the above changes will produce output in your server logs, with the ipaddress of the connected client.

```text
[ INFO] 16:28:33 Log4JRemoteGwtLoggingServlet - 192.168.1.103%0:Starting calculation
[ERROR] 16:28:35 Log4JRemoteGwtLoggingServlet - 192.168.1.103%0:Error during Calculation 
 java.lang.Throwable: (TypeError): Cannot set property 'org_broadleafcommerce_openadmin_client_view_dynamic_dialog_AssetSearchDialog_initialValues' of null
 …
```
 

Thats it!


Now, if you want to see your changes in your browser's firebug console in case you dont have access to the server logs, then you can enable the logging so that gwt prints it to the firebug console. 

```xml
    <inherits name="com.google.gwt.logging.Logging"/>
    <set-property name="gwt.logging.enabled" value="TRUE"/>
    <set-property name="gwt.logging.firebugHandler" value="ENABLED" />
```
