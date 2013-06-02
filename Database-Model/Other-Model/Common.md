# Common

###Detailed ERD

[![Common Detail](dataModel/CommonDetailedERD.png)](_img/dataModel/CommonDetailedERD.png)

###Tables

| Table                      | Related Entity | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_STATE                   | [State.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/State.html)      | Contains state information, e.g. abbreviation, name, and country   |
|BLC_COUNTRY                 | [Country.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Country.html)      | Contains country information, e.g. abbreviation and name          |
|BLC_SITE                    | [Site.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/site/domain/Site.html)      | Represents a site  |
|BLC_ID_GENERATION           | [IdGeneration.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/IdGeneration.html)      | Holds unique identifier data for various types  |
|BLC_DATA_DRVN_ENUM          | [DataDrivenEnumeration.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/enumeration/domain/DataDrivenEnumeration.html)      | Holds the name for data-driven enumeration purposes  |
|BLC_DATA_DRVN_ENUM_VAL      | [DataDrivenEnumerationValue.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/enumeration/domain/DataDrivenEnumerationValue.html)      | Holds value items for data-driven enumeration purpose  |
|SEQUENCE_GENERATOR          | n/a      | Holds information for sequence generation  |
|BLC_LOCALE                  | [Locale.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/locale/domain/Locale.html)      | Contains locale information, such as code and if it's default  |

###Related Tables

| Table                | Related Entity    | Description                                                    |
|:---------------------|:--------------|:---------------------------------------------------------------|
|BLC_SANDBOX           | [SandBox.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBox.html)          | Contains sandbox instance data  |
