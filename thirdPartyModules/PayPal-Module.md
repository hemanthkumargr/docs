Broadleaf Commerce currently offers integration with the PayPal Express API. See [[Getting Started With Express Checkout | https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECGettingStarted]] for more information. This module allows users to add the following button to their existing eCommerce checkout workflow:

![Checkout with PayPal](https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif)
 
Upon clicking the PayPal button, the customer would be re-directed to PayPal's site to authenticate his or her identity. Once the customer has entered his or her shipping address (or uses a saved address) and reviews the transaction, PayPal would re-direct the customer back to your Broadleaf Commerce site with an authorization token to complete checkout. The customer would then review and confirm the order and Broadleaf would internally handle the processing of the order and the settlement with PayPal. Note: In many cases, this button would appear on the shopping cart page. PayPal requires you to conform to certain UI requirements in order to integrate with them. Please see [[Express Checkout User Interface Requirements | https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECUIRequirements]] for more information.
Now that you know the workflow of adding PayPal to your site, let's set up the configurations for the PayPal Module.

**You must have completed the [[PayPal Environment Setup]] before continuing**

## Configuring PayPal Payments

You will need to declare the following Spring beans in your application context:

```xml
<bean id="blPayPalPaymentService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
    <property name="paymentModule" ref="blPayPalModule"/>
</bean>

<bean id="blPayPalModule" class="org.broadleafcommerce.payment.service.module.PayPalPaymentModule">
    <property name="payPalPaymentService" ref="blPayPalVendorOrientedPaymentService"/>
</bean>

<bean id="blPayPalVendorOrientedPaymentService" class="org.broadleafcommerce.vendor.paypal.service.payment.PayPalPaymentServiceImpl">
    <property name="serverUrl" value="${paypal.api.url}"/>
    <property name="failureReportingThreshold" value="1"/>
    <property name="requestGenerator">
        <bean class="org.broadleafcommerce.vendor.paypal.service.payment.PayPalRequestGeneratorImpl">
            <property name="libVersion" value="${paypal.version}"/>
            <property name="password" value="${paypal.password}"/>
            <property name="user" value="${paypal.user}"/>
            <property name="signature" value="${paypal.signature}"/>
            <property name="returnUrl" value="http://localhost:8080/broadleafdemo/checkout/paypalProcess.htm"/>
            <property name="cancelUrl" value="http://localhost:8080/broadleafdemo/basket/viewCart.htm"/>
            <property name="additionalConfig">
                <map>
                    <entry key="HDRIMG" value="http://localhost:8080/broadleafdemo/images/havalettaLogo.png"/>
                    <entry key="HDRBORDERCOLOR" value="333333"/>
                    <entry key="HDRBACKCOLOR" value="669933"/>
                    <entry key="PAYFLOWCOLOR" value="B58253"/>
                </map>
            </property>
        </bean>
    </property>
    <property name="responseGenerator">
        <bean class="org.broadleafcommerce.vendor.paypal.service.payment.PayPalResponseGeneratorImpl">
            <property name="userRedirectUrl" value="${paypal.user.redirect.url}"/>
        </bean>
    </property>
</bean>
```

* `serverUrl` - the PayPal API URL. This is pre-configured per environment in Broadleaf. See [[PayPal Environment Setup]]
* `failureReportingThreshold` - used by [[QoS | QoS Configuration]] to determine how many times the service should fail before it is considered to be "down".
* `libVersion` - the PayPal API lib version. This is pre-configured per environment in Broadleaf. See [[PayPal Environment Setup]]
* `password` - the PayPal API password. See [[PayPal Environment Setup]]
* `user` - the PayPal API username. See [[PayPal Environment Setup]]
* `signature` - the PayPal API signature. See [[PayPal Environment Setup]]
* `returnUrl` - the destination in your app you want the user to come to after he/she has completed their experience on PayPal's site.
* `cancelUrl` - the destination in your app if he/she cancels the payment on PayPal's site.
* `additionalConfig` - You have an opportunity to configure a logo image and some CSS values that affect the visual experience for the user on PayPal's site.
* `userRedirectUrl` - the PayPal API user redirect URL. This is pre-configured per environment in Broadleaf. See [[PayPal Environment Setup]]

