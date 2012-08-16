###
When debugging the Admin, it is sometimes desireble to see the gwt logging output on the server logs.  By default, the Admin/GWT logs only show up when Admin is started with hosted mode. 

To enable server loggging, the gwt module .gwt.xml file must be modified so that remote logging is turned on.
For example , add the following lines to your mycompanyAdmin.gwt.xml file: 

```text 
    <inherits name="com.google.gwt.logging.Logging"/>
    <set-property name="gwt.logging.enabled" value="TRUE"/>
    <set-property name="gwt.logging.simpleRemoteHandler" value="ENABLED" />
```

Notice that gwt.logging.simpleRemoteHandler is set to enabled.   



Now in your Admin code, you can log using the java.util.logging package like so:  

```java
try {
java.util.logging.Logger.getLogger("myClassName").log(Level.INFO,"Starting calculation");
 …    
} catch (exception ex) {  
 	    java.util.logging.Logger.getLogger("myClassName").log(Level.SEVERE,"Error during Calculation",ex);
         }
        });
}
```

You will see that the above changes will produce output in your server logs. 
Thats it!


Now, if you want to see your changes in your browser's firebug console in case you dont have access to the server logs, then you can enable the logging so that gwt prints it to the firebug console. 

```java
    <inherits name="com.google.gwt.logging.Logging"/>
    <set-property name="gwt.logging.enabled" value="TRUE"/>
    <set-property name="gwt.logging.firebugHandler" value="ENABLED" />
```
