1. Download and install MySQL (http://dev.mysql.com/downloads/mysql/)
2. Using `mysqladmin`, create a new user (the example below uses a username of `sa` with pwd of `demo`)
3. Using `mysqladmin`, create a new database that is owned by your new user (the example below uses a database named `broadleaf`)
4. Update the parent POM to include the dependency for the MySQL driver. Update the other pom files to include a runtime dependency on PostgreSQL. At the same time, remove the dependency from these files on HSQLDB.
    - Root pom.xml change:
    ```xml
    <dependencyManagement>
        ...
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.6</version>
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
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
       ...
    </dependencies>
    ```
5. Update all of the persistenceUnit declarations in the project to use the MySQL dialect. (see [[Database Configuration]] section for a list of file locations)
```xml
<property name="hibernate.dialect" value="org.hibernate.dialect.MySQL5InnoDBDialect"/>
```
6. Update the Broadleaf Datasource components. (see [[Database Configuration]] section for a list of file locations)
```xml
<bean id="webDS" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://localhost:3306/broadleaf" />
    <property name="username" value="sa" />
    <property name="password" value="demo" />
</bean>
```
