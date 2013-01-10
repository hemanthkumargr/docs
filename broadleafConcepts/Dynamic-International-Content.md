> Once the locales have been set, you can add dynamic content and tag them with the appropriate locale to have Broadleaf display it when said locale has been selected.

Setting up a content can be done via load sql files or through the admin.

The default content (for locale ```'en'```) has been added to ```load_content_data.sql```. Since we are adding content that is not part of the default content we will be adding it to ```load_content_international_data.sql```. 

## <a name="wiki-dynamic-content-setup" />Dynamic Content Setup - Load Files

###Category Data
Inserting the categories is broken down into two sections. We need an entry in ```BLC_CATEGORY_TRANSLATION``` and ```BLC_CATEGORY_TRANSLATION_XREF```. The first entry defines the translation while the second one linkes the translation with the category.   

```sql
INSERT INTO BLC_CATEGORY_TRANSLATION (TRANSLATION_ID,DESCRIPTION,NAME,LOCALE_CODE,CATEGORY_ID) VALUES (2001,'Inicio','Inicio','es',2001);
INSERT INTO BLC_CATEGORY_TRANSLATION_XREF (CATEGORY_ID, TRANSLATION_ID, MAP_KEY) VALUES (2001, 2001, 'es');
```

###Product Options
Inserting the product options is broken down into two sections. We need an entry in ```BLC_PRODUCT_OPTION_TRANSLATION``` and ```BLC_PRODUCT_OPTION_TRANSLATION_XREF```. The first entry defines the translation while the second one linkes the translation with the category.  

```sql
INSERT INTO BLC_PRODUCT_OPTION_TRANSLATION (TRANSLATION_ID,LABEL,LOCALE_CODE,PRODUCT_OPTION_ID) VALUES (1,'Color de Camisa','es',1);
INSERT INTO BLC_PRODUCT_OPTION_TRANSLATION_XREF (PRODUCT_OPTION_ID, TRANSLATION_ID, MAP_KEY) VALUES (1, 1, 'es');
```

###Product Option Values
Inserting the product options is broken down into two sections. We need an entry in ```BLC_PRODUCT_OPTION_VALUE_TRANSLATION``` and ```BLC_PRODUCT_OPTION_VALUE_TRANSLATION_XREF```. The first entry defines the translation while the second one linkes the translation with the category.  

```sql
INSERT INTO BLC_PRODUCT_OPTION_VALUE_TRANSLATION (TRANSLATION_ID,ATTRIBUTE_VALUE,LOCALE_CODE,PRODUCT_OPTION_VALUE_ID) VALUES (1,'Negro','es',1);
INSERT INTO BLC_PRODUCT_OPTION_VALUE_TRANSLATION_XREF (PRODUCT_OPTION_VALUE_ID, TRANSLATION_ID, MAP_KEY) VALUES (1, 1, 'es');
```

###Product Sku
Inserting the product skus is broken down into two sections. We need an entry in ```BLC_SKU_TRANSLATION``` and ```BLC_SKU_TRANSLATION_XREF```. The first entry defines the translation while the second one linkes the translation with the category.   

```sql
INSERT INTO BLC_SKU_TRANSLATION (TRANSLATION_ID,DESCRIPTION,NAME,LONG_DESCRIPTION,LOCALE_CODE,SKU_ID) VALUES (1,'Sudden Death Sauce','<Translated Name of Product>','<Translated Description of the product>','es',1);
INSERT INTO BLC_SKU_TRANSLATION_XREF (SKU_ID, TRANSLATION_ID, MAP_KEY) VALUES (1, 1, 'es');
```

## <a name="wiki-content-setup-admin" />Content Setup - Admin

- In the Admin, go to Catalog and Merchandising. 
- Select the type of content.
- Add your content
- In the locale field, enter in the locale you want. 