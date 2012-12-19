

###Detailed ERD

[![Catalog Category Detail](images/dataModel/modules/CatalogMetaDataCatalogProductDetailedERD.png)](images/dataModel/modules/CatalogMetaDataCatalogProductDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_PRODUCT          | [Product.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Product.html)          | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|BLC_PRODUCT_ATTRIBUTE  | [ProductAttribute.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductAttribute.html)       | Defines attributes for a product.  |
|BLC_SKU_XREF | -             | Cross reference table that points to the skus for the product.  |
|BLC_PRODUCT_BUNDLE   | [ProductBundle.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductBundle.html)          | Represents the product being sold in a bundle.  |
|BLC_SKU_OPTION_VALUE_XREF   | -   | Represents the cross reference between sku and a product option value. |
|BLC_PRODUCT_OPTION_VALUE    | [ProductOptionValue.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOptionValue.html)   | Defines the value of a Product Option.  |
|BLC_PRODUCT_OPTION    | [ProductOption.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductOption.html)         | Designates a Product Option.  |
|BLC_PRODUCT_CROSS_SALE | [RelatedProduct.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/RelatedProduct.html)        | Represents the products in the category.  |
|BLC_PRODUCT_UP_SALE    | [RelatedProduct.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/RelatedProduct.html)         | Represents the products in the category.  |
|BLC_PRODUCT_FEATURED   | [PromotableProduct.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/PromotableProduct.html)      | Represents the products in the category.  |




###Related Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_CATEGORY         | [Category.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Category.html)          | Represents a category.  |
|BLC_SKU              | [Sku.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Sku.html)          | A SKU is a specific item that can be sold including any specific attributes of the item such as color or size.  |
