Broadleaf Commerce currently offers integration with the PayPal Express API. See [[Getting Started With Express Checkout | https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECGettingStarted]] for more information. This allows users to add the following button to their existing eCommerce checkout workflow:

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

Pay attention to the returnUrl value and cancelUrl value in the `blPayPalVendorOrientedPaymentService` bean declaration. The `returnUrl` is the destination in your app you want the user to come to after he/she has completed their experience on the PayPal side. The `cancelUrl` is where you want the user to go if he/she cancels the payment on the PayPal side. Also review the `additionalConfig` property here. You have an opportunity to configure a logo image and some CSS values that affect the visual experience for the user on the PayPal side.