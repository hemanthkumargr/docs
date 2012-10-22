

###Detailed ERD

[![Admin Change Sets Detail](images/dataModel/AdminChangeSetsDetailedERD.png)](images/dataModel/AdminChangeSetsDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_SANDBOX          | [SandBox.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBox.html)          | Represents a sandbox.  |
|BLC_ADMIN_USER_SANDBOX   | -      | Cross reference table that points to an admin user.  |
|BLC_SITE_SANDBOX     | -          | Cross reference table that points to a site.  |
|BLC_SANDBOX_ITEM     | [SandBoxItem.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/domain/SandBoxItem.html)          | Represents a sandbox item.  |
|SANDBOX_ITEM_ACTION  | -          | Cross reference table that points to an action.  |
|BLC_SANDBOX_ACTION   | [SandBoxAction.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/domain/SandBoxAction.html)          | Represents a sandbox action.  |

###Related Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | [AdminUser.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUser.html)          | Represents an admin user.  |
|BLC_SITE             | [Site.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/site/domain/Site.html)         | Represents a site.  |