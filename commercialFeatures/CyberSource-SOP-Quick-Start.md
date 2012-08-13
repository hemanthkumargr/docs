> Note: Broadleaf Commerce currently offers integration with CyberSource using the Silent Order Post method through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

Broadleaf Commerces offers an out-of-the-box CyberSource solution that requires little configuration and is easily set up. 
The quick start solution implements the [[Silent Order Post | http://www.cybersource.com/developers/develop/integration_methods/silent_order_post/]] model offered by CyberSource API.
This implementation should be useful for those with a simple checkout flow. For a more customized solution, please see [[CyberSource SOP Advance Configuration]].

**You must have completed the [[CyberSource Silent Post Environment Setup]] before continuing**

##1) Adding CyberSource SOP Support

First, you will need to add the quick-start CyberSource Silent Post application context `bl-cybersource-silentpost-applicationContext.xml` to your web.xml.
Your `patchConfigLocations` should look something like this:

```xml
	<context-param>
		<param-name>patchConfigLocation</param-name>
		<param-value>
          classpath:/bl-open-admin-contentClient-applicationContext.xml
          classpath:/bl-cms-contentClient-applicationContext.xml
          classpath:/bl-cybersource-silentpost-applicationContext.xml
          classpath:/applicationContext.xml
          /WEB-INF/applicationContext-datasource.xml
          /WEB-INF/applicationContext-email.xml
          /WEB-INF/applicationContext-security.xml
          /WEB-INF/applicationContext.xml
        </param-value>
	</context-param>
```
> IMPORTANT: The order in which the application contexts are specified matters to the merge process. Make sure the "bl-cybersource-silentpost-applicationContext.xml" is specified BEFORE your applicationContext.xml that defines your "blConfiguration" bean. If you have customized your Runtime Environment Properties or Checkout Workflow, make sure to add this file in the appropriate order so that Broadleaf will pick up the the correct bean.