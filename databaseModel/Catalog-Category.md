

###Detailed ERD

[![Catalog Category Detail](images/dataModel/CatalogCategoryDetailedERD.png)](images/dataModel/CatalogCategoryDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_CATEGORY         | link          | Represents a category.  |
|BLC_CATEGORY_ATTRIBUTE  | link       | Defines attributes for a category.  |
|BLC_CATEGORY_IMAGE   | link          | Represents a URL to an image for the category.  |
|BLC_CATEGORY_XREF | link             | Cross reference table that points to the subcategories of each category.  |
|BLC_PRODUCT_CROSS_SALE | link        | Represents the products in the category.  |
|BLC_PRODUCT_UP_SALE    | link        | Represents the products in the category.  |
|BLC_PRODUCT_FEATURED   | link        | Represents the products in the category.  |




###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_PRODUCT          | link          | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|BLC_MEDIA            | link          | Represents a media object.  |