# Database Model

##Broadleaf Commerce 2.2.0

### 2.1 to 2.2 Model Changes
- In [[Admin | Admin Model]]
    - New Table: BLC_ADMIN_MODULE
    - New Table: BLC_ADMIN_SECTION
    - New Table: BLC_ADMIN_SECTION_PERMISSION_XREF
- In [[Common]]
    - New Table: BLC_CURRENCY
    - New Fields in `BLC_LOCALE`: CURRENCY_CODE 
- In [[Category | Catalog Category]]
    - New Fields in `BLC_CATEGORY`: FULFILLMENT_TYPE, INVENTORY_TYPE 
- In [[Search | Catalog Search]]
    - New Fields in `BLC_FIELD`: TRANSLATABLE
- In [[Fulfillment | Order Fulfillment]]
    - New Fields in `BLC_FULFILLMENT_OPTION_FIXED`: CURRENCY_CODE
- In [[Detail | Order Detail]]
    - New Fields in `BLC_ORDER`: LOCALE_CODE, CURRENCY_CODE
- In [[Payment | Order Payment]]
    - New Fields in `BLC_PAYMENT_RESPONSE_ITEM`: CURRENCY_CODE
    - New Fields in `BLC_PAYMENT_LOG`: CURRENCY_CODE
- In [[Tax | Order Tax]]
    - New Fields in `BLC_TAX_DETAIL`: CURRENCY_CODE
- In [[Sku | Catalog Sku]]
    - New Fields in `BLC_SKU`: FULFILLMENT_TYPE, INVENTORY_TYPE
    - New Fields in `BLC_SKU_FEE`: CURRENCY_CODE
- In [[Social]]
    - New Table: BLC_UserConnection     


### 2.0 to 2.1 Model Changes
- In [[Customer | Customer Detail]]
    - New Table: BLC\_CUSTOMER\_PAYMENT
- In [[Search | Catalog Search]]
    - New Table: BLC\_SEARCH\_FACET\_XREF
    - New Fields in `BLC\_SEARCH\_FACET`: REQUIRES\_ALL\_DEPENDENT

### Diagrams
- [[Admin | Admin Model]]
    - [[Change Sets | Admin Change Sets]]
    - [[Modules | Admin Modules]]
    - [[Security | Admin Security]]
- [[Catalog | Catalog Model]]
    - [[Category | Catalog Category]]
    - [[Product | Catalog Product]]
    - [[Reviews | Catalog Reviews]]
    - [[Search | Catalog Search]]
    - [[Sku | Catalog Sku]]
- [[CMS | CMS Model]]
    - [[Field | CMS Field]]     
    - [[Page | CMS Page]]
    - [[Static Asset | CMS Static Asset]]
    - [[Structured Content | CMS Structured Content]]
- [[Customer | Customer Model]]
    - [[Detail | Customer Detail]]
- [[Offer | Offer Model]]
    - [[Detail | Offer Detail]]
- [[Order | Order Model]]
    - [[Detail | Order Detail]]
    - [[Fulfillment | Order Fulfillment]]
    - [[Payment | Order Payment]]
    - [[Tax | Order Tax]]
- [[Other | Other Model]]
    - [[Common]]
    - [[Email Tracking]]
    - [[Fulfillment]]
    - [[Social]]
- [[Modules | Modules Model]]
    - [[PriceLists]]
    - [[AdvancedSearch]]
    - [[I18n]]
