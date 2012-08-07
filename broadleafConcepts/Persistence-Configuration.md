To properly configure Broadleaf's persistence system, we will need to follow a few steps. Outlined below are descriptions of how to set up the persisntence unit beans, datasources, and also the necessary persistence XML configurations. Lastly, we will cover utilizing Ehcache to improve performance.

## <a name="wiki-pu-config" />Persistence Unit Configuration

### Minimal

Broadleaf provides a default application context file for configuring data sources.  By default, Broadleaf uses 3 data sources.  The first is the "webDS", or main data source containing most of the tables used by Broadleaf Commerce.  The second is the "webSecureDS" which is meant to provide a secure data source for tables that contain things like payment information in a PCI compliant situation.  The third data source, "webContentDS", is a data source to store content-managed data such as page snippets.  For simplicity, and in many real-world cases, it will be preferable to store all data in the same database or schema.  The ability to separate them is provided as a convenience in cases where architects, DBAs, or system administrators require it.  Broadleaf uses JNDI, by default, to provide data sources.  This is a very common approach for many organizations.  It allows system administrators to keep the database connection configuration separate from the code base, but allows a standard and consistent way to access database resources across multiple environments.  Here is a snippet from the default Broadleaf data source configuration found in /WEB-INF/applicationContext-datasource.xml:

```xml
<jee:jndi-lookup id="webDS" jndi-name="jdbc/web"/>
<alias name="webDS" alias="webSecureDS"/>
<alias name="webDS" alias="webStorageDS"/>
```

Notice that there is a single bean named "webDS" that is looked up via JNDI.  The other aliases allow for the webDS data source to be referenced using different bean names.  However, they are the same bean and point to the same data source.

The next thing to note is the /WEB-INF/web.xml file, which should have the JNDI resource defined:

```xml
<resource-ref>
  <res-ref-name>jdbc/web</res-ref-name>
  <res-type>javax.sql.DataSource</res-type>
  <res-auth>Container</res-auth>
</resource-ref>
```

The last thing to note is the "blPersistenceUnitManager".  This bean is merged with other persistence unit managers of the same name from various application context resources.  This is configured in /WEB-INF/applicationContext.xml.

```xml
<bean id="blPersistenceUnitManager" class="org.broadleafcommerce.common.extensibility.jpa.MergePersistenceUnitManager">
        <property name="persistenceXmlLocations">
            <list>
                <value>classpath*:/META-INF/persistence.xml</value>
            </list>
        </property>
        <property name="dataSources">
            <map>
                <entry key="jdbc/web" value-ref="webDS"/>
                <entry key="jdbc/webSecure" value-ref="webSecureDS"/>
                <entry key="jdbc/cmsStorage" value-ref="webStorageDS"/>
            </map>
        </property>
        <property name="defaultDataSource" ref="webDS"/>
        <property name="persistenceUnitPostProcessors">
        	<list>
        		<bean class="org.broadleafcommerce.common.extensibility.jpa.JPAPropertiesPersistenceUnitPostProcessor">
        			<property name="persistenceUnitProperties">
        				<map>
        					<!-- Overrides from environment properties files for blPU PersistenceUnit -->
        					<entry key="blPU.hibernate.hbm2ddl.auto" value="${blPU.hibernate.hbm2ddl.auto}" />
        					<entry key="blPU.hibernate.dialect" value="${blPU.hibernate.dialect}"/>
        					<entry key="blPU.hibernate.show_sql" value="${blPU.hibernate.show_sql}"/>
        					<entry key="blPU.hibernate.cache.use_second_level_cache" value="${blPU.hibernate.cache.use_second_level_cache}"/>
        					<entry key="blPU.hibernate.cache.use_query_cache" value="${blPU.hibernate.cache.use_query_cache}"/>
        					<entry key="blPU.hibernate.hbm2ddl.import_files" value="${blPU.hibernate.hbm2ddl.import_files}"/>
        					
        					<!-- Overrides from environment properties files for blCMSStorage PersistenceUnit -->
        					<entry key="blCMSStorage.hibernate.hbm2ddl.auto" value="${blCMSStorage.hibernate.hbm2ddl.auto}" />
        					<entry key="blCMSStorage.hibernate.dialect" value="${blCMSStorage.hibernate.dialect}"/>
        					<entry key="blCMSStorage.hibernate.show_sql" value="${blCMSStorage.hibernate.show_sql}"/>
        					<entry key="blCMSStorage.hibernate.cache.use_second_level_cache" value="${blCMSStorage.hibernate.cache.use_second_level_cache}"/>
        					<entry key="blCMSStorage.hibernate.cache.use_query_cache" value="${blCMSStorage.hibernate.cache.use_query_cache}"/>
        					<entry key="blCMSStorage.hibernate.hbm2ddl.import_files" value="${blCMSStorage.hibernate.hbm2ddl.import_files}"/>
        					
        					<!-- Overrides from environment properties files for blSecure PersistenceUnit -->
        					<entry key="blSecurePU.hibernate.hbm2ddl.auto" value="${blSecurePU.hibernate.hbm2ddl.auto}" />
        					<entry key="blSecurePU.hibernate.dialect" value="${blSecurePU.hibernate.dialect}"/>
        					<entry key="blSecurePU.hibernate.show_sql" value="${blSecurePU.hibernate.show_sql}"/>
        					<entry key="blSecurePU.hibernate.cache.use_second_level_cache" value="${blSecurePU.hibernate.cache.use_second_level_cache}"/>
        					<entry key="blSecurePU.hibernate.cache.use_query_cache" value="${blSecurePU.hibernate.cache.use_query_cache}"/>
        					<entry key="blSecurePU.hibernate.hbm2ddl.import_files" value="${blSecurePU.hibernate.hbm2ddl.import_files}"/>
        				</map>
        			</property>
        		</bean>
        	</list>
        </property>
    </bean>
```

The "blPersistenceUnitManager" defines the location (and name) of the persistence.xml.  This, by default, is located at /META-INF/persistence.xml, but could be anywhere.  This could also be multiple files, which would be merged together. The data sources, in this case, reference the 3 Spring beans, described above.  We will discuss the persistence unit post processors later.

**For the merge facility to properly combine your persistence unit configuration with that of Broadleaf, your bean id must match the expected bean id - blPersistenceUnitManager.**

### Additional Persistence Units

It may be necessary to define additional persistence units for your application (over and above those persistence units required by Broadleaf). Additional configuration is required to account for this. Here's how to achieve this.

In the "blPersistenceUnitManager" bean defined above, we list various available datasources. First, we must add a new one:

```xml
<entry key="jdbc/myData" value-ref="myDS"/>
```

Second, you would add a new datasource bean. Again, you can use any method of acquiring a valid datasource via Spring. Here's one that uses JNDI:

```xml
<jee:jndi-lookup id="myDS" jndi-name="jdbc/myDS"/>
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