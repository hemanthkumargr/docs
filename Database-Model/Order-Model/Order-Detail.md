# Order Detail

###Detailed ERD

[![Order Detail](dataModel/OrderDetailedERD.png)](_img/dataModel/OrderDetailedERD.png)

###Tables

| Table                      | Related Entity | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_BUNDLE_ORDER_ITEM       | [BundleOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/BundleOrderItem.html)      | Contains a group of discrete order items   |
|BLC_BUND_ITEM_FEE_PRICE     | [BundleOrderItemFeePrice.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/BundleOrderItemFeePrice.html)      | Contains fee information for a bundle order item  |
|BLC_DISCRETE_ORDER_ITEM     | [DiscreteOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/DiscreteOrderItem.html)      | Contains product, sku, and pricing information for an item on an order  |
|BLC_DISC_ITEM_FEE_PRICE     | [DiscreteOrderItemFeePrice.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/DiscreteOrderItemFeePrice.html)      | Contains fee information for a discrete order item  |
|BLC_DYN_DISCRETE_ORDER_ITEM | [DynamicPriceDiscreteOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/DynamicPriceDiscreteOrderItem.html)      | Contains discrete order item information that is dynamically priced  |
|BLC_FG_ADJUSTMENT           | [FulfillmentGroupAdjustment.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/FulfillmentGroupAdjustment.html)      | Contains offer information and amount applied to a fulfillment group  |
|BLC_GIFTWRAP_ORDER_ITEM     | [GiftWrapOrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/GiftWrapOrderItem.html)      | Declares which discrete order items are gift-wrapped  |
|BLC_ORDER                   | [Order.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/Order.html)      | Represents an order in Broadleaf  |
|BLC_ORDER_ADJUSTMENT        | [OrderAdjustment.java](OrderAdjustment)      | Contains offer information and amount applied to an order  |
|BLC_ORDER_ATTRIBUTE         | [OrderAttribute.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/OrderAttribute.html)      | Contains arbitrary data about an order  |
|BLC_ORDER_ITEM              | [OrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/OrderItem.html)      | An abstract representation of an item on an order  |
|BLC_ORDER_ITEM_ADD_ATTR     | n/a      | Contains arbitrary data about a discrete order item  |
|BLC_ORDER_ITEM_ADJUSTMENT   | [OrderItemAdjustment.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/OrderItemAdjustment.html)      | Contains offer information and amount applied to an order item  |
|BLC_ORDER_ITEM_ATTRIBUTE    | [OrderItemAttribute.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/OrderItemAttribute.html)      | Contains arbitrary data about an order item  |
|BLC_PERSONAL_MESSAGE        | [PersonalMessage.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/PersonalMessage.html)      | Contains personal message information (e.g. from, to, message body)   |
|BLC_ORDER_MULTISHIP_OPTION  | [OrderMultishipOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/OrderMultishipOption.html)      | Represents a given set of options for an OrderItem in an Order in the multiship context  |
|BLC_ORDER_OFFER_CODE_XREF   | n/a      | Cross-reference from orders to offers  |

###Related Tables

| Table                | Related Entity    | Description                                         |
|:---------------------|:--------------|:----------------------------------------------------|
|BLC_ADDRESS           | [Address.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Address.html)           | Contains address information, e.g. city, state, and postal code  |
|BLC_CATEGORY          | [Category.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Category.html)          | Represents a category  |
|BLC_CUSTOMER          | [Customer.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Customer.html)          | Represents a customer in Broadleaf  |
|BLC_FULFILLMENT_OPTION| [FulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentOption.html)          | Holds information about a particular fulfillment implementation  |
|BLC_FULFILLMENT_GROUP | [FulfillmentGroup](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroup.html)          | Holds fulfillment information about an order  |
|BLC_OFFER             | [Offer.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/Offer.html)          | Contains adjustment information and rules  |
|BLC_PRODUCT           | [Product.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Product.html)          | Contains product information  |
|BLC_PRODUCT_BUNDLE    | [ProductBundle.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductBundle.html)          | Contains data about a product bundle, e.g. bundle pricing |
|BLC_SKU               | [Sku.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Sku.html)          | Contains information about an item that can be sold  |
|BLC_SKU_BUNDLE_ITEM   | [SkuBundleItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuBundleItem.html)          | Contains bundle item metadata  |
|BLC_CURRENCY                | [BroadleafCurrency.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/currency/domain/BroadleafCurrency.html)      | Contains currency information, such as code and if it's default  |
|BLC_LOCALE                  | [Locale.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/locale/domain/Locale.html)      | Contains locale information, such as code and if it's default  |
