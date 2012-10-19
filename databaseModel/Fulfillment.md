

###Detailed ERD

![Fulfillment Detail](images/dataModel/FulfillmentDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_FULFILLMENT_OPTION | link        | Holds information about a particular fulfillment implementation.  |
|BLC_FULFILLMENT_OPT_BANDED_PRC | link| Links to a list of Fulfillment Price Bands.  |
|BLC_FULFILLMENT_OPT_BANDED_WGT | link| Links to a list of Fulfillment Weight Bands.  |
|BLC_FULFILLMENT_OPTION_FIXED| link   | Represents a Fixed Fulfillment Option.  |
|BLC_FULFILLMENT_PRICE_BAND  | link   | Represents a Fulfillment Price Band.  |
|BLC_FULFILLMENT_WEIGHT_BAND | link   | Represents a Fulfillment Weight Band.  |