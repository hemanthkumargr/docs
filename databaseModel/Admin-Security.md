

###Detailed ERD

![Admin Security Detail](images/dataModel/AdminSecurityDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | link          | Represents an admin user.  |
|BLC_ADMIN_USER_ROLE_XREF | link      | Cross reference table that points to an admin user role.  |
|BLC_ADMIN_ROLE       | link          | Represents an admin user role.  |
|BLC_ADMIN_USER_PERMISSION_XREF| link | Cross reference table that points to an admin user permission.  |
|BLC_ADMIN_PERMISSION | link          | Represents an admin user permission.  |
|BLC_ADMIN_ROLE_PERMISSION_XREF| link | Cross reference table that points to an admin role permission.  |
|BLC_ADMIN_PERMISSION_ENTITY   | link | Represents an admin user permission entity.  |

###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_SANDBOX          | link          | Represents a sandbox.  |