# CyberSource SOP Advance Configuration

> Note: Broadleaf Commerce currently offers integration with CyberSource using the Silent Order Post method through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

## Versions : 2.1.0-RC1, 2.1.0-GA

Broadleaf allows you to customize many aspects of your CyberSource SOP integration.

**You must have completed the [[CyberSource Silent Post Environment Setup]] before continuing**

## Configuring CyberSource SOP Payments

You will need to declare the following Spring beans in your application context:

```xml
    <!-- Override the default Broadleaf Credit Card Service with Cybersource Silent Post -->
    <bean id="blCreditCardService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
        <property name="paymentModule" ref="blCybersourceSilentPostModule"/>
    </bean>

    <bean id="blCybersourceSilentPostModule" class="com.broadleafcommerce.payment.service.module.CybersourceSilentPostPaymentModule">
        <property name="paymentService" ref="blCybersourceSilentPostPaymentService"/>
        <property name="stateService" ref="blStateService"/>
        <property name="countryService" ref="blCountryService"/>
        <property name="validDecisionCodes" value="${cybersource.silentpost.validDecisionCodes}"/>
    </bean>
```

> Note: The [[CyberSource SOP Quick Start]] solution offers a default application context with these beans already defined and can be used as a reference. Please see `bl-cybersource-silentpost-applicationContext.xml`

* `validDecisionCodes` - this is comma separated list of decision codes Broadleaf uses to determine whether or not a transaction is successful.

See [[CyberSource Silent Post Environment Setup]] to learn how to configure the variable properties.

## Customizing the CybersourceSilentPostCheckoutService

Broadleaf provides the `CybersourceSilentPostCheckoutService`, an abstraction layer on top of the payment workflow that aids in creating
the objects necessary for completing a successful checkout. The `blCybersourceSilentPostCheckoutService` can be overridden using a custom implementation.
This API is called from the `BroadleafCybersourceSilentPostController` used in the [[CyberSource SOP Quick Start]] solution.

The `CybersourceSilentPostCheckoutService` contain several methods that may be useful in performing actions such as `authorize`, `authorize and debit`, `authorize subscription`, and `authorize and debit subscription`. By default, the `BroadleafCybersourceSilentPostController` invokes the `authorize and debit` method, but can easily be overriden to call a different method for your particular use case.

## Customizing the CybersourceSilentPostPaymentModule

The heart of the response processing occurs in the `CybersourceSilentPostPaymentModule`. The Checkout Workflow calls this module and executes the AuthorizeAndDebit method to populate the PaymentInfo and PaymentResponseItem needed for checkout. These methods are protected and can be extended as necessary to provide your own custom implementation.

## Manually Configuring the Presentation Layer

It is up to you to choose the presentation layer approach that best fits your needs, but regardless of the approach, 
you will be required at some point to compile the [PaymentInfo](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/java/org/broadleafcommerce/core/payment/domain/PaymentInfo.java) information
to the order before calling performCheckout on the CheckoutService. 
Most Broadleaf Commerce users will choose Spring MVC and will likely implement their own CheckoutController. 
If your implementation does not require that much customization, consider extending the `BroadleafCybersourceSilentPostController`.
This class is also a useful reference in setting up a custom payment workflow with CyberSource.

The final step is to create the dynamic HTML form that will make a Silent Post to CyberSource.
Here is a link to the Silent Post documentation that lists all the fields that can be sent to CyberSource:
http://apps.cybersource.com/library/documentation/sbc/SOP_UG/SOP_UG.pdf
