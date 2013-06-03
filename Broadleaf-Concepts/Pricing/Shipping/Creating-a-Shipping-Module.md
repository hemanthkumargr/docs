# Creating a Shipping Module

## Anatomy of a Shipping Module

Shipping modules are utilized by Broadleaf Commerce to interface with an external provider (or some custom algorithm) for shipping cost calculation. The cost of shipping can be based on a number of factors including weight, size, quantity and dollar total. Some examples of different methods of shipping calculation include: banded shipping, USPS, UPS, FedEx, etc... If you encounter a situation where there is no existing Broadleaf Commerce shipping module for your desired shipping calculation method, you may find it necessary to develop your own custom shipping module. Let's review the ShippingModule interface from Broadleaf Commerce.

```java
public interface ShippingModule {

    public String getName();

    public void setName(String name);

    public FulfillmentGroup calculateShippingForFulfillmentGroup(FulfillmentGroup fulfillmentGroup) throws ShippingPriceException;
    
    public String getServiceName();
    
    public Boolean isValidModuleForService(String serviceName);
    
    public void setDefaultModule(Boolean isDefaultModule);
    
    public Boolean isDefaultModule();

}
```

All shipping modules must implement the ShippingModule interface to be used by Broadleaf Commerce. The interface describes the basic set of shipping calculation operations Broadleaf Commerce might expect to be available.

- The `getName` and `setName` methods are used to retrieve and set the arbitrary name of the module.
- The `getServiceName` method is used to get the name of the module which corresponds to an entry in `org.broadleafcommerce.core.pricing.service.workflow.type.ShippingServiceType`
- The `isValidModuleForService` method returns whether or not this module can handle the `serviceName`
- `calculateShippingForFulfillmentGroup` is used to set the shipping cost values on the FulfillmentGroup instance.

### Calculating Shipping

When implementing a ShippingModule, the key to communicating the shipping cost to Broadleaf Commerce is the FulfillmentGroup instance passed into the calculateShippingForFulfillmentGroup method. While the specific informational needs for each shipping calculation method will differ, you should have access here to the building blocks necessary to calculate any form of shipping. Here are some hints:

- Call fulfillmentGroup.getAddress() to get the shipping address.
- Call fulfillmentGroup.getMethod() to get the general shipping method identifier.
- Call fulfillmentGroup.getFulfillmentGroupItems() to get the list of all items in this fulfillment group.
- Once you have FulfillmentGroupItems, you can call getOrderItem. If the order item is an instance of DiscreteOrderItem, you can call getProduct, which gives you access to the ProductWeight and ProductDimension (if the order item is an instance of BundleOrderItem, then you'll need to iterate through the bundle to get at the DiscreteOrderItems it contains).

### Responding with Shipping Cost

Broadleaf Commerce expects that the FulfillmentGroup instance returned from the calculateShippingForFulfillmentGroup method of your shipping module has the pertinent shipping cost totals assigned. Your shipping module is on the hook for setting the shippingPrice, saleShippingPrice and retailShippingPrice fields. Under most circumstances, you will set these three fields to the same value. However, if you have a sale price for shipping that differs from the normal price, you may set it here.

