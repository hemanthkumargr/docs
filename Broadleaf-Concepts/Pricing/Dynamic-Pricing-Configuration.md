# Dynamic Pricing Configuration

Dynamic Pricing enables you to control pricing for SKUs based on external criteria specifc to a given request instead of simply reading from the BLC\_SKU table. For example, you may have location based pricing determined by a user's currently selected store.

This pricing model is based on ThreadLocal attributes that are set up in a filter in the request and then utilized later.

The first step is to create our filter that will add certain attributes to the current request's sku pricing considerations

```java
@Component("myDynamicSkuPricingFilter")
public class MyDynamicSkuPricingFilter extends AbstractDynamicSkuPricingFilter {
    
    @Resource(name="myDynamicSkuPricingService")
    protected DynamicSkuPricingService skuPricingService;
    
    @Override
    public DynamicSkuPricingService getDynamicSkuPricingService(ServletRequest arg0) {
        return skuPricingService;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public HashMap getPricingConsiderations(ServletRequest request) {
        HashMap pricingConsiderations = new HashMap();

        // Put some attribute into this map for use. For example, the current
        // customer or the currently selected store
        
        return pricingConsiderations;
    }
}
```

Secondly, you will need to implement the `DynamicSkuPricingService` interface. Here is a sample implementation

```java
@Service("myDynamicSkuPricingService")
public class MyDynamicSkuPricingServiceImpl implements DynamicSkuPricingService {
    
    @Override
    public DynamicSkuPrices getSkuPrices(Sku sku, @SuppressWarnings("rawtypes") HashMap skuPricingConsiderations) {

        Money retailPrice;
        Money salePrice;

        // Code here to determine what the retail price should be based on the
        // current sku and the skuPricingConsiderations
        
        DynamicSkuPrices prices = new DynamicSkuPrices();
        prices.setRetailPrice(retailPrice);
        prices.setSalePrice(salePrice);
        return prices;
    }
}

```

Lastly, we need to instruct the application to use our filter.
```xml
<filter>
    <filter-name>dynamicSkuPricingFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
    <init-param>
        <param-name>targetBeanName</param-name>
        <param-value>myDynamicSkuPricingFilter</param-value>
    </init-param>
</filter>

<filter-mapping>
    <filter-name>dynamicSkuPricingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

And there you go -- any time you call .getPrice() on a Sku, it will be returning your dynamically calculate price!
