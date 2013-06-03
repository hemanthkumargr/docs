# Cart Operations

Broadleaf 2.0 comes with a new strategy for interacting with carts (an in process order). Instead of having to extend OrderService like before, you now simply define a workflow for cart operations that specifies a list of activities to be called in order.

## Cart Operation Workflows

### Default Workflows

There are three workflows provided by default in Broadleaf:

- `blAddItemWorkflow`
- `blUpdateItemWorkflow`
- `blRemoveItemWorkflow`

These workflows and the default activities are defined in the following file:

```
/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml
```

### Modifying A Workflow

Modifying a workflow is done simply by defining a bean with the same name of one of the default workflows in your application's `applicationContext.xml` file. The easiest way to describe this is via a tutorial. We have one here:

- [[Add To Cart Workflow For Heat Clinic Tutorial]]


## Fulfillment Group Item Strategy 

It is generally desirable to maintain your fulfillment group items and your order items in sync. Instead of having to manually create fulfillment groups and fulfillment group items as in versions prior to 2.0, the new paradigm is to employ an applicable fulfillment group item strategy. 

There are two strategies provided by Broadleaf - one that does nothing, and one that will keep FulfillmentGroupItems and OrderItems in sync. The sync strategy is the one that is configured by default.

The `FulfillmentGroupItemStrategy` interface provides for a few different operations:

- `onItemAdded`
- `onItemUpdated`
- `onItemRemoved`
- `verify`

These methods will get called during the cart operation workflows after the order items have interacted with the order. Verify will get called after each workflow to ensure that everything is in its proper state.

### The Sync Strategy

If left alone, it will operate on the assumption that there is only one fulfillment group and will place all items into this fulfillment group. This is by far the most common use case in eCommerce and only differs when your site supports split fulfillment - that is, shipping items to different addresses in one order.

If you do have multiple fulfillment groups in your order, the default strategy will do its best to respect the relationship of where items are going when the state of the cart changes. But, of course, it is unreasonable to assume that the system can make the appropriate decision based on user intent. If this is a common problem in your application, you will want to create your own personalized strategy and configure Broadleaf to use it.

### The Null Strategy

This strategy will, as you would expect, do nothing on item add and update. However, it will still remove fulfillment group items when associated order items are removed to maintain the database constraint.
