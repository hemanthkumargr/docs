

###Detailed ERD

[![Admin Change Sets Detail](images/dataModel/AdminChangeSetsDetailedERD.png)](images/dataModel/AdminChangeSetsDetailedERD.png)

###Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_SANDBOX](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBoxImpl.html)          | Represents a sandbox.  |
|[BLC_ADMIN_USER_SANDBOX](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUserImpl.html)   | Cross reference table that points to an admin user.  |
|[BLC_SITE_SANDBOX](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBoxImpl.html)     | Cross reference table that points to a site.  |
|[BLC_SANDBOX_ITEM](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/domain/SandBoxItemImpl.html)     | Represents a sandbox item.  |
|[SANDBOX_ITEM_ACTION](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/domain/SandBoxItemImpl.html)  |  Cross reference table that points to an action.  |
|[BLC_SANDBOX_ACTION](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/domain/SandBoxActionImpl.html)   |  Represents a sandbox action.  |

###Related Tables

| Table               |  Description                                         |
|:--------------------|:-----------------------------------------------------|
|[BLC_ADMIN_USER](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUserImpl.html)       |  Represents an admin user.  |
|[BLC_SITE](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/site/domain/SiteImpl.html)             |  Represents a site.  |