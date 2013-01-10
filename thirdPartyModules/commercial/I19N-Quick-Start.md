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

###Extend Category, ProductOption, ProductOptionValue, Sku, FulfillmentOption and SearchFacet.
Be sure you are comfortable with [[extending entities | Extending Entities Tutorial]] before continuing on.

```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "BLC_PRODUCT_OPTION_VAL_TR")
public class MyProductOptionValueImpl extends ProductOptionValueImpl implements I18NProductOptionValue {…}
```


###Embed the ProductOptionValueTranslation object that you want to add

```java
@Embedded
protected I18NProductOptionValueImpl i18nExtension = new I18NProductOptionValueImpl();

```

###Implement Delegate Methods 
Your IDE should have the functionality to implement delegate methods (Generate code > Delegate Methods). 

We will need to take a few addiational steps to make sure that our embeddable object is always present. Due to how hibernate handles empty embeddables if no data is inserted into the database the embeddable object will remain null. To address this issue we will need to implement a lazy initialization of the embeddable objects. 

```java
protected void initializeTranslations(){
    if(i18nExtension == null){
        i18nExtension = new I18NProductOptionValueImpl();
    }
}
```

Include the initialization method in all delegate methods.

```java
@Override
@Nullable
public String getAttributeValue() {
    initializeTranslations();
    return i18nExtension.getAttributeValue();
}
```



