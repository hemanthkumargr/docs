The Broadleaf Content Management system was designed to support the needs of typical enterprise eCommerce implementations.

- **Static Page Management** - Provides users to create a static managed page.
- **Structured Content Management** - Provides users with a way to manage "Ads" and other structured content
- **Asset Management** - Provides a way for end users to load new assets into the Broadleaf system
- **Workflow** - The CMS is designed with a multi-step workflow with preview and approval capability.

## Configuration

| Page Templates | The page templates that users are able to choose from in the BLC admin are defined in the database. This definition includes the fields that the user will be able to enter and the associated underlying JSP template that will render the page |
| Structured Content Types | Structured Content can be used in a number of ways. A typical usage will be to provide business user's with control of a portion of the page.   For example, in the Broadleaf Demo application, there are three types of structured content (The welcome message, the banner ad, and the two ads on the right hand side of the page). Each of these represents a content-type that was defined in the database. |

## Data Model

### Structure of the CMS Data

Page templates and structured content for a Broadleaf instance are data driven.

The following tables define the structure of your CMS data.

| Field                   | Description                                                                                                                                  |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| BLC_PAGE_TMPLT          | Your page template name and association to underlying JSP file                                                                               |
| BLC_PGTMPLT_FLDGRP_XREF | Custom fields used by your page template                                                                                                     |
| BLC_SC_TYPE             | Your structured content types (e.g. Homepage Ad).   Typically used to define specific content placement.                                     |
| BLC_SC_FLD_TMPLT        | Structured content field template (e.g. Fields for an Ad).                                                                                   |
| BLC_SC_FLDGRP_XREF      | Fields associated with a structured content template.                                                                                        |
| BLC_FLD_GROUP           | Defines a field grouping which is used for ordering and display of the fields in the admin                                                   |
| BLC_FLD_DEF             | Defines a specific content managed field (e.g. what user's enter).   Can be one of many types including RichText, Date, Number, String, etc. |

### Storage of the actual CMS Data

The following structures hold your ACTUAL instance data (e.g. actual pages, ads, etc.) that is managed by your business users.    You should bring this data over if you the data in your import.sql is appropriate and should be part of the conversion.

Page Data: BLC_PAGE, BLC_PAGE_FLD, BLC_PAGE_FLD_MAP
Structured Content Data:  BLC_SC, BLC_SC_FLD, BLC_SC_FLD_MAP

## Workflow and SandBoxes

Modifications to CMS data are controlled within a user sandbox. The user must "promote" their changes for approval and then an "Approver" must approve them before they will show on the live site.

## Example Developer Usage

You can find examples of structured content usage in "store.jsp".   The following code shows the main banner ad.

```html
<cms:content contentType="Homepage Banner Ad" contentItemVar="item">
<a href="${item.targetUrl}"><img src="${item.imageUrl}" /></a>
</cms:content>
```
