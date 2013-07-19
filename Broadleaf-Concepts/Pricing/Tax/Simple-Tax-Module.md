# Simple Tax Module

If your tax needs are simple, you can configure the simple tax module to provide a specific tax-rate for items based on the shipping address.    You can specify a rate for specific postal-codes, cities, states, or countries.

## SimpleTaxModule Configuration
To configure your site to use `SimpleTaxModule`, include the following bean definition within your Spring application context file.   

```xml
<bean id="blTaxModule" class="org.broadleafcommerce.core.pricing.service.module.SimpleTaxModule">
   <!-- Set properties for your specific tax configuration.  -->
</bean>
```

## Example:
In the following  example, the `SimpleTaxModule` is configured to charge 8.5% for addresses with postal-code 75033 and 75034.   For other addresses in the state of Texas, the module is configured to charge 8.25% sales tax.

```xml
<bean id="blTaxModule" class="org.broadleafcommerce.core.pricing.service.module.SimpleTaxModule">
  <property name="itemPostalCodeTaxRateMap">
    <map>
      <entry key="75033" value=".085" />
      <entry key="75034" value=".085" />
    </map>
  </property>
  <property name="itemStateTaxRateMap">
    <map>
      <entry key="TX" value=".0825" />  
    </map>
  </property>
</bean>
```

## Other Properties
The simple tax module supports the following properties.    Only one rate will be applied for an item.   The precedence is postal-code then city then state then country then default rate.   When configuring cities, states, and countries, the value must be uppercase.

|Property                              |Description                                                  | 
|:-------------------------------------|:------------------------------------------------------------|
|defaultTaxRate                        |A rate that would apply to every item in an order.           |
|defaultFulfillmentGroupTaxRate        |Default rate to apply to shipping costs.  Not typically used.|
|itemPostalCodeTaxRateMap              |A map of postal code to rate.                                |
|itemCityTaxRateMap                    |A map of city to rate.                                       |
|itemStateTaxRateMap                   |A map of state to rate.  System will match on the name or code.|
|itemCountryTaxRateMap                 |A map of country to rate.  System will match on name or code.|
|fulfillmentGroupPostalCodeTaxRateMap  |A map of postal code to rate.|
|fulfillmentGroupCityTaxRateMap        |A map of city to rate.|
|fulfillmentGroupStateTaxRateMap       |A map of state to rate.|
|fulfillmentGroupCountryTaxRateMap     |A map of country to rate.|
