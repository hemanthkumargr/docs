As of Broadleaf 2.2.0, many of our new features are being created as standalone modules that users can integrate in their application. This configuration is module-specific, but there are a few general architectural goals that we are respecting with our official modules. In this section, we will describe the extension patterns that we are employing.

## Service Extension

Often, modules will need to modify the behavior of a standard Broadleaf service. As we want to keep all modules self-contained, we are utilizing a manager/listener approach in these scenarios. For example, consider some code that filters eligible offers in `OfferServiceImpl`:

```java
public List<Offer> buildOfferListForOrder(Order order) {

    List<Offer> offers = ...
    
    removeOutOfDateOffers(offers);

    return potentialOffers;

}
```

We would like to create a hook point in this method that a module could then register itself to and perform additional filters on the list. In this scenario, we would define an interface called `OfferServiceExtensionListener` (since the hook point is inside OfferService) and declare a method:

```java
public void applyAdditionalFilters(List<Offer> offers);
```

We would then create an implementation of this interface called `OfferServiceExtensionManager`, that looks like this:

```java
public class OfferServiceExtensionManager implements OfferServiceExtensionListener {
    
    protected List<OfferServiceExtensionListener> listeners = new ArrayList<OfferServiceExtensionListener>();

    @Override
    public void applyAdditionalFilters(List<Offer> offers) {
        for (OfferServiceExtensionListener listener : listeners) {
            listener.applyAdditionalFilters(offers);
        }
    }
    
    public List<OfferServiceExtensionListener> getListeners() {
        return listeners;
    }

    public void setListeners(List<OfferServiceExtensionListener> listeners) {
        this.listeners = listeners;
    }

}
```

Once that is done, the module would create its own concrete implementation of `OfferServiceExtensionListener` and register it to the manager with the following XML:

```xml
<bean id="blOfferServiceExtensionManager" class="org.broadleafcommerce.core.offer.service.OfferServiceExtensionManager">
    <property name="listeners">
        <list>
            <bean class="org.broadleafcommerce.pricelist.extension.PriceListOfferServiceExtensionListener" />
        </list>
    </property>
</bean>
```

## Entity Extension

In addition to extending services, standalone modules may need to add attributes to core Broadleaf entities, such as Product or Category. To enable this modification to take place without actually modifying the core entities, we have put a JPA class transformer in place to take care of this for you. This transformer will add in required fields, methods, and interfaces to JPA entities at runtime, and requires you to specify the Spring instrumentation JAR as a javaagent in your application server startup configuration. See [[Module Instrumentation Setup]] for more details on this specific step.

A module that wishes to modify an entity at runtime must have a template file containing the fields, methods, and interfaces that should be copied over. For example, let's examine a snippet of the Catalog MetaData `SeoProduct.java`:

```java
public class SeoProduct implements SeoMetaData {

    @Embedded
    protected SeoMetaDataImpl embeddableSeoMetaData;

    @Override
    @Nullable
    public String getMetaDescription() {
        setSeoProductInitialValues();
        return embeddableSeoMetaData.getMetaDescription();
    }

    @Override
    public void setMetaDescription(@Nullable String metaDescription) {
        setSeoProductInitialValues();
        embeddableSeoMetaData.setMetaDescription(metaDescription);
    }

    ...
}
```

This class must then be registered with the following XML:

```xml
 <bean id="blSeoClassTransformer" class="org.broadleafcommerce.common.extensibility.jpa.copy.DirectCopyClassTransformer">
    <constructor-arg name="moduleName" value="CatalogMetaData" />
    <property name="xformTemplates">
        <map>
            <entry>
                <key><value>org.broadleafcommerce.core.catalog.domain.ProductImpl</value></key>
                <value>org.broadleafcommerce.seo.weave.catalog.domain.SeoProduct</value>
            </entry>
        </map>
    </property>
</bean>
```

> Note: As a user, you will not need to configure this bean yourself, as it should be provided for you in the module's application context file. The only thing you need to do is ensure that application context is referenced by your web.xml

As you can see, we are registering a transformer, `SeoProduct`, that will affect `ProductImpl`. It will copy over all interfaces from the template file (`SeoMetaData` in this case), along with all fields and methods. Note that annotations will be copied over as well, but you cannot define an inline instantiation for member variables. For example,

```java
protected SeoMetaDataImpl embeddableSeoMetaData = new SeoMetatDataImpl();
```

would be copied over as

```java
protected SeoMetaDataImpl embeddableSeoMetaData;
```

With this instrumentation in place, you are able to use reflective tools, such as PropertyUtils, to pull fields from Product directly - `metaDescription` in the above example. You are also able to cast your object as appropriate and get to the properties, like so:

```java
Product p = ...
((SeoMetaData) p).getMetaDescription();
```

Note that these transformations will result in direct database changes to your tables. In this example, you would have ended up with an additional column in `BLC_PRODUCT` called `META_DESCRIPTION`, which comes from the field annotated with `@Embeddable`. Module changes to the database can be found on the [[Database Model]] page.
    

