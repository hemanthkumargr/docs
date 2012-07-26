## <a name="wiki-config" />Configuration

Let's take a look at the default configuration in Broadleaf Commerce for Checkout:

```xml
<bean id="blCheckoutWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.checkout.service.workflow.CheckoutProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.offer.service.workflow.VerifyCustomerMaxOfferUsesActivity"/>
            <bean class="org.broadleafcommerce.core.checkout.service.workflow.PaymentServiceActivity"/>
            <bean class="org.broadleafcommerce.core.offer.service.workflow.RecordOfferUsageActivity"/>
            <bean class="org.broadleafcommerce.core.checkout.service.workflow.CompleteOrderActivity"/>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

Checkout workflows are similar to workflows in general in that they require a ProcessContextFactory, a list of activities and an error handler to be configured. Checkout workflows will use an instance of CheckoutProcessContextFactory. By default, Broadleaf Commerce supplies activities for executing pricing, payment and order reset. In addition, Broadleaf utilizes the DefaultErrorHandler implementation, which simply logs any exceptions to the console and bubbles the exceptions.


At the very least, most users will want to keep the four activities included by default with Broadleaf for checkout, which represent the core tasks for most order checkouts. However, some users will want to add additional checkout activities that do not fit neatly in the given workflows Next, we'll look at customizing the workflow. 

## <a name="wiki-customization" />Customization

Sometimes it is desirable to add in a custom checkout activity. For example, you may have a scenario where you need to notify a fulfillment provider of a completed order to schedule shipment to your customer. Let's take some time to look at this scenario more in-depth and develop an example.

First, we need to create a custom checkout activity implementation.

```java
public class MyFulfillmentActivity extends BaseActivity {

    @Resource(name="myFulfillmentService")
    private FulfillmentService myFulfillmentService;

    public ProcessContext execute(ProcessContext context) throws Exception {
        CheckoutSeed seed = ((CheckoutContext) context).getSeedData();
        myFulfillmentService.fulfillOrder(seed.getOrder());
        return context;
    }
}
```

In the `MyFulfillmentActivity` class, we've injected an instance of a new service interface, `FulfillmentService`. This is arbitrary and could actually be any service capable of fulfilling your order with your fulfillment provider. Like all activities, we implement the execute method. In our example, we retrieve the order from the ProcessContext and simply pass it to our conceptual fulfillment service.

With the logic in place, all that's left is to re-configure the checkout workflow to include our new activity. Using the activities list defined above, we can add in our new activity:

```xml
<property name="activities">
    <list>
        ...
        <bean class="com.mycompany.checkout.service.workflow.MyFulfillmentActivity"/>
        ...
    </list>
</property>
```

Finally, in your application context, you would override the key `blCheckoutWorkflow` to provide our new custom workflow definition. Let's check out the end result:


```xml
<bean id="blCheckoutWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.checkout.service.workflow.CheckoutProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.offer.service.workflow.VerifyCustomerMaxOfferUsesActivity"/>
            <bean class="org.broadleafcommerce.core.checkout.service.workflow.PaymentServiceActivity"/>
            <bean class="org.broadleafcommerce.core.offer.service.workflow.RecordOfferUsageActivity"/>
            <bean class="com.mycompany.checkout.service.workflow.MyFulfillmentActivity"/>
            <bean class="org.broadleafcommerce.core.checkout.service.workflow.CompleteOrderActivity"/>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```
