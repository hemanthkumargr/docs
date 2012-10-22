

###Detailed ERD

[![Fulfillment Detail](images/dataModel/FulfillmentDetailedERD.png)](images/dataModel/FulfillmentDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_FULFILLMENT_OPTION | [FulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentOption.html)        | Holds information about a particular fulfillment implementation.  |
|BLC_FULFILLMENT_OPT_BANDED_PRC | [BandedPriceFulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/BandedPriceFulfillmentOption.html)| Links to a list of Fulfillment Price Bands.  |
|BLC_FULFILLMENT_OPT_BANDED_WGT | [BandedWeightFulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/BandedWeightFulfillmentOption.html)| Links to a list of Fulfillment Weight Bands.  |
|BLC_FULFILLMENT_OPTION_FIXED| [FixedPriceFulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/FixedPriceFulfillmentOption.html)   | Represents a Fixed Fulfillment Option.  |
|BLC_FULFILLMENT_PRICE_BAND  | [FulfillmentPriceBand.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/FulfillmentPriceBand.html)   | Represents a Fulfillment Price Band.  |
|BLC_FULFILLMENT_WEIGHT_BAND | [FulfillmentWeightBand.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/fulfillment/domain/FulfillmentWeightBand.html)   | Represents a Fulfillment Weight Band.  |