Broadleaf provides a very powerful catalog complete with category browsing and product searching. The awesome [Solr project](http://lucene.apache.org/Solr/) backs our product index and facilitates browsing/searching along with faceted filtering, pagination, and sorting. This section contains an overview of the relevant parts of catalog browsing and searching.

We'll begin with a general overview of how everything fits together and then dive into a few more advanced configuration options.

## The Search and Browse Controllers

The first thing to understand are the two controllers that handle searching and browsing, `BroadleafCategoryController` and `BroadleafSearchController`. They work in a very similar manner, so we'll talk about them in conjunction.

First, we will grab all of the available facets for either the given category or the global search facets depdending on what type of product lookup we're doing.

After that, we use the `blFacetService` to build out a `ProductSearchCriteria` instance. This class is basically a DTO that contains relevenat search information such as the current page, the size of each page, any applicable sort query, and any filter criteria. A filter critera is an `Entry<String, String[]>` that represents a field abbreviation and the applicable filters for that field. Field abbreviations are set in the `Field` class. For example, a field that references the property `defaultSku.name` might have an abbreviation of `name`. Then, in the URL query string, we might see something like `&name=Blair's&name=Dave's`. This would translate to a map of `name --> [Blair's, Dave's]`, which would then be set in the ProductSearchCriteria.

Once we have the product search criteria, we can delegate to the applicable `blSearchService` (`SolrSearchServiceImpl` by default) and attempt to perform our search.

## Building the Index

Before we can actually perform a search, we need to have an index to search again. For the database implementation, we don't have to build anything explicitly. For Solr however, we need to assemble the appropriate data. By default, this happens on server startup and again every hour after that. This is completely controllable in the `applicationContext.xml` file and will accept any type of interval or cron expression. There are a few important things to understand about Solr and how Solr fields work:

### Default fields

Broadleaf specifies a couple of important static fields by default, `id` and `category`. These fields will be indexed for every product along with the user-specified dynamic field types. Note that the category field accepts multiple long values, which makes sense because a given product can appear in many different categories. There is also a `searchable` field, which we will cover shortly.

### Dynamic fields

These fields are specified by the user via database entries in `blc_field` and `blc_field_search_types`. Before we talk about what exactly goes in a Field, we must first cover what a dynamic field in Solr is. If you open up `schema.xml`, you will see a listing of many different fields. A short excerpt follows:

```xml
<fields>
    <dynamicField name="*_i" type="int" indexed="true" stored="true" />
    <dynamicField name="*_is" type="int" indexed="true" stored="true" multiValued="true" />
    <dynamicField name="*_s" type="string" indexed="true" stored="true" />
    <dynamicField name="*_ss" type="string" indexed="true" stored="true" multiValued="true" />
</fields>
<types>
    <fieldType name="int" class="Solr.TrieIntField" precisionStep="0" positionIncrementGap="0" />
    <fieldType name="string" class="Solr.StrField" sortMissingLast="true" />
</types>
```

Here, we're defining a few dynamic fields. For example, if we were to create a field that was called `manufactuer_s`, it would be indexed by Solr as a `Solr.StrField`.

Another important distinction is between two properties in FieldImpl: `searchableFieldTypes` and `facetFieldType`. Searchable field types will be built into the Solr index, of which you may have multiple types. For example, you might want to index a field as both a String field and a Text field (text fields allow partial matches). However, you would only want to facet on the String field. The Broadleaf Field implementation gives you this freedom. Note, also, that the facet field also controls the Solr index to use for sorting.

As a quick example, let's take a look at what might happen if we have the following fields defined:

- manufacturer, facetFieldType: "s", searchableFieldTypes: { "s", "t" }
- defaultSku.retailPrice, facetFieldType: "d"
- defaultSku.name, facetField: "s", searchableFieldTypes: { "s", "t" }

and we index a sample product. A suitable Solr representation in JSON would be:

```text
{ 
  id                       : 100,
  category                 : [2000, 2002],
  manufacturer_s           : "Spice Exchange",
  manufacturer_t           : "Spice Exchange",
  defaultSku.retailPrice_d : 6.99,
  defaultSku.name_s        : "Day of the Dead Scotch Bonnet Hot Sauce",
  defaultSku.name_t        : "Day of the Dead Scotch Bonnet Hot Sauce",
  searchable               : "Spice Exchange Day of the Dead Scotch Bonnet Hot Sauce"
}
```

You might be wondering what that searchable field is. When you specify a Field as `searchable`, we will copy the Field's value into the solr index field `searchable`. When we do queries later on, they will be against this field.

We'll get back to this shortly and see how sorting, searching and faceting would work against this product.

## Searching with Solr

There are a few things we must to do build a Solr query, including assembling the base query, specifying avaialble facets, adding a sort clause, adding active facet filters, and specifying the current page. This implementation is handled by Broadleaf and will only need to be modified in special circumstances. This documentation serves to explain the general workflow. Let's go over these steps:

### Assembling the base query

This is pretty easy. There are two possible alternatives. We either specify a category, `category:2002` or some text to match against the searchable index, `searchable:*day*`.

### Specifying available facets

For Solr to be able to give you possible values for a given facet along with a count of how many results belong to that facet, you must specify the facets. This adds in two classes, `SearchFacet` and `CategorySearchFacet`. A `SearchFacet` specifies things like what Field to facet on, the label of the facet, whether or not it can display on search results pages, whether it is multiselectable, etc. Additionally, you can specify various `SearchFacetRange`s that belong to the facet. For example, the price SearchFacet might define a few ranges, such as 0-5, 5-10, and 10+.

`CategorySearchFacets` establish a relationship between a given `SearchFacet` and a `Category`. Note that a Category can have many facets, and a facet can belong to many Categories. If a category has a Facet on the same field as a parent category, the subcategory facet will override the parent facet. Furthermore, a category can exclude parent facets.

This is completely data-driven and controlled via the database. Administration of Fields / SearchFacets / CategorySearchFacets is a [[Commercial Feature | Commercial Features]]

### Adding a sort clause

In the example above, note that we have a field called `defaultSku.name_s`. This is the facetField for the `name` abbreviation. There is a mapping step in SolrSearchServiceImpl that will take the URL-friendly abbreviation `name` and convert it to `defaultSku.name_s`. By doing this, we can ensure that our URLs are shorter and expose less of the underlying structure of the application to a user.

Simply specifying `&sort=name asc&sort=price desc` in the URL would cause the search service to sort first by name asecending followed by price descending if the names matched.

### Adding active facet filters

This is very similar to adding a sort clause. The exact same translation step occurs and we are able to attach a facet filter easily, such as `&name=Spice+Exchange`.

> Note: You do not want to facet on text fields - instead, you want to facet on String fields as it will provide an exact match.

### Specifying pagination attributes

This is very simple as well. Simple add `&pageSize=20&page=2` to show results 21-40.

## Processing Results From Solr

Once we've built our query and sent it to Solr, all that's left is to parse the results. We will first take a look at the facet results that came back from Solr. If we specified a facet on manufacturer, this would be a list of manufacturers in the given category/search along with how many results that manufacturer has. After processing that into our `SearchFacetResultDTO` object, we apply a sort to make it easier for the user to find their desired facet result. Finally, we take the product IDs that came back from Solr and look it up via our DAO to get full-fledged Product instances.

The products, facets, and additional paging attributes get set in the `ProductSearchResult`, which is then returned to the controller and forwarded to the viewing layer to render.

## Configuring Solr

We have provided a way to easily configure different Solr servers for different environments. There are two properties that are configured via [[Runtime Environment Configuration]]

```text
solr.source=
solr.url=
```

By default, `common.properties` only specifies the `solr.source` property to solrEmbedded. This then corresponds to the bean in `applicationContext.xml`:

```xml
<bean id="solrEmbedded" class="java.lang.String">
    <constructor-arg value="solrhome"/>
</bean>
```

If you wanted to use a standalone server, you could configure the two properties as follows:

```text
solr.url=http://localhost:8081/solr
solr.source=solrServer
```

and then add the appropriate xml:

```xml
<bean id="solrServer" class="org.apache.solr.client.solrj.impl.HttpSolrServer">
    <constructor-arg value="${solr.url}"/>
</bean>
```

And now you have different Solr servers per your environments!
