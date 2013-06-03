# Admin Security



###Detailed ERD

[![Admin Security Detail](dataModel/AdminSecurityDetailedERD.png)](_img/dataModel/AdminSecurityDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | [AdminUser.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUser.html)          | Represents an admin user.  |
|BLC_ADMIN_USER_ROLE_XREF | -      | Cross reference table that points to an admin user role.  |
|BLC_ADMIN_ROLE       | [AdminRole.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminRole.html)          | Represents an admin user role.  |
|BLC_ADMIN_USER_PERMISSION_XREF| - | Cross reference table that points to an admin user permission.  |
|BLC_ADMIN_PERMISSION | [AdminPermission.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminPermission.html)          | Represents an admin user permission.  |
|BLC_ADMIN_ROLE_PERMISSION_XREF| - | Cross reference table that points to an admin role permission.  |
|BLC_ADMIN_PERMISSION_ENTITY   | [AdminPermissionQualifiedEntity.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminPermissionQualifiedEntity.html) | Represents an admin user permission entity.  |

###Related Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_SANDBOX          | [SandBox.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBox.html)          | Represents a sandbox.  |
