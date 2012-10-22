

###Detailed ERD

[![Catalog Sku Detail](images/dataModel/CatalogSkuDetailedERD.png)](images/dataModel/CatalogSkuDetailedERD.png)

###Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_SKU](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html)               | A SKU is a specific item that can be sold including any specific attributes of the item such as color or size.  |
|[BLC_SKU_ATTRIBUTE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuAttributeImpl.html)    | A SKU Attribute is a designator on a SKU that differentiates it from other similar SKUs (for example: Blue attribute for hat).  |
|[BLC_SKU_BUNDLE_ITEM](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuBundleItemImpl.html)  | Represents the sku being sold in a bundle.  |
|[BLC_PRODUCT_BUNDLE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductBundleImpl.html)   | Represents the product being sold in a bundle.  |
|[BLC_SKU_FULFILLMENT_FLAT_RATES](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html)| Represents the sku fulfillment flat rates.  |
|[BLC_SKU_AVAILABILITY](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/inventory/domain/SkuAvailabilityImpl.html) | Represents the availability of the sku.  |
|[BLC_SKU_FULFILLMENT_EXCLUDED](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html)| Represents if a sku fulfillment is to be excluded.  |
|[BLC_SKU_OPTION_VALUE_XREF](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html)   | Represents the cross reference between sku and a product option value. |
|[BLC_PRODUCT_OPTION_VALUE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOptionValueImpl.html)     | Defines the value of a Product Option.  |
|[BLC_PRODUCT_OPTION](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOptionImpl.html)    | Designates a Product Option.  |
|[BLC_SKU_MEDIA_MAP](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html)    | Maps the sku to a media object.  |
|[BLC_MEDIA](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/media/domain/MediaImpl.html)              | Represents a media object.  |
|[BLC_SKU_FEE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuFeeImpl.html)    | Represents a sku fee.  |
|[BLC_SKU_FEE_XREF](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuFeeImpl.html)    | Represents the cross reference between sku and a sku fee. |


###Related Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_PRODUCT](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductImpl.html)          | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|[BLC_FULFILLMENT_OPTION](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentOptionImpl.html) | Represents a fulfillment option.  |
