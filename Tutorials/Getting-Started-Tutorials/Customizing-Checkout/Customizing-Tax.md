Broadleaf Commerce can be configured for tax calculation in a number of ways. You can use the simple tax calculator, one of our included third party tax modules (such as CyberSource), or by using a creating a custom tax module. 

In this tutorial we will configure the Simple Tax Module for our example company, 'Acme Co' for tax calculation.

## Prerequisites
 
- [[Broadleaf's Tax Strategy | Tax]]
- [[Broadleaf's Simple Tax Module | Simple Tax Module ]]
 
## Acme Co Tax Requirements
 
Acme Co has three physical retail locations in the United States: Los Angeles, California, Austin, Texas, and New York City, New York. Each state has its own sales tax rate.

The table below details the locations and their sales tax rate:
 
| Location          | Sales Tax Rate |
| :---------------- | :------------- |
| Los Angeles, CA   | 8.75%          |
| Austin, TX        | 8.25%          |
| New York City, NY | 8.875%         |

## Configuring the Simple Tax Module

To customize the simple tax module, simply declare the bean within your applicationContext xml with an id of `blTaxModule`. This overrides Broadleaf's out-of-the-box configuration for tax calculation. 

Specifying a rate by state will suffice for our needs. Therefore, the property we need to customize in this bean is the `itemStateTaxRateMap`.  For additional properties and their descriptions, see more in the [[Simple Tax Module]] docs.  

Here is the complete snippet:

``` xml

<bean id="blTaxModule" class="org.broadleafcommerce.core.pricing.service.module.SimpleTaxModule">
  <property name="itemStateTaxRateMap">
    <map>
      <entry key="CA" value=".0875" />
      <entry key="TX" value=".0825" />
      <entry key="NY" value=".08875" />
    </map>
  </property>
</bean>

```

The changes should take effect on the next server startup. That's it!