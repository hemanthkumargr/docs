###Detailed ERD

[![Order Fulfillment](images/dataModel/OrderFulfillmentDetailedERD.png)](images/dataModel/OrderFulfillmentDetailedERD.png)

###Tables

| Table                         | Java Docs | Description                                         |
|:------------------------------|:----------|:----------------------------------------------------|
|BLC_DYN_DISCRETE_ORDER_ITEM    | link      | Contains discrete order item information that is dynamically priced  |
|BLC_FULFILLMENT_GROUP          | link      | Holds fulfillment information about an order  |
|BLC_FULFILLMENT_GROUP_FEE      | link      | Contains fee information for a fulfillment group  |
|BLC_FULFILLMENT_GROUP_ITEM     | link      | Contains information for items in a fulfillment group  |
|BLC_FULFILLMENT_OPTION         | link      | Holds information about a particular fulfillment implementation  |
|BLC_FULFILLMENT_OPTION_FIXED   | link      | Contains single-price data for order fulfillment  |
|BLC_FULFILLMENT_OPT_BANDED_PRC | link      | Contains fulfillment option data by price band  |
|BLC_FULFILLMENT_OPT_BANDED_WGT | link      | Contains fulfillment option data by weight band  |
|BLC_FULFILLMENT_PRICE_BAND     | link      | Contains pricing bands based on retail price of a fulfillment group |
|BLC_FULFILLMENT_WEIGHT_BAND    | link      | Contains pricing bands based on weight of a fulfillment group |

###Related Tables

| Table                | Java Docs	   | Description                                         |
|:---------------------|:--------------|:----------------------------------------------------|
|BLC_ADDRESS           | link          | Contains address information, e.g. city, state, and postal code  |
|BLC_ORDER             | link          | Represents an order in Broadleaf  |
|BLC_PERSONAL_MESSAGE  | link          | Contains personal message information (e.g. from, to, message body)  |
|BLC_PHONE             | link          | Represents a phone number in broadleaf  |
|BLC_ORDER_ITEM        | link          | An abstract representation of an item on an order  |
