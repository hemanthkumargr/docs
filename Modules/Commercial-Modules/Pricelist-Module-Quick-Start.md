# Pricelist Quick Start

Follow the steps below to add the PriceList module to your project.  You can checkout the DemoSite-Pricelist project from github that has all theses modifications.

##Changes in `pom.xml` files 
###In you project POM Declare the the BLC snapshot repository

```xml
    <repositories>
        <repository>
            <id>public releases</id>
            <name>public releases</name>
            <url>http://www.broadleafcommerce.org/nexus/content/repositories/snapshots/</url>
        </repository>
    </repositories>
```
    
###In you Project `pom.xml` add the dependency for the Broadleaf PriceList module

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-pricelist</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

###In your SITE `pom.xml` where you will extend  Customer, Offer, Order, ProductOptionValue, SearchFacetRange, SkuBundleItem and Sku

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-pricelist</artifactId>
</dependency>
```

###In your ADMIN `pom.xml`

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-pricelist</artifactId>
</dependency>
```

##Changes in `web.xml`

###Add `classpath:/bl-pricelist-applicationContext.xml` and  `classpath:/bl-pricelist-admin-applicationContext.xml`in the `<context-param />` section

```xml
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
    .
    classpath:/bl-pricelist-admin-applicationContext.xml
    classpath:/bl-pricelist-applicationContext.xml
    .
    .
    </param-value>
</context-param>
```
##Changes in `applicationContext-filter.xml` and `applicationContext-filter-combined.xml` 

###Add `blRulesPriceListRequestFilter and blPriceListDynamicSkuPricingFilter` in the   `<sec:filter-chain pattern= />` section
We need to allow the filter so that the prices can be switched on a domain method call.

```
   <sec:filter-chain pattern="/**" filters=""
               blURLHandlerFilter,
               blRulesPriceListRequestFilter,
               blPriceListDynamicSkuPricingFilter,
               blCartStateFilter"/>
```


##Changes in `mycompanyAdmin.gwt.xml`

###Add the following line

```xml
<inherits name="com.broadleafcommerce.admin.priceListModule" />
```

##Domain Changes

###Pleaese Note:  Customer, Offer, Order, ProductOptionValue, SearchFacetRange, SkuBundleItem and Sku domain classes will me modified at run time.
The domain classes will be transformed to embed the additional fields and methods 
using jpa transformer.  The appropriate delegate methods will also be included 
in the transformed classes for embeddable object. Due to how hibernate handles 
empty embeddables if no data is inserted into the database the embeddable object 
will remain null. To address this issue we will need to implement a lazy 
initialization of the embeddable objects. The configuration of the jpa transorm 
is in bl-pricelist-applicationContext.xml



###Database Inserts 
Add the necessary module keys in the database and security statements inside load_security.sql

```sql
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (64,'Create PriceList','PERMISSION_CREATE_PRICELIST', 'CREATE');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (65,'Update PriceList','PERMISSION_UPDATE_PRICELIST', 'UPDATE');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (66,'Delete PriceList','PERMISSION_DELETE_PRICELIST', 'DELETE');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (67,'Read PriceList','PERMISSION_READ_PRICELIST', 'READ');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (68,'All PriceList','PERMISSION_ALL_PRICELIST', 'ALL');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (79,'Create PriceList Rules','PERMISSION_CREATE_PRICELISTRULE', 'CREATE');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (80,'Update PriceList Rules','PERMISSION_UPDATE_PRICELISTRULE', 'UPDATE');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (81,'Delete PriceList Rules','PERMISSION_DELETE_PRICELISTRULE', 'DELETE');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (82,'Read PriceList Rules','PERMISSION_READ_PRICELISTRULE', 'READ');
INSERT INTO BLC_ADMIN_PERMISSION (ADMIN_PERMISSION_ID, DESCRIPTION, NAME, PERMISSION_TYPE) VALUES (83,'All PriceList Rules','PERMISSION_ALL_PRICELISTRULE', 'ALL');


INSERT INTO BLC_ADMIN_ROLE_PERMISSION_XREF (ADMIN_ROLE_ID, ADMIN_PERMISSION_ID) VALUES (1,83);
INSERT INTO BLC_ADMIN_ROLE_PERMISSION_XREF (ADMIN_ROLE_ID, ADMIN_PERMISSION_ID) VALUES (2,83);
INSERT INTO BLC_ADMIN_SECTION (ADMIN_SECTION_ID, ADMIN_MODULE_ID, NAME, SECTION_KEY, URL, USE_DEFAULT_HANDLER) VALUES (26, 1, 'Price List', 'PriceList', '/pricelist', TRUE);
INSERT INTO BLC_ADMIN_SECTION (ADMIN_SECTION_ID, ADMIN_MODULE_ID, NAME, SECTION_KEY, URL, USE_DEFAULT_HANDLER) VALUES (27, 1, 'Price List Rule', 'PriceListRule', '/pricelist-rule', TRUE);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (26,64);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (26,65);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (26,66);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (26,67);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (26,68);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (27,79);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (27,80);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (27,81);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (27,82);
INSERT INTO BLC_ADMIN_SECTION_PERMISSION_XREF (ADMIN_SECTION_ID, ADMIN_PERMISSION_ID) VALUES (27,83);
     
 ```
 
 
###Database Inserts for pricing
Now you can insert the pricing data. Checkout he DemoSite-Pricelist project as an example. 
 
```sql
--create sample priceslist
INSERT INTO BLC_CURRENCY(CURRENCY_CODE, FRIENDLY_NAME, DEFAULT_FLAG) VALUES('GBP', 'GB Pound', false);
INSERT INTO BLC_CURRENCY(CURRENCY_CODE, FRIENDLY_NAME, DEFAULT_FLAG) VALUES('MXN', 'Mexican Peso', false);
INSERT INTO BLC_CURRENCY(CURRENCY_CODE, FRIENDLY_NAME, DEFAULT_FLAG) VALUES('EUR', 'EURO Dollar', false);
INSERT INTO BLC_PRICE_LIST (PRICE_LIST_ID,CURRENCY_CODE,FRIENDLY_NAME,PRICE_KEY) VALUES (2,'EUR','EUR Dollar','EUR');
INSERT INTO BLC_PRICE_LIST (PRICE_LIST_ID,CURRENCY_CODE,FRIENDLY_NAME,PRICE_KEY) VALUES (3,'GBP','GB Pound','GBP');
INSERT INTO BLC_PRICE_LIST (PRICE_LIST_ID,CURRENCY_CODE,FRIENDLY_NAME,PRICE_KEY) VALUES (4,'MXN','Mexican Peso','MXN');

--create sample pricing for few products
INSERT INTO BLC_PRICE_DATA(PRICE_DATA_ID,RETAIL_PRICE,SALE_PRICE) values(2001,21.98,21.98);
INSERT INTO BLC_SKU_PRICE_DATA(PRICE_DATA_ID,SKU_ID,MAP_KEY) VALUES (2001,1,'EUR');
INSERT INTO BLC_PRICE_DATA(PRICE_DATA_ID,RETAIL_PRICE,SALE_PRICE) values(2002,21.98,21.98);
INSERT INTO BLC_SKU_PRICE_DATA(PRICE_DATA_ID,SKU_ID,MAP_KEY) VALUES (2002,2,'EUR');

```

