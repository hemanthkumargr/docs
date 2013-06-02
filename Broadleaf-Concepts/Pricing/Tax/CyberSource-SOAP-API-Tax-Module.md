BroadleafCommerce currently offers tax services through our implementation of the CyberSource tax API. Secure communication to the vendor's remote API is negotiated internally by BroadleafCommerce according to CyberSource's specifications. 

**Caveat - the CyberSource tax module is only valid for the United States and Canada**

**You must have completed the [[CyberSource SOAP API Environment Setup]] before continuing**

## Configuring CyberSource Tax

First, you need to declare the CyberSource tax service. Add the following Spring bean declaration to your application context:

```xml
<bean id="blCyberSourceTaxService" class="org.broadleafcommerce.vendor.cybersource.service.tax.CyberSourceTaxServiceImpl">
    <property name="failureReportingThreshold" value="10"/>
    <property name="idGenerationService" ref="blIdGenerationService"/>
    <property name="isCacheEnabled" value="true"/>
</bean>
```

- `failureReportingThreshold` - used by [[QoS | QoS Configuration]] to determine how many times the service should fail before it is considered to be "down".
- `idGenerationService` - standard BroadleafCommerce bean for generating unique ids.
- `isCacheEnabled` - set whether or not tax remote service calls are cached so that repeat tax requests for the same unmodified order are optimized.

At this point, you should consider writing an integration test similar to the [CyberSourceTaxServiceTest](https://github.com/BroadleafCommerce/BroadleafCommerceThirdPartyIntegrationModules/blob/master/integration/src/test/java/org/broadleafcommerce/vendor/CyberSourceTaxServiceTest.java) class in the BroadleafCommerce codebase. This will allow you to confirm your configuration is functional.

Finally, you have to override the default BroadleafCommerce tax module (SimpleTaxModule) with the CyberSource tax module. Add the following Spring bean declaration to your application context:

```xml
<bean id="blTaxModule" class="org.broadleafcommerce.pricing.service.module.CyberSourceTaxModule">
        <property name="serviceManager" ref="blCyberSourceServiceManager"/>
        <property name="nexus">
            <list>
                <value>TX</value>
            </list>
        </property>
        <property name="orderAcceptanceCity" value="Dallas"/>
        <property name="orderAcceptanceCountry" value="US"/>
    <property name="orderAcceptancePostalCode" value="75240"/>
    <property name="orderAcceptanceState" value="TX"/>
</bean>
```

- `serviceManager` - the CyberSource service manager bean you setup earlier
- `nexus` - the list of states in which the merchant holds nexus
- `orderAcceptanceCity` - the city in which the merchant is considered to have accepted the order
- `orderAcceptanceCountry` - the country in which the merchant is considered to have accepted the order
- `orderAcceptancePostalCode` - the postal code in which the merchant is considered to have accepted the order
- `orderAcceptanceState` - the state in which the merchant is considered to have accepted the order

The bean id `blTaxModule` is a key bean id, and when your bean uses this id, BroadleafCommerce will override the internal bean with this id and use your bean instead. 

## QoS

You should configure QoS so that your vendor services are monitored and so that you can be notified, or cause some other action to be taken, when a vendor service goes down or comes back up. Please refer to [[QoS Configuration]] for more information.

