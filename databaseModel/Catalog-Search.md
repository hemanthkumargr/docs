

###Detailed ERD

[![Catalog Search Detail](images/dataModel/CatalogSearchDetailedERD.png)](images/dataModel/CatalogSearchDetailedERD.png)

###Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_SEARCH_FACET](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchFacetImpl.html)     | Represents a search facet.   |
|[BLC_FIELD](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/FieldImpl.html)            | Represents a field of a search facet.  |
|[BLC_FIELD_SEARCH_TYPES](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/FieldImpl.html) | Designates if the field will be searchable.  |
|[BLC_SEARCH_FACET_RANGE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchFacetRangeImpl.html) | Designates a range for a search facet.  |
|[BLC_CAT_SEARCH_FACET_XREF](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/CategorySearchFacetImpl.html)   | Cross references the search facet with categories. |
|[BLC_CAT_SEARCH_FACET_EXCL_XREF](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/CategoryExcludedSearchFacetImpl.html)| Cross references the search facet with categories to be excluded. |
|[BLC_SEARCH_INTERCEPT](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchInterceptImpl.html) | Represents the search redirect.  |
|[BLC_URL_HANDLER](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/url/domain/URLHandlerImpl.html)    | Represents the URL handler.  |
|[BLC_SEARCH_SYNONYM](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/search/domain/SearchSynonymImpl.html)   | Represents search synonym.  |
|[BLC_SHIPPING_RATE](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/pricing/domain/ShippingRateImpl.html)    | Represents a shipping rate.  |


###Related Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_CATEGORY](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/catalog/domain/CategoryImpl.html)          | Represents a category.  |
