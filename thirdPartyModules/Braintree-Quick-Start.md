Broadleaf Commerces offers an out-of-the-box Braintree solution that requires little configuration and is easily set up. 
For a more customized solution, please see [[Braintree Advance Configuration]].

**You must have completed the [[Braintree Environment Setup]] before continuing**

##1) Adding Braintree Support

First, you will need to add the quick-start Braintree application context `bl-braintree-applicationContext.xml` to your web.xml.
Your `patchConfigLocations` should look something like this:

```xml
	<context-param>
		<param-name>patchConfigLocation</param-name>
		<param-value>
            classpath:/bl-open-admin-contentClient-applicationContext.xml
            classpath:/bl-cms-contentClient-applicationContext.xml
            classpath:/bl-braintree-applicationContext.xml
            classpath:/mycompany-applicationContext.xml
            /WEB-INF/applicationContext-security.xml
            /WEB-INF/applicationContext.xml
            /WEB-INF/applicationContext-search.xml
        </param-value>
	</context-param>
```

##2) Create a Braintree Controller

Next, you will need to create a basic controller that extends `BroadleafBraintreeController` to provide default `@RequestMappings` for your application.
Here is an example controller with the minimum amount of code needed to get Braintree integrated.

```java
@Controller
public class BraintreeController extends BroadleafBraintreeController {
    @Override
    @RequestMapping(value = "/braintree/checkout")
    public String constructAuthorizeAndDebitBraintreeForm(Model model, HttpServletRequest request) throws PaymentException {
        return super.constructAuthorizeAndDebitBraintreeForm(model, request);
    }

    @Override
    @RequestMapping(value = "/braintree/process")
    public String processBraintreeAuthorizeAndDebit(Model model, @RequestParam String id, HttpServletRequest request) throws CheckoutException, PricingException {
        return super.processBraintreeAuthorizeAndDebit(model, id, request);
    }

}
```


