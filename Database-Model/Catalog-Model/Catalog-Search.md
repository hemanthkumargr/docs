

###Detailed ERD

[![Catalog Search Detail](dataModel/CatalogSearchDetailedERD.png)](_img/dataModel/CatalogSearchDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_SEARCH_FACET     | [SearchFacet.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchFacet.html)          | Represents a search facet.   |
|BLC_FIELD            | [Field.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/Field.html)          | Represents a field of a search facet.  |
|BLC_FIELD_SEARCH_TYPES | -        | Designates if the field will be searchable.  |
|BLC_SEARCH_FACET_RANGE | [SearchFacetRange.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchFacetRange.html)        | Designates a range for a search facet.  |
|BLC_CAT_SEARCH_FACET_XREF   | [CategorySearchFacet.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/CategorySearchFacet.html)   | Cross references the search facet with categories. |
|BLC_CAT_SEARCH_FACET_EXCL_XREF| [CategoryExcludedSearchFacet.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/CategoryExcludedSearchFacet.html) | Cross references the search facet with categories to be excluded. |
|BLC_SEARCH_INTERCEPT | [SearchIntercept.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchIntercept.html)        | Represents the search redirect.  |
|BLC_URL_HANDLER    | [URLHandler.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/url/domain/URLHandler.html)        | Represents the URL handler.  |
|BLC_SEARCH_SYNONYM   | [SearchSynonym.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchSynonym.html)        | Represents search synonym.  |
|BLC_SHIPPING_RATE    | [ShippingRate.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/pricing/domain/ShippingRate.html)         | Represents a shipping rate.  |


###Related Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_CATEGORY         | [Category.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/Category.html)          | Represents a category.  |