1. Download and install PostgreSQL (http://www.postgresql.org/download/)
2. Using `pgAdmin`, create a new user (the example below uses a username of `sa` with pwd of `demo`)
3. Using `pgAdmin`, create a new database that is owned by your new user (the example below uses a database named `broadleaf`)
4. Update the parent POM to include the dependency for the PostgreSQL driver. Update the other pom files to include a runtime dependency on PostgreSQL. At the same time, remove the dependency from these files on HSQLDB.
    - Root pom.xml change:
    ```xml
    <dependencyManagement>
        ...
        <dependency>
            <groupId>postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>9.1-901.jdbc4</version>
            <type>jar</type>
            <scope>compile</scope>
        </dependency>
        ...
    </dependencyManagement>
    ```
    - pom.xml changes for site-war,admin-war,and test projects
    ```xml
    <dependencies>
       ...
        <dependency>
            <groupId>postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
       ...
    </dependencies>
    ```
5. Update all of the persistenceUnit declarations in the project to use the PostgreSQL dialect. (see [[Database Configuration]] section for a list of file locations)
```xml
<property name="hibernate.dialect" value="org.hibernate.dialect.PostgreSQLDialect"/>
```
6. Update the Broadleaf Datasource components. (see [[Database Configuration]] section for a list of file locations)
```xml
<bean id="webDS" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="org.postgresql.Driver" />
    <property name="url" value="jdbc:postgresql://localhost:5432/broadleaf" />
    <property name="username" value="sa" />
    <property name="password" value="demo" />
</bean>
```
