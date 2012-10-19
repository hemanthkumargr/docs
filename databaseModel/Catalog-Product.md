

###Detailed ERD

[![Catalog Product Detail](images/dataModel/CatalogProductDetailedERD.png)](images/dataModel/CatalogProductDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_PRODUCT          | link          | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|BLC_PRODUCT_ATTRIBUTE  | link       | Defines attributes for a product.  |
|BLC_SKU_XREF | link             | Cross reference table that points to the skus for the product.  |
|BLC_PRODUCT_BUNDLE   | link          | Represents the product being sold in a bundle.  |
|BLC_SKU_OPTION_VALUE_XREF   | link   | Represents the cross reference between sku and a product option value. |
|BLC_PRODUCT_OPTION_VALUE    | link   | Defines the value of a Product Option.  |
|BLC_PRODUCT_OPTION    | link         | Designates a Product Option.  |
|BLC_PRODUCT_CROSS_SALE | link        | Represents the type of product.  |
|BLC_PRODUCT_UP_SALE    | link        | Represents the type of product.  |
|BLC_PRODUCT_FEATURED   | link        | Represents the type of product.  |




###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_CATEGORY         | link          | Represents a category.  |
|BLC_SKU              | link          | A SKU is a specific item that can be sold including any specific attributes of the item such as color or size.  |
