> Note: Broadleaf Commerce currently offers integration with Braintree through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

Broadleaf allows you to customize many aspects of your Braintree integration.

**You must have completed the [[Braintree Environment Setup]] before continuing**

## Configuring Braintree Payments

You will need to declare the following Spring beans in your application context:

```xml
    <!-- Override the default Broadleaf Credit Card Service with Braintree -->
    <bean id="blCreditCardService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
        <property name="paymentModule" ref="blBraintreeModule"/>
    </bean>

    <bean id="blBraintreeModule" class="com.broadleafcommerce.payment.service.module.BraintreePaymentModule">
        <property name="braintreePaymentService" ref="blBraintreeVendorOrientedPaymentService"/>
        <property name="stateService" ref="blStateService"/>
        <property name="countryService" ref="blCountryService"/>
    </bean>

    <bean id="blBraintreeVendorOrientedPaymentService" class="com.broadleafcommerce.vendor.braintree.service.payment.BraintreePaymentServiceImpl">
        <property name="failureReportingThreshold" value="1"/>
        <property name="gatewayRequest">
            <bean class="com.broadleafcommerce.vendor.braintree.service.payment.BraintreeGatewayRequestImpl">
                <property name="publicKey" value="${braintree.publicKey}"/>
                <property name="privateKey" value="${braintree.privateKey}"/>
                <property name="merchantId" value="${braintree.merchantId}"/>
                <property name="redirectUrl" value="${braintree.redirectUrl}"/>
                <property name="environment" value="${braintree.environment}"/>
            </bean>
        </property>
    </bean>
```
> Note: The [[Braintree Quick Start]] solution offers a default application context with these beans already defined and can be used as a reference. Please see `bl-braintree-applicationContext.xml`

* `failureReportingThreshold` - used by [[QoS | QoS Configuration]] to determine how many times the service should fail before it is considered to be "down".
* `publicKey` - the Braintree public key
* `privateKey` - the Braintree private key
* `merchantId` - the Braintree merchant ID
* `redirectUrl` - the destination in your app that Braintree redirect backs to
* `environment` - this is already pre-configured per environment

See [[Braintree Environment Setup]] to learn how to configure the variable properties.

## Customizing the BraintreeCheckoutService

Broadleaf provides the `BraintreeCheckoutService`, an abstraction layer on top of the payment workflow that aids in creating
the objects necessary for completing a successful checkout. The `blBraintreeCheckoutService` can be overridden using a custom implementation.
This API is called from the `BroadleafBraintreeController` used in the [[Braintree Quick Start]] solution.

## Manually Configuring the Presentation Layer

It is up to you to choose the presentation layer approach that best fits your needs, but regardless of the approach, 
you will be required at some point to compile the [[PaymentInfo | https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/java/org/broadleafcommerce/core/payment/domain/PaymentInfo.java]] information 
to the order before calling performCheckout on the CheckoutService. 
Most Broadleaf Commerce users will choose Spring MVC and will likely implement their own CheckoutController. 
If your implementation does not require that much customization, consider extending the `BroadleafBraintreeController`.
This class is also a useful reference in setting up a custom payment workflow with Braintree.

The final step is to create the dynamic HTML form that will make a transparent redirect to Braintree.
Here's a list of all the [[HTML fields | https://www.braintreepayments.com/docs/java/transactions/tr_fields]] that can be sent to Braintree.

## Supporting VOID and REFUND

You will need to create a custom workflow that includes the `BraintreePaymentModule` to call the appropriate method.
The Braintree module supports the following transaction types: 

* BraintreePaymentModule.authorize() = Not Supported
* BraintreePaymentModule.reverseAuthorize() = BraintreeMethodType.VOID
* BraintreePaymentModule.debit() = BraintreeMethodType.SUBMIT
* BraintreePaymentModule.authorizeAndDebit() = BraintreeMethodType.CONFIRM & BraintreeMethodType.SUBMIT
* BraintreePaymentModule.credit() = BraintreeMethodType.REFUND
* BraintreePaymentModule.voidPayment() = BraintreeMethodType.VOID
