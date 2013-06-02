# Persistence Configuration

To properly configure Broadleaf's persistence system, we will need to follow a few steps. Outlined below are descriptions of how to set up the persisntence unit beans, datasources, and also the necessary persistence XML configurations. Lastly, we will cover utilizing Ehcache to improve performance.

## <a name="wiki-pu-config" />Persistence Unit Configuration

Broadleaf provides a default application context file for configuring data sources.  By default, Broadleaf uses 3 data sources.  The first is the "webDS", or main data source containing most of the tables used by Broadleaf Commerce.  The second is the "webSecureDS" which is meant to provide a secure data source for tables that contain things like payment information in a PCI compliant situation.  The third data source, "webContentDS", is a data source to store content-managed data such as page snippets.  For simplicity, and in many real-world cases, it will be preferable to store all data in the same database or schema.  The ability to separate them is provided as a convenience in cases where architects, DBAs, or system administrators require it.  Broadleaf uses JNDI, by default, to provide data sources.  This is a very common approach for many organizations.  It allows system administrators to keep the database connection configuration separate from the code base, but allows a standard and consistent way to access database resources across multiple environments.  Here is a snippet from the default Broadleaf data source configuration found in `/WEB-INF/applicationContext-datasource.xml`:

```xml
<jee:jndi-lookup id="webDS" jndi-name="jdbc/web"/>
<jee:jndi-lookup id="webSecureDS" jndi-name="jdbc/secure"/>
<jee:jndi-lookup id="webStorageDS" jndi-name="jdbc/storage"/>
```

> Even though you must use three distinct JNDI sources, it is ok that they point to the same database

The next thing to note is the /WEB-INF/web.xml file, which should have the JNDI resource defined:

```xml
<resource-ref>
  <res-ref-name>jdbc/web</res-ref-name>
  <res-type>javax.sql.DataSource</res-type>
  <res-auth>Container</res-auth>
</resource-ref>
```

Next, we need to define our datasources in `applicationContext.xml` for Broadleaf to merge in. This looks like this:

```xml
<bean id="blMergedDataSources" class="org.springframework.beans.factory.config.MapFactoryBean">
    <property name="sourceMap">
        <map>
            <entry key="jdbc/web" value-ref="webDS"/>
            <entry key="jdbc/webSecure" value-ref="webSecureDS"/>
            <entry key="jdbc/cmsStorage" value-ref="webStorageDS"/>
        </map>
    </property>
</bean>
```

Lastly, we have to specify the location of our `persistence.xml` files for the application. We do that like so:

```xml
<bean id="blMergedPersistenceXmlLocations" class="org.springframework.beans.factory.config.ListFactoryBean">
    <property name="sourceList">
        <list>
            <value>classpath*:/META-INF/persistence.xml</value>
        </list>
    </property>
</bean>
```

These properties will get merged into the `blPersistenceUnitManager` by Broadleaf. We will discuss the persistence unit post processors later.

### Additional Persistence Units

It may be necessary to define additional persistence units for your application (over and above those persistence units required by Broadleaf). Additional configuration is required to account for this. Here's how to achieve this.

In the `blMergedDataSources` bean defined above, we list various available datasources. First, we must add a new one:

```xml
<entry key="jdbc/myData" value-ref="myDS"/>
```

Second, you would add a new datasource bean. Again, you can use any method of acquiring a valid datasource via Spring. Here's one that uses JNDI:

```xml
<jee:jndi-lookup id="myDS" jndi-name="jdbc/myDS"/>
```

Here, we have created a new entity manager factory for our new persistence unit. Please note, all persistence units (even your additional persistence unit) are managed through the original `blPersistenceUnitManager`. You can use this approach to build in as many persistence units as you like.

```xml
<bean id="entityManagerFactoryMyPU" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
    <property name="persistenceUnitManager" ref="blPersistenceUnitManager"/>
    <property name="persistenceUnitName" value="myPU"/>
    <property name="jpaVendorAdapter">
        <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter"/>
    </property>
</bean>
```

## <a name="wiki-pxml-config" />Persistence XML Configuration

Your managed entities, mapping files and datasource properties are specified inside your `persistence.xml` file(s). Here is an example that supports the minimal persistence unit configuration for Broadleaf:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd"
             version="2.0">
             
    <persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
        <non-jta-data-source>jdbc/web</non-jta-data-source>
        <exclude-unlisted-classes/>
    </persistence-unit>
    
    <persistence-unit name="blSecurePU" transaction-type="RESOURCE_LOCAL">
        <non-jta-data-source>jdbc/webSecure</non-jta-data-source>
        <exclude-unlisted-classes/>
    </persistence-unit>

    <persistence-unit name="blCMSStorage" transaction-type="RESOURCE_LOCAL">
        <non-jta-data-source>jdbc/cmsStorage</non-jta-data-source>
        <exclude-unlisted-classes/>
    </persistence-unit>
</persistence>
```

In this example, we have configured the minimal information for the required persistence units. In this case, we have told the ORM provider to exclude unlisted classes: `<exclude-unlisted-classes/>`. Auto-scanning of jars for entities will be disabled. We highly suggest you keep this configuration in place, as it reduces the amount of time required to launch a Broadleaf-based application by not forcing all entities to be loaded by all entity managers. This becomes increasingly important in multi-persistence unit environments with many entities.

Since we use JPA and Hibernate, we can specify properties that control the behavior of the persistence unit.  For example, one popular property when working with JPA and Hibernate is the database dialect.  Normally, you would configure this with JPA in the persistence.xml file like this:

```xml
<properties>
    <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLInnoDBDialect"/>
