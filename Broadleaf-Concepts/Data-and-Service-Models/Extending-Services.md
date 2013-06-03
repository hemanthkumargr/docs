# Extending Services

Certain occasions will arise when it will become necessary for you to alter the default behavior of a Broadleaf Commerce service. You may need to add in an additional step to a call, or completely change how the service goes about honoring its interface contract. For these occasions, you need to be familiar with the strategy for extending a Broadleaf Commerce service. There are two ways to extend the base functionality of a service, depending on your needs.  You may find that a majority of the time you will want to keep the base functionality, this is accomplished by extending the service implementation. If you do not intend to make use of the base functionality, or find yourself overloading every method, it makes more sense to implement the service interface directly.

## Extend An Existing Service Implementation

Let's first take a look at a service where we want to alter the behavior slightly. In this case, the best approach is to extend the service. It might be a desirable behavior to add in additional logic to a standard order cancel call to additionally log every cancellation. To achieve this end, we need to extend the CartService.

```java
public class MyCartServiceImpl extends CartServiceImpl {

    @Override
    public void cancelOrder(Order order) {
        try {
            Logger.info("Cancelling order " + order.getId());
            super.cancelOrder(order);
        } catch (Exception e) {
            throw new OrderCancellationRuntimeException(e);
        }
    }

}
```

In our example, we override the `cancelOrder` method from the parent class and add in our logging of the cancel call. Immediately after logging the cancel, we call the cancelOrder method from the parent class. All the cancel logic is surrounded with a try / catch block and a OrderCancellationRuntimeException is thrown should a problem occur during the cancellation at any point.

Before our new service extension becomes active, we must first register it with Broadleaf Commerce. Since we're extending the CartService, we need to override the key id `blCartService`:

```xml
<bean id="blCartService" class="com.mycompany.order.service.MyCartServiceImpl"/>
```

This bean definition should be added to your application context. Once in place, Broadleaf Commerce will now instantiate MyCartService when an instance of CartService is required and the new cancelOrder method implementation will be called whenever an order is cancelled.

## Re-Implement An Entire Service

Sometimes, you may wish to radically change the way a Broadleaf Commerce service operates. For example, your situation may require that you retrieve catalog information from an internal web service instead of the standard database. To achieve such behavior, you would need to implement the CatalogService interface with your own code to retrieve product information from your web service and construct the appropriate domain objects. 

> Note - it is not suggested to retrieve catalog information from a web service real-time on every call, as this would likely have a deleterious effect on the performance of your Broadleaf Commerce-enabled site. Rather, a cached approach would be more appropriate. Perhaps results from calls to the web service could be cached locally and only updated when those results become stale after some arbitrary amount of time.

Let's review what an implementation of this type might look like:

```java
public class MyCatalogServiceImpl implements CatalogService {

    @Resource(name="myCatalogWebService")
    CachingCatalogWebService cachingCatalogWebService;

    public List<Product> findActiveProductsByCategory(Category category) {
        List<MyProduct> myProducts = cachingCatalogWebService.getProductsInCategory(category.getName());
        List<Product> products = new ArrayList<Product>();
        for (MyProduct myProduct : myProducts) {
            Product product = new ProductImpl();
            //TODO set all the product fields
            products.add(product);
        }

        return products;
    }

    //TODO implement the other methods from the CatalogService interface

}
```

In this example, we attempt to demonstrate how a custom CatalogService implementation might look with a custom web service client that retrieves catalog information instead of the default retrieval from the database. You'll notice that the main job of the service is to translate from the web service domain into the Broadleaf Commerce domain.

Of course, like any other Broadleaf Commerce override, you must specify your new service in your application context. In this case, you want to override the key id `blCatalogService`. 

```xml
<bean id="blCatalogService" class="com.mycompany.catalog.service.MyCatalogServiceImpl"/>
```

Refer to the [[Extension Quick Reference]] for additional bean key ids.

