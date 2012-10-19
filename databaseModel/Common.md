###Detailed ERD

[![Common Detail](images/dataModel/CommonDetailedERD.png)](images/dataModel/CommonDetailedERD.png)

###Tables

| Table                      | Java Docs | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_STATE                   | link      | Contains state information, e.g. abbreviation, name, and country   |
|BLC_COUNTRY                 | link      | Contains country information, e.g. abbreviation and name          |
|BLC_SITE                    | link      | Represents a site  |
|BLC_ID_GENERATION           | link      | Holds unique identifier data for various types  |
|BLC_DATA_DRVN_ENUM          | link      | Holds the name for data-driven enumeration purposes  |
|BLC_DATA_DRVN_ENUM_VAL      | link      | Holds value items for data-driven enumeration purpose  |
|SEQUENCE_GENERATOR          | link      | Holds information for sequence generation  |
|BLC_LOCALE                  | link      | Contains locale information, such as code and if it's default  |

###Related Tables

| Table                | Java Docs	   | Description                                                    |
|:---------------------|:--------------|:---------------------------------------------------------------|
|BLX_SANDBOX           | link          | Contains sandbox instance data  |