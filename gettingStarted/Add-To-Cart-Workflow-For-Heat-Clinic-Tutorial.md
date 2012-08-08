As a developer, you may be presented with interesting requirements in your implementation of Broadleaf Commerce. For example, a restriction preventing adding a hot sauce with heat range 1 into a cart that already has a hot sauce with heat range 5 might be desirable. Let's hook into the Add to Cart Workflow to enforce this!

> You may notice that this tutorial is very similar to the other tutorial on [[modifying the order submit workflow | Order Submit Workflow For Heat Clinic Tutorial]]

## Hooking into the add item workflow

The first thing we need to do to override a Broadleaf Workflow is to place the default configuration into our possession. This is very easy -- just add the follow to the bottom of your `applicationContext.xml` file:

```xml
<bean id="blAddItemWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.order.service.workflow.CartOperationProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.order.service.workflow.add.ValidateAddRequestActivity"/>
            <bean class="org.broadleafcommerce.core.order.service.workflow.CheckAvailabilityActivity"/>
            <bean class="org.broadleafcommerce.core.order.service.workflow.add.AddOrderItemActivity"/>
            <bean class="org.broadleafcommerce.core.order.service.workflow.add.AddFulfillmentGroupItemActivity"/>
            <bean class="org.broadleafcommerce.core.order.service.workflow.VerifyFulfillmentGroupItemsActivity"/>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blSilentErrorHandler"/>
</bean>
```

> This is a copy of the default workflow. You can find the default workflows in the following place in the Broadleaf codebase: `core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml`

When Broadleaf finds the `blAddItemWorkflow` bean definition in your application context, it will use it to override the default one provided by Broadleaf.

## Create a new activity

We need to add an activity that checks for the heat range restriction. In the `site` project, we'll create `ValidateHeatRangeRestrictionActivity.java` in the `com.mycompany.order.service.workflow.add` package with the following contents:

```java
public class ValidateHeatRangeRestrictionActivity extends BaseActivity {
    private static final Log LOG = LogFactory.getLog(ValidateHeatRangeRestrictionActivity.class);
    
    @Resource(name = "blCatalogService")
    protected CatalogService catalogService;

    @Override
    public ProcessContext execute(ProcessContext context) throws Exception {
        // Get our seed data
        CartOperationRequest request = ((CartOperationContext) context).getSeedData();
        Long skuId = request.getItemRequest().getSkuId();
        Order cart = request.getOrder();
        
        Sku sku = catalogService.findSkuById(skuId);
        Product product = sku.getProduct();
        Integer heatRange = getHeatRange(product);
        
        // Heat Range will be null for non-hot sauce products
        if (heatRange != null && heatRange == 1) {
            for (DiscreteOrderItem doi : cart.getDiscreteOrderItems()) {
                Integer doiHeatRange = getHeatRange(doi.getProduct());
                if (doiHeatRange != null && doiHeatRange == 5) {
                    throw new InvalidSauceHeatRangeException("Trying to add heat range 1 when heat range 5 in cart");
                }
            }
        }
        
        return context;
    }
    
    /**
     * @return the heatRange attribute of a product if it exists -- null otherwise
     */
    protected Integer getHeatRange(Product product) {
        ProductAttribute heatRangeAttr = product.getProductAttributeByName("heatRange");
        
        // Heat Range will be null for non-hot sauce products
        if (heatRangeAttr != null) {
            try {
                return Integer.parseInt(heatRangeAttr.getValue());
            } catch (Exception e) { 
                // All The Exceptions!! (We'll return null, do nothing)
            }
        }
        
        return null;
    }
}
```

We also need the exception that gets thrown if the heat range isn't high enough:

```java
public class InvalidSauceHeatRangeException extends RuntimeException {

    private static final long serialVersionUID = -8828778897245219116L;

    public InvalidSauceHeatRangeException() {
        super();
    }

    public InvalidSauceHeatRangeException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidSauceHeatRangeException(String message) {
        super(message);
    }

    public InvalidSauceHeatRangeException(Throwable cause) {
        super(cause);
    }
    
}
```

## Add our activity to the workflow

This is a one-liner:

```xml
<bean class="com.mycompany.order.service.workflow.add.ValidateHeatRangeRestrictionActivity"/>
```

Just add that line between the `ValidateAddRequestActivity` and the `CheckAvailabilityActivity` like so:

```xml
<bean class="org.broadleafcommerce.core.order.service.workflow.add.ValidateAddRequestActivity"/>
<bean class="com.mycompany.order.service.workflow.add.ValidateHeatRangeRestrictionActivity"/>
<bean class="org.broadleafcommerce.core.order.service.workflow.CheckAvailabilityActivity"/>
```

and our add item restriction is in place. 

## Handle the error scenario

We want to let the customer know about this restriction if their add was unsuccessful. We'll modify the catch block in the `addJson` method in `CartController` to handle this exception.

```java
...
} catch (AddToCartException e) {
if (e.getCause() instanceof RequiredAttributeNotProvidedException) {
    responseMap.put("error", "allOptionsRequired");
} else if (e.getCause() instanceof InvalidSauceHeatRangeException) {
    responseMap.put("error", "invalidHeatRange");
} else {
    throw e;
}
}
...
```

and then we'll handle it in the JavaScript as well. We'll want to look at `cartOperations.js` in the handler that is bound to `input.addToCart` and `input.addToWishlist`. Change this chunk:

```javascript
if (data.error == 'allOptionsRequired') {
    $errorSpan.css('display', 'block');
    $errorSpan.effect('highlight', {}, 1000);
} else {
    HC.showNotification("Error adding to cart");
}
```

to this:

```javascript
if (data.error == 'allOptionsRequired') {
    $errorSpan.css('display', 'block');
    $errorSpan.effect('highlight', {}, 1000);
} else if (data.error == 'invalidHeatRange') {
    HC.showNotification("This hot sauce isn't hot enough!");
} else {
    HC.showNotification("Error adding to cart");
}
```

And that's it! You've now completely added the heat range restriction! Congratulations on alienating your customers and selling less hot sauce!

