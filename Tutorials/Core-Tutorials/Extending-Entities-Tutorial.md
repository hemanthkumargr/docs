# Extending Entities Tutorial

### [[The Basics | Extending Entities]] ###
Broadleaf Commerce provides a rich eCommerce domain right out of the box.  This domain includes, among other things, customer, catalog objects such as product and SKU, order, order item, fulfillment group, fulfillment group item, etc.  But more often than not, Broadleaf will not have all of the fields or data elements that you require for your particular domain.  Broadleaf's entities are implemented using JPA and Hibernate which allows for extensibility and even polymorphic relationships.  Since Broadleaf is an extensible, object oriented framework, you can extend Broadleaf's entity model with your own.

Assume you are developing an online store to sell hot sauce.  Broadleaf provides a domain class that generically represents a Product.  It is a reasonably comprehensive representation of a generic product, but most organizations will have additional data that needs to be represented.  We should note here that some entities like Product have a one to many relationship with an attribute table.  Product attributes are essentially name/value pairs that can be used to generically add additional meta data to a product.  However, because product attributes are name/value pairs, they are often less favorable simply because they don't enforce data types, non-null fields, etc.  For that reason, it is usually favorable to extend the entity itself.

All of Broadleaf's entities implement an interface. For example,

```java
package org.broadleafcommerce.core.catalog.domain;
...
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table("BLC_PRODUCT")
public class ProductImpl implements Product {
    ...
}
```

Notice that this implementation implements Product.  It is annotated with @Entity indicating that it is a JPA entity.  It is annotated with @Table to specify the table name.  It is also annotated with @Inheritance, specifying that it uses a joined strategy.  More on this later.

You can not replace Broadleaf's entities entirely.  And why would you since they are generally POJOs and you would have to implement the same interfaces anyway?  However, you can extend those entities with your own:

```java
...
@Entity
@Table("HOT_SAUCE")
public class HotSauceImpl extends ProductImpl implements HotSauce {
    @Column(name="SCOVILLE_UNITS")
    private Integer scovilleUnits; //Measure of heat!
    
    ...
} 
```

Hibernate automatically uses the primary key of ProductImpl as the primary key of HotSauceImpl.  It also forces a foreign key constraint on the primary key of HotSauceImpl.  When ProductImpl is queried via JPA, Hibernate automatically does the appropriate joins to retrieve the additional data (in this case the Scoville Units) and instantiates the correct object (HotSauceImpl). The only other things required for all of this to work within Broadleaf are:

1. The merged Persistence Unit needs to be aware of the new class:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <persistence xmlns="http://java.sun.com/xml/ns/persistence"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
                 version="2.0">
            <!-- Note that this XML will get merged with Broadleaf's internal persistence unit, and your new HotSauceImpl will be added to the managed entities -->
        <persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
            <class>com.mycompany.core.catalog.domain.HotSauceImpl</class>
            <exclude-unlisted-classes/>
    </persistence>
    ```

2. Broadleaf's Entity Configuration needs to be aware of the new implementation, which can be done by modifying the application context for the entity configuration:

    ```xml
    <!-- Note that this will replace Broadleaf's internal representation of "Product" with your HotSauce representation. Also notice that it is prototype scoped. This MUST NOT be a singleton since it represents
    particular state. -->
    <bean id="org.broadleafcommerce.core.catalog.domain.Product" class="com.mycompany.core.catalog.domain.HotSauceImpl" scope="prototye"/>
    ```

### Polymorphic Relationships ###
In some cases, you may want more than one representation of a particular interface.  Broadleaf provides an example of this out of the box.  OrderItem (representing a line item in an order) is an entity in Broadleaf.  However, there are really two useful extensions of OrderItem - DiscreteOrderItem and BundleOrderItem.  DiscreteOrderItem represents an order item that references a single SKU. BundleOrderItem represents multiple SKUs as a single unit.  Both of these entities extend OrderItemImpl.  _Note: If you need to extend OrderItem, it is likely best to extend either DiscreteOrderItemImpl or BundleOrderItemImpl (or both) rather than extending OrderItemImpl directly._  Again, each of these is defined in the Persistence Unit configuration.  Each of these is also defined as a Spring Bean, keyed by its primary interface name.  When a JPA query is issued for OrderItemImpl, Hibernate is smart enough to query the extended tables and return the correct instances.  For example:

```java
//Note that the item returned may be either a DiscreteOrderItem or a BundleOrderItem
//because Hibernate issues the proper outer joins and instantiates the appropriate objects
//Type checking and casting will likely be required to operate on these specific types
public OrderItem readOrderItemById(final Long orderItemId) {
    return em.find(OrderItemImpl.class, orderItemId);
}
```

To create a new instance of OrderItem, you need to tell Broadleaf what kind of OrderItem you want. Broadleaf provides an enumeration to do this.  The DAOs provide a method for this. Here's how it works in the OrderItemDaoImpl:

```java
public OrderItem create(final OrderItemType orderItemType) {
    final OrderItem item = (OrderItem) entityConfiguration.createEntityInstance(orderItemType.getType());
    item.setOrderItemType(orderItemType);
    return item;
}
```

The OrderItemType is an enumeration whose getType() method returns the name of the interface (e.g. either DiscreteOrderItem or BundleOrderItem).  The entityConfiguration is a Spring Bean, injected into the DAO, that acts as an entity object factory.  It returns the correct implementation of the specified interface.  So, if you extend DiscreteOrderItemImpl, you would modify the entity configuration, modify the persistence unit configuration, and Broadleaf would happily continue to work with your custom entity extension.  Your UI and/or service extension(s) would simply have to cast the returned object to your custom type to get/set custom values.

To take this discussion a little bit further, let's discuss polymorphic catalog extensions.  Broadleaf has a single representation of Product - ProductImpl.  Above, we discussed how you could extend ProductImpl to create a custom HotSauce product.  But what if you have multiple product types (e.g. Hot Sauce, T-Shirts, Gift Baskets, and Cooking Classes), which are different enough that they require their own entities?  The answer is that they can each have their own entities:

```java
@Entity
@Table("GIFT_BASKET")
public class GiftBasketImpl extends ProductImpl implements GiftBaset {
    ...
}

