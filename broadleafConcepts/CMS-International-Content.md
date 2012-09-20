> Once the locales have been set, you can add content and tag them with the appropriate locale to have Broadleaf display it when said locale has been selected.


Setting up a content can be done via load sql files or through the admin.

The default content (for locale ```'en'```) has been added to ```load_content_data.sql```. Since we are adding content that is not part of the default content we will be adding it to ```load_content_international_data.sql```. 

## <a name="wiki-content-setup" />Content Setup - Load Files

###Page Data
Inserting a page is broken down into three sections. We need an entry in ```BLC_PAGE```, ```BLC_PAGE_FLD``` and ```BLC_PAGE_FLD_MAP```.	

```sql
INSERT INTO BLC_PAGE (PAGE_ID, DESCRIPTION, PAGE_TMPLT_ID, FULL_URL, DELETED_FLAG, ARCHIVED_FLAG) VALUES (11, 'FAQ', 2, '/faq', FALSE, FALSE);
INSERT INTO BLC_PAGE_FLD(PAGE_FLD_ID, FLD_KEY, PAGE_ID, VALUE) VALUES (12, 'body', 11, '<HTML content>');
INSERT INTO BLC_PAGE_FLD_MAP(MAP_KEY, PAGE_FLD_ID, PAGE_ID) VALUES ('body', 12, 11);
```

###Content Item
Inserting a content item is broken down into three sections. We need an entry in ```BLC_SC```, ```BLC_SC_FLD``` and ```BLC_SC_FLD_MAP```.	

>The sample below shows five entries, since we want our banner to also be a link.

```sql
-- Content Item
INSERT INTO BLC_SC (SC_ID, ARCHIVED_FLAG, CREATED_BY, DATE_CREATED, DATE_UPDATED, UPDATED_BY, CONTENT_NAME, DELETED_FLAG, OFFLINE_FLAG, PRIORITY, LOCALE_CODE, SC_TYPE_ID) VALUES (151, FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Promocion - 20% de descuento en todas las camisas', FALSE, FALSE, 1, 'es', 1);
-- Fields
INSERT INTO BLC_SC_FLD (SC_FLD_ID, DATE_CREATED, FLD_KEY, CREATED_BY, SC_ID, VALUE) VALUES (51, CURRENT_TIMESTAMP, 'imageUrl', 1, 151, '/img/banners/promocion-camisas.jpg');
INSERT INTO BLC_SC_FLD (SC_FLD_ID, DATE_CREATED, FLD_KEY, CREATED_BY, SC_ID, VALUE) VALUES (52, CURRENT_TIMESTAMP, 'targetUrl', 1, 151, '/merchandise');
-- Field XREF
INSERT INTO BLC_SC_FLD_MAP (SC_ID, SC_FLD_ID, MAP_KEY) VALUES (151, 51, 'imageUrl');
INSERT INTO BLC_SC_FLD_MAP (SC_ID, SC_FLD_ID, MAP_KEY) VALUES (151, 52, 'targetUrl');
```

###Content Snippet
Inserting a content snippet is exactly the same as adding a content item. It is broken down into the same three sections. We need an entry in ```BLC_SC```, ```BLC_SC_FLD``` and ```BLC_SC_FLD_MAP```.	
```sql
-- Content Item
INSERT INTO BLC_SC (SC_ID, ARCHIVED_FLAG, CREATED_BY, DATE_CREATED, DATE_UPDATED, UPDATED_BY, CONTENT_NAME, DELETED_FLAG, OFFLINE_FLAG, PRIORITY, LOCALE_CODE, SC_TYPE_ID) VALUES (153, FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 'Home Page Snippet (es) - Aficionado', FALSE, FALSE, 5, 'es', 2);
-- Fields
INSERT INTO BLC_SC_FLD (SC_FLD_ID, DATE_CREATED, FLD_KEY, CREATED_BY, SC_ID, VALUE) VALUES (55, CURRENT_TIMESTAMP, 'htmlContent', 1, 153, '<HTML content>');
-- Field XREF
INSERT INTO BLC_SC_FLD_MAP (SC_ID, SC_FLD_ID, MAP_KEY) VALUES (153, 55, 'htmlContent');
```

## <a name="wiki-content-setup-admin" />Content Setup - Admin

- In the Admin, go to Content Management. 
- Select the type of content.
- Add your content
- In the locale field, enter in the locale you want.