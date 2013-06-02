Sometimes, the entities provided by Broadleaf Commerce will not be enough to fulfill your needs. For example, for specific business reasons, you may be required to represent an order id in a specific way that is incompatible with the internal order id representation used by Broadleaf Commerce. In this case, it would be desirable to add an additional field to the order that can hold a custom order id that you have generated to fulfill your requirement. To achieve this end, we must employ entity extension.

Let's start by showing an implementation example of our custom entity.

```java
@Entity
@Table(name = "MY_ORDER")
public class MyOrderImpl extends OrderImpl {

    private static final long serialVersionUID = 1L;

    @Column(name = "MY_ORDER_ID")
    private String myOrderId;

    ... getters / setters / equals / hashcode ...

}
```

Here, we've created a new custom entity that extends OrderImpl from Broadleaf Commerce. We've added our custom order id field (myOrderId), and using JPA annotation, have tied this entity and it's fields to a table and columns in the database. Note - all entity extension in Broadleaf Commerce uses standard JPA strategies. If you know how to use JPA, then you know how to work with and extend Broadleaf Commerce entities. Of course, you will need a table called "MY_ORDER" in the non-secure schema (see [[Database Model]]) to back this entity. It should have an "ORDER_ID" field capable of holding long integers (this field joins your new table with the Broadleaf Commerce order table) and a "MY_ORDER_ID" field of the type VarChar to hold your custom order id.

Now that we've created our entity extension, we need to notify Broadleaf Commerce of its existence and how to instantiate it. To do this, you will will need to add a bean configuration to your application context:

```xml
<bean id="org.broadleafcommerce.core.order.domain.Order" class="com.mycompany.order.domain.MyOrderImpl" scope="prototype"/>
```

Finally, we need to add the new entity class to the persistence unit configuration in your `persistence.xml`. This could end up looking similar to the following:

```xml
<persistence-unit name="blPU" transaction-type="RESOURCE_LOCAL">
    ...
    <class>com.mycompany.order.domain.MyOrderImpl</class>
    ...
</persistence-unit>
```

Please refer to the [[Persistence Configuration]] section for more information on setting your Broadleaf Commerce application up for persistence.

This is the least amount of configuration required for Broadleaf Commerce to utilize your entity. Once configured, Broadleaf Commerce will now create an instance of MyOrderImpl whenever a new Order instance is required.

The only problem with this simplistic approach is that, in this case, the entity is instantiated only and the new myOrderId field is not set. This may be fine for many custom field types, but in our case, it's desirable for the myOrderId field to be set immediately. Let's examine some approaches to remedy this situation.

- Extend the OrderDaoImpl `create` method and add code to set your custom order id (this is a similar approach to service extension - see the [[Service Extension Guide|Extending Services]] for more information).
- Add a factory bean for the myOrderId field to your Order extension configuration in Spring.

When applicable, we recommend using the factory bean approach, as it provides you with an opportunity to achieve a looser coupling with Broadleaf Commerce. Let's review how this might look. We'll start with the Factory Bean.

```java
public class MyOrderIdFactoryBean implements FactoryBean {

    public Object getObject() throws Exception {
        String myOrderId = null;
        //TODO add some code to create the custom order id
        return myOrderId;
    }

    public Class getObjectType() {
        return String.class;
    }

    public boolean isSingleton() {
        return false;
    }

}
```

This simple factory bean merely provides Spring with an Object instance and tells Spring the Class type of the object. In our case, we're creating a custom order id of the type String.

Now, let's add configuration to include our new id generation factory.

```xml
<bean id="org.broadleafcommerce.core.order.domain.Order" class="com.mycompany.order.domain.MyOrderImpl" scope="prototype">
    <property name="myOrderId">
        <bean class="com.mycompany.order.service.MyOrderIdFactoryBean"/>
    </property>
</bean>
```

We've replaced the simple bean definition from above with a slightly more complex version that includes our factory bean. Now, when Broadleaf Commerce uses Spring to acquire an Order instance, an instance of MyOrderImpl will be returned with the myOrderId field set with the value returned from MyOrderIdFactoryBean.

