

###Detailed ERD

[![Admin Change Sets Detail](images/dataModel/AdminChangeSetsDetailedERD.png)](images/dataModel/AdminChangeSetsDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_SANDBOX          | link          | Represents a sandbox.  |
|BLC_ADMIN_USER_SANDBOX   | link      | Cross reference table that points to an admin user.  |
|BLC_SITE_SANDBOX     | link          | Cross reference table that points to a site.  |
|BLC_SANDBOX_ITEM     | link          | Represents a sandbox item.  |
|SANDBOX_ITEM_ACTION  | link          | Cross reference table that points to an action.  |
|BLC_SANDBOX_ACTION   | link          | Represents a sandbox action.  |

###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | link          | Represents an admin user.  |
|BLC_SITE             | link          | Represents a site.  |