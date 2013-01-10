This tutorial assumes that you have already completed the [[Extending a Broadleaf Module | Extending a Broadleaf Module]] tutorial. That tutorial is a prerequisite for completing this tutorial.

One example of this would be adding a method on Order to bring back a list of the fees on all of the FulfillmentGroups. 

Let's assume that you have an Order subclass that looks like this:

```java
public class MyCompanyOrderImpl extends OrderImpl implements MyCompanyOrder {

    //Custom code excluded
    //...

    public Money getFulfillmentFees() {
        Money result = new Money(BigDecimal.ZERO);
        for (FulfillmentGroup group : getFulfillmentGroups()) {
            for (FulfillmentGroupFee fee : group.getFulfillmentGroupFees()) {
                result = result.add(fee.getAmount());
        }
        return result;
    }
}
```

In order to make this show up correctly, let's add an `@AdminPresentationOverride` annotation to the class in order to customize this field's display properties, making the above class look like:
```java
@AdminPresentationOverride(name="getFulfillmentFees" value=@AdminPresentation(friendlyName="Fulfillment Fees", fieldType=SupportedFieldType.MONEY))
public class MyCompanyOrderImpl extends OrderImpl implements MyCompanyOrder {

    //Custom code excluded
    //...

    public Money getFulfillmentFees() {
        Money result = new Money(BigDecimal.ZERO);
        for (FulfillmentGroup group : getFulfillmentGroups()) {
            for (FulfillmentGroupFee fee : group.getFulfillmentGroupFees()) {
                result = result.add(fee.getAmount());
        }
        return result;
    }
}
```

Broadleaf calls these calculated methods "non-persistent properties" and must be explicitly referenced in the GWT DataSource creation.  Since the default behavior of Broadleaf is to use reflection to build the dynamic list of properties that are available for display in the admin, no methods are touched unless specified.  In our case, we will need to provide our own implementation of the `OrderListDatasourceFactory` that Broadleaf has out of the box to also include our `getFulfillmentFees` method.

Now, building off of the previous [[Extending a Broadleaf Module | Extending a Broadleaf Module]] tutorial, let's also tell it to include our custom Presenter so that we can specify a custom datasource:
```java
package com.mycompany.admin;

public class MyCustomerCareModule extends CustomerCareModule {
    @Override
    public void onModuleLoad() {
        super.onModuleLoad();
        ModuleFactory moduleFactory = ModuleFactory.getInstance();
        moduleFactory.put("orderPresenter", "com.mycompany.admin.client.presenter.order.MyCompanyOrderPresenter");
    }
}
```

Then we'll create the `MyCompanyOrderPresenter` class, which will subclass the Broadleaf `OrderPresenter`.  The datasource factories are created during the `setup()` method which is where our main extension point will be:

```java
public class MyCompanyOrderPresenter extends OrderPresenter {

    @Override
    public void setup() {
        getPresenterSequenceSetupManager().addOrReplaceItem(new PresenterSetupItem("orderDS", new MyCompanyOrderListDataSourceFactory(), new AsyncCallbackAdapter() {
            @Override
            public void onSetupSuccess(DataSource top) {
                setupDisplayItems(top);
                ((ListGridDataSource) top).setupGridFields(new String[]{"customer.firstName", "customer.lastName", "name", "orderNumber", "status", "submitDate"});
                getDisplay().getListDisplay().getGrid().sort("submitDate", SortDirection.DESCENDING);
            }
        }));
    }
}
```

And finally, the `MyCompanyOrderListDatasourceFactory` is where we can specify the non-persistent field, on creation of the PersistencePerspective:

```java
public class MyCompanyOrderListDataSourceFactory implements DataSourceFactory {
    
    public static ListGridDataSource dataSource = null;
    
    public void createDataSource(String name, OperationTypes operationTypes, Object[] additionalItems, AsyncCallback<DataSource> cb) {
        if (dataSource == null) {
            operationTypes = new OperationTypes(OperationType.ENTITY, OperationType.ENTITY, OperationType.ENTITY, OperationType.ENTITY, OperationType.ENTITY);
            //Add our custom getFulfillmentFees non-persistent property to the persistence perspective
            PersistencePerspective persistencePerspective = new PersistencePerspective(operationTypes, new String[]{"getFulfillmentFees"}, new ForeignKey[]{});
            DataSourceModule[] modules = new DataSourceModule[]{
                new BasicClientEntityModule(CeilingEntities.ORDER, persistencePerspective, AppServices.DYNAMIC_ENTITY)
            };
            dataSource = new ListGridDataSource(name, persistencePerspective, AppServices.DYNAMIC_ENTITY, modules);
            dataSource.buildFields(null, false, cb);
        } else {
            if (cb != null) {
                cb.onSuccess(dataSource);
            }
        }
    }
}
```

You should now see a field called "Fulfillment Fees" being displayed in the order details section of the admin.  If you would like to have this shown as a column in the left-hand list of Orders, you can further modify the `setup()` method to include that field as well:

```java
@Override
public void setup() {
    getPresenterSequenceSetupManager().addOrReplaceItem(new PresenterSetupItem("orderDS", new MyCompanyOrderListDataSourceFactory(), new AsyncCallbackAdapter() {
        @Override
        public void onSetupSuccess(DataSource top) {
            setupDisplayItems(top);
            ((ListGridDataSource) top).setupGridFields(new String[]{"customer.firstName", "customer.lastName", "name", "orderNumber", "status", "submitDate", "getFulfillmentFees"});
            getDisplay().getListDisplay().getGrid().sort("submitDate", SortDirection.DESCENDING);
        }
    }));
}
```