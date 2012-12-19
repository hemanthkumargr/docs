##Broadleaf Commerce 2.1.0

###Model Changes
- In [[Customer | Customer Detail]]
	- New Table: BLC_CUSTOMER_PAYMENT
- In [[Search | Catalog Search]]
	- New Table: BLC_SEARCH_FACET_XREF 
	- New Fields in `BLC_SEARCH_FACET`: REQUIRES_ALL_DEPENDENT 
	
###Modules
####Broadleaf SEO Module
- In [[Category | CatalogMetaData Catalog Category]]
	- New Fields through embeddable `SeoMetaData`: META_DESCRIPTION, META_KEYWORDS, META_ROBOT and TITLE_FRAGMENT 
	- New Fields through embeddable `TwitterData`: TWITTER_SITE, TWITTER_CREATOR, TWITTER_CARD, TWITTER_URL, TWITTER_TITLE, TWITTER_DESCRIPTION and TWITTER_IMAGE
- In [[Product | CatalogMetaData Catalog Product]]
	- New Fields through embeddable `SeoMetaData`: META_DESCRIPTION, META_KEYWORDS, META_ROBOT and TITLE_FRAGMENT 
	- New Fields through embeddable `TwitterData`: TWITTER_SITE, TWITTER_CREATOR, TWITTER_CARD, TWITTER_URL, TWITTER_TITLE, TWITTER_DESCRIPTION and TWITTER_IMAGE

###Diagrams
- [[Admin | Admin Model]]
	- [[Change Sets | Admin Change Sets]]
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
- [[Modules | Modules Model Diagrams]]