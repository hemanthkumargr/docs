> Note: Broadleaf Commerce currently offers integration with CyberSource using the Silent Order Post method through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

Broadleaf Commerces offers an out-of-the-box CyberSource solution that requires little configuration and is easily set up. 
The quick start solution implements the [[Silent Order Post | http://www.cybersource.com/developers/develop/integration_methods/silent_order_post/]] model offered by CyberSource API.
This implementation should be useful for those with a simple checkout flow and those who are wanting to perform an authorize and debit in a single transaction. For a more customized solution, please see [[CyberSource SOP Advance Configuration]].

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

##2) Make your CheckoutController extend BroadleafCybersourceSilentPostController

Next, you will need to create a basic controller that extends `BroadleafCybersourceSilentPostController` to provide default `@RequestMappings` for your application.
Here is an example controller with the minimum amount of code needed to get CyberSource SOP integrated. 
This quick start solution only offers support for an Authorize and Debit transaction. See [[CyberSource SOP Advance Configuration]] for further customization.

```java
@Controller
public class CheckoutController extends BroadleafCybersourceSilentPostController {

    @RequestMapping(value = "/checkout")
    public String checkout(HttpServletRequest request, HttpServletResponse response, Model model) {
        return super.checkout(request, response, model);
    }

    @RequestMapping(value = "/success", method = RequestMethod.POST)
    // This URL must match the Receipt Response URL defined in the CyberSource Business Center
    public String processCybersourceSilentPostAuthorizeAndDebitSuccess(Model model,
            HttpServletRequest request, HttpServletResponse response) throws CheckoutException, PricingException {
        return super.processCybersourceSilentPostAuthorizeAndDebitSuccess(model, request, response);
    }

    @RequestMapping(value = "/decline", method = RequestMethod.POST)
    // This URL must match the Delcine Response URL defined in the CyberSource Business Center
    public String processCybersourceSilentPostAuthorizeAndDebitDecline(Model model,
            HttpServletRequest request, HttpServletResponse response) throws CheckoutException, PricingException {
        return super.processCybersourceSilentPostAuthorizeAndDebitDecline(model, request, response);
    }

}
```

##3) Construct the HTML for the dynamic CyberSource SOP form

Finally, you will need to contruct the form that you will send via Silent Order POST. The checkout() method defined above will add the necessary attributes on the Spring Model object.  
Your page may look something like this:

> Note: it is important that all the hidden fields listed in the form below be included.

```html
<form th:action="${cybersourceServerUrl}" method="post" id="billing_info">

    <input type="hidden" name="amount" th:value="${amount}" />
    <input type="hidden" name="orderPage_transactionType" th:value="${orderPage_transactionType}" />
    <input type="hidden" name="currency" th:value="${currency}" />
    <input type="hidden" name="orderPage_timestamp" th:value="${orderPage_timestamp}" />
    <input type="hidden" name="merchantID" th:value="${merchantID}" />
    <input type="hidden" name="orderPage_signaturePublic" th:value="${orderPage_signaturePublic}" />
    <input type="hidden" name="orderPage_version" th:value="${orderPage_version}" />
    <input type="hidden" name="orderPage_serialNumber" th:value="${orderPage_serialNumber}" />

    <div class="left_content">

        <input type="hidden" name="billTo_country" value="US" />

        <div class="form30">
            <label for="firstName">First Name</label>
            <input type="text" name="billTo_firstName" class="field30 required clearable" th:disabled="${!validShipping}" />
        </div>

        <div class="form30 margin20">
            <label for="lastName">Last Name</label>
            <input type="text" name="billTo_lastName" class="field30 required clearable" th:disabled="${!validShipping}" />
        </div>

        <div class="form30 margin20">
            <label for="phone">Phone</label>
            <input type="text" name="billTo_phoneNumber" class="field30 clearable" th:disabled="${!validShipping}"/>
        </div>

        <div class="clearfix"></div>

        <div class="form50">
            <label for="address1">Address</label>
            <input type="text" name="billTo_street1" class="field50 required clearable" th:disabled="${!validShipping}" />
        </div>

        <div class="form50 margin20">
            <label for="address2">Address 2</label>
            <input type="text" name="billTo_street2" class="field50 clearable" th:disabled="${!validShipping}" />
        </div>

        <div class="clearfix"></div>

        <div class="form30">
            <label for="city">City / State</label>

            <input type="text" name="billTo_city" class="field25 required clearable" th:disabled="${!validShipping}" />

            <select id="state" name="billTo_state" size="1" style="width: 48px;" class="required clearable" th:disabled="${!validShipping}">
                <option value="">--</option>
                <option th:each="state : ${states}" th:value="${state.abbreviation}" th:text="${state.abbreviation}"></option>
            </select>
        </div>

        <div class="form25 margin20">
            <label for="postal_code">Postal Code</label>
            <input type="text" name="billTo_postalCode" class="field25 clearable" th:disabled="${!validShipping}" />
        </div>

        <div class="form35 margin20">
            <label for="email">Email</label>
            <input type="text" name="billTo_email" class="field35 required clearable" th:disabled="${!validShipping}" />
        </div>
    </div>

    <div class="right_content payment_info">
        <h3>Payment Information</h3>

        <ul id="payment_methods">
            <li><img th:src="@{/img/payment/american-express-curved-32px.png}"/></li>
            <li><img th:src="@{/img/payment/mastercard-curved-32px.png}"/></li>
            <li><img th:src="@{/img/payment/visa-curved-32px.png}"/></li>
            <li><img th:src="@{/img/payment/paypal-curved-32px.png}"/></li>
        </ul>

        <dl id="paymentOptions">
            <dt>
                <input type="radio" name="paymentMethod" value="credit_card" id="paymentMethod_cc" />
                <label for="paymentMethod_cc">Credit Card</label>
            </dt>
            <dd>
                <div id="creditCardFields">


                    <div class="form25" style="width: 94%;">
                        <div style="float: left; width: 70%;">
                            <label for="cardNumber" class="prompt">Card Number</label>
                            <div class="element">
                                <input type="text" name="card_accountNumber" value="" id="cardNumber" class="field30" autocomplete="off" style="width: 100%" th:disabled="${!validShipping}" />
                            </div>
                        </div>
                        <div style="float: right; padding-right: 2%; width: 16%">
                            <label class="prompt">CVV</label>
                            <div class="element">
                                <input type="text"  name="card_cvNumber" id="securityCode" class="field30" autocomplete="off" style="width: 100%"  th:disabled="${!validShipping}"/>
                            </div>
                        </div>
                    </div>

                    <div class="form25">
                        <label class="prompt"> Card Type </label>
                        <div class="element">
                            <select name="card_cardType" class=" " th:disabled="${!validShipping}">
                                <option th:each="card : ${cybersourceCardTypes}" th:value="${card.value}" th:text="${card.key}"></option>
                            </select>
                        </div>
                    </div>

                    <div class="form50">
                        <label for="expirationMonth" class="prompt"> Expiration Date </label>

                        <div class="element">
                            <select name="card_expirationMonth" id="expirationMonth" class=" " th:disabled="${!validShipping}">
                                <option th:each="month,itr : ${expirationMonths}" th:value="${itr.count}" th:text="${month}"></option>
                            </select>
                            <select name="card_expirationYear" id="expirationYear" class=" " th:disabled="${!validShipping}">
                                <option th:each="year,itr : ${expirationYears}" th:value="${year}" th:text="${year}"></option>
                            </select>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div>
                    <input type="submit" class="medium" value="Complete Order" th:disabled="${!validShipping}" th:classappend="${validShipping}? 'red' : 'gray'"/>
                </div>

            </dd>
        </dl>

    </div>
</form>
```

## Done!
At this point, all the configuration should be complete and you are now ready to test your integration with CyberSource. Add something to your cart and proceed with checkout.
To customize your integration with CyberSource even further, see [[CyberSource SOP Advance Configuration]] 