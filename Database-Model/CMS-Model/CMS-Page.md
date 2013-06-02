

###Detailed ERD

[![CMS Page Detail](dataModel/CMSPageDetailedERD.png)](_img/dataModel/CMSPageDetailedERD.png)

###Tables

| Table               | Java Docs      | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_PAGE             | [Page.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/page/domain/Page.html)          | Represents a static html Page in Broadleaf.  |
|BLC_PAGE_TEMPLATE    | [PageTemplate.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/page/domain/PageTemplate.html)          | Represents a Page template.  |
|BLC_PAGE_FLD         | [PageField.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/page/domain/PageField.html)          | Represents a Page Field.  |
|BLC_PAGE_FLD_MAP     | -          | Maps a Page to a Field.  |
|BLC_PAGE_RULE        | [PageRule.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/page/domain/PageRule.html)          | Represents a rule to be applied to a Page.  |
|BLC_PAGE_RULE_MAP    | -          | Maps a Page to a Rule.  |
|BLC_PAGE_ITEM_CRITERIA | [PageItemCriteria.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/page/domain/PageItemCriteria.html)        | Represents a Page item criteria.  |
|BLC_QUAL_CRIT_PAGE_XREF| -        | Cross reference table that points to a Page item criteria.  |

###Related Tables

| Table               | Java Docs      | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | [AdminUser.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUser.html)          | Represents an admin user.  |
|BLC_SANDBOX          | [SandBox.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBox.html)          | Represents a sandbox.  |
|BLC_LOCALE           | [Locale.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/locale/domain/Locale.html)          | Contains locale information, such as code and if it's default  |