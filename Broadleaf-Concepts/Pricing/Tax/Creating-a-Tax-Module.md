# Creating a Tax Module

## Anatomy of a Tax Module

Tax modules are utilized by Broadleaf Commerce to interface with an external provider (or some custom algorithm) for tax calculation. The cost of tax can be based on a number of factors including region and dollar total. If you encounter a situation where there is no existing Broadleaf Commerce tax module for your desired tax calculation method, you may find it necessary to develop your own custom tax module. Let's review the TaxModule interface from Broadleaf Commerce.

```java
public interface TaxModule {

    public String getName();

    public void setName(String name);

    public Order calculateTaxForOrder(Order order);

}
```

All tax modules must implement the TaxModule interface to be used by Broadleaf Commerce. The interface describes the basic set of tax calculation operations Broadleaf Commerce might expect to be available.

- The `getName` and `setName` methods are used to retrieve and set the arbitrary name of the module.
- `calculateTaxForOrder` is used to set the tax cost values on the Order instance.

### Calculating  Taxes

When implementing a TaxModule, the key to communicating the tax cost to Broadleaf Commerce is the Order instance passed into the calculateTaxForOrder method. While the specific informational needs for each tax calculation method will differ, you should have access here to the building blocks necessary to calculate any form of tax. Here are some hints:

- Call order.getFulfillmentGroups() to get all the fulfillment groups for the order. Multiple fulfillment groups mean that parts of the order are shipping to different locations.
- Call fulfillmentGroup.getAddress() to get the shipping address.
- Call fulfillmentGroup.getItems() to get all the FulfillmentGroupItems in a FulfillmentGroup
- Call fulfillmentGroupItem.getOrderItem() to get an OrderItem
- Call orderItem.getTaxablePrice() to get the taxable amount for the item

You'll want to iterate through all the OrderItem and FulfillmentGroupFee objects in every FulfillmentGroup of the Order, building and setting your tax totals when appropriate. You may also have additional taxes that reside on FulfillmentGroup, such as a shippingTax.

### Responding with Tax

Broadleaf Commerce expects that the Order instance returned from the calculateTaxForOrder method of your tax module has the pertinent tax cost totals assigned. Your tax module is on the hook for setting TaxDetail objects (if applicable) on:

- Every `FulfillmentGroup` (Such as a shipping tax)
- Every `FulfillmentGroupItem`
- Every `FulfillmentGroupFee`

The totalTax fields will be set in the pricing workflow during the `TotalActivity`.
