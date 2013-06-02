> Note: Broadleaf Commerce currently offers integration with Sagepay through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

Broadleaf allows you to customize many aspects of your Sagepay integration.

**You must have completed the [[Sagepay Environment Setup]] before continuing**

## Configuring Sagepay Payments

You will need to declare the following Spring beans in your application context:

```xml
     <!-- Override the default Broadleaf Credit Card Service with Sagepay -->
    <bean id="blCreditCardService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
        <property name="paymentModule" ref="blSagepayFormModule"/>
    </bean>

    <bean id="blSagepayFormModule" class="com.broadleafcommerce.payment.service.module.SagepayFormPaymentModule">
        <property name="sagepayFormPaymentService" ref="blSagepayFormVendorOrientedPaymentService"/>
        <property name="stateService" ref="blStateService"/>
        <property name="countryService" ref="blCountryService"/>
        <property name="customerService" ref="blCustomerService"/>
    </bean>

    <bean id="blSagepayFormGatewayRequest" class="com.broadleafcommerce.vendor.sagepay.service.payment.SagepayFormGatewayRequestImpl">
        <property name="vendor" value="${sagepay.vendor}"/>
        <property name="encryptionPassword" value="${sagepay.encryptionPassword}"/>
        <property name="currency" value="${sagepay.currency}"/>
        <property name="successUrl" value="${sagepay.successUrl}"/>
        <property name="failureUrl" value="${sagepay.failureUrl}"/>
        <property name="purchaseUrl" value="${sagepay.purchaseUrl}"/>
    </bean>

    <bean id="blSagepayFormVendorOrientedPaymentService" class="com.broadleafcommerce.vendor.sagepay.service.payment.SagepayFormPaymentServiceImpl">
        <property name="gatewayRequest" ref="blSagepayFormGatewayRequest"/>
    </bean>

```
> Note: The [[Sagepay Quick Start]] solution offers a default application context with these beans already defined and can be used as a reference. Please see `bl-sagepay-applicationContext.xml`

* `vendor` - the Sagepay vendor Id
* `encryptionPassword` - the Sagepay encryption password provided by Sagepay
* `currency` - the currency code
* `successUrl` - the destination in your app that Sagepay redirect backs to if a successful transaction
* `failureUrl` - the destination in your app that Sagepay redirect backs to if a unsuccessful transaction
* `purchaseUrl` - the action for your form to be submitted to Sagepay

See [[Sagepay Environment Setup]] to learn how to configure the variable properties.

## Customizing the SagepayCheckoutService

Broadleaf provides the `SagepayFormCheckoutService`, an abstraction layer on top of the payment workflow that aids in creating
the objects necessary for completing a successful checkout. The `blSagepayCheckoutService` can be overridden using a custom implementation.
This API is called from the `BroadleafSagepayFormController` used in the [[Sagepay Quick Start]] solution.

## Manually Configuring the Presentation Layer

It is up to you to choose the presentation layer approach that best fits your needs, but regardless of the approach, 
you will be required at some point to compile the [[PaymentInfo | https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/java/org/broadleafcommerce/core/payment/domain/PaymentInfo.java]] information 
to the order before calling performCheckout on the CheckoutService. 
Most Broadleaf Commerce users will choose Spring MVC and will likely implement their own CheckoutController. 
If your implementation does not require that much customization, consider extending the `BroadleafSagepayFormController`.
This class is also a useful reference in setting up a custom payment workflow with Sagepay.
