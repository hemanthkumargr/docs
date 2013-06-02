# Customer Detail

###Detailed ERD

[![Customer Detail](dataModel/CustomerDetailedERD.png)](_img/dataModel/CustomerDetailedERD.png)

###Tables

| Table                      | Related Entity | Description                                         |
|:---------------------------|:----------|:----------------------------------------------------|
|BLC_ADDRESS                 | [Address.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Address.html)     | Contains address information, e.g. city, state, and postal code   |
|BLC_CHALLENGE_QUESTION      | [ChallengeQuestion.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/ChallengeQuestion.html)      | Question to present the user for password recovery purposes       |
|BLC_COUNTRY                 | [Country.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Country.html)      | Contains country information, e.g. abbreviation and name          |
|BLC_CUSTOMER                | [Customer.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Customer.html)      | Represents a customer in Broadleaf  |
|BLC_CUSTOMER_ADDRESS        | [CustomerAddress.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/CustomerAddress.html)      | Associates a customer to an address  |
|BLC_CUSTOMER_ATTRIBUTE      | [CustomerAttribute.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/CustomerAttribute.html)      | Holds name-value pairs of attributes for a customer  |
|BLC_CUSTOMER_PASSWORD_TOKEN | [CustomerForgotPasswordSecurityToken.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/CustomerForgotPasswordSecurityToken.html)      | Holds token information for password recovery purposes  |
|BLC_CUSTOMER_PHONE          | [CustomerPhone.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/CustomerPhone.html)      | Associates a customer to a phone number  |
|BLC_CUSTOMER_ROLE           | [CustomerRole.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/CustomerRole.html)      | Associates a customer to a role  |
|BLC_PHONE                   | [Phone.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Phone.html)      | Contains phone information, e.g. number and if it's active        |
|BLC_ROLE                    | [Role.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Role.html)      | Contains role information, e.g. role name  |
|BLC_STATE                   | [State.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/State.html)      | Contains state information, e.g. abbreviation, name, and country  |

###Related Tables

| Table               | Related Entity    | Description                                                    |
|:--------------------|:--------------|:---------------------------------------------------------------|
|BLC_LOCALE           | [Locale.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/locale/domain/Locale.html)          | Contains locale information, such as code and if it's default  |
