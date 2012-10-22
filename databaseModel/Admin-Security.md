

###Detailed ERD

[![Admin Security Detail](images/dataModel/AdminSecurityDetailedERD.png)](images/dataModel/AdminSecurityDetailedERD.png)

###Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_ADMIN_USER](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUserImpl.html)       | Represents an admin user.  |
|[BLC_ADMIN_USER_ROLE_XREF](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUserImpl.html) | Cross reference table that points to an admin user role.  |
|[BLC_ADMIN_ROLE](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminRoleImpl.html)       | Represents an admin user role.  |
|[BLC_ADMIN_USER_PERMISSION_XREF](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminPermissionImpl.html)| Cross reference table that points to an admin user permission.  |
|[BLC_ADMIN_PERMISSION](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminPermissionImpl.html) |  Represents an admin user permission.  |
|[BLC_ADMIN_ROLE_PERMISSION_XREF](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminRoleImpl.html)| Cross reference table that points to an admin role permission.  |
|[BLC_ADMIN_PERMISSION_ENTITY](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminPermissionQualifiedEntityImpl.html)   | Represents an admin user permission entity.  |

###Related Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_SANDBOX](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBoxImpl.html)           | Represents a sandbox.  |