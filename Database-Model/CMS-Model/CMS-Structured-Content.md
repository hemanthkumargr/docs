# CMS Structured Content



###Detailed ERD

[![CMS Structured Content Detail](dataModel/CMSStructuredContentDetailedERD.png)](_img/dataModel/CMSStructuredContentDetailedERD.png)

###Tables

| Table               | Java Docs      | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_SC               | [StructuredContent.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/structure/domain/StructuredContent.html)          | Represents a Broadleaf Structured Content object.  |
|BLC_SC_TYPE          | [StructuredContentType.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/structure/domain/StructuredContentType.html)          | Designates a Structured Content type.  |
|BLC_SC_FLD_TMPLT     | [StructuredContentFieldTemplate.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/structure/domain/StructuredContentFieldTemplate.html)          | Represents a Structured Content Field template.  |
|BLC_SC_FLD           | [StructuredContentField](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/structure/domain/StructuredContentField.html)          | Represents a Structured Content Field.  |
|BLC_SC_FLD_MAP       | -          | Maps a Structured Content Object to a Field.  |
|BLC_SC_RULE          | [StructuredContentRule.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/structure/domain/StructuredContentRule.html)          | Represents a rule to be applied to a Structured Content object.  |
|BLC_SC_RULE_MAP      | -          | Maps a Structured Content Object to a Rule.  |
|BLC_SC_ITEM_CRITERIA | [StructuredContentItemCriteria.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/structure/domain/StructuredContentItemCriteria.html)          | Represents a Structured Content item criteria.  |
|BLC_QUAL_CRIT_SC_XREF| -          | Cross reference table that points to an item criteria.  |

###Related Tables

| Table               | Java Docs      | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | [AdminUser.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUser.html)          | Represents an admin user.  |
|BLC_SANDBOX          | [SandBox.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBox.html)          | Represents a sandbox.  |
|BLC_LOCALE           | [Locale.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/locale/domain/Locale.html)          | Contains locale information, such as code and if it's default  |
