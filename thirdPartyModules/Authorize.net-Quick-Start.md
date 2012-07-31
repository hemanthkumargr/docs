Broadleaf Commerces offers an out-of-the-box Authorize.net solution that requires little configuration and is easily set up. For a more customized solution, please see [[Authorize.net Advance Configuration]].

**You must have completed the [[Authorize.net Environment Setup]] before continuing**

First, you will need to add the quick-start Authorize.net application context `bl-authorizenet-applicationContext.xml` to your web.xml.
Your `patchConfigLocations` should look something like this:

```xml
	<context-param>
		<param-name>patchConfigLocation</param-name>
		<param-value>
		    classpath:/bl-open-admin-contentClient-applicationContext.xml
		    classpath:/bl-cms-contentClient-applicationContext.xml
		    classpath:/applicationContext.xml
            	    classpath:/bl-authorizenet-applicationContext.xml
            	    classpath:/mycompany-applicationContext.xml
		    /WEB-INF/applicationContext-datasource.xml
  		    /WEB-INF/applicationContext-email.xml
		    /WEB-INF/applicationContext-security.xml
                    /WEB-INF/applicationContext.xml          
                </param-value>
	</context-param>
```
