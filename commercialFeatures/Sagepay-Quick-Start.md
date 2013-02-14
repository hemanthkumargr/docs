> Note: Broadleaf Commerce currently offers integration with Sagepay through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

Broadleaf Commerces offers an out-of-the-box Sagepay solution that requires little configuration and is easily set up. 

**You must have completed the [[Sagepay Environment Setup]] before continuing**

##1) Adding Sagepay Support

First, you will need to add the quick-start Sagepay application context `bl-sagepay-applicationContext.xml` to your web.xml.
Your `patchConfigLocations` should look something like this:

```xml
    <context-param>
        <param-name>patchConfigLocation</param-name>
        <param-value>
          classpath:/bl-open-admin-contentClient-applicationContext.xml
          classpath:/bl-cms-contentClient-applicationContext.xml
          classpath:/bl-sagepay-applicationContext.xml
          classpath:/applicationContext.xml
          /WEB-INF/applicationContext-datasource.xml
          /WEB-INF/applicationContext-email.xml
          /WEB-INF/applicationContext-security.xml
          /WEB-INF/applicationContext.xml
        </param-value>
    </context-param>
```
> IMPORTANT: The order in which the application contexts are specified matters to the merge process. Make sure the "bl-sagepay-applicationContext.xml" is specified BEFORE your applicationContext.xml that defines your "blConfiguration" bean. If you have customized your Runtime Environment Properties or Checkout Workflow, make sure to add this file in the appropriate order so that Broadleaf will pick up the the correct bean.

You will also need to add a component scan to your applicationContext-servlet.xml:
```xml
    <context:component-scan base-package="com.broadleafcommerce.vendor.sagepay"/>
```


##2) Make your CheckoutController extend BroadleafSagepayFormController

Next, you will need to have your checkout controller extend `BroadleafSagepayFormController` to provide default `@RequestMappings` for your application instead of BroadleafCheckoutController.
Here is an example controller with methods to get Sagepay integrated.
This quick start solution only offers support for an Authorize and Debit transaction. See [[Sagepay Advance Configuration]] for further customization.

```java
@Controller
public class CheckoutController extends BroadleafSagepayFormController {

    @RequestMapping(value = "/checkout")
    public String checkout(HttpServletRequest request, HttpServletResponse response, Model model) {
        return super.checkout(request, response, model);
    }

   @RequestMapping(value ="/saveBillingInfo", method = RequestMethod.POST) 
    public String redirectToSagepay(HttpServletRequest request, HttpServletResponse response, Model model,
            @ModelAttribute("billingInfoForm") BillingInfoForm billingForm,
            @ModelAttribute("shippingInfoForm") ShippingInfoForm shippingForm) throws PricingException {
        prepopulateCheckoutForms(CartState.getCart(), null, shippingForm, billingForm);
        return super.redirectToSagepay(request, response, model, billingForm);
    }
}
```

##3) Construct the HTML to call SagePay

Finally, you will need to have your Billing Form (Or another button) generate the Sagepay Redirect form.
  
Your page may look something like this:

```html
<blc:form th:object="${billingInfoForm}" th:action="@{/checkout/saveBillingInfo}" method="post" id="billing_info" th:if="${validOrderInfo and validShipping}">

    <div id="billing_info_form" class="right_content_billing">

        <input type="hidden" name="address.country" value="US" />

        <div class="form30">
            <label for="firstName"><span th:text="#{cart.firstName}">First Name</span></label>
            <span class="error" th:if="${#fields.hasErrors('address.firstName')}" th:errors="*{address.firstName}"></span>
            <input type="text" th:field="*{address.firstName}" class="field30 required clearable" th:classappend="${#fields.hasErrors('address.firstName')}? 'fieldError'" th:disabled="${!validShipping}" />
        </div>

        <div class="form30 margin20">
            <label for="lastName"><span th:text="#{cart.lastName}">Last Name</span></label>
            <span class="error" th:if="${#fields.hasErrors('address.lastName')}" th:errors="*{address.lastName}"></span>
            <input type="text" th:field="*{address.lastName}" class="field30 required clearable" th:classappend="${#fields.hasErrors('address.lastName')}? 'fieldError'" th:disabled="${!validShipping}" />
        </div>

        <div class="form30 margin20">
            <label for="phone"><span th:text="#{cart.phone}">Phone</span></label>
            <span class="error_spacer" th:if="${#fields.hasErrors('address.firstName') or #fields.hasErrors('address.lastName')}">error</span>
            <input type="tel" th:field="*{address.primaryPhone}" class="field30 clearable" th:disabled="${!validShipping}"/>
        </div>

        <div class="clearfix"></div>

        <div class="form50">
            <label for="address1"><span th:text="#{cart.address}">Address</span></label>
            <span class="error" th:if="${#fields.hasErrors('address.addressLine1')}" th:errors="*{address.addressLine1}"></span>
            <input type="text" th:field="*{address.addressLine1}" class="field50 required clearable" th:classappend="${#fields.hasErrors('address.addressLine1')}? 'fieldError'" th:disabled="${!validShipping}" />
        </div>

        <div class="form50 margin20">
            <label for="address2"><span th:text="#{cart.address2}">Address 2</span></label>
            <span class="error_spacer" th:if="${#fields.hasErrors('address.addressLine1')}">error</span>
            <input type="text" th:field="*{address.addressLine2}" class="field50 clearable" th:disabled="${!validShipping}" />
        </div>

        <div class="clearfix"></div>

        <div class="form30">
            <label for="city"><span th:text="#{cart.cityState}">City / State</span></label>
            <span class="error" th:if="${#fields.hasErrors('address.city')}" th:errors="*{address.city}"></span>
            <br th:if="${#fields.hasErrors('address.city')} and ${#fields.hasErrors('address.state')}"/>
            <span class="error" th:if="${#fields.hasErrors('address.state')}" th:errors="*{address.state}"></span>
            <input type="text" th:field="*{address.city}" class="field25 required clearable" th:classappend="${#fields.hasErrors('address.city')}? 'fieldError'" th:disabled="${!validShipping}" />

            <select id="state" th:field="*{address.state}" size="1" style="width: 48px;" class="required clearable" th:classappend="${#fields.hasErrors('address.state')}? 'fieldError'" th:disabled="${!validShipping}">
                <option value="">--</option>
                <option th:each="state : ${states}" th:value="${state.abbreviation}" th:text="${state.abbreviation}"></option>
            </select>
        </div>

        <div class="form25 margin20">
            <label for="postal_code"><span th:text="#{cart.postalCode}">Postal Code</span></label>
            <span class="error" th:if="${#fields.hasErrors('address.postalCode')}" th:errors="*{address.postalCode}"></span>
            <input type="text" th:field="*{address.postalCode}" class="field25 clearable" th:classappend="${#fields.hasErrors('address.postalCode')}? 'fieldError'" th:disabled="${!validShipping}" />
        </div>

        <div style="float:right;">
            <input type="submit" class="medium" th:value="#{cart.completOrder}" th:disabled="${!validShipping}" th:classappend="${validShipping}? 'red' : 'gray'"/>
        </div>

    </div>
</blc:form>

```

## Done!
At this point, all the configuration should be complete and you are now ready to test your integration with Sagepay. Add something to your cart and proceed with checkout.
To customize your integration with Sagepay even further, see [[Sagepay Advance Configuration]] 