

###Detailed ERD

![Catalog Search Detail](images/dataModel/CatalogSearchDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_SEARCH_FACET     | link          | Represents a search facet.   |
|BLC_FIELD            | link          | Represents a field of a search facet.  |
|BLC_FIELD_SEARCH_TYPES | link        | Designates if the field will be searchable.  |
|BLC_SEARCH_FACET_RANGE | link        | Designates a range for a search facet.  |
|BLC_CAT_SEARCH_FACET_XREF   | link   | Cross references the search facet with categories. |
|BLC_CAT_SEARCH_FACET_EXCL_XREF| link | Cross references the search facet with categories to be excluded. |
|BLC_SEARCH_INTERCEPT | link        | Represents the search redirect.  |
|BLC_URL_HANDLER    | link        | Represents the URL handler.  |
|BLC_SEARCH_SYNONYM   | link        | Represents search synonym.  |
|BLC_SHIPPING_RATE    | link         | Represents a shipping rate.  |


###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_CATEGORY         | link          | Represents a category.  |
