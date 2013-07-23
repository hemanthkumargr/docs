#Data Driven Enumerations

Data Driven Enumerations refer to database supplied enumerations and their associated values.  Please note that Broadleaf contains non-database supplied enumerations that are hardcoded into the Broadleaf source files.  This page refers to only database supplied enumerations.

The admin console provides configuration screens to build custom Data Driven Enumerations(under the "Utilities" tab in the sidebar).  Once an enumeration is built using the admin console, it is saved to the database for future use.  

Data Driven Enumerations can be used in a few different scenarios.

1.  Data Driven Enumerations can be used as regular Java enumerations.

2.  Data Driven Enumerations can be used to create dropdown menus in Broadleaf.

3.  Data Driven Enumerations can used to create dropdown menus in the admin console.
  
To specify the values that will be used in a dropdown menu in the admin console the `@AdminPresentation` annotation is used with the `@AdminPresentationDataDrivenEnumerations` annotation.  Below is an example:

```java
@Column(name = "TAX_CODE")
@AdminPresentation(friendlyName = "SkuImpl_Sku_TaxCode", order = 1001,
        group = ProductImpl.Presentation.Group.Name.Financial, fieldType = SupportedFieldType.DATA_DRIVEN_ENUMERATION)
@AdminPresentationDataDrivenEnumeration(optionCanEditValues = false, optionFilterParams = { @OptionFilterParam(param = "type.key", value = "TAX_CODE", paramType = OptionFilterParamType.STRING) })
protected String taxCode;
```
The `@AdminPresentation` annotation has `fieldType = SupportedFieldType.DATA_DRIVEN_ENUMERATION`, which specifies that the property `taxCode` will be assigned a Data Driven Enumeration in the admin console.  The admin console will display a dropdown menu containing a set of Data Driven Enumerations representing various tax codes.

The `@AdminPresentationDataDrivenEnumeration` annotation is used to narrow down the available set of enumerations(tax codes).  The annotation is marked `optionFilterParams = { @OptionFilterParam(param = "type.key", value = "TAX_CODE", paramType = OptionFilterParamType.STRING) }` to refine the query that is used to specify which Data Driven Enumerations(tax codes) will be available in the dropdown menu.  The annotation is also marked `optionCanEditValues = false` to indicate that the user of the admin console will not be able to edit the dropdown menu.