@Entity
@Table("T_SHIRT")
public class TShirtImpl extends ProductImpl implements TShirt {
    ...
}

@Entity
@Table("COOKING_CLASS")
public class CookingClassImpl extends ProductImpl implements CookingClass {
    ...
}
```

As long as the base class (ProductImpl) is queried via JPA, the correct instances of the subclasses will be returned.  Hibernate automatically issues outer joins to the database to get the correct data and instantiates the correct objects.

In addition, you should also add these to the entity configuration:

```xml
<bean id="com.mycompany.core.catalog.domain.TShirt" class="com.mycompany.core.catalog.domain.TShirt" scope="prototype"/>

<bean id="com.mycompany.core.catalog.domain.GiftBasket" class="com.mycompany.core.catalog.domain.GiftBasketImpl" scope="prototype"/>

<bean id="com.mycompany.core.catalog.domain.CookingClass" class="com.mycompany.core.catalog.domain.CookingClassImpl" scope="prototype"/>
```

### Single table inheritance
Broadleaf's default behavior for inheritance is to use a table per subclass (i.e. a joined inheritance strategy).  This is usually preferable for smaller numbers of product types.  However, when you have dozens or hundreds of product types this can cause problems.  The reason is that when a query for a product is done, Hibernate issues an outer join on each subclass of ProductImpl.  Besides being a potential performance problem, there are limitations to what the database will allow you to do. For example, MySQL has a limit of 61 joins that can be done in a single query.  If you have more than 61 products types, joined inheritance won't work with MySQL.  The solution is to use single table inheritance. More information on JPA inheritance can be found [here](http://docs.oracle.com/cd/B32110_01/web.1013/b28221/cmp30cfg016.htm).

Broadleaf's entities are annotated with:

```java
@Inheritance(strategy = InheritanceType.JOINED)
```

Since you aren't changing core Broadleaf code to accomplish this, how can you change a class definition or a compiled core Broadleaf entity?  Broadleaf provides a Java agent that has a hook to allow byte code transformation on JPA entities. The agent is provided as a standard jar file whose Maven artifact id is "broadleaf-instrument". This must be added to the command to start the JVM.  For example, in Tomcat's catalina.sh, you can add the following line:

```java
JAVA_OPTS=-javaagent:/path/to/broadleaf-instrument.jar
```

In this case, when Tomcat starts, the instrumentation jar will be registered with the JVM. You must also modify the bean definition of the MergePersistenceUnitManager:

```xml
<bean id="blPersistenceUnitManager" class="org.broadleafcommerce.common.extensibility.jpa.MergePersistenceUnitManager">
    ...
    <property name="loadTimeWeaver">
        <bean class="org.broadleafcommerce.common.extensibility.jpa.BroadleafLoadTimeWeaver"/>
    </property>
</bean>
```

You also have to specify properties in your merged persistence.xml file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
             version="2.0">
        <!-- Note that this XML will get merged with Broadleaf's internal persistence unit, and your new HotSauceImpl will be added to the managed entities -->
    <persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
        <class>com.mycompany.core.catalog.domain.HotSauceImpl</class>
        <class>com.mycompany.core.catalog.domain.CookingClassImpl</class>
        <class>com.mycompany.core.catalog.domain.TShirtImpl</class>
        <class>com.mycompany.core.catalog.domain.GiftBasketImpl</class>
        <exclude-unlisted-classes/>
        <properties>
            ...
            <property name="broadleaf.ejb.entities.override_single_table" 
                value="org.broadleafcommerce.core.catalog.domain.ProductImpl"/>
            <property name="broadleaf.ejb.ProductImpl.discriminator.name" value="PRODUCT_TYPE"/>
            <property name="broadleaf.ejb.ProductImpl.discriminator.type" value="STRING"/>
            <property name="broadleaf.ejb.ProductImpl.discriminator.length" value="10"/>
        </properties>
</persistence>
```

Finally, you configure your entities without a table name and you will have to put an additional annotation on your extended entities:

```java
@Entity
@Inheritance(discriminatorValue="GIFT_BASKET")
public class GiftBasketImpl extends ProductImpl implements GiftBaset {
    ...
}

@Entity
@Inheritance(discriminatorValue="T_SHIRT")
public class TShirtImpl extends ProductImpl implements TShirt {
    ...
}

@Entity
@Inheritance(discriminatorValue="COOKING_CLASS")
public class CookingClassImpl extends ProductImpl implements CookingClass {
    ...
}
```

Now, at runtime, the ProductImpl class will be transformed at load time, and its inheritance annotations will be changed to single table with all of the configurations provided in the persistence.xml file. All of your products will now go in the same table, and a column called "PRODUCT_TYPE" will be used to differentiate them. Remember, with this strategy, your subclasses cannot define non-nullable columns. The reason is that they share this table with other subclasses who may not use those columns.

### Admin Considerations
Coming Soon
