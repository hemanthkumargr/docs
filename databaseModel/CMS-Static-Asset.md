

###Detailed ERD

![CMS Static Asset Detail](images/dataModel/CMSStaticAssetDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_STATIC_ASSET     | link          | Represents a Static Asset in Broadleaf.  |
|BLC_IMG_STATIC_ASSET | link          | Represents a Image Static Asset in Broadleaf.  |
|BLC_STATIC_ASSET_DESC| link          | Defines a Description for a Static Asset.  |
|BLC_ASSET_DESC_MAP   | link          | Maps a Static Asset to a Description.  |
|BLC_STATIC_ASSET_STRG| link          | Represents a Static Asset String in Broadleaf.  |

###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | link          | Represents an admin user.  |
|BLC_SANDBOX          | link          | Represents a sandbox.  |