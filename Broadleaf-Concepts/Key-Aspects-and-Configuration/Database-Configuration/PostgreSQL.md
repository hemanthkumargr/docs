# PostgreSQL

1. Download and install PostgreSQL (http://www.postgresql.org/download/)

2. Create a new database and a user capable of accessing this database with privileges for creating tables included (see PostgreSQL documentation if you have questions about how to administrate databases and users).

3. Download the PostgreSQL JDBC driver (http://jdbc.postgresql.org/)

4. Follow the instructions for your application server for creating a JNDI resource(s). Note that the driver does not go inside the war file(s). Rather it must go on the class path of the server.

5. Update the runtime properties to use the correct dialect for PostgreSQL. (see [[Database Configuration]]).

    ```
    blPU.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
    blSecurePU.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
    blCMSStorage.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
    ```

6. Update the load SQL files to use true and false instead of 1 and 0 where applicable.
