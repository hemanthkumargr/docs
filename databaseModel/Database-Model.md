##Broadleaf Commerce 2.2.0

###2.1 to 2.2 Model Changes
- In [[[Admin | Admin Model]]
	- New Table: BLC_ADMIN_MODULE
	- New Table: BLC_ADMIN_SECTION
	- New Table: BLC_ADMIN_SECTION_PERMISSION_XREF
- In [[Common]]
	- New Table: BLC_CURRENCY
	- New Fields in `BLC_LOCALE`: CURRENCY_CODE 
- In [[Category | Catalog Category]]
	- New Fields in `BLC_CATEGORY`: FULFILLMENT_TYPE, INVENTORY_TYPE 

- In [[Customer | Customer Detail]]
	- New Table: BLC_CUSTOMER_PAYMENT
- In [[Search | Catalog Search]]
	- New Table: BLC_SEARCH_FACET_XREF 
	- New Fields in `BLC_SEARCH_FACET`: FULFILLMENT_TYPE, INVENTORY_TYPE 

###Diagrams
- [[Admin | Admin Model]]
	- [[Change Sets | Admin Change Sets]]
	- [[Modules | Admin Modules]]
	- [[Security | Admin Security]]
- [[Catalog]]
 	- [[Category | Catalog Category]]
	- [[Product | Catalog Product]]
	- [[Reviews | Catalog Reviews]]
	- [[Search | Catalog Search]]
	- [[Sku | Catalog Sku]]
- [[CMS]]
	- [[Field | CMS Field]]		
	- [[Page | CMS Page]]
	- [[Static Asset | CMS Static Asset]]
	- [[Structured Content | CMS Structured Content]]
- [[Customer]]
	- [[Detail | Customer Detail]]
- [[Offer]]
	- [[Detail | Offer Detail]]
- [[Order]]
	- [[Detail | Order Detail]]
	- [[Fulfillment | Order Fulfillment]]
	- [[Payment | Order Payment]]
	- [[Tax | Order Tax]]
- [[Other]]
	- [[Common]]
	- [[Email Tracking]]
	- [[Fulfillment]]
- [[Modules]]