

###Detailed ERD

[![Catalog Product Detail](images/dataModel/CatalogProductDetailedERD.png)](images/dataModel/CatalogProductDetailedERD.png)

###Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_PRODUCT](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductImpl.html)           | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|[BLC_PRODUCT_ATTRIBUTE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductAttributeImpl.html)  | Defines attributes for a product.  |
|[BLC_PRODUCT_SKU_XREF](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html) | Cross reference table that points to the skus for the product.  |
|[BLC_PRODUCT_BUNDLE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductBundleImpl.html)   | Represents the product being sold in a bundle.  |
|[BLC_SKU_OPTION_VALUE_XREF](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html)   | Represents the cross reference between sku and a product option value. |
|[BLC_PRODUCT_OPTION_VALUE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOptionValueImpl.html)    | Defines the value of a Product Option.  |
|[BLC_PRODUCT_OPTION](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOptionImpl.html)    | Designates a Product Option.  |
|[BLC_PRODUCT_CROSS_SALE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CrossSaleProductImpl.html) | Represents the type of product.  |
|[BLC_PRODUCT_UP_SALE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/UpSaleProductImpl.html)    | Represents the type of product.  |
|[BLC_PRODUCT_FEATURED](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/FeaturedProductImpl.html)    | Represents the type of product.  |




###Related Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_CATEGORY](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CategoryImpl.html)         | Represents a category.  |
|[BLC_SKU](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/SkuImpl.html)              | A SKU is a specific item that can be sold including any specific attributes of the item such as color or size.  |
