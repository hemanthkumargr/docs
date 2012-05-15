1. Download and install SQL Server (http://www.microsoft.com/sqlserver/en/us/editions/express.aspx)
2. Create a new database and a user capable of accessing this database with privileges for creating tables included (see SQL Server documentation if you have questions about how to administrate databases and users).
3. Download the SQL Server JDBC driver (http://msdn.microsoft.com/en-us/sqlserver/aa937724)
4. The SQL Server JDBC driver is commercial software and is not available for public download via Maven. Therefore, you'll either need to install the driver in your local maven repository manually, or install your own nexus server and place the driver there for you to reference from your pom.
    - Manual Installation
        - `mvn install:install -file -DgroupId=microsoft -DartifactId=sqlserver -Dversion=2008r2 -Dfile=[path to jdbc driver jar file] -Dpackaging=jar -DgeneratePom=true`
    - Nexus Server
        1. Download and install Sonatype Nexus (http://nexus.sonatype.org/download-nexus.html)
        2. Refer to this page for more information (http://www.sonatype.com/people/2008/11/adding-a-jar-to-a-maven-repository-with-sonatype-nexus/)
5. Update the parent POM to include the dependency for the SQL Server driver. Update the other pom files to include a runtime dependency on SQL Server. At the same time, remove the dependency from these files on HSQLDB.
    - Root pom.xml change:
    ```xml
    <dependencyManagement>
        ...
        <dependency>
            <groupId>microsoft</groupId>
            <artifactId>sqlserver</artifactId>
            <version>2008r2</version>
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
            <groupId>microsoft</groupId>
            <artifactId>sqlserver</artifactId>
            <scope>runtime</scope>
        </dependency>
        ...
    </dependencies>
    ```
6. Update all of the `persistenceUnit` declarations in the project to use the MS-SQL dialect. (see [[Database Configuration]] section for a list of file locations).
```xml
<property name="hibernate.dialect" value="org.hibernate.dialect.SQLServer2008Dialect"/>
```
7. Update the Broadleaf Datasource components.  (see [[Database Configuration]] section for a list of file locations).
```xml
<bean id="webDS" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
     <property name="driverClassName" value="com.microsoft.sqlserver.jdbc.SQLServerDriver" />
     <!-- This url assumes you are connecting locally to a database called broadleafcommerce -->
     <property name="url" value="jdbc:sqlserver://127.0.0.1;databaseName=broadleafcommerce" />
     <property name="username" value="\[your sql server username\]" />
     <property name="password" value="\[your sql server user password\]" />
     <property name="testOnBorrow" value="true"/>
     <property name="testOnReturn" value="true"/>
     <property name="validationQuery" value="SELECT 1"/>
</bean>
```
8. Update the sql files that are imported during the demo startup for SQL Server compatibility.
    - All \*.sql files under `site-war/src/main/resources/sql` must be updated
    - Do a search for the word `TRUE` (case sensitive) and replace with `1`
    - Do a search for the word `FALSE` (case sensitive) and replace with `0`
9. Check the JDK version you are using. 

> **JDK 1.6.0_29 is not compatible with the SQL Server JDBC driver**

> **Startup will appear to hang on database connect when using 1.6.0_29**

> **1.6.0_30 and above fixes the issue**

