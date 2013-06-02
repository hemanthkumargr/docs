

###Detailed ERD

[![CMS Static Asset Detail](dataModel/CMSStaticAssetDetailedERD.png)](_img/dataModel/CMSStaticAssetDetailedERD.png)

###Tables

| Table               | Java Docs      | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_STATIC_ASSET     | [StaticAsset.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/file/domain/StaticAsset.html)          | Represents a Static Asset in Broadleaf.  |
|BLC_IMG_STATIC_ASSET | [ImageStaticAsset.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/file/domain/ImageStaticAsset.html)          | Represents a Image Static Asset in Broadleaf.  |
|BLC_STATIC_ASSET_DESC| [StaticAssetDescription.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/file/domain/StaticAssetDescription.html)          | Defines a Description for a Static Asset.  |
|BLC_ASSET_DESC_MAP   | -          | Maps a Static Asset to a Description.  |
|BLC_STATIC_ASSET_STRG| [StaticAssetStorage.java](http://javadoc.broadleafcommerce.org/current/contentmanagement-module/org/broadleafcommerce/cms/file/domain/StaticAssetStorage.html)          | Represents a Static Asset Storage Object in Broadleaf.  |

###Related Tables

| Table               | Java Docs      | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_ADMIN_USER       | [AdminUser.java](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/security/domain/AdminUser.html)          | Represents an admin user.  |
|BLC_SANDBOX          | [SandBox.java](http://javadoc.broadleafcommerce.org/current/common/org/broadleafcommerce/common/sandbox/domain/SandBox.html)          | Represents a sandbox.  |