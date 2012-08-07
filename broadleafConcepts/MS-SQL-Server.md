1. Download and install SQL Server (http://www.microsoft.com/sqlserver/en/us/editions/express.aspx)
2. Create a new database and a user capable of accessing this database with privileges for creating tables included (see SQL Server documentation if you have questions about how to administrate databases and users).
3. Download the SQL Server JDBC driver (http://msdn.microsoft.com/en-us/sqlserver/aa937724)
4. Follow the instructions for your application server for creating a JNDI resource(s). Note that the driver does not go inside the war file(s). Rather it must go on the class path of the server.
6. Update the runtime properties to use the correct dialect for the MS SQL Server. (see [[Database Configuration]]).
```
blPU.hibernate.dialect="org.hibernate.dialect.SQLServer2008Dialect
blSecurePU.hibernate.dialect="org.hibernate.dialect.SQLServer2008Dialect
blCMSStorage.hibernate.dialect="org.hibernate.dialect.SQLServer2008Dialect
```
8. If you are only using MS SQL Server in all environments, update the sql files that are imported during the demo startup for SQL Server compatibility.
    - All \*.sql files under `site/src/main/resources/sql` must be updated
    - Do a search for the word `TRUE` (case sensitive) and replace with `1`
    - Do a search for the word `FALSE` (case sensitive) and replace with `0`
9. If you are using multiple databases in different environments:
    - Create copies of the SQL files and modify them as described in point 8, above
    - Save them to a new directory: `site/src/main/resources/sql/mssql`
    - In the environments that use MSSQL Server that require import scripts, configure the persistence provider to execute them:
```
blPU.hibernate.dialect="org.hibernate.dialect.SQLServer2008Dialect
blPU.hibernate.hbm2ddl.import_files=/sql/load_admin_security.sql,\
  /sql/mssql/load_admin_users.sql,\
  /sql/mssql/load_code_tables.sql,\
  /sql/mssql/load_table_sequences.sql,\
  /sql/mssql/load_catalog_data.sql,\
  /sql/mssql/load_content_structure.sql,\
  /sql/mssql/load_content_data.sql

blSecurePU.hibernate.dialect="org.hibernate.dialect.SQLServer2008Dialect
blCMSStorage.hibernate.dialect="org.hibernate.dialect.SQLServer2008Dialect
```
10. Check the JDK version you are using. 
> **JDK 1.6.0_29 is not compatible with the SQL Server JDBC driver**

> **Startup will appear to hang on database connect when using 1.6.0_29**

> **1.6.0_30 and above fixes the issue**
