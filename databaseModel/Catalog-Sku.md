

###Detailed ERD

[![Catalog Sku Detail](images/dataModel/CatalogSkuDetailedERD.png)](images/dataModel/CatalogSkuDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_SKU              | [Sku.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Sku.html)          | A SKU is a specific item that can be sold including any specific attributes of the item such as color or size.  |
|BLC_SKU_ATTRIBUTE    | [SkuAttribute.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuAttribute.html)          | A SKU Attribute is a designator on a SKU that differentiates it from other similar SKUs (for example: Blue attribute for hat).  |
|BLC_SKU_BUNDLE_ITEM  | [SkuBundleItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuBundleItem.html)          | Represents the sku being sold in a bundle.  |
|BLC_PRODUCT_BUNDLE   | [ProductBundle.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductBundle.html)          | Represents the product being sold in a bundle.  |
|BLC_SKU_FULFILLMENT_FLAT_RATES| - | Represents the sku fulfillment flat rates.  |
|BLC_SKU_AVAILABILITY | [SkuAvailability.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/inventory/domain/SkuAvailability.html)      | Represents the availability of the sku.  |
|BLC_SKU_FULFILLMENT_EXCLUDED| -   | Represents if a sku fulfillment is to be excluded.  |
|BLC_SKU_OPTION_VALUE_XREF   | -   | Represents the cross reference between sku and a product option value. |
|BLC_PRODUCT_OPTION_VALUE    | [ProductOptionValue.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOptionValue.html)   | Defines the value of a Product Option.  |
|BLC_PRODUCT_OPTION    | [ProductOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOption.html)         | Designates a Product Option.  |
|BLC_SKU_MEDIA_MAP    | -          | Maps the sku to a media object.  |
|BLC_MEDIA            | [Media.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/media/domain/Media.html)          | Represents a media object.  |
|BLC_SKU_FEE_XREF    | -           | Represents the cross reference between sku and a sku fee. |
|BLC_SKU_FEE    | [SkuFee.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuFee.html)   | Represents a sku fee.  |


###Related Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_PRODUCT          | [Product.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Product.html)          | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|BLC_FULFILLMENT_OPTION | [FulfillmentOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentOption.html)        | Represents a fulfillment option.  |
