###Detailed ERD

![Order Tax](images/dataModel/OrderTaxDetailedERD.png)

###Tables

| Table               | Java Docs | Description                                         |
|:--------------------|:----------|:----------------------------------------------------|
|BLC_FG_FEE_TAX_XREF  | link      | Cross-reference from fulfillment group fees to tax details  |
|BLC_FG_FG_TAX_XREF   | link      | Cross-reference from fulfillment group to tax details  |
|BLC_FG_ITEM_TAX_XREF | link      | Cross-reference from fulfillment group item to tax details |
|BLC_TAX_DETAIL       | link      | Contains tax information  |

###Related Tables

| Table                     | Java Docs	    | Description                                         |
|:--------------------------|:--------------|:----------------------------------------------------|
|BLC_FULFILLMENT_GROUP_FEE  | link          | Contains fee information for a fulfillment group  |
|BLC_FULFILLMENT_GROUP_ITEM | link          | Contains information for items in a fulfillment group  |
|BLC_FULFILLMENT_GROUP      | link          | Holds fulfillment information about an order  |
