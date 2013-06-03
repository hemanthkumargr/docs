# Caching Configuration

Configuring cache settings follows the same pattern as other configuration in Broadleaf.

You will want to define a bean in your `applicationContext.xml` file that specifies additional config locations for Broadleaf to merge. This bean will look similar to this:

```xml
<bean id="blMergedCacheConfigLocations" class="org.springframework.beans.factory.config.ListFactoryBean">
    <property name="sourceList">
        <list>
            <value>classpath:my-ehcache-settings.xml</value>
        </list>
    </property>
</bean>
```

Broadleaf will then pick up this definition and merge it with the default configuration!
