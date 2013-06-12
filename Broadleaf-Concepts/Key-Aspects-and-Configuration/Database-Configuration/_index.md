# Database Configuration

Broadleaf Commerce initially is configured to run with the Hypersonic (HSQL) database.  HSQL gives us a lightweight database that is especially good for green field development.  Broadleaf leverages a Hibernate feature to create and populate the database when you start the web application. This is achieved by setting properties that are part of the [[Persistence Configuration]].

Let's take a look at a typical persistence unit configuration:

```xml
<persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
    <properties>
        <property name="hibernate.hbm2ddl.auto" value="create-drop"/>
        <property name="hibernate.hbm2ddl.import_files" value="my_load_files.sql"/>
        <property name="hibernate.dialect" value="org.hibernate.dialect.HSQLDialect"/>
        <property name="hibernate.show_sql" value="false"/>
        <property name="hibernate.cache.use_second_level_cache" value="true"/>
        <property name="hibernate.cache.use_query_cache" value="true"/>
    </properties>
</persistence-unit>
```

The first three properties are the most important when switching to another database.

- The `hibernate.hbm2ddl.auto` property can be used to create the tables when the web application starts up. Using the value `create-drop` instructs hibernate to recreate the database each time the application is run. This works well early in development projects, but most teams will change this to `update` once the schema stabalizes.
- The `import_files` property instructs hibernate to run the SQL in the list of files that it finds. Broadleaf uses this to populate data needed for the demo and startup applications. Some teams continue to use this early in the development cycle but may choose to disable this and use a more permanent database in later stages.
- The `dialect` property effects how hibernate constructs SQL statements. You will change this setting to match the dialect for your database.

However, Broadleaf provides a mechanism to allow you to configure all of your JPA properties per environment.  Rather than hard-code your properties, as above, you can provide a different configuration for each environment.  This is quite appealing, since you will typically need different properties for each environment, but it is often not ideal to build a new war file with different properties for each environment. First, remember that Broadleaf has a merge process that merges together multiple configuration files into a final configuration.  This happens at runtime. These merged files typically include Spring Application Context resources and JPA persistence.xml files.  This is what allows you to override and extend Broadleaf's core functionality. Broadleaf also provides a [[Runtime Environment Properties Configurer|Runtime Environment Configuration]] that injects the correct properties from properties files into the application context, depending on the environment. So here's how it works...

Here is a typical JPA persistence.xml file that comes from the Broadleaf Archetype:
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

You'll notice that the the provider and properties are not included.  The reason is that there is a default persistence.xml file in Broadleaf which gets merged with this one. Any configurations that are not changed in your application are preserved from the default file. So what about the properties such as the ones described above? In order to configure JPA in Broadleaf, we use a custom Broadleaf extension to Spring that merges persistence units together.  It also allows for Post Processors of Persistence Units.  Broadleaf has created a JPAPropertiesPersistenceUnitPostProcessor. See the details on configuring that [[here|Persistence-Configuration]].

This approach allows you to adjust properties like the ones above and others per environment so that you can, among other things, use a different database dialect in Development than you do in QA or Production.

In addition, you'll need to [[configure the Broadleaf Datasource|Persistence-Configuration]] components for your database. By default, Broadleaf Commerce uses JNDI to look up the Data Source from the server.  Please consult your server's documentation on configuring a JNDI Data Source.

## Configuring Broadleaf Persistence Units

