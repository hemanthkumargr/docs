

###Detailed ERD

[![CMS Page Detail](images/dataModel/CMSPageDetailedERD.png)](images/dataModel/CMSPageDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_PAGE             | link          | Represents a static html Page in Broadleaf.  |
|BLC_PAGE_TEMPLATE    | link          | Represents a Page template.  |
|BLC_PAGE_FLD         | link          | Represents a Page Field.  |
|BLC_PAGE_FLD_MAP     | link          | Maps a Page to a Field.  |
|BLC_PAGE_RULE        | link          | Represents a rule to be applied to a Page.  |
|BLC_PAGE_RULE_MAP    | link          | Maps a Page to a Rule.  |
|BLC_PAGE_ITEM_CRITERIA | link        | Represents a Page item criteria.  |
|BLC_QUAL_CRIT_PAGE_XREF| link        | Cross reference table that points to a Page item criteria.  |

###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | link          | Represents an admin user.  |
|BLC_SANDBOX          | link          | Represents a sandbox.  |
|BLC_LOCALE           | link          | Contains locale information, such as code and if it's default  |