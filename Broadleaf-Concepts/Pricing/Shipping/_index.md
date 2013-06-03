# Shipping

Broadleaf Commerce can be configured for shipping calculation in a number of ways. You can use banded shipping, one of our included third party shipping modules (such as USPS), or by using a custom shipping module.

## Banded Shipping

The ShippingActivity instance from the pricing workflow is set to use the bean id `blShippingService`, which is associated with an instance of ShippingService. In turn, the ShippingService instance is associated with ShippingModule instance via the blShippingModule bean id.

```xml
<bean id="blShippingService" class="org.broadleafcommerce.core.pricing.service.ShippingServiceImpl">
    <property name="shippingModule" ref="blShippingModule"/>
</bean>

<bean id="blShippingModule" class="org.broadleafcommerce.core.pricing.service.module.BandedShippingModule">
    <property name="feeTypeMapping">
        <map>
            <entry key="standard" value="SHIPPING" />
            <entry key="expedited" value="EXPEDITED"/>
            <entry key="truck" value="FREE" />
            <entry key="pickup" value="FREE" />
        </map>
    </property>
    <property name="feeSubTypeMapping">
        <map>
            <entry key="ALL" value="ALL" />
            <entry key="alsk" value="alsk" />
            <entry key="hawi" value="hawi" />
        </map>
    </property>
</bean>
```

The key behavior for shipping calculation occurs at the ShippingModule level, and it's at this level that key customizations are made. Broadleaf Commerce is configured by default to use a BandedShippingModule instance. Banded shipping is a type of shipping calculation approach in which order total dollar value ranges are used to derive a shipping estimate. This is a simplified form of shipping calculation where achieving a "close enough" shipping total is acceptable.

Configuring banded shipping involves establishing the maps in your application context that define the various fee types and fee sub-types. In addition, the appropriate database tables must be populated with the fee data for these types (more on this later). By default, Broadleaf Commerce defines fee types for standard, expedited, truck and pickup. For fee sub-types, ALL, alsk and hawi are defined. In this way, we can define the mode of shipping at the highest level, and then use the fee sub-type to further refine the shipping cost based on region. It is likely that the default Broadleaf Commerce configuration for banded shipping will not fulfill your needs, so let's create an example that alters the configuration.

```
<bean id="blShippingModule" class="org.broadleafcommerce.core.pricing.service.module.BandedShippingModule">
    <property name="feeTypeMapping">
        <map>
            <entry key="standard" value="SHIPPING" />
            <entry key="expedited" value="EXPEDITED"/>
            <entry key="overnight" value="OVERNIGHT"/>
        </map>
    </property>
    <property name="feeSubTypeMapping">
        <map>
            <entry key="ALL" value="ALL" />
        </map>
    </property>
</bean>
```

In this example, we're overriding the default banded shipping config from Broadleaf Commerce by defining a new BandedShippingModule bean with the appropriate id `blShippingModule`. We've taken away several of the shipping types and added an arbitrary new type for overnight shipping. Also, we've removed the alaska and hawaii shipping subtypes, effectively removing regional specificity for shipping charges. Now let's review some sample data that we can use to back our new banded shipping configuration.

| ID | BAND_RESULT_PCT | BAND_RESULT_QTY | BAND_UNIT_QTY | FEE_BAND | FEE_SUB_TYPE | FEE_TYPE  |
| :- | :-------------- | :-------------- | :------------ | :------- | :----------- | :-------- |
| 1  | 10              | 0               | 50.00         | 1        | ALL          | SHIPPING  |
| 2  | 9               | 0               | 999999        | 1        | ALL          | SHIPPING  |
| 3  | 0               | 10.50           | 50.00         | 2        | ALL          | EXPEDITED |
| 4  | 0               | 25.00           | 999999        | 2        | ALL          | EXPEDITED |
| 5  | 0               | 25.00           | 50.00         | 3        | ALL          | OVERNIGHT |
| 6  | 0               | 50.00           | 999999        | 3        | ALL          | OVERNIGHT |

- BAND_RESULT_PCT - represents the percentage of the retail total of all items in a fulfillment group for this band.
- BAND_RESULT_QTY - represents the flat rate amount for this band.
- BAND_UNIT_QTY - represents the maximum dollar amount for the retail total of all items in a fulfillment group for which this band is allowable.
- FEE_BAND - numeric identifier for a shipping type.
- FEE_SUB_TYPE - region identifier for this band - specifically the state abbreviation from the shipping address.
- FEE_TYPE - the major shipping type for this band.

This represents sample data entered into the BLC_SHIPPING_RATE table in the non-secure schema (see [Data Model]). With this configuration, you would expect the following results:

- For fulfillment groups with the "SHIPPING" shipping method whose retail item total is less than $50.00, the shipping charge will be 10% of the retail item total (if a percentage is available for the band, it is always favored over the flat rate amount).
- For "SHIPPING" fulfillment groups whose retail item total is greater than $50.00, the shipping charge will be 9% of the retail item total.
- For "EXPEDITED" fulfillment groups whose retail item total is less than $50.00, the shipping charge will be $10.50.
- For "EXPEDITED" fulfillment groups whose retail item total is greater than $50.00, the shipping charge will be $25.00.
- For "OVERNIGHT" fulfillment groups whose retail item total is less than $50.00, the shipping charge will be $25.00.
- For "OVERNIGHT" fulfillment groups whose retail item total is greater than $50.00, the shipping charge will be $50.00.

As long as you follow the required structure, you may introduce as many bands and regional variations as you like.

## USPS (United States Postal Service)

As an alternative to banded shipping, Broadleaf Commerce offers the USPS Shipping Pricing module. Please refer to the [[USPS Shipping Configuration | USPS Module]] section for more information.

## Creating Your Own Shipping Module

If the provided modules in Broadleaf do not meet your needs, you can easily write a customized shipping module to integrate with your shipping calculator. Please view the [[Creating a Shipping Module]] section.

## QOS

You should configure QOS so that your vendor services are monitored and so that you can be notified, or cause some other action to be taken, when a vendor service goes down or comes back up. Please refer to [[QOS Configuration]] for more information.

