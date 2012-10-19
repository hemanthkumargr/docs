###Detailed ERD

[![Order Detail](images/dataModel/OrderDetailedERD.png)](images/dataModel/OrderDetailedERD.png)

###Tables

| Table                      | Java Docs | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_BUNDLE_ORDER_ITEM       | link      | Contains a group of discrete order items   |
|BLC_BUND_ITEM_FEE_PRICE     | link      | Contains fee information for a bundle order item  |
|BLC_DISCRETE_ORDER_ITEM     | link      | Contains product, sku, and pricing information for an item on an order  |
|BLC_DISC_ITEM_FEE_PRICE     | link      | Contains fee information for a discrete order item  |
|BLC_DYN_DISCRETE_ORDER_ITEM | link      | Contains discrete order item information that is dynamically priced  |
|BLC_FG_ADJUSTMENT           | link      | Contains offer information and amount applied to a fulfillment group  |
|BLC_GIFTWRAP_ORDER_ITEM     | link      | Declares which discrete order items are gift-wrapped  |
|BLC_ORDER                   | link      | Represents an order in Broadleaf  |
|BLC_ORDER_ADJUSTMENT        | link      | Contains offer information and amount applied to an order  |
|BLC_ORDER_ATTRIBUTE         | link      | Contains arbitrary data about an order  |
|BLC_ORDER_ITEM              | link      | An abstract representation of an item on an order  |
|BLC_ORDER_ITEM_ADD_ATTR     | link      | Contains arbitrary data about a discrete order item  |
|BLC_ORDER_ITEM_ADJUSTMENT   | link      | Contains offer information and amount applied to an order item  |
|BLC_ORDER_ITEM_ATTRIBUTE    | link      | Contains arbitrary data about an order item  |
|BLC_PERSONAL_MESSAGE        | link      | Contains personal message information (e.g. from, to, message body)   |
|BLC_ORDER_MULTISHIP_OPTION  | link      | Represents a given set of options for an OrderItem in an Order in the multiship context  |
|BLC_ORDER_OFFER_CODE_XREF   | link      | Cross-reference from orders to offers  |

###Related Tables

| Table                | Java Docs	   | Description                                         |
|:---------------------|:--------------|:----------------------------------------------------|
|BLC_ADDRESS           | link          | Contains address information, e.g. city, state, and postal code  |
|BLC_CATEGORY          | link          | Represents a category  |
|BLC_CUSTOMER          | link          | Represents a customer in Broadleaf  |
|BLC_FULFILLMENT_OPTION| link          | Holds information about a particular fulfillment implementation  |
|BLC_FULFILLMENT_GROUP | link          | Holds fulfillment information about an order  |
|BLC_OFFER             | link          | Contains adjustment information and rules  |
|BLC_PRODUCT           | link          | Contains product information  |
|BLC_PRODUCT_BUNDLE    | link          | Contains data about a product bundle, e.g. bundle pricing |
|BLC_SKU               | link          | Contains information about an item that can be sold  |
|BLC_SKU_BUNDLE_ITEM   | link          | Contains bundle item metadata  |
