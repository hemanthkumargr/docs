###Detailed ERD

[![Customer Detail](images/dataModel/CustomerDetailedERD.png)](images/dataModel/CustomerDetailedERD.png)

###Tables

| Table                      | Java Docs | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_ADDRESS                 | link      | Contains address information, e.g. city, state, and postal code   |
|BLC_CHALLENGE_QUESTION      | link      | Question to present the user for password recovery purposes       |
|BLC_COUNTRY                 | link      | Contains country information, e.g. abbreviation and name          |
|BLC_CUSTOMER                | link      | Represents a customer in Broadleaf  |
|BLC_CUSTOMER_ADDRESS        | link      | Associates a customer to an address  |
|BLC_CUSTOMER_ATTRIBUTE      | link      | Holds name-value pairs of attributes for a customer  |
|BLC_CUSTOMER_PASSWORD_TOKEN | link      | Holds token information for password recovery purposes  |
|BLC_CUSTOMER_PHONE          | link      | Associates a customer to a phone number  |
|BLC_CUSTOMER_ROLE           | link      | Associates a customer to a role  |
|BLC_PHONE                   | link      | Contains phone information, e.g. number and if it's active        |
|BLC_ROLE                    | link      | Contains role information, e.g. role name  |
|BLC_STATE                   | link      | Contains state information, e.g. abbreviation, name, and country  |

###Related Tables

| Table               | Java Docs	  | Description                                                    |
|:--------------------|:--------------|:---------------------------------------------------------------|
|BLC_LOCALE           | link          | Contains locale information, such as code and if it's default  |