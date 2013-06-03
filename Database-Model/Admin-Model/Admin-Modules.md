

###Detailed ERD

[![Admin Modules Detail](images/dataModel/AdminModulesDetailedERD.png)](images/dataModel/AdminModulesDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_ADMIN_MODULE       | [AdminModule.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminModule.html)          | Represents an admin user.  |
|BLC_ADMIN_SECTION_PERMISSION_XREF | -      | Cross reference table that points to an admin permission.  |
|BLC_ADMIN_SECTION       | [AdminSection.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminSection.html)          | Represents an admin section.  |
|BLC_ADMIN_PERMISSION | [AdminPermission.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminPermission.html)          | Represents an admin user permission.  |

