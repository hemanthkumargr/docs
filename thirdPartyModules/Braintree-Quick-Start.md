Note: Broadleaf Commerce currently offers integration with Braintree through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

Broadleaf Commerces offers an out-of-the-box Braintree solution that requires little configuration and is easily set up. 
The quick start solution implements the [[Transparent Redirect | https://www.braintreepayments.com/tour/pci-compliance]] model offered by the Braintree API.
This implementation should be useful for those with a simple checkout flow. For a more customized solution, please see [[Braintree Advance Configuration]].

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

You will also need to add a component scan to your applicationContext-servlet.xml:
```xml
	<context:component-scan base-package="com.broadleafcommerce.vendor.braintree"/>
```


##2) Create a Braintree Controller

Next, you will need to create a basic controller that extends `BroadleafBraintreeController` to provide default `@RequestMappings` for your application.
Here is an example controller with the minimum amount of code needed to get Braintree integrated. 
This quick start solution only offers support for an Authorize and Debit transaction. See [[Braintree Advance Configuration]] for further customization.

```java
@Controller
public class BraintreeController extends BroadleafBraintreeController {

    @RequestMapping(value = "/braintree/checkout")
    public String checkout(HttpServletRequest request, HttpServletResponse response, Model model) {
        return super.checkout(request, response, model);
    }

    @Override
    @RequestMapping(value = "/braintree/process")
    public String processBraintreeAuthorizeAndDebit(Model model, @RequestParam String id, HttpServletRequest request, HttpServletResponse response) throws CheckoutException, PricingException {
        return super.processBraintreeAuthorizeAndDebit(model, id, request, response);
    }

}
```
> Note: BroadleafBraintreeController will add the attributes `trUrl` and `trData` to the model whenever you call `checkout()`


##3) Construct the HTML for the dynamic Braintree form

Finally, you will need to contruct the form that you will send via transparent redirect. 
Here's a list of all the [[HTML fields | https://www.braintreepayments.com/docs/java/transactions/tr_fields]] that can be sent to Braintree.
Your page may look something like this:

```html
<form th:action="${trUrl}" method="post">
    <input type="hidden" name="tr_data" th:value="${trData}" />
    <div class="left_content">
    	<h3>Billing Information</h3>

		<div class="form30">
			<label for="firstname">First Name</label> <input type="text" class="field30" name="transaction[billing][first_name]" />
		</div>
		<div class="form30">
			<label for="lastname">Last Name</label> <input type="text" class="field30" name="transaction[billing][last_name]" />
		</div>	
		<div class="form50">
			<label for="address1">Address</label> <input type="text" class="field50" name="transaction[billing][street_address]" />
		</div>
		<div class="form50 margin20">
			<label for="address2">Address 2</label> <input type="text" class="field50" name="transaction[billing][extended_address]" />
		</div>
		<div class="form30">
			<label for="city">City / State</label>
			<input type="text" class="field25" name="transaction[billing][locality]" /> 
			<select id="state" name="transaction[billing][region]" size="1" style="width: 48px;" class=" ">
				<option value="">--</option>
				<option value="AL">AL</option>
				<option value="AK">AK</option>
				<option value="AZ">AZ</option>
				<option value="AR">AR</option>
				<option value="CA">CA</option>
				<option value="CO">CO</option>
			</select>
		</div>
		<input type="hidden" value="US" name="transaction[billing][country_code_alpha2]"/>
		<div class="form30 margin20">
			<label for="postal_code">Postal Code</label> <input type="text" class="field30" name="transaction[billing][postal_code]" />
		</div>
	</div>
	<div class="right_content">
		<h3>Payment Information</h3>
		<div id="creditCardFields">

			<div class="form25" style="width: 94%;">
				<div style="float: left; width: 70%;">
					<label for="cardNumber" class="prompt">Card Number</label>
					<div class="element">
						<input type="text" name="transaction[credit_card][number]" value="" id="cardNumber" class="field30" autocomplete="off" style="width: 100%" />
					</div>
				</div>
				<div style="float: right; padding-right: 2%; width: 16%">
					<label class="prompt">CSC</label>
					<div class="element">
						<input type="text" name="transaction[credit_card][cvv]" id="securityCode" class="field30" autocomplete="off" style="width: 100%" />
					</div>
				</div>
			</div>

			<div class="form25">
				<label for="nameOnCard" class="prompt"> Name on the Card </label>
				<div class="form100">
					<input type="text" name="transaction[credit_card][cardholder_name]" value="" id="nameOnCard" class="field30" />
				</div>
			</div>

			<div class="form50">
				<label for="expirationMonth" class="prompt"> Expiration Date </label>
				<div class="element">
					<select name="transaction[credit_card][expiration_month]" id="expirationMonth" class=" ">
						<option value=""></option>
						<option value="01">01 - January</option>
						<option value="02">02 - February</option>
						<option value="03">03 - March</option>
						<option value="04">04 - April</option>
						<option value="05" selected="true">05 - May</option>
						<option value="06">06 - June</option>
						<option value="07">07 - July</option>
						<option value="08">08 - August</option>
						<option value="09">09 - September</option>
						<option value="10">10 - October</option>
						<option value="11">11 - November</option>
						<option value="12">12 - December</option>
					</select> <select name="transaction[credit_card][expiration_year]" id="expirationYear" class=" ">
						<option value=""></option>
						<option value="2012" selected="selected">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
						<option value="2015">2015</option>
						<option value="2016">2016</option>
						<option value="2017">2017</option>
						<option value="2018">2018</option>
						<option value="2019">2019</option>
						<option value="2020">2020</option>
						<option value="2021">2021</option>
					</select>
				</div>
			</div>
			<div class="form100">
				<input type="submit" value="submit"/>
			</div>
		</div>
	</div>	
</form>
```

## Done!
At this point, all the configuration should be complete and you are now ready to test your integration with Braintree. Add something to your cart and proceed with checkout.
To customize your integration with Braintree even further, see [[Braintree Advance Configuration]] 
