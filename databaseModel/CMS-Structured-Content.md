

###Detailed ERD

[![CMS Structured Content Detail](images/dataModel/CMSStructuredContentDetailedERD.png)](images/dataModel/CMSStructuredContentDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_SC               | link          | Represents a Broadleaf Structured Content object.  |
|BLC_SC_TYPE          | link          | Designates a Structured Content type.  |
|BLC_SC_FLD_TMPLT     | link          | Represents a Structured Content Field template.  |
|BLC_SC_FLD           | link          | Represents a Structured Content Field.  |
|BLC_SC_FLD_MAP       | link          | Maps a Structured Content Object to a Field.  |
|BLC_SC_RULE          | link          | Represents a rule to be applied to a Structured Content object.  |
|BLC_SC_RULE_MAP      | link          | Maps a Structured Content Object to a Rule.  |
|BLC_SC_ITEM_CRITERIA | link          | Represents a Structured Content item criteria.  |
|BLC_QUAL_CRIT_SC_XREF| link          | Cross reference table that points to an item criteria.  |

###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | link          | Represents an admin user.  |
|BLC_SANDBOX          | link          | Represents a sandbox.  |
|BLC_LOCALE           | link          | Contains locale information, such as code and if it's default  |