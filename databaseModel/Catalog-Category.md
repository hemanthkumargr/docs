

###Detailed ERD

[![Catalog Category Detail](images/dataModel/CatalogCategoryDetailedERD.png)](images/dataModel/CatalogCategoryDetailedERD.png)

###Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_CATEGORY](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CategoryImpl.html)         | Represents a category.  |
|[BLC_CATEGORY_ATTRIBUTE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CategoryAttributeImpl.html)  | Defines attributes for a category.  |
|[BLC_CATEGORY_IMAGE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CategoryImpl.html)   | Represents a URL to an image for the category.  |
|[BLC_CATEGORY_XREF](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CategoryImpl.html) | Cross reference table that points to the subcategories of each category.  |
|[BLC_PRODUCT_CROSS_SALE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CrossSaleProductImpl.html) | Represents the products in the category.  |
|[BLC_PRODUCT_UP_SALE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/UpSaleProductImpl.html)    | Represents the products in the category.  |
|[BLC_PRODUCT_FEATURED](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/FeaturedProductImpl.html)   | Represents the products in the category.  |




###Related Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_PRODUCT](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/ProductImpl.html)          | A product is a general description of an item that can be sold (for example: a hat). Products are not sold or added to a cart.  |
|[BLC_MEDIA](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/media/domain/MediaImpl.html)            | Represents a media object.  |