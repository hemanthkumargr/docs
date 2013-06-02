# Oracle DB

1. Download and install Oracle (http://www.oracle.com/technetwork/database/enterprise-edition/overview/index.html)
2. Create a new database and a user capable of accessing this database with privileges for creating tables included (see Oracle documentation if you have questions about how to administrate databases and users).
3. Download the Oracle JDBC driver (http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html)
4. Follow the instructions for your application server for creating a JNDI resource(s). Note that the driver does not go inside the war file(s). Rather it must go on the class path of the server.
5. Update the runtime properties to use the correct dialect for the MS SQL Server. (see [[Database Configuration]]).
```
blPU.hibernate.dialect="org.hibernate.dialect.Oracle10gDialect
blSecurePU.hibernate.dialect="org.hibernate.dialect.Oracle10gDialect
blCMSStorage.hibernate.dialect="org.hibernate.dialect.Oracle10gDialect
```
6. If you are only using Oracle in all environments, update the sql files that are imported during the demo startup for SQL Server compatibility.
    - All \*.sql files under `site/src/main/resources/sql` must be updated
    - Do a search for the word `TRUE` (case sensitive) and replace with `1`
    - Do a search for the word `FALSE` (case sensitive) and replace with `0`
7. If you are using multiple databases in different environments:
    - Create copies of the SQL files and modify them as described in point 6, above
    - Save them to a new directory: `site/src/main/resources/sql/oracle`
    - In the environments that use Oracle that require import scripts, configure the persistence provider to execute them:
```
blPU.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
blPU.hibernate.hbm2ddl.import_files=/sql/load_admin_security.sql,\
  /sql/oracle/load_admin_users.sql,\
  /sql/oracle/load_code_tables.sql,\
  /sql/oracle/load_table_sequences.sql,\
  /sql/oracle/load_catalog_data.sql,\
  /sql/oracle/load_content_structure.sql,\
  /sql/oracle/load_content_data.sql

blSecurePU.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
blCMSStorage.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect
```
8. Update the `/WEB-INF/applicationContext-security.xml` file.   Replace the word `TRUE` in the `users-by-username-query` with the number `1`.
