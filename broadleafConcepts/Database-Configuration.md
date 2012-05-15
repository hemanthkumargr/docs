Broadleaf Commerce initially is configured to run with the Hypersonic (HSQL) database.  HSQL gives us a lightweight database that is especially good for green field development.  Broadleaf leverages a Hibernate feature to create and populate the database when you start the web application. This is achieved by setting properties that are part of the [[Persistence Configuration]].

Let's take a look at a sample persistence unit configuration.

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

In addition, you'll need to configure the Broadleaf Datasource components for your database.

```xml
<bean id="webDS" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
  <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
  <property name="url" value="jdbc:hsqldb:hsql://localhost/broadleaf;ifexists=true" />
  <property name="username" value="sa" />
  <property name="password" value="" />
</bean>
```

The above properties are fairly straightforward, so let's move on to changing databases for your environment.

## Configuring Broadleaf Datasources

If your project is based on the Broadleaf archetype, you'll find multiple datasources within the project that need to be modified with the connection information for your database. Before trying these out, you'll first need to create the Broadleaf database and setup a user with the required permissions. If you want to utilize hibernate's `create_drop` or `update` approach mentioned above, the user will need create, drop, and modify permissions for the schema.

| Broadleaf File Name                                                      | DataSource Name | Purpose
| :----------------------------------------------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------- |
| site-war/src/main/webapp/WEB-INF/applicationContext.xml                  | webDS           | The primary datasource used to view and modify Broadleaf entities from the site web application.    |
| ""                                                                       | webStorageDS    | Images are stored in this datasource. This configuration is used by the web-app to access the images..    |
| admin-war/src/main/webapp/WEB-INF/applicationContext-admin.xml           | webDS           | The primary datasource used by the Broadleaf Commerce admin.                                        |
| ""                                                                       | webStorageDS    | Images are stored in this datasource. This configuration is used by the admin to access and store images. |
| admin-war/src/main/webapp/WEB-INF/ mycompany-applicationContext-text.xml | blDS            | Datasource used for automated integration testing.                                                          |

> Note: If modifying a distribution other than the Broadleaf archetype, the files may be different. You can search for XML files that contain `BasicDataSource` to find the list of files you'll need to modify.

A common requirement is to setup your datasources using JNDI instead of supplying the connection information here. This configuration is also supported, and can be achieved by following this example:

```xml
<bean id="myDS" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:/comp/env/jdbc/mydatasource"/>
</bean>
```

## Configuring Broadleaf Persistence Units

For each persistence unit in the application, you'll need to modify the `hibernate.dialect` property to point the database that you're using. See the [Hibernate API documentation](http://docs.jboss.org/hibernate/stable/annotations/api/org/hibernate/dialect/package-summary.html) for available dialects.

| Broadleaf File Name                                            | Persistence Unit Name | Purpose                                                                                                     |
| :------------------------------------------------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------- |
| site-war/META-INF/ persistence-mycompany.xml                   | blPU                  | This is the primary persistence unit for Broadleaf.                                                         |
| ""                                                             | blSecurePU            | In support of PCI compliance, some payment attributes are written to an alternate schema.                   |
| ""                                                             | blCMSStorage          | Assets managed through the Broadleaf CMS are written to this persistence unit.                              |
| admin-war/META-INF/ persistence-mycompany-admin.xml            | blPU                  | This is the primary persistence unit for Broadleaf for ADMIN.                                               |
| ""                                                             | blSecurePU            | In support of PCI compliance, some payment attributes are written to an alternate schema for ADMIN.         |
| ""                                                             | blCMSStorage          | Assets managed through the Broadleaf CMS are written to this persistence unit for ADMIN.                    |
| admin-war/src/main/webapp/WEB-INF/applicationContext-admin.xml | webDS                 | This is the primary datasource used by the Broadleaf Commerce admin.                                        |
| ""                                                             | webStorageDS          | Images are stored in this datasource.   This configuration is used by the admin to access and store images. |
| test/META-INF/persistence-mycompany-test.xml                   | blPU                  | Persistence unit used for integration testing.                                                              |

> Note: If modifying a distribution other than the Broadleaf archetype, the files may be different. You can search for XML files that contain `hibernate.dialect` to find the list of files you'll need to modify.

## Specific Database Instructions

- [[MS SQL Server]]
- [[MySQL]]
- [[PostgreSQL]]
- [[Oracle DB]]
