### The Basics ###
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

Notice that this implementation implements Product.  It is annotated with @Entity indicating that it is a JPA entity.  It is annotated with @Table to specify the table name.  It is also annotated with @Inheritance, specifying that it uses a joined strategy or table per subclass.  More on this later.

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
The only other things required for all of this to work within Broadleaf are:

1. The merged Persistence Unit needs to be aware of the new class:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
             version="2.0">
	<persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
        <class>com.mycompany.core.catalog.domain.HotSauceImpl</class>
        <exclude-unlisted-classes/>
</persistence>
```
2. Broadleaf's Entity Configuration needs to be aware of the new implementation, which can be done by modifying the application context for the entity configuration:
```xml
<!-- Note that this will replace Broadleaf's internal representation of "Product" with your HotSauce representation -->
<bean id="org.broadleafcommerce.core.catalog.domain.Product" class="com.mycompany.core.catalog.domain.HotSauceImpl"/>
```


Hibernate automatically uses the primary key of ProductImpl as the primary key of HotSauceImpl.  It also forces a foreign key constraint on the primary key of HotSauceImpl.  When ProductImpl is queried via JPA, Hibernate automatically does the appropriate joins to retrieve the additional data (in this case the Scoville Units) and instantiates the correct object (HotSauceImpl). 


### Single table inheritance ###
Broadleaf's default behavior for inheritance is to use a table per subclass (i.e. a joined inheritance strategy).