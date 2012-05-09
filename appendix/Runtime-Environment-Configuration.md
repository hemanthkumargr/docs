**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

Broadleaf also has built-in support for managing configuration values that may change based on your deployment environment (i.e. development, test, production, etc...). 

In an application context file, we simply add a `blConfiguration` bean like so:

```xml
<bean id="blConfiguration" class="org.broadleafcommerce.common.config.RuntimeEnvironmentPropertiesConfigurer">
    <property name="propertyLocations">
        <set>
            <value>classpath:config/my/</value>
            <value>classpath:config/my/test/</value>
        </set>
    </property>
    <property name="environments">
        <set>
            <value>production</value>
            <value>staging</value>
            <value>integration</value>
            <value>development</value>
        </set>
    </property>
    <property name="defaultEnvironment" value="development"/>
    <property name="ignoreUnresolvablePlaceholders" value="true"/>
</bean>
```

The bean we define here uses the Broadleaf class `org.broadleafcommerce.common.config.RuntimeEnvironmentPropertiesConfigurer`, which is responsible for loading in property values you define so they are available to Spring during subsequent bean creation.

`propertyLocations` defines the different packages where properties are located in your source code.

`environments` defines the different environments that the configurer should be aware of.

`defaultEnvironment` specifies the environment the configurer will use if an environment has not been set for the application. 

**Note - to specify an environment, a system property entitled `runtime.environment` should be set. This is normally accomplished via a Java startup parameter for your application container (i.e. `-Druntime.environment=production`)**

For every environment you specify, you should have a counterpart properties file available at one of the packages specified in `propertyLocations`. For our example, we will need the following `production.properties`, `staging.properties`, `integration.properties` and `development.properties`. These property files should each contain the same keys, but different values for the given environment.

An additional property file should be specified called `common.properties`. This property file contains any key / value pairs that are common to all environments. This removes the need to specify the exact same values in all your environment files when those values do not change between environments.

Once the blConfiguration bean is set up, it will provide real values to Spring to replace placeholders. For example, let's take the following bean:

```xml
<bean id="blDS" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="${MYSQL_URL}" />
    <property name="username" value="${MYSQL_USERNAME}" />
    <property name="password" value="${MYSQL_PASSWORD}" />
</bean>
```

This bean is expecting three properties, `MYSQL_URL`, `MYSQL_USERNAME`, and `MYSQL_PASSWORD`. Then, in a a properties file (`production.properties` for example), we could have the following:

    MYSQL_URL=mysql://localhost:3306/test-schema
    MYSQL_USERNAME=app_user
    MYSQL_PASSWORD=password1

The appropriate placeholder replacement will happen at runtime based on the currently selected environment.
