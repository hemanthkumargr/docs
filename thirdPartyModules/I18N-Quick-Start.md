Follow the steps below to add the I18n module to your project. Checkout the sample project DemoSite-I18n that contains all the configuration.

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
    
###In you Project `pom.xml` add the dependency for the Broadleaf I18n module

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-I18n</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

###In your SITE `pom.xml` where you will extend  Customer, Offer, Order, ProductOptionValue, SearchFacetRange, SkuBundleItem and Sku

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-I18n</artifactId>
</dependency>
```

###In your ADMIN `pom.xml`

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-I18n</artifactId>
</dependency>
```

##Changes in `web.xml`

###Add `classpath:/bl-I18n-applicationContext.xml` in the `<context-param />` section

```
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
    .
    classpath:/bl-I18n-applicationContext.xml
    .
    .
    </param-value>
</context-param>
```
You will need to make this change to the web.xml files for your admin application and for your main site.

##Changes in `mycompanyAdmin.gwt.xml`

###Add the following line

```xml
<inherits name="org.broadleafcommerce.admin.I18nModule" />
```

##Domain Changes

###Please Note:  Category, ProductOption, ProductOptionValue, Sku, FulfillmentOption and SearchFacet domain class will be modified during runtime.
The domain classes will be transformed to embed the additional fields and methods 
using jpa transformer.  The appropriate delegate methods will also be included 
in the transformed classes for embeddable object. Due to how hibernate handles 
empty embeddables if no data is inserted into the database the embeddable object 
will remain null. To address this issue we will need to implement a lazy 
initialization of the embeddable objects. The configuration of the jpa transorm 
is in bl-I18n-applicationContext.xml

###Database Inserts for translations
Now you can insert the translations. Checkout he DemoSite-Pricelist project as an example.  The following adds translations for categories.

```sql
-- Custom store navigation in Spanish
INSERT INTO BLC_CATEGORY_TR (TRANSLATION_ID,DESCRIPTION,NAME) VALUES (1001,'Inicio','Inicio');
INSERT INTO BLC_CATEGORY_TR (TRANSLATION_ID,DESCRIPTION,NAME) VALUES (1002,'Salsas Picantes','Salsas');
INSERT INTO BLC_CATEGORY_TR (TRANSLATION_ID,DESCRIPTION,NAME) VALUES (1003,'Mercanc&iacute;a','Mercanc&iacute;a');
INSERT INTO BLC_CATEGORY_TR (TRANSLATION_ID,DESCRIPTION,NAME) VALUES (1004,'Descuento','Descuento');
INSERT INTO BLC_CATEGORY_TR (TRANSLATION_ID,DESCRIPTION,NAME) VALUES (1005,'Iniciando con Salsas?','Nuevo a la Salsa?');
INSERT INTO BLC_CATEGORY_TR (TRANSLATION_ID,DESCRIPTION,NAME) VALUES (1006,'FAQ','FAQ');
-- Custom store SKU cross reference with translations
INSERT INTO BLC_CATEGORY_TRXREF (CATEGORY_ID, TRANSLATION_ID, MAP_KEY) VALUES (2001, 1001, 'es');
INSERT INTO BLC_CATEGORY_TRXREF (CATEGORY_ID, TRANSLATION_ID, MAP_KEY) VALUES (2002, 1002, 'es');
INSERT INTO BLC_CATEGORY_TRXREF (CATEGORY_ID, TRANSLATION_ID, MAP_KEY) VALUES (2003, 1003, 'es');
INSERT INTO BLC_CATEGORY_TRXREF (CATEGORY_ID, TRANSLATION_ID, MAP_KEY) VALUES (2004, 1004, 'es');
INSERT INTO BLC_CATEGORY_TRXREF (CATEGORY_ID, TRANSLATION_ID, MAP_KEY) VALUES (2005, 1005, 'es');
INSERT INTO BLC_CATEGORY_TRXREF (CATEGORY_ID, TRANSLATION_ID, MAP_KEY) VALUES (2006, 1006, 'es');
```

##Java Agent Configuration

You will also need to configure your app container to utilize a java agent at startup to facilitate the class transformation
for the module. Spring provides an instrumentation jar for this purpose. The most convenient approach to getting this
library is to download it from maven central. This url provides easy access to different version of the spring instrument jar:

http://mvnrepository.com/artifact/org.springframework/spring-instrument

Once you have the jar, you need to place it in a convenient spot on your server's filesystem. Then, add a VM argument to
your app container's startup so that it can launch with the necessary java agent support. Something like this:

-javaagent:/path/to/your/spring-instrument-3.1.3.RELEASE.jar




