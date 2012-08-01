In this tutorial, we're going to cover how to extend the actual `CustomerImpl` object so that we can keep track of a couple of new attributes directly on the object. We're going to create some variables to keep track of the average heat level of sauces that a customer buys so that we can display some special text for our hottest sauce eaters.

## Extending CustomerImpl

There are a few steps to extending an entity in Broadleaf:

1. Create the extension class
2. Notify the persistence unit about your new class
3. Set this class as the default for the parent interface in the Broadleaf Entity Configuration

### Create the extension class

Since customers are shared between the admin application and the site application, we want to create our objects in the `core` submodule so that both admin and site can share them.

Let's begin by creating our interface that will extend `Customer`:

```java
public interface HCCustomer extends Customer {

    public Integer getAverageHeatRatingBought();

    public Integer getNumSaucesBought();

    public void setNumSaucesBought(Integer numSaucesBought);

    public Integer getTotalHeatRating();

    public void setTotalHeatRating(Integer totalHeatRating);
}
```

and our implementation of that interface:


```java
@Entity
@Table(name = "HC_CUSTOMER")
public class HCCustomerImpl extends CustomerImpl implements HCCustomer {
    private static final long serialVersionUID = 6545097668293683751L;

    @Column(name = "NUM_SAUCES_BOUGHT")
    protected Integer numSaucesBought = 0;
    
    @Column(name = "TOTAL_HEAT_RATING")
    protected Integer totalHeatRating = 0;
    
    @Override
    public Integer getAverageHeatRatingBought() {
        if (numSaucesBought == null || numSaucesBought == 0) {
            return 0;
        }
        return totalHeatRating / numSaucesBought;
    }

    @Override
    public Integer getNumSaucesBought() {
        return numSaucesBought;
    }

    @Override
    public void setNumSaucesBought(Integer numSaucesBought) {
        this.numSaucesBought = numSaucesBought;
    }

    @Override
    public Integer getTotalHeatRating() {
        return totalHeatRating;
    }

    @Override
    public void setTotalHeatRating(Integer totalHeatRating) {
        this.totalHeatRating = totalHeatRating;
    }
}
```

> Note that these two objects should be in the core submodule. I chose the package `com.mycompany.profile.core.domain` for them.

### Notify the persistence unit

In `persistence.xml` in site/src/main/resources/META-INF, add the following line to the  `blPU` 

```xml
<class>com.mycompany.profile.core.domain.HCCustomerImpl</class>
```

which will make it look like this:

```xml
<persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
    <non-jta-data-source>jdbc/web</non-jta-data-source>
    <class>com.mycompany.profile.core.domain.HCCustomerImpl</class>
    <exclude-unlisted-classes/>
    <properties>
        <property name="hibernate.hbm2ddl.auto" value="create-drop"/>
        <property name="hibernate.dialect" value="org.hibernate.dialect.HSQLDialect"/>
        <property name="hibernate.show_sql" value="false"/>
        <property name="hibernate.cache.use_second_level_cache" value="true"/>
        <property name="hibernate.cache.use_query_cache" value="true"/>
        <property name="hibernate.hbm2ddl.import_files" value="/sql/load_admin_security.sql,
                                                               /sql/load_admin_users.sql,
                                                               /sql/load_code_tables.sql,
                                                               /sql/load_table_sequences.sql,
                                                               /sql/load_catalog_data.sql,
                                                               /sql/load_content_structure.sql,
                                                               /sql/load_content_data.sql"/>

    </properties>
</persistence-unit>
```

We also want to add the same line to the `blPU` in `admin/src/main/resources/META-INF/persistence-admin.xml`:

```xml
<persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
    <non-jta-data-source>jdbc/web</non-jta-data-source>
    <class>com.mycompany.profile.core.domain.HCCustomerImpl</class>
    <exclude-unlisted-classes/>
    <properties>
        <property name="hibernate.hbm2ddl.auto" value="update"/>
        <property name="hibernate.dialect" value="org.hibernate.dialect.HSQLDialect"/>
        <property name="hibernate.show_sql" value="false"/>
    </properties>
</persistence-unit>
```

### Set the default Entity Configuration

We now need to instruct the EntityConfiguration to load our new overriden Customer class when it wants to create a Customer. The first thing to do is create a new file to hold our new entity configurations. Again, since we want this to be shared between admin and site, the most appropriate place to put the new file is in core.

I chose the path `core/src/main/resources/applicationContext-entity.xml`. Here are the contents of the file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <!-- Note that this will replace Broadleaf's internal representation 
    of "Product" with your HotSauce representation. Also notice that it 
    is prototype scoped. This MUST NOT be a singleton since it represents 
    particular state. -->
    <bean id="org.broadleafcommerce.profile.core.domain.Customer"
        class="com.mycompany.profile.core.domain.HCCustomerImpl"
        scope="prototype"/>
</beans>
```

Finally, we need to register this `applicationContext-entity.xml` file with the EntityConfiguration so that it knows to scan for definitions inside the file.

In our `site/src/main/webapp/WEB-INF/applicationContext.xml` file, we can add:

```xml
<bean id="blEntityConfiguration" class="org.broadleafcommerce.common.persistence.EntityConfiguration">
    <property name="entityContexts">
        <list>
            <value>classpath:applicationContext-entity.xml</value>
        </list>
    </property>
</bean>
```

For reference, here are the classes that were invovled in this tutorial:

![Modified Classes](/images/customer-extension-tutorial-1.png)

And there we go! Whenever we create a new Customer via Broadleaf (for example: `customerService.createCustomer()`, an `HCCustomerImpl` instance will be generated instead of the typical `CustomerImpl`. This instance obviously has the extra fields that we added.

Subsequent modifications to other Broadleaf entities would be handled in the same way.

## Displaying the new average heat level

Let's show the customer their average hot sauce heat level! For our example, we'll show them this information in the header bar, next to their name.

The welcome message is in `site/src/main/webapp/templates/partials/header.html`.

All we need to do is change this line:

```html
<span th:text="${'Welcome, ' + customer.firstName}"></span>  
```

to 

```html
<span th:text="${'Welcome, ' + customer.firstName + ' (' + customer.averageHeatRatingBought + ')'}"></span>  
```

and we'll be in business. Yep, it's really that easy!

Of course, right now, all customers would have an average heat rating of 0 since we're not saving information anywhere. That's demonstrated in our next tutorial, [[hooking into the order submit workflow | Order Submit Workflow For Heat Clinic Tutorial]], so go check it out!
