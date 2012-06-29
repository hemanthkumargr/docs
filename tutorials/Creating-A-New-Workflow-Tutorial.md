## Overview

In this tutorial, we're going to examine adding a custom workflow that leverages the powerful `SequenceProcessor` in Broadleaf. We will describe the steps necessary to create the `MyAwesomeAddItemWorkflow` that will perform an inventory check, and if successful add the item to the cart. This is similar to the already existing `blAddItemWorkflow` but will be easier to follow along for the tutorial.

> **NOTE**: The workflow we're creating is not actually awesome. You would never actually want to use this particular workflow in your application -- Broadleaf already provides workflows that are utilized for adding / updating / removing items from cart. We're just using this as a basis for a tutorial that demonstrates creating custom workflows. Learn more about the [[Cart Operation Workflows]].

We'll start by examining the XML configuration piece that we will need to activate the workflow. After that, we'll go ahead and implement all of the necessary elements defined in the configuration and test it out. Additional documentation can be found at the [[Workflows and Activities]] page.

## XML Configuration

Here's the chunk of code we're going to need:

```xml
<bean id="myAwesomeAddItemWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="com.mycompany.core.order.service.workflow.AddItemProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="com.mycompany.core.order.service.workflow.CheckInventoryActivity"/>
            <bean class="com.mycompany.core.order.service.workflow.AddOrderItemActivity"/>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

Let's take a look at the important things here:

- The bean we're instantiating is an instance of the `SequenceProcessor` class and we're calling it `myAwesomeAddItemWorkflow`
- We're defining something that subclasses `ProcessContextFactory` and in this example we're calling it `AddItemProcessContextFactory`
- We added two activities: `CheckInventoryActivity` and `AddOrderItemActivity`, which do what you would expect

OK, awesome. That configuration was really simple and straight forward, and now all we have to do is implement our classes.

## Defining the ProcessContext and the ProcessContextFactory

Before we can create our custom implementation of a `ProcessContextFactory`, we have to have a custom `ProcessContext` for it to work with. 

Let's go ahead and create an our context:

```java
public class AddItemContext implements ProcessContext {
    public final static long serialVersionUID = 1L;

    protected boolean stopEntireProcess = false;
    protected Map<String, Object> seedData;

    @SuppressWarnings("unchecked")
    public void setSeedData(Object seedObject) {
        seedData = (Map<String, Object>) seedObject;
    }

    public boolean stopProcess() {
        this.stopEntireProcess = true;
        return stopEntireProcess;
    }

    public boolean isStopped() {
        return stopEntireProcess;
    }

    public Map<String, Object> getSeedData(){
        return seedData;
    }
}
```

Boom, done. Let's take a look at what was important

- We have a class that is an implementation of `ProcessContext`
- It stores some data structure as the `seedData`. This will hold all of the information required by all activities in this workflow to properly execute

> Note: For this example, we are going to use a simple Map as our `seedData`. In more complicated workflows, you would want to utilize a custom DTO object to make management easier.

And now we can create our factory:

```java
public class AddItemProcessContextFactory implements ProcessContextFactory {
    public ProcessContext createContext(Object seedData) throws WorkflowException {
        if (!(seedData instanceof Map)){
            throw new WorkflowException("Seed data instance is incorrect. " +
                    "Required class is "+Map.class.getName()+" " +
                    "but found class: "+seedData.getClass().getName());
        }
        
        AddItemContext context = new AddItemContext();
        context.setSeedData(seedData);
        return context;
    }
}
```

Nothing special here, we're just creating an instance of our context if it passes a type check.

> Note: This is a weak type check since we are using a Map and we cannot parameterize the check. Again, using a custom DTO would be better as the type check would be stronger.

## The Activities

Recall that in our XML we defined two activities for our `AddItemWorkflow`

```xml
<bean class="com.mycompany.core.order.service.workflow.CheckInventoryActivity"/>
<bean class="com.mycompany.core.order.service.workflow.AddOrderItemActivity"/>
```

Let's implement them!

```java
public class CheckInventoryActivity extends BaseActivity {
    private static Log LOG = LogFactory.getLog(AddOrderItemActivity.class);
    
    public ProcessContext execute(ProcessContext context) throws Exception {
        Map<String, Object> request = ((Map<String, Object>) context).getSeedData();

        OrderItemRequest orderItemRequest = (OrderItemRequest) request.get("orderItemRequest");

        ... logic to check inventory for the current item ...
        ... if no inventory, you would throw an exception ...
        
        ((AddItemContext) context).setSeedData(request);
        return context;
    }
}
```

```java
public class AddOrderItemActivity extends BaseActivity {
    private static Log LOG = LogFactory.getLog(AddOrderItemActivity.class);
    
    @Resource(name = "blOrderService")
    protected OrderService orderService;

    public ProcessContext execute(ProcessContext context) throws Exception {
        Map<String, Object> request = ((Map<String, Object>) context).getSeedData();

        OrderItemRequest orderItemRequest = (OrderItemRequest) request.get("orderItemRequest");
        Order order = orderService.findOrderbyId((Long) request.get("orderId"));

        ... logic to add the order item to the current order ...
        
        ((AddItemContext) context).setSeedData(request);
        return context;
    }
}
```

Review time! What did we do here? We created two different activities, `CheckInventoryActivity` and `AddOrderItemActivity` that both extended `BaseActivity`. Each activity grabbed what it needed from the `seedData`, performed its required step (throwing an exception if it failed) and then propagated the context forward to the next activity. The last activity (`AddOrderItemActivity`) would propagate its context to the caller. This means that you are allowed to change the context at will in the activities!

## Tying it all together

One last thing -- actually executing this workflow! Let's take a look:

```java
@Resource(name = "myAwesomeAddItemWorkflow")
protected SequenceProcessor myAwesomeAddItemWorkflow;

public boolean addItem(OrderItemRequest orderItemRequest, Long orderId) {
    Map<String, Object> request = new HashMap<String, Object>();
    request.put("orderItemRequest", orderItemRequest);
    request.put("orderId", orderId);

    try {
        AddItemContext context = (AddItemContext) myAwesomeAddItemWorkflow.doActivities(request);
        return true;
    } catch (WorkflowException e) {
        return false;
    }
}
```

