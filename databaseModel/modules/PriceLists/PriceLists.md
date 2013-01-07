###Detailed ERD

[![PriceLists Details](images/dataModel/modules/PriceLists/PriceListsDetailedERD.png)](images/dataModel/modules/PriceLists/PriceListsDetailedERD.png)

###Tables

| Table                      | Related Entity | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_PRICE_LIST       | [PriceList.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/PriceListImpl.html)      | Defines a unique pricelist based on the PRICE_KEY|
|BLC_SKU_PRICE_DATA     | n/a     | Cross references sku to pricedata  |
|BLC_PRICE_DATA     | [PriceData.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/PriceData.html)      |Holds the sale and retail price  |
|BLC_SKU_BUNDLE_PRICE_DATA     | n/a | (http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/DiscreteOrderItemFeePrice.html)      | Cross reference from sku bundle to price data  |
|BLC_PRICE_ADJUSTMENT | [DynamicPriceDiscreteOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/DynamicPriceDiscreteOrderItem.html)      | Contains discrete order item information that is dynamically priced  |
|BLC_ADJ_PRICE_XREF           | [n/a](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/FulfillmentGroupAdjustment.html)      | Cross references product option value to price adjustment  |
|BLC_OFFER_PRICELIST_XREF     | [GiftWrapOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/GiftWrapOrderItem.html)      | Declares which discrete order items are gift-wrapped   |

###Related Tables

| Table                | Related Entity	   | Description                                         |
|:---------------------|:--------------|:----------------------------------------------------|
|BLC_SKU_BUNDLE           | [Address.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Address.html)           | Contains address information, e.g. city, state, and postal code  |
|BLC_SKU          | [Category.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Category.html)          | Represents a category  |
|BLC_PRODUCT_OPTION_VALUE          | [Customer.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Customer.html)          | Represents a customer in Broadleaf  |
|BLC_CUSTOMER| [FulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentOption.html)          | Holds information about a particular fulfillment implementation  |
|SEARCH_FACET_RANGE | [FulfillmentGroup](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroup.html)          | Holds fulfillment information about an order  |
|BLC_ORDER             | [Offer.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/Offer.html)          | Contains adjustment information and rules  |
