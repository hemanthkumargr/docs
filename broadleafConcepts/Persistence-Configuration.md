**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

## Overview

To properly configure Broadleaf's persistence system, we will need to follow a few steps. Outlined below are descriptions of how to set up the persisntence unit beans, datasources, and also the necessary persistence XML configurations. Lastly, we will cover utilizing Ehcache to improve performance.

## <a name="wiki-pu-config" />Persistence Unit Configuration

### Minimal

Let's take a look at a simple configuration for the persistence unit manager found in an applicationContext file:

```xml
<bean id="blPersistenceUnitManager" class="org.broadleafcommerce.common.extensibility.jpa.MergePersistenceUnitManager">
    <property name="persistenceXmlLocations">
        <list>
            <value>classpath*:/META-INF/persistence-container.xml</value>
        </list>
    </property>
    <property name="dataSources">
        <map>
            <entry key="jdbc/web" value-ref="blDS"/>
            <entry key="jdbc/webSecure" value-ref="blDS"/>
        </map>
    </property>
    <property name="defaultDataSource" ref="blDS"/>
</bean>

<bean id="blDS" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="${MYSQL_URL}" />
    <property name="username" value="${MYSQL_USERNAME}" />
    <property name="password" value="${MYSQL_PASSWORD}" />
</bean>
```

The first bean, `blPersistenceUnitManager`, is responsible for defining the persistence xml file(s) used in your codebase, as well as the datasources used. You must provide at least one persistence xml file and define datasource(s) for at least the `jdbc/web` and `jdbc/websecure` entries (these entries correspond to the blPU and blSecurePU persistence units specified in your persistence xml). 

**For the merge facility to properly combine your persistence unit configuration with that of Broadleaf, your bean id must match the expected bean id - blPersistenceUnitManager.**

The second bean, `blDS`, is referenced by `blPersistenceUnitManager` and provides the actual pool of datasources used to connect to the database(s). `blDS` is an example id - you may give this bean whatever ID you like. In this example, standard Ant notation is used to reference environment properties that Spring will inject during the creation of this bean. Visit the [[Runtime Environment Configuration]] guide to learn more.

As an alternative, you may want to reference your datasource(s) via JNDI instead:

```xml
<bean id="blDS" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:/comp/env/jdbc/web"/>
</bean>
```

Any method of acquiring a valid datasource via Spring is acceptable.

### Additional Persistence Units

It may be necessary to define additional persistence units for your application (over and above those persistence units required by Broadleaf). Additional configuration is required to account for this. Here's how to achieve this.

In the `blPersistenceUnitManager` bean defined above, we list various available datasources. First, we must add a new one:

```xml
<entry key="jdbc/myData" value-ref="myDS"/>
```

Second, you would add a new datasource bean. Again, you can use any method of acquiring a valid datasource via Spring. Here's one that uses JNDI:

```xml
<bean id="myDS" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:/comp/env/jdbc/mydatasource"/>
</bean>
```

Here, we have created a new entity manager factory for our new persistence unit. Please note, all persistence units (even your additional persistence unit) are managed through the original blPersistenceUnitManager. You can use this approach to build in as many persistence units as you like.

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

### Minimal

Your managed entities, mapping files and datasource properties are specified inside your persistence xml file(s). Here is an example that supports the minimal persistence unit configuration for Broadleaf:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_1_0.xsd"
             version="1.0">

    <persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
        <non-jta-data-source>jdbc/web</non-jta-data-source>
        <exclude-unlisted-classes/>
        <properties>
            <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLInnoDBDialect"/>
            <property name="hibernate.archive.autodetection" value="false" />
        </properties>
    </persistence-unit>

    <persistence-unit name="blSecurePU" transaction-type="RESOURCE_LOCAL">
        <non-jta-data-source>jdbc/webSecure</non-jta-data-source>
        <exclude-unlisted-classes/>
        <properties>
            <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLInnoDBDialect"/>
            <property name="hibernate.archive.autodetection" value="false" />
        </properties>
    </persistence-unit>
</persistence>
```

In this example, we have configured the minimal information for the 2 required persistence units: blPU and blSecurePU. Here, we define the datasource name we want to associate with the persistence unit:

```xml
<non-jta-data-source>jdbc/web</non-jta-data-source>
```

We must also define the target database dialect that the ORM provider will use to communicate with our database. This example is utilizing the dialect for MySQL. Also, in this case, we have told the ORM provider to turn off its autodetection feature. Used in concert with the `<exclude-unlisted-classes/>` element, auto-scanning of jars for entities will be disabled. We highly suggest you keep this configuration in place, as it reduces the amount of time required to launch a Broadleaf-based application by not forcing all entities to be loaded by all entity managers. This becomes increasingly important in multi-persistence unit environments with many entities.

```xml
<properties>
    <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLInnoDBDialect"/>
    <property name="hibernate.archive.autodetection" value="false" />
</properties>
```

Please note - this is the minimal configuration required to notify Broadleaf of the unique attributes of your persistence environment. There are actually other factors (entities, mapping files, additional properties) that Broadleaf will merge for you at runtime.

### Persisting Additional Entities

At times, you may find it necessary to add your own entities (either extensions or new) to one or more of the Broadleaf persistence units. To configure a new mapping file and a class for our MyEntity implementation, we can add the following two lines to `blPU` persistence unit defined above:

```xml
<mapping-file>config/MyEntity.orm.xml</mapping-file>
<class>org.myCompany.domain.MyEntityImpl</class>
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
    <properties>
        <property name="hibernate.dialect" value="org.hibernate.dialect.MySQLInnoDBDialect"/>
        <property name="hibernate.show_sql" value="false"/>
        <property name="hibernate.transaction.flush_before_completion" value="false"/>
        <property name="hibernate.connection.autocommit" value="false"/>
        <property name="hibernate.cache.provider_class" value="net.sf.ehcache.hibernate.SingletonEhCacheProvider"/>
        <property name="hibernate.cache.use_second_level_cache" value="true"/>
        <property name="hibernate.cache.use_query_cache" value="true"/>
        <property name="hibernate.generate_statistics" value="true" />
        <property name="hibernate.archive.autodetection" value="false" />
    </properties>
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
