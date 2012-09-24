> **NOTE:** This tutorial requires you to complete the [[Extending Customer For Heat Clinic Tutorial]] first. 

## Hooking into the submit order workflow

The first thing we need to do to override a Broadleaf Workflow is to place the default configuration into our possession. This is very easy -- just add the following to the bottom of  your `applicationContext.xml` file:

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

> This is a copy of the default workflow. You can find the default workflows in the following place in the Broadleaf codebase: `core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml`

When Broadleaf finds the `blCheckoutWorkflow` bean definition in your application context, it will use it to override the default one provided by Broadleaf.

## Create a new activity

We need to add a new activity to record the average heat level for a given customer. Let's create that activity. In the `site` project, we'll create `RecordHeatLevelActivity.java` in the `com.mycompany.checkout.service.workflow` package with the following contents:

```java
public class RecordHeatRangeActivity extends BaseActivity {
    private static final Log LOG = LogFactory.getLog(RecordHeatRangeActivity.class);
    
    @Resource(name = "blCustomerService")
    protected CustomerService customerService;

    @Override
    public ProcessContext execute(ProcessContext context) throws Exception {
        CheckoutSeed seed = ((CheckoutContext) context).getSeedData();
        Order order = seed.getOrder();
        int orderTotalHeatRating = 0;
        int productCount = 0;
        
        for (DiscreteOrderItem doi : order.getDiscreteOrderItems()) {
            ProductAttribute heatRating = doi.getProduct().getProductAttributeByName("heatRange");
            try {
                orderTotalHeatRating += (doi.getQuantity() * Integer.parseInt(heatRating.getValue()));
                productCount += doi.getQuantity();
            } catch (Exception e) {
                LOG.warn("Unable to parse the heat range. Product id: " + doi.getProduct().getId());
            }
        }
        
        HCCustomer customer = (HCCustomer) CustomerState.getCustomer();
        customer.setNumSaucesBought(customer.getNumSaucesBought() + productCount);
        customer.setTotalHeatRating(customer.getTotalHeatRating() + orderTotalHeatRating);
        customer = (HCCustomer) customerService.saveCustomer(customer);
        CustomerState.setCustomer(customer);
        
        return context;
    }
}
```

Notice that the activity loops through all current products in the order and assigns the appropriate heat range to the customer.

## Add our activity to the workflow

This is a one-liner:

```xml
<bean class="com.mycompany.checkout.service.workflow.RecordHeatRangeActivity"/>
```

Just add that line between the `RecordOfferUsageActivity` and the `CompleteOrderActivity` like so:

```xml
<bean class="org.broadleafcommerce.core.offer.service.workflow.RecordOfferUsageActivity"/>
<bean class="com.mycompany.checkout.service.workflow.RecordHeatRangeActivity"/>
<bean class="org.broadleafcommerce.core.checkout.service.workflow.CompleteOrderActivity"/>
```

and our checkout workflow is complete. Check out the end result after checking out an order that had (1) level 6 sauce and (1) level 8 sauce:

![Averaged Heat Range](images/submit-order-workflow-tutorial-1.png)
