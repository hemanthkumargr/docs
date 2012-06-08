Broadleaf Commerce provides a rich eCommerce domain right out of the box.  This domain includes, among other things, customer, catalog objects such as product and SKU, order, order item, fulfillment group, fulfillment group item, etc.  But more often than not, Broadleaf will not have all of the fields or data elements that you require for your particular domain.  Broadleaf's domain is implemented using JPA and Hibernate which allows for extensibility and even polymorphic relationships.  Since Broadleaf is an extensible, object oriented framework, you can extend Broadleaf's domain model with your own.

Assume you are developing an online store to sell hot sauce.  Broadleaf provides a domain class that generically represents a Product.  It is a reasonably comprehensive representation of a generic product, but most organizations will have additional data that needs to be added.  We should note here that some entities like Product have a one to many relationship with an attribute table.  Product attributes are essentially name/value pairs that can be used to generically add additional meta data to a product.  However, because product attributes are name/value pairs, they are often less favorable simply because they don't enforce data types, non-null fields, etc.  For that reason, it is usually favorable to extend the entity itself.

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

You cannot (should not) replace Broadleaf's entities entirely.  And why would you since they are generally POJOs and you would have to implement the same interfaces anyway?  However, you can extend those entities with your own:
```java
...
@Entity
@Table("HOT_SAUCE")
public class HotSauce extends ProductImpl {

} 
```