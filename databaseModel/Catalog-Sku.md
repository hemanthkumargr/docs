

###Detailed ERD

![Catalog Sku Detail](images/dataModel/CatalogSkuDetailedERD.png)

###Tables

| Table				   | Java Docs	 	| Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_SKU              | link          | A SKU is a specific item that can be sold including any specific attributes of the item such as color or size.  |
|BLC_SKU_ATTRIBUTE    | link          | A SKU Attribute is a designator on a SKU that differentiates it from other similar SKUs (for example: Blue attribute for hat).  |
|BLC_SKU_BUNDLE_ITEM  | link          | Represents the sku being sold in a bundle.  |
|BLC_PRODUCT_BUNDLE   | link          | Represents the product being sold in a bundle.  |
|BLC_SKU_FULFILLMENT_FLAT_RATES| link | Represents the sku fulfillment flat rates.  |
|BLC_SKU_AVAILABILITY | link          | Represents the availability of the sku.  |
|BLC_SKU_FULFILLMENT_EXCLUDED| link   | Represents if a sku fulfillment is to be excluded.  |
|BLC_SKU_OPTION_VALUE_XREF   | link   | Represents the cross reference between sku and a product option value. |
|BLC_PRODUCT_OPTION_VALUE    | link   | Defines the value of a Product Option.  |
|BLC_PRODUCT_OPTION    | link         | Designates a Product Option.  |
|BLC_SKU_MEDIA_MAP    | link          | Maps the sku to a media object.  |
|BLC_MEDIA            | link          | Represents a media object.  |
|BLC_SKU_FEE_XREF    | link           | Represents the cross reference between sku and a sku fee. |
|BLC_PRODUCT_OPTION_VALUE    | link   | Represents a sku fee.  |


###Related Tables

| Table				   | Java Docs	 	| Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_PRODUCT          | link          | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|BLC_FULFILLMENT_OPTION | link        | Represents a fulfillment option.  |
