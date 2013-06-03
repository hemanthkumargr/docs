# Runtime Environment Configuration

Broadleaf also has built-in support for managing configuration values that may change based on your deployment environment (i.e. development, test, production, etc...). This configuration has changed slightly for 2.0, which this documentation reflects.

Property files are merged by the RuntimeEnvironmentPropertiesConfigurer and then forwarded onto Spring for use in your application. The priority hierarchy for this merge is as follows, with latter properties overriding earlier ones. Note that we are using `development` as the environment for these examples -- it would obviously change if the current environment was different.

- Broadleaf defined properties
- `common-shared.properties` in the core project
- `development-shared.properties` in the core project
- `common.properties` from the specific application (either site or admin)
- `development.properties` from the specific application (either site or admin)
- Properties defined in the file specified by runtime JVM argument "property-shared-override"
- Properties defined in the file specified by runtime JVM argument "property-override"

This powerful configuration will allow you to share various attributes amongst environments and override them where necessary.

Furthermore, if you have local developer properties or other properties that you do not wish to commit to version control, you can specify file paths via the `property-shared-override` and `property-override` JVM runtime arguments.

```text
-Dproperty-share-override=/Users/SomeUser/SomeProject/secret.properties
```


> **Note - All of these properties files should appear in the `src/main/resources/runtime-environment/` directories for their respective project. The Broadleaf `RuntimeEnvironmentPropertiesConfigurer` (set up in the next sections) is configured by default to look for properties files in the `runtime-properties` folder on the classpath.**

## Basic Configuration

Most users will simply need to add a reference to the `blConfiguration` bean in their `applicationContext.xml` file (and `applicationContext-admin.xml`), like this:

```xml
<bean id="blConfiguration" class="org.broadleafcommerce.common.config.RuntimeEnvironmentPropertiesConfigurer" />
```

This will set up the appropriate merging of properties between your different applications / environments as well as defaults provided by Broadleaf. The default environments provided by Broadleaf are:

- development
- integrationdev
- integrationqa
- staging
- production

> **Note - to specify an environment, a system property entitled `runtime.environment` should be set. This is normally accomplished via a Java startup parameter for your application container (i.e. `-Druntime.environment=production`)**

## Advanced Configuration

These environments will suffice for the majority of users. However, if you would prefer to use a different set of environments, you would simply configure the `blConfiguration` bean like this:

```xml
<bean id="blConfiguration" class="org.broadleafcommerce.common.config.RuntimeEnvironmentPropertiesConfigurer">
    <property name="environments">
        <set>
            <value>myenv1</value>
            <value>myenv2</value>
        </set>
    </property>
    <property name="defaultEnvironment" value="myenv1"/>
</bean>
```

> Note: If you are customizing the `blConfiguration` bean in any way, you will need to define it in both `applicationContext.xml` and `applicationContext-servlet.xml` (and again for the admin applicaation). This is a known issue in the servlet configuration in Spring.
