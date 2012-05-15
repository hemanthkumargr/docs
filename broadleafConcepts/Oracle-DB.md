1. Download and install Oracle (http://www.oracle.com/technetwork/database/enterprise-edition/overview/index.html)
2. Create a new database and a user capable of accessing this database with privileges for creating tables included (see Oracle documentation if you have questions about how to administrate databases and users).
3. Download the Oracle JDBC driver (http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html)
4. The Oracle JDBC driver is commercial software and is not available for public download via Maven. Therefore, you'll either need to install the driver in your local maven repository manually, or install your own nexus server and place the driver there for you to reference from your pom.
    - Manual Installation
        - `mvn install:install -file -DgroupId=oracle -DartifactId=oracle -Dversion=11g eDfile=[path to jdbc driver jar file] -Dpackaging=jar -DgeneratePom=true`
    - Nexus Server
        1. Download and install Sonatype Nexus (http://nexus.sonatype.org/download-nexus.html)
        2. Refer to this page for more information (http://www.sonatype.com/people/2008/11/adding-a-jar-to-a-maven-repository-with-sonatype-nexus/)
5. Update the parent POM to include the dependency for the Oracle driver. Update the other pom files to include a runtime dependency on SQL Server. At the same time, remove the dependency from these files on HSQLDB.
    - Root pom.xml change:
    ```xml
    <dependencyManagement>
        ...
        <dependency>
            <groupId>oracle</groupId>
            <artifactId>oracle</artifactId>
            <version>11g</version>
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
            <groupId>oracle</groupId>
            <artifactId>oracle</artifactId>
            <scope>runtime</scope>
        </dependency>
        ...
    </dependencies>
    ```
6. Update all of the `persistenceUnit` declarations in the project to use the Oracle dialect. (see [[Database Configuration]] section for a list of file locations).
```xml
<property name="hibernate.dialect" value="org.hibernate.dialect.Oracle10gDialect"/>
```
7. Update the Broadleaf Datasource components.  (see [[Database Configuration]] section for a list of file locations).
```xml
<bean id="webDS" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
     <property name="driverClassName" value="oracle.jdbc.OracleDriver" />
     <!-- This url assumes you are connecting locally to an Oracle Express Edition -->
     <property name="url" value="jdbc:oracle:thin:@127.0.0.1:1521:XE" />
     <property name="username" value="[your oracle username]" />
     <property name="password" value="[your oracle user password]" />
     <property name="testOnBorrow" value="true"/>
     <property name="testOnReturn" value="true"/>
     <property name="validationQuery" value="SELECT sysdate from dual"/>
</bean>
```
8. Update the sql files that are imported during the demo startup for Oracle compatibility.
    - All \*.sql files under `site-war/src/main/resources/sql` must be updated
    - Do a search for the word `TRUE` (case sensitive) and replace with `1`
    - Do a search for the word `FALSE` (case sensitive) and replace with `0`
9. Update the `application-security.xml` file.   Replace the word `TRUE` in the `users-by-username-query` with the number `1`.

