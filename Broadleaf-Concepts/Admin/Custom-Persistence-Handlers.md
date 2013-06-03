# Custom Persistence Handlers

Custom Persistence Handlers provide a hook to override the normal persistence behavior of the admin application. This is useful when an alternate pathway for working with persisted data is desirable. For example, if you want to work directly with a service API rather than go through the standard admin persistence pipeline. In such a case, you can use Spring to inject an instance of your service into your custom persistence handler and utilize that service to work with your entity. The implementation is responsible for converting domain object into the return type required by the admin. Helper classes are passed in to assist with conversion operations.

Let's take a look at the `CustomPersistenceHandler` interface:

```java
public interface CustomPersistenceHandler {
    public Boolean canHandleInspect(PersistencePackage persistencePackage);
    public Boolean canHandleFetch(PersistencePackage persistencePackage);
    public Boolean canHandleAdd(PersistencePackage persistencePackage);
    public Boolean canHandleRemove(PersistencePackage persistencePackage);
    public Boolean canHandleUpdate(PersistencePackage persistencePackage);
    public Boolean willHandleSecurity(PersistencePackage persistencePackage);
    
    public DynamicResultSet inspect(PersistencePackage persistencePackage, DynamicEntityDao dynamicEntityDao, InspectHelper helper) throws ServiceException;

    public DynamicResultSet fetch(PersistencePackage persistencePackage, CriteriaTransferObject cto, DynamicEntityDao dynamicEntityDao, RecordHelper helper) throws ServiceException;
    
    public Entity add(PersistencePackage persistencePackage, DynamicEntityDao dynamicEntityDao, RecordHelper helper) throws ServiceException;
    
    public void remove(PersistencePackage persistencePackage, DynamicEntityDao dynamicEntityDao, RecordHelper helper) throws ServiceException;
    
    public Entity update(PersistencePackage persistencePackage, DynamicEntityDao dynamicEntityDao, RecordHelper helper) throws ServiceException;   
}
```

Most of these methods are self-explanatory as to what they actually do. Each `canHandle...` method is invoked to determine if the corresponding `CustomPersistenceHandler` method should be invoked. For instance, the `canHandleUpdate` method is invoked first, and if it returns true then the `update` method is invoked.

## Determining When to Handle
Let's take a look at what the `PersistencePackage` provides to determine whether or not we should handle an operation:

```java
public class PersistencePackage implements IsSerializable, Serializable {

    private static final long serialVersionUID = 1L;
    
    protected String ceilingEntityFullyQualifiedClassname;
    protected String fetchTypeFullyQualifiedClassname;
    protected PersistencePerspective persistencePerspective;
    protected String[] customCriteria;
    protected Entity entity;
    protected String csrfToken;
    protected Integer batchId;

    //getters and setters excluded
    ...
}
```

The most popular way to determine whether or not to use a `CustomPersistenceHandler` is to use the `ceilingEntityFullyQualifiedClassname`. This corresponds to the class that the admin is dealing with in this instance. For example, you might have a `ProductCustomPersistenceHandler` that should only operate on Products:

```java
public Boolean canHandleAdd(PersistencePackage persistencePackage) {
    String ceilingEntityFullyQualifiedClassname = persistencePackage.getCeilingEntityFullyQualifiedClassname();
    return Product.class.getName().equals(ceilingEntityFullyQualifiedClassname);
}
```

Now when the admin attempts to add a new Product, your CustomPersistenceHandler will be invoked


## Hooking Up your Custom Persistence Handler
In order to tell the admin to consider your custom persistence handler, simply add your bean to the list of `blCustomPersistenceHandlers` in an applicationContext picked up by the admin:
```xml
<bean id="blCustomPersistenceHandlers" class="org.springframework.beans.factory.config.ListFactoryBean" scope="prototype">
    <property name="sourceList">
        <list>
            <bean class="com.mycompany.admin.handler.ProductCustomPersistenceHandler" />
        </list>
    </property>
</bean>
```

## Excluding Default Custom Persistence Handlers
In the case of a Product custom persistence handler, the framework already has one out of the box that has some custom that the framework needs to operate correctly. Since the admin loops through this list of custom persistence handlers and invokes the first one that returns 'true' for the operation, it's possible that your custom persistence handler may not be invoked. You can exclude pre-bundled custom persistence handlers by setting up a `CustomPersistenceHandlerFilter`. For instance, if you add the following to your applicationContext-admin.xml:

```xml
<!-- Use the DefaultCustomPersistenceHandlerFilter which will exclude persistence handlers based on their fully qualified classname -->
<bean id="blCustomPersistenceHandlerFilters" class="org.springframework.beans.factory.config.ListFactoryBean">
    <property name="sourceList">
        <list>
            <bean class="org.broadleafcommerce.openadmin.server.service.handler.DefaultCustomPersistenceHandlerFilter" >
                <property name="filterCustomPersistenceHandlerClassnames">
                    <list>
                        <value>org.broadleafcommerce.admin.server.service.handler.ProductCustomPersistenceHandler</value>
                    </list>
                </property>
            </bean>
        </list>
    </property>
</bean>
```
