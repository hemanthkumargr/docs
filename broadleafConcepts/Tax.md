Broadleaf Commerce can be configured for tax calculation in a number of ways. You can use the simple tax calculator, one of our included third party tax modules (such as CyberSource), or by using a creating a custom tax module.   

## Simple Tax Module

The simple tax module is a good option for companies with simple tax needs.   It allows you to configure a tax rate that applies to your entire site or a tax rate for specific postal-codes, cities, states, or countries.

To configure your site to use `SimpleTaxModule`, include the following bean definition within your Spring application context file.   

`<bean id="blTaxModule" class="org.broadleafcommerce.core.pricing.service.module.SimpleTaxModule">
   <!-- Set properties for your specific tax configuration.  -->
</bean>
`

The following example provides a 
  

`SimpleTaxModule` supports the following configurable attributes:
**||Property Name||Purpose||Default Value||**
||defaultTaxRate||A rate that would apply to every item in an order.  Useful for a point-of-sale application.||0||
||defaultFulfillmentGroupTaxRate||Default rate to apply to shipping costs.  Not typically used.||0||
||itemPostalCodeTaxRateMap||A map of postal code to rate.||n/a||
||itemCityTaxRateMap||A map of city to rate.||n/a||
||itemStateTaxRateMap||A map of state to rate||n/a||
||itemCountryTaxRateMap||A map of country to rate||n/a||
||fulfillmentGroupPostalCodeTaxRateMap||A map of postal code to rate.||n/a||
||fulfillmentGroupCityTaxRateMap||A map of city to rate.||n/a||
||fulfillmentGroupStateTaxRateMap||A map of state to rate||n/a||
||fulfillmentGroupCountryTaxRateMap||A map of country to rate||n/a||





## CyberSource Tax Module

As an alternative to simple tax, Broadleaf Commerce offers the CyberSource Tax calculation module. Please refer to the [[CyberSource Tax Configuration | CyberSource Tax Module]] section for more information.

## Creating Your Own Tax Module

If the provided modules in Broadleaf do not meet your needs, you can easily write a customized tax module to integrate with your tax calculator. Please view the [[Creating a Tax Module]] section.

