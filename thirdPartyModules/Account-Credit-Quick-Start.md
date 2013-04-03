This module adds admin functionality to manage credit and gift accounts.
As apart of our community offering in the framework itself, this admin module provides easier ways to administer this information in
the database.

Screenshots of the admin capabilities:

[![Account Management](images/dataModel/modules/AccountCreditCustomerScreen.png)](images/dataModel/modules/AccountCreditCustomerScreen.png)
[![Debit Funds](images/dataModel/modules/AccountCreditDebitFunds.png)](images/dataModel/modules/AccountCreditDebitFunds.png)
[![Add Funds](images/dataModel/modules/AccountCreditAddFunds.png)](images/dataModel/modules/AccountCreditAddFunds.png)
[![User Account](images/dataModel/modules/AccountCreditSite.png)](images/dataModel/modules/AccountCreditSite.png)

To include this in your project, simply follow the steps below (up-to-date diff from DemoSite)[https://github.com/BroadleafCommerce/DemoSite-AccountCredit/compare/upstream-develop...develop]

1. Add the required dependency management to the parent pom
```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-account-credit</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

2. Add the required dependency to the admin pom
```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-account-credit</artifactId>
</dependency>
```

3. Add the following line to your .gwt.xml file
```xml
<inherits name="com.broadleafcommerce.search.admin.accountCreditModule" />
```