For each persistence unit in the application, you'll need to modify the `hibernate.dialect` property to point the database that you're using. See the [Hibernate API documentation](http://docs.jboss.org/hibernate/stable/annotations/api/org/hibernate/dialect/package-summary.html) for available dialects.

In order to change the database properties per environment, here are the steps:

1. Configure your JNDI data sources according to your server's documentation. For the local Jetty server, you can see the configuration in `site/src/webapp/WEB-INF/jetty-env.xml`, which should be ignored unless running in Jetty Server. In most cases, and using the default configuration, you will need three data sources, `jdbc/web`, `jdbc/secure`, and `jdbc/storage`. (You cannot combine these into one because you cannot bind multiple transaction managers to one JNDI datasource)

2. Open `site/src/webapp/WEB-INF/applicationContext-datasources.xml` and ensure that it is configured according to your JNDI configuration. It should not need to be changed unless you are using a different JNDI name for your datasources (Typically, you should not need to change this file).

3. If you added additional JNDI properties, or did not use the default JNDI name of the webDS (`jdbc/web`), then you'll need to modify the `site/src/webapp/WEB-INF/web.xml` file (note that typically should not need to change this):

    ```xml
    <resource-ref>
      <!-- Change this JNDI name and/or add additional resource-refs for
           new JNDI names. Typically you should not need to change this. -->
      <res-ref-name>jdbc/web</res-ref-name>
      <res-type>javax.sql.DataSource</res-type>
      <res-auth>Container</res-auth>
    </resource-ref>
    ```

4. Change the properties files for each environment to reflect the correct JPA settings for that environment. These files can be located in each of the projects (i.e. core, site, admin) under src/main/resources/runtime-properties.  Here is the file core/src/main/resources/runtime-properties/common-shared.properties:

    ```
    # Settings for the default persistence unit
    blPU.hibernate.hbm2ddl.auto=validate
    blPU.hibernate.dialect=org.hibernate.dialect.HSQLDialect
    blPU.hibernate.show_sql=false
    blPU.hibernate.cache.use_second_level_cache=true
    blPU.hibernate.cache.use_query_cache=true
    blPU.hibernate.hbm2ddl.import_files=null

    # Settings for the CMS storage persistence unit
    blCMSStorage.hibernate.hbm2ddl.auto=validate
    blCMSStorage.hibernate.dialect=org.hibernate.dialect.HSQLDialect
    blCMSStorage.hibernate.show_sql=false
    blCMSStorage.hibernate.cache.use_second_level_cache=true
    blCMSStorage.hibernate.cache.use_query_cache=true
    blCMSStorage.hibernate.hbm2ddl.import_files=null

    # Settings for the secure persistence unit
    blSecurePU.hibernate.hbm2ddl.auto=validate
    blSecurePU.hibernate.dialect=org.hibernate.dialect.HSQLDialect
    blSecurePU.hibernate.show_sql=false
    blSecurePU.hibernate.cache.use_second_level_cache=false
    blSecurePU.hibernate.cache.use_query_cache=false
    blSecurePU.hibernate.hbm2ddl.import_files=null
    ```

5. Make appropriate changes to the environment properties in each web application (e.g. site/src/main/resources/runtime-properties/*.properties)

    These properties will, at runtime, replace and/or add the correct keys and values to the Persistence Unit who's name is pre-pended to the property name. Each of the application specific properties will take precedence over the shared properties, which in turn take precedence over Broadleaf's default properties. In order to have a slightly different configuration for QA, add this to the site/main/resources/runtime-properties/integrationqa.properties:

    ```
    blPU.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
    blCMSStorage.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
    blSecurePU.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
    ```

    This will cause the dialect to change to an Oracle 10g Dialect for all 3 persistence units in the "integrationqa" environment.

    Another interesting use of this may be that you want to run different database scripts in different environments because of syntax or type of data.  Consider the file site/main/resources/runtime-properties/development.properties:

    ```
    blPU.hibernate.hbm2ddl.import_files=/sql/load_admin_security.sql,\
      /sql/load_admin_users.sql,\
      /sql/load_code_tables.sql,\
      /sql/load_table_sequences.sql,\
      /sql/load_catalog_data.sql,\
      /sql/load_content_structure.sql,\
      /sql/load_content_data.sql
    ```

    This file is not overriding the dialect, so it will use the HSQLDB dialect.  But it does specify a comma-delimited list of SQL scripts that it should run when after the tables are created.  Perhaps QA will use Oracle, and still needs to load some basic data. Since the syntax between Oracle and HSQLDB is slightly different, the QA configuration might look like this:

    ```
    blPU.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
    blPU.hibernate.hbm2ddl.import_files=/sql/load_admin_security.sql,\
      /sql/oracle/load_admin_users.sql,\
      /sql/oracle/load_code_tables.sql,\
      /sql/oracle/load_table_sequences.sql,\
      /sql/oracle/load_catalog_data.sql,\
      /sql/oracle/load_content_structure.sql,\
      /sql/oracle/load_content_data.sql

    blCMSStorage.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
    blSecurePU.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
    ```

As you can see, you can configure and override any JPA property on a per-environment basis. Of course this can all be very powerful as it lets you pre-configure the JNDI name of the data source(s) and the various JPA runtime properties such as dialect, SQL logging, DDL, second level cache, and import scripts so that the application does not need to change from environment to environment.

For more information about runtime property configuration, please see this [[section|Runtime-Environment-Configuration]].

## Specific Database Instructions

- [[MS SQL Server]]
- [[MySQL]]
- [[PostgreSQL]]
- [[Oracle DB]]
