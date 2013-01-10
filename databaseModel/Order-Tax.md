###Detailed ERD

[![Order Tax](images/dataModel/OrderTaxDetailedERD.png)](images/dataModel/OrderTaxDetailedERD.png)

###Tables

| Table               | Related Entity | Description                                         |
|:--------------------|:----------|:----------------------------------------------------|
|BLC_FG_FEE_TAX_XREF  | n/a      | Cross-reference from fulfillment group fees to tax details  |
|BLC_FG_FG_TAX_XREF   | n/a      | Cross-reference from fulfillment group to tax details  |
|BLC_FG_ITEM_TAX_XREF | n/a      | Cross-reference from fulfillment group item to tax details |
|BLC_TAX_DETAIL       | [TaxDetail.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/TaxDetail.html)      | Contains tax information  |

###Related Tables

| Table                     | Related Entity        | Description                                         |
|:--------------------------|:--------------|:----------------------------------------------------|
|BLC_FULFILLMENT_GROUP_FEE  | [FulfillmentGroupFee.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroupFee.html)          | Contains fee information for a fulfillment group  |
|BLC_FULFILLMENT_GROUP_ITEM | [FulfillmentGroupItem](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroupItem.html)          | Contains information for items in a fulfillment group  |
|BLC_FULFILLMENT_GROUP      | [FulfillmentGroup](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroup.html)          | Holds fulfillment information about an order  |
