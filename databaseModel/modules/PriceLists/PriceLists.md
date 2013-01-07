###Detailed ERD

[![PriceLists Details](images/dataModel/modules/PriceLists/PriceListsDetailedERD.png)](images/dataModel/modules/PriceLists/PriceListsDetailedERD.png)

###Tables

| Table                      | Related Entity | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_PRICE_LIST       | [PriceList.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/PriceListImpl.html)      | Defines a unique pricelist based on the PRICE_KEY|
|BLC_SKU_PRICE_DATA     | n/a     | Cross references sku to pricedata  |
|BLC_PRICE_DATA     | [PriceData.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/PriceData.html)      |Holds the sale and retail price that will be dynamically priced  |
|BLC_SKU_BUNDLE_PRICE_DATA     | n/a       | Cross reference from sku bundle to price data  |
|BLC_PRICE_ADJUSTMENT | [DynamicPriceDiscreteOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/PriceAdjusmentmet.java)      | Contains sku price information that is dynamically priced  |
|BLC_ADJ_PRICE_XREF           | [n/a]      | Cross references product option value to price adjustment  |
|BLC_OFFER_PRICELIST_XREF     | [n/a]    | Cross references offer to prices list   |

###Related Tables

| Table                | Related Entity	   | Description                                         |
|:---------------------|:--------------|:----------------------------------------------------|
|BLC_SKU_BUNDLE           | [SkuBundle.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuBundle.html)           | Contains address information, e.g. city, state, and postal code  |
|BLC_SKU          | [Sku.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Sku.html)          |  A SKU is a specific item that can be sold including any specific attributes of the item such as color or size.    |
|BLC_PRODUCT_OPTION_VALUE          | [ProductOptionValue.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOptionValue.html)          | Represents a customer in Broadleaf  |
|BLC_CUSTOMER| [Customer.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Customer.html)          | Represents a customer in Broadleaf  |
|SEARCH_FACET_RANGE | [SearchFacetRange.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroup.html)          | Holds search facet range information  |
|BLC_ORDER             | [Order.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/Order.html)          | Represents an order in Broadleaf  |
