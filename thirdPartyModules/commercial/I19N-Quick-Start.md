Follow the steps below to add the I19n module to your project.

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

###Add `classpath:/bl-I18n-applicationContext.xml` and  `classpath:/bl-I18n-admin-applicationContext.xml`in the `<context-param />` section

```
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
    .
    classpath:/bl-I18n-admin-applicationContext.xml
    classpath:/bl-I18n-applicationContext.xml
    .
    .
    </param-value>
</context-param>
```


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




