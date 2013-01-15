Follow the steps below to add the Advanced Offer module to your project.  You can checkout the DemoSite-AdvancedOffer project from github that has all theses modifications.

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
    
###In you Project `pom.xml` add the dependency for the Broadleaf AdvancedOffer module

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-advanced-offer</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

###In your SITE `pom.xml` where you will extend  Customer, Offer, Order, ProductOptionValue, SearchFacetRange, SkuBundleItem and Sku

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-advanced-offer</artifactId>
</dependency>
```

###In your ADMIN `pom.xml`

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-advanced-offer</artifactId>
</dependency>
```

##Changes in `web.xml`

###Add `classpath:/bl-advancedOffer-applicationContext.xml` and  `classpath:/bl-advancedOffer-admin-applicationContext.xml`in the `<context-param />` section

```xml
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
    .
    classpath:/bl-advancedOffer-admin-applicationContext.xml
    classpath:/bl-advancedOffer-applicationContext.xml
    .
    .
    </param-value>
</context-param>
```
##Changes in `applicationContext-filter.xml` and `applicationContext-filter-combined.xml` 


##Changes in `mycompanyAdmin.gwt.xml`

###Add the following line

```xml
<inherits name="org.broadleafcommerce.admin.advancedOfferModule" />
```

##Domain Changes

###Pleaese Note:   Offer domain class will me modified at run time.
The domain classes will be transformed to embed the additional fields and methods 
using jpa transformer.  The appropriate delegate methods will also be included 
in the transformed classes for embeddable object. Due to how hibernate handles 
empty embeddables if no data is inserted into the database the embeddable object 
will remain null. To address this issue we will need to implement a lazy 
initialization of the embeddable objects. The configuration of the jpa transorm 
is in bl-advancedOffer-applicationContext.xml



 
 
###Database Inserts for offers
Now you can insert the pricing data. Checkout he DemoSite-AdvancedOffer project as an example. 
 
```sql

```

