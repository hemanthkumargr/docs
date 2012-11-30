> Note: Broadleaf Commerce currently offers integration with Sagepay through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

Broadleaf allows you to customize many aspects of your Sagepay integration.

**You must have completed the [[Sagepay Environment Setup]] before continuing**

## Configuring Sagepay Payments

You will need to declare the following Spring beans in your application context:

```xml
    <!-- Override the default Broadleaf Credit Card Service with Sagepay -->
    <bean id="blCreditCardService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
        <property name="paymentModule" ref="blSagepayModule"/>
    </bean>

    <bean id="blSagepayModule" class="com.broadleafcommerce.payment.service.module.SagepayPaymentModule">
        <property name="sagepayPaymentService" ref="blSagepayVendorOrientedPaymentService"/>
        <property name="stateService" ref="blStateService"/>
        <property name="countryService" ref="blCountryService"/>
    </bean>

    <bean id="blSagepayVendorOrientedPaymentService" class="com.broadleafcommerce.vendor.sagepay.service.payment.SagepayPaymentServiceImpl">
        <property name="failureReportingThreshold" value="1"/>
        <property name="gatewayRequest">
            <bean class="com.broadleafcommerce.vendor.sagepay.service.payment.SagepayGatewayRequestImpl">
                <property name="publicKey" value="${sagepay.publicKey}"/>
                <property name="privateKey" value="${sagepay.privateKey}"/>
                <property name="merchantId" value="${sagepay.merchantId}"/>
                <property name="redirectUrl" value="${sagepay.redirectUrl}"/>
                <property name="environment" value="${sagepay.environment}"/>
            </bean>
        </property>
    </bean>
```
> Note: The [[Sagepay Quick Start]] solution offers a default application context with these beans already defined and can be used as a reference. Please see `bl-sagepay-applicationContext.xml`

* `failureReportingThreshold` - used by [[QoS | QoS Configuration]] to determine how many times the service should fail before it is considered to be "down".
* `publicKey` - the Sagepay public key
* `privateKey` - the Sagepay private key
* `merchantId` - the Sagepay merchant ID
* `redirectUrl` - the destination in your app that Sagepay redirect backs to
* `environment` - this is already pre-configured per environment

See [[Sagepay Environment Setup]] to learn how to configure the variable properties.

## Customizing the SagepayCheckoutService

Broadleaf provides the `SagepayCheckoutService`, an abstraction layer on top of the payment workflow that aids in creating
the objects necessary for completing a successful checkout. The `blSagepayCheckoutService` can be overridden using a custom implementation.
This API is called from the `BroadleafSagepayController` used in the [[Sagepay Quick Start]] solution.

## Manually Configuring the Presentation Layer

It is up to you to choose the presentation layer approach that best fits your needs, but regardless of the approach, 
you will be required at some point to compile the [[PaymentInfo | https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/java/org/broadleafcommerce/core/payment/domain/PaymentInfo.java]] information 
to the order before calling performCheckout on the CheckoutService. 
Most Broadleaf Commerce users will choose Spring MVC and will likely implement their own CheckoutController. 
If your implementation does not require that much customization, consider extending the `BroadleafSagepayController`.
This class is also a useful reference in setting up a custom payment workflow with Sagepay.

The final step is to create the dynamic HTML form that will make a transparent redirect to Sagepay.
Here's a list of all the [[HTML fields | https://www.sagepaypayments.com/docs/java/transactions/tr_fields]] that can be sent to Sagepay.

## Supporting VOID and REFUND

You will need to create a custom workflow that includes the `SagepayPaymentModule` to call the appropriate method.
The Sagepay module supports the following transaction types: 

* SagepayPaymentModule.authorize() = Not Supported
* SagepayPaymentModule.reverseAuthorize() = SagepayMethodType.VOID
* SagepayPaymentModule.debit() = SagepayMethodType.SUBMIT
* SagepayPaymentModule.authorizeAndDebit() = SagepayMethodType.CONFIRM & SagepayMethodType.SUBMIT
* SagepayPaymentModule.credit() = SagepayMethodType.REFUND
* SagepayPaymentModule.voidPayment() = SagepayMethodType.VOID
