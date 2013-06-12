# Broadleaf SEO Tutorial

Follow the steps below to add the Broadleaf-SEO module to your project.

## Changes in `pom.xml` files

### In you project POM Declare the the BLC snapshot repository

```xml
    <repositories>
        <repository>
            <id>public releases</id>
            <name>public releases</name>
            <url>http://www.broadleafcommerce.org/nexus/content/repositories/snapshots/</url>
        </repository>
    </repositories>
```
    
### In you Project `pom.xml` add the dependency for the Broadleaf SEO module

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-seo</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

### In your SITE `pom.xml` where you will extend either Category and/or Product

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-seo</artifactId>
</dependency>
```

### In your ADMIN `pom.xml`

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-seo</artifactId>
</dependency>
```

##Changes in `web.xml`

### Add `classpath:/bl-seo-applicationContext.xml` in the `<context-param />` section

```xml
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
    .
    classpath:/bl-seo-applicationContext.xml
    .
    .
    </param-value>
</context-param>
```

## Changes in `mycompanyAdmin.gwt.xml`

### Add the following line

```xml
<inherits name="org.broadleafcommerce.admin.seoModule" />
```

## Domain Changes

### Extend Category and/or Product
Be sure you are comfortable with [[extending entities | Extending Entities Tutorial]] before continuing on.

```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "SEO_PRODUCT")
public class MyProductImpl extends ProductImpl implements Product, SeoMetaData, TwitterData {…}
```


### Embed the SeoData objects that you want to add

```java
@Embedded
protected SeoMetaDataImpl seoMetaData = new SeoMetaDataImpl();

@Embedded
protected TwitterData embeddableTwitterData = new TwitterDataImpl();
```

### Implement Delegate Methods
Your IDE should have the functionality to implement delegate methods (Generate code > Delegate Methods). 

We will need to take a few addiational steps to make sure that our embeddable object is always present. Due to how hibernate handles empty embeddables if no data is inserted into the database the embeddable object will remain null. To address this issue we will need to implement a lazy initialization of the embeddable objects. 

```java
protected void initializeSeoMetaData(){
    if(seoMetaData == null){
        seoMetaData = new SeoMetaDataImpl();
    }
}
```

Include the initialization method in all delegate methods.

```java
@Override
@Nullable
public String getMetaKeywords() {
    initializeSeoMetaData();
    return seoMetaData.getMetaKeywords();
}
```

### Returning default values
When applicable, we recommend defaulting to category/product values for when none are available in the data fields added in the Broadleaf SEO module. You can do so by replacing your `return` statement. Here is an example using product description.

```java
return seoMetaData.getMetaDescription() != null ? seoMetaData.getMetaDescription() : super.getLongDescription();    
```

## HTML changes
You will now be able to use the  `<blc:head>` tag by adding the following parameters. The head processors will handle the object and add the appropriate seoMeta or Twitter Data if it is available.

### Samples in category.html and product.html

`<blc:head seoData="${category}" />` and `<blc:head seoData="${product}" />`

###In `head.htm` you now have access to the SEO values which will need to be inserted in meta-tags

```html
<seo:seometadata seoMetaData="${seoMetaData}" />
<seo:twitterdata twitterData="${twitterData}" />
```

### To use the ImageProcessor (which will default to using the name of the image as the alt text)

```html
<seo:img src="@{*{media['primary'].url}}" />
```