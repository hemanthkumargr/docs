###Detailed ERD

[![Order Fulfillment](dataModel/OrderFulfillmentDetailedERD.png)](_img/dataModel/OrderFulfillmentDetailedERD.png)

###Tables

| Table                         | Related Entity | Description                                         |
|:------------------------------|:----------|:----------------------------------------------------|
|BLC_DYN_DISCRETE_ORDER_ITEM    | [DynamicPriceDiscreteOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/DynamicPriceDiscreteOrderItem.html)      | Contains discrete order item information that is dynamically priced  |
|BLC_FULFILLMENT_GROUP          | [FulfillmentGroup](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroup.html)      | Holds fulfillment information about an order  |
|BLC_FULFILLMENT_GROUP_FEE      | [FulfillmentGroupFee.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroupFee.html)      | Contains fee information for a fulfillment group  |
|BLC_FULFILLMENT_GROUP_ITEM     | [FulfillmentGroupItem](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroupItem.html)      | Contains information for items in a fulfillment group  |
|BLC_FULFILLMENT_OPTION         | [FulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentOption.html)      | Holds information about a particular fulfillment implementation  |
|BLC_FULFILLMENT_OPTION_FIXED   | [FixedPriceFulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/FixedPriceFulfillmentOption.html)      | Contains single-price data for order fulfillment  |
|BLC_FULFILLMENT_OPT_BANDED_PRC | [BandedPriceFulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/BandedPriceFulfillmentOption.html)      | Contains fulfillment option data by price band  |
|BLC_FULFILLMENT_OPT_BANDED_WGT | [BandedWeightFulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/BandedWeightFulfillmentOption.html)      | Contains fulfillment option data by weight band  |
|BLC_FULFILLMENT_PRICE_BAND     | [FulfillmentPriceBand.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/FulfillmentPriceBand.html)      | Contains pricing bands based on retail price of a fulfillment group |
|BLC_FULFILLMENT_WEIGHT_BAND    | [FulfillmentWeightBand.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/FulfillmentWeightBand.html)      | Contains pricing bands based on weight of a fulfillment group |

###Related Tables

| Table                | Related Entity    | Description                                         |
|:---------------------|:--------------|:----------------------------------------------------|
|BLC_ADDRESS           | [Address.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Address.html)           | Contains address information, e.g. city, state, and postal code  |
|BLC_ORDER             | [Order.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/Order.html)          | Represents an order in Broadleaf  |
|BLC_PERSONAL_MESSAGE  | [PersonalMessage.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/PersonalMessage.html)          | Contains personal message information (e.g. from, to, message body)  |
|BLC_PHONE             | [Phone.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Phone.html)          | Represents a phone number in broadleaf  |
|BLC_ORDER_ITEM        | [OrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/OrderItem.html)          | An abstract representation of an item on an order  |
