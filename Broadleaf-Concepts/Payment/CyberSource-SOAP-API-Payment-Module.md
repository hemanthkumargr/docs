# CyberSource SOAP API Payment Module

BroadleafCommerce currently offers credit card payment services through our implementation of the CyberSource SOAP payment API. Secure communication to the vendor's remote API is negotiated internally by BroadleafCommerce according to CyberSource's specifications. Please review the following prerequisites before proceeding

> Note: This integration method requires a high level of PCI compliance because it is necessary for credit card information to be passed through your servers which are then relayed to CyberSource via the SOAP API. If you are looking to avoid most PCI concerns, consider looking into the [[CyberSource Silent Post Module]]

**You must have completed the [[CyberSource SOAP API Environment Setup]] before continuing**

## Configuring CyberSource Payments

First, you need to declare the the CyberSource payment service. Add the following Spring bean declaration to your application context:

```xml
<bean id="blCyberSourceCreditCardPaymentService" class="org.broadleafcommerce.vendor.cybersource.service.payment.CyberSourceCreditCardPaymentServiceImpl">
    <property name="failureReportingThreshold" value="10"/>
    <property name="idGenerationService" ref="blIdGenerationService"/>
</bean>
```

* `failureReportingThreshold` - used by [[QoS | QoS Configuration]] to determine how many times the service should fail before it is considered to be "down".
* `idGenerationService` - standard BroadleafCommerce bean for generating unique ids.

At this point, you should consider writing an integration test similar to the [CyberSourcePaymentServiceTest](https://github.com/BroadleafCommerce/BroadleafCommerceThirdPartyIntegrationModules/blob/master/integration/src/test/java/org/broadleafcommerce/vendor/CyberSourcePaymentServiceTest.java) class in the Broadleaf Commerce codebase. This will allow you to confirm your configuration is functional.

Finally, you have to override the default BroadleafCommerce credit card module (DefaultModule) with the CyberSource credit card module. Add the following Spring bean declaration to your application context:

```xml
<bean id="blCreditCardModule" class="org.broadleafcommerce.payment.service.module.CyberSourceCreditCardModule">
       <property name="serviceManager" ref="blCyberSourceServiceManager"/>
</bean>
```

- `serviceManager` - the CyberSource service manager bean you setup earlier

The bean id `blCreditCardModule` is a key bean id, and when your bean uses this id, BroadleafCommerce will override the internal bean with this id and use your bean instead. Refer to the [Spring Bean Extension Quick Reference] section for more information.

## QoS

You should configure QoS so that your vendor services are monitored and so that you can be notified, or cause some other action to be taken, when a vendor service goes down or comes back up. Please refer to [[QoS Configuration]] for more information.

## Managing Customer Data

With CyberSource, it is possible to have a token returned instead of raw payment data as the result of the transaction. In this case, CyberSource maintains the sensitive customer information in their PCI-DSS compliant data center and any future interaction for this transaction is handled using the token. BroadleafCommerce is compatible with either full storage of customer payment information, or token-based responses like what's described here. Please refer to the [[Payment Security and PCI Compliance]] section for more information about how both of these payment storage approaches are achieved in BroadleafCommerce. Also, refer to the payment security brochure provided by CyberSource for more information regarding their services in this area: http://www.cybersource.com/resources/collateral/Resource_Center/product_briefs/CYBS_paymentsecurity_brochure.pdf

