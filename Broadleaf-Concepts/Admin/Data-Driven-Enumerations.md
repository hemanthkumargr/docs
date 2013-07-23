#Data Driven Enumerations

Data Driven Enumerations refer to database supplied enumerations and their associated values.  Please note that Broadleaf contains non-database supplied enumerations that are hardcoded into the Broadleaf source files.  This page refers to only database supplied enumerations.

The admin console provides configuration screens to build custom Data Driven Enumerations(under the "Utilities" tab in the sidebar).  Once an enumeration is built using the admin console, it is saved to the database for future use.  

Data Driven Enumerations can be used in a couple of different scenarios.

1.  Data Driven Enumerations can be used as regular Java enumerations throughout Broadleaf.

2.  Data Driven Enumerations can be used to create dropdown menus throughout Broadleaf.

The `@AdminPresentationDataDrivenEnumerations` annotation can be used 

```java
@Column(name = "TAX_CODE")
    @AdminPresentation(friendlyName = "SkuImpl_Sku_TaxCode", order = 1001,
            group = ProductImpl.Presentation.Group.Name.Financial, fieldType = SupportedFieldType.DATA_DRIVEN_ENUMERATION)
    @AdminPresentationDataDrivenEnumeration(optionCanEditValues = false, optionFilterParams = { @OptionFilterParam(param = "type.key", value = "TAX_CODE", paramType = OptionFilterParamType.STRING) })
    protected String taxCode;


