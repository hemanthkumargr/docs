#Data Driven Enumerations

Data Driven Enumerations refer to database supplied enumerations and their associated values.  Please note that Broadleaf contains non-database supplied enumerations that are hardcoded into the Broadleaf source files.  This page refers to only database supplied enumerations.

The admin console provides configuration screens to build custom Data Driven Enumerations(under the "Utilities" tab in the sidebar).  Once an enumeration is built using the admin console, it is saved to the database for future use.  

Data Driven Enumerations can be used in a few different scenarios.

1.  Data Driven Enumerations can be used as regular Java enumerations.

2.  Data Driven Enumerations can be used to create drop-down menus in Broadleaf.

3.  Data Driven Enumerations can used to create drop-down menus in the admin console.
  
To specify the values that will be used in a dropdown menu in the admin console the `@AdminPresentation` annotation is used with the `@AdminPresentationDataDrivenEnumerations` annotation.  Below is an example:

>Note:  `@AdminPresentation` is used to style and place the field.  `@AdminPresentationDataDrivenEnumeration` is used to specify that the field will be assigned a value from a specific subset of Data Driven Enumeration values.  

```java
@Column(name = "TAX_CODE")
@AdminPresentation(friendlyName = "SkuImpl_Sku_TaxCode")
@AdminPresentationDataDrivenEnumeration(optionFilterParams = { @OptionFilterParam(param = "type.key", value = "TAX_CODE", paramType = OptionFilterParamType.STRING) })
protected String taxCode;
```

The `@AdminPresentationDataDrivenEnumeration` annotation specifies that the field `taxCode` will be assigned a value from the set of `DataDrivenEnumerationValueImpl` objects which have `type.key = "TAX_CODE"`.  The admin console will display a drop-down menu containing this set of values.

+ `optionFilterParams` - Additional parameters to refine the query that is used to specify which values will be visible in the drop-down menu.
+ `param = "type.key"` - The field name in the target entity class that should be used to refine the query.  In this case `type` is from the `DataDrivenEnumerationValueImpl` object and `key` is from `DataDrivenEnumerationImpl` object.
+ `value = "TAX_CODE"` - The field value that should match for any items returned from the query.
+ `paramType = OptionFilterParamType.STRING` - This is the type for the value stored in this OptionFilterParam annotation.
 
Here is a more complex example:

```java
@Column(name = "NAME")
@AdminPresentation(friendlyName = "CategoryImpl_Category_Name")
@AdminPresentationDataDrivenEnumeration(optionListEntity = CategoryImpl.class, optionValueFieldName = "name", 
        optionDisplayFieldName = "name", optionCanEditValues = true)
protected String name;
```
The `@AdminPresentationDataDrivenEnumeration` annotation specifies that the field `name` will be assigned a value from the set of all `CategoryImpl` objects(no `optionFilterParams` were used to refine the query).

+ `optionListEntity` - Specify the target entity that should be queried for the list of options that will be presented to the user in a drop-down list.
+ `optionValueFieldName = "name"` - Specify the field in the target entity that contains the value that will be persisted into this annotated field.
+ `optionDisplayFieldName = "name"` - Specify the field in the target entity that contains the display value that will be shown to the user in the drop-down field.
+ `optionCanEditValues = true` - Whether or not the user can edit (or enter new values) in the drop-down menu.