## Setting up the Presentation Layer

It is up to you to choose the presentation layer approach that best fits your needs, but regardless of the approach, 
you will be required at some point to compile the [[PaymentInfo | https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/java/org/broadleafcommerce/core/payment/domain/PaymentInfo.java]] information 
to the order before calling performCheckout on the CheckoutService. 
Most Broadleaf Commerce users will choose Spring MVC and will likely implement their own CheckoutController. In this example, we
will show you how a Spring MVC Controller might be structured to handle calling the PayPal Module.

```java

    //this service is backed by the entire payment workflow configured in application context
    //it is the entry point for engaging the payment workflow
    @Resource(name="blCompositePaymentService")
    protected CompositePaymentService compositePaymentService;
    
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/paypal/checkout", method = {RequestMethod.GET})
    public String paypalCheckout(@ModelAttribute CheckoutForm checkoutForm,
                           BindingResult errors,
                           ModelMap model,
                           HttpServletRequest request,
                           HttpServletResponse response) throws IOException {
        Customer currentCustomer = customerState.getCustomer(request);                   
        final Order order = cartService.findCartForCustomer(currentCustomer);
        Map<PaymentInfo, Referenced> payments = new HashMap<PaymentInfo, Referenced>();

        PaymentInfoImpl paymentInfo = new PaymentInfoImpl();
        paymentInfo.setOrder(order);
        paymentInfo.setType(PaymentInfoType.PAYPAL);
        paymentInfo.setReferenceNumber(String.valueOf(order.getId()));
        paymentInfo.setAmount(order.getTotal());
        paymentInfo.getAdditionalFields().put(MessageConstants.SUBTOTAL, order.getSubTotal().toString());
        paymentInfo.getAdditionalFields().put(MessageConstants.TOTALSHIPPING, order.getTotalShipping().toString());
        paymentInfo.getAdditionalFields().put(MessageConstants.TOTALTAX, order.getTotalTax().toString());
        for (OrderItem orderItem : order.getOrderItems()) {
            AmountItem amountItem = new AmountItemImpl();
            if (DiscreteOrderItem.class.isAssignableFrom(orderItem.getClass())) {
                amountItem.setDescription(((DiscreteOrderItem)orderItem).getSku().getDescription());
                amountItem.setSystemId(String.valueOf(((DiscreteOrderItem) orderItem).getSku().getId()));
            } else if (BundleOrderItem.class.isAssignableFrom(orderItem.getClass()) {
                amountItem.setDescription(((BundleOrderItem)orderItem).getSku().getDescription());
                amountItem.setSystemId(String.valueOf(((BundleOrderItem) orderItem).getSku().getId()));
            }
            amountItem.setShortDescription(orderItem.getName());
            amountItem.setPaymentInfo(paymentInfo);
            amountItem.setQuantity((long) orderItem.getQuantity());
            amountItem.setUnitPrice(orderItem.getPrice().getAmount());
            paymentInfo.getAmountItems().add(amountItem);
        }
        payments.put(paymentInfo, paymentInfo.createEmptyReferenced());
        List<PaymentInfo> paymentInfos = new ArrayList<PaymentInfo>();
        paymentInfos.add(paymentInfo);
        order.setPaymentInfos(paymentInfos);

        try {
            CompositePaymentResponse compositePaymentResponse = compositePaymentService.executePayment(order, payments);
            PaymentResponseItem responseItem = compositePaymentResponse.getPaymentResponse().getResponseItems().get(paymentInfo);
            if (responseItem.getTransactionSuccess()) {
                return "redirect:" + responseItem.getAdditionalFields().get(MessageConstants.REDIRECTURL);
            }
        } catch (PaymentException e) {
            LOG.error("Cannot perform checkout", e);
        }

        return null;
    }
```
