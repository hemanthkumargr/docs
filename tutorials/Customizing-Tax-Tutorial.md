**Work In Progress**

Broadleaf Commerce can be configured for tax calculation in a number of ways. You can use the simple tax calculator, one of our included third party tax modules (such as CyberSource), or by using a creating a custom tax module. 

In this tutorial we will configure the Simple Tax Module for our example company, 'Acme Co' for tax calculation.

## Prerequisites
 
- [[Broadleaf Tax Strategy | Tax]]
- [[Broadleaf's Simple Tax Module | Simple Tax Module ]]
 
## Acme Co Tax Requirements
 
Acme Co has physical retail locations in three U.S. states: California, Texas, and New York. Each state has its own sales tax rate.

The table below details the states and their sales tax rate:
 
| State      | Sales Tax Rate |
| :--------- | :------------- |
| California | 8.75%          |
| Texas      | 8.25%          |
| New York   | 8.875%         |

## Configuring the Simple Tax Module

To customize the simple tax module, simply declare the bean within your applicationContext xml with an id of `blTaxModule`. This overrides Broadleaf's out-of-the-box configuration for tax calculation. As documented in [[Simple Tax Module]], the property we need to customize that fits our needs is the `itemStateTaxRateMap`.  Here is the complete snippet:

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