</properties>
```

However, Broadleaf provides a mechanism to easily control this behavior on a per-environment basis. Why do you need this?  Well the answer is that many things can and do change between environments. But, since these are defined inside the war, you don't want to re-build for every environment. Many QA departments require the same binary war that is certified for QA to be deployed to production. This restricts being able to build with new properties for each environment.  For example, perhaps you want the following configuration in your local environment:
```xml
<properties>
  <property name="hibernate.hbm2ddl.auto" value="create-drop" />
  <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLInnoDBDialect"/>
  <property name="hibernate.show_sql" value="true"/>
  <property name="hibernate.cache.use_second_level_cache" value="true"/>
  <property name="hibernate.cache.use_query_cache" value="true"/>
  <property name="hibernate.hbm2ddl.import_files" value="/sql/import.sql"/>
</properties>
```

But you want this in production:
```xml
<properties>
  <property name="hibernate.hbm2ddl.auto" value="validate" />
  <property name="hibernate.dialect" value="org.hibernate.dialect.Oracle10gDialect"/>
  <property name="hibernate.show_sql" value="false"/>
  <property name="hibernate.cache.use_second_level_cache" value="true"/>
  <property name="hibernate.cache.use_query_cache" value="true"/>
  <!--property name="hibernate.hbm2ddl.import_files" value="/sql/import.sql"/-->
</properties>
```

Spring allows you to define Persistence Unit Post Processors on the Persistence Manager.  Broadleaf provides a JPAPropertiesPersistenceUnitPostProcessor to allow you to substitute the correct properties at runtime.  The property name is simply a property name defined by the persistence provider (e.g. [[Hibernate|http://docs.jboss.org/hibernate/entitymanager/3.6/reference/en/html/configuration.html]] in this case), pre-pended with the persistence unit name and a period (e.g. "blPU.").  The property names are matched and associated with the correct persistence unit.  The values are replaced according to the [[Runtime Environment Configuration|Runtime Environment Configuration]].  If you wish to remove a property or ensure that it is simply not considered, set the value to "null" in the runtime properties. So, the following persistenceUnitPostProcessor property:

```
<entry key="blPU.hibernate.dialect" value="${blPU.hibernate.dialect}"/>
```

And a properly configured runtime properties file with the following entry:

```
blPU.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
```

Will result in a persistence unit property, for the blPU persistence unit only, that looks like this:

```
<property key="hibernate.dialect" value="org.hibernate.dialect.Oracle10gDialect"/>
```

This allows you to pre-configure all of your persistence unit properties for their respective environments without the need to change them at build or deployment time.

Commonly used properties: 

```text
blPU.hibernate.hbm2ddl.auto
blPU.hibernate.dialect
blPU.hibernate.show_sql
blPU.hibernate.cache.use_second_level_cache
blPU.hibernate.cache.use_query_cache
blPU.hibernate.hbm2ddl.import_files
```

> Note: These properties are the same for all three persistence units. Therefore, the initial prefix could be either `blPU`, `blCMSStorage`, or `blSecurePU`.


### Persisting Additional Entities

At times, you may find it necessary to add your own entities (either extensions or new) to one or more of the Broadleaf persistence units. To configure a new mapping file and a class for our MyEntity implementation, we can add the following two lines to `blPU` persistence unit defined above:

```xml
<mapping-file>config/MyEntity.orm.xml</mapping-file>
<class>org.mycompany.domain.MyEntityImpl</class>
```

This will result in the entity being persisted in the `blPU` persistence unit. Next, let's take a look at persisting entities in a custom persistence unit.

### Persisting Additional Entities in a Custom Persistence Unit

This is very similar to how we configured the entity in the `blPU` - the only difference is we will define an entirely new persistence unit called `myPU`. Also, since this is an entirely new persistence unit (not one that is defined by Broadleaf), it's up to you to decide how to configure the persistence unit. In this case, we have set a number of properties related to cache, transactions, etc. Please refer to the ORM provider documentation for available properties, which you can find [here](http://docs.jboss.org/hibernate/stable/entitymanager/reference/en/html/configuration.html).

```xml
<persistence-unit name="myPU" transaction-type="RESOURCE_LOCAL">
    <non-jta-data-source>jdbc/myData</non-jta-data-source>
    <mapping-file>config/MyEntity.orm.xml</mapping-file>
    <class>org.myCompany.domain.MyEntityImpl</class>
    <exclude-unlisted-classes/>
    <!-- Properties can be set here just as above, using the MergePersistenceUnitManager -->
</persistence-unit>
```

## <a name="wiki-ehcache-config" />Ehcache Configuration

Broadleaf internally uses Ehcache as its cache provider implementation. You have an opportunity to add to the configuration of this cache provider in the persistence XML file we've been working in.

Let's try it out:

```xml
<bean id="blCacheManager" class="org.broadleafcommerce.common.extensibility.cache.ehcache.MergeEhCacheManagerFactoryBean">
    <property name="shared" value="true"/>
    <property name="configLocations">
        <list>
            <value>classpath:my-ehcache.xml</value>
        </list>
    </property>
</bean>
```

In this example, we add the `blCacheManager` bean using the Broadleaf class `org.broadleafcommerce.extensibility.cache.ehcache.MergeEhCacheManagerFactoryBean` and specify a `configLocations` property that points to our custom ehcache config file: `my-ehcache.xml`. `MergeEhCacheManagerFactoryBean` will take the values specified in `my-ehcache.xml` and merge them with the internal Broadleaf cache configuration values. You may specify as many additional cache configuration files as you like. Note - for the merge to work, your cache manager bean must use the id `blCacheManager` so that Broadleaf will properly recognize it at runtime.
