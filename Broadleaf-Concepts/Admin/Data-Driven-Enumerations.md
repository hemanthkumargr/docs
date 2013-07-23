#Data Driven Enumerations

Data Driven Enumerations refer to database supplied enumerations and their associated values.  Please note that Broadleaf contains non-database supplied enumerations that are hardcoded into the Broadleaf source files.  This page refers to only database supplied enumerations.

The admin console provides configuration screens to build custom Data Driven Enumerations(under the "Utilities" tab in the sidebar).  Once an enumeration is built using the admin console, it is saved to the database for future use.  

Data Driven Enumerations can be used in a few different scenarios.

1.  Data Driven Enumerations can be used as regular Java enumerations.

2.  Data Driven Enumerations can be used to create dropdown menus in Broadleaf.

3.  Data Driven Enumerations can used to create dropdown menus in the admin console.
  
To specify the values that will be used in a dropdown menu in the admin console the `@AdminPresentation` annotation is used with the `@AdminPresentationDataDrivenEnumerations` annotation.  Below is an example:

>Note:  `@AdminPresentation` is used to style and place the field.  `@AdminPresentationDataDrivenEnumeration` is used to specify that the field will be assigned a value from a specific subset of Data Driven Enumeration values.  

```java
@Column(name = "TAX_CODE")
@AdminPresentation(friendlyName = "SkuImpl_Sku_TaxCode")
@AdminPresentationDataDrivenEnumeration(optionFilterParams = { @OptionFilterParam(param = "type.key", value = "TAX_CODE", paramType = OptionFilterParamType.STRING) })
protected String taxCode;
```

The `@AdminPresentationDataDrivenEnumeration` annotation specifies that the field `taxCode` will be assigned a value from the set of Data Driven Enumerations which have `type.key = "TAX_CODE"`.  The admin console will display a dropdown menu containing this set of values.

+ `optionFilterParams` - Additional parameters to refine the query that is used to specify which values will be visible in the dropdown menu.
+ `param = "type.key"` - The field name in the target entity class that should be used to refine the query.  In this case `type` is from `DataDrivenEnumerationValue` and `key` is from `DataDrivenEnumeration`.
+ `value` - The field value that should match for any items returned from the query.
+ `paramType` - This is the type for the value stored in this OptionFilterParam annotation.
 
Here is a more complex example:

```java
@Column(name = "NAME")
@AdminPresentation(friendlyName = "CategoryImpl_Category_Name")
@AdminPresentationDataDrivenEnumeration(optionListEntity = CategoryImpl.class, optionDisplayFieldName = "name", 
        optionDisplayFieldName = "name", optionCanEditValues = true)
protected String name;
```


+ `optionListEntity` - 
+ `optionDisplayFieldName = numeration`.
+ `optionDisplayFieldName` -
+ `optionCanEditValues` - 



