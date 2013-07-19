

The next step in fully integrating the Avalara Tax module, with desired implementation (REST in this case), you will need to declare the bean in your Site application context.

```xml
<bean id="blAvalaraTaxGateway"
      class="com.broadleafcommerce.vendor.avalara.tax.gateway.rest.AvalaraTaxRestGatewayImpl"/>
```

Now that you have the Tax module included with your project, you will need to pass your credentials to the module in order to make tax calls. You can do this two ways, fill out the SQL tables manualy (Recommeneded for development) or use the admin to manage your configuration.

From the Admin you will want Go to the Configuration Managment tab under the BLC Module Configuration Section 
 
![](http://cl.ly/image/1H052O2P473c)

Assuming you do not already have a module configuration, you will want to add a new configuration otherwise, you can click on the module name and make edits as you want. After you click to add a new configuration you will be presented with a screen similar to this:

![](http://cl.ly/image/3e400B1y1C3T)


In this case the Configuration Type will be <b>Tax Calculation Module</b>. (Do note that Avalara can also be used as an Address Verification Module)

Since this is initial setup, you will want to set the <b>Is Default</b> and <b>Is Active</b> Flags to true.

 * These are set in place in the event that the use has multiple modules of the same type available. For example : If multiple Tax Calculation Modules are active, the frame work will search for the default configuration and use that for calculations. If the default can not be used, it will move on to the next available configuration.
 
<b>Module name</b> is left to the use to define, this will be the name displayed in the list of configurations that you may have.

<b>Account Number</b> Will be the Account number given to you from your Avalara Admin Console (For a developer account this will be your Login)

<b>License Key</b> Will be the License Key given to you by Avalara. This is resettable with in the Avalara admin consol. (For a developer account this will be your password)

<b>URL</b> Will be a partial url defined by Avalara used to make tax calls. The module uses this url with appended identifiers based on what type of tax call you will be making. (Development : https://development.avalara.net/1.0/tax/) (Production : https://rest.avalara.net/1.0/tax/)

This completes a basic integration of the Avalara Tax Module, and should be ready to start making tax calls for your storefront. To customize your integration with Avalara further, see [Avalara REST advanced Configuration]
 
 
 