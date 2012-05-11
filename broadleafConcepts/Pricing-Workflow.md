**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

## Configuration

Let's take a look at the default configuration in Broadleaf Commerce for pricing:

```xml
<bean id="blPricingWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.pricing.service.workflow.PricingProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.pricing.service.workflow.OfferActivity"/>
            <bean class="org.broadleafcommerce.core.pricing.service.workflow.FulfillmentGroupTotalActivity"/>
            <bean class="org.broadleafcommerce.core.pricing.service.workflow.ShippingActivity">
                <property name="shippingService" ref="blShippingService"/>
            </bean>
            <bean class="org.broadleafcommerce.core.pricing.service.workflow.ShippingOfferActivity"/>
            <bean class="org.broadleafcommerce.core.pricing.service.workflow.TaxActivity">
                <property name="taxModule" ref="blTaxModule"/>
            </bean>
            <bean class="org.broadleafcommerce.core.pricing.service.workflow.TotalActivity"/>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

Pricing workflows are similar to workflows in general in that they require a ProcessContextFactory, a list of activities and an error handler to be configured. Pricing workflows will use an instance of PricingProcessContextFactory. By default, Broadleaf Commerce supplies activities for calculating offers, fulfillment group totals, shipping costs and offers, taxes and grand totals. In addition, Broadleaf Commerce utilizes the DefaultErrorHandler implementation, which simply logs any exceptions to the console and bubbles the exceptions.

| Class                         | Requirement     | Value                       |
| :---------------------------- | :-------------- | :-------------------------- |
| PricingProcessContextFactory  | None            | N/A                         |
| OfferActivity                 | None            | N/A                         |
| FulfillmentGroupTotalActivity | None            | N/A                         |
| ShippingActivity              | shippingService | Instance of ShippingService |
| TaxActivity                   | taxModule       | Instance of TaxModule       |
| TotalActivity                 | None            | N/A                         |
| defaultErrorHandler           | None            | N/A                         |

## Customization

Most pricing customization will occur in the following three areas:

- Shipping calculation
- Tax calculation
- Introducting custom pricing activities

### Shipping

Please refer to the [[Shipping]] section for information on customizing the shipping configuration for Broadleaf Commerce.

### Tax

Please refer to the [[Tax]] section for information on customizing the tax configuration for Broadleaf Commerce.

### Custom Activities

Please refer to the [[Custom Pricing Activities]] section for information on creating new pricing activities.

### Explicit Execution of Pricing

The pricing workflow is called automatically from several locations in the Broadleaf Commerce codebase. However, you may find from time to time that you need to call pricing explicitly from your own custom code. This is easily accomplished by injecting the PricingService into your custom class by referencing the key id `blPricingService`.



