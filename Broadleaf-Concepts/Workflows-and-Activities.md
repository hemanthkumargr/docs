# Workflows and Activities

Broadleaf provides configurable workflows for key phases of the eCommerce process - namely, checkout, payment, pricing and cart operations. These worflows are represented in xml in the Spring application context file. At the most basic level, Broadleaf provides a default configuration for checkout and payment that covers the basic steps using simple modules. Most users will want to override part, or all, of the steps defined in these default configurations to fit their own needs and business rules. We'll start out by describing the default configuration, and then advance later into customization strategies.

## Anatomy of a workflow

```xml
<bean p:order="1000" id="blPaymentActivity" class="org.broadleafcommerce.core.payment.service.workflow.CompositeActivity">
    <property name="workflow" ref="blAuthorizeAndDebitWorkflow"/>
</bean>
<bean id="blPaymentWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.SimplePaymentProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <ref bean="blPaymentActivity" />
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

Every workflow is actually an instance of the `SequenceProcessor` class from Broadleaf. This class manages the orderly activation of subordinate activities as well handling error states, should they occur. Workflows are configured in three main areas, the process context factory, the activities list, and the rollback handler. 

### ProcessContextFactory
The `processContextFactory` property must be set with an instance of a class implementing the `ProcessContextFactory` interface. All such implementers are responsible for creating an instance of a class implementing the `ProcessContext` interface (more on this in a bit). In our example, the `SimplePaymentProcessContextFactory` class is used, which creates an instance of the `SimplePaymentContext`.

> ProcessContexts are usually only relevant for a particular type of workflow, and thus there is usually a different ProcessContextFactory for each workflow as well. An immediate exception to this rule is that each of the cart workflows (add, remove, update) all use the same `ProcessContext` and thus the same `ProcessContextFactory` since they are so similar.

### Activities
The `activities` property must be filled with a list containing one or more `Activities`. Each `Activity` in the workflow is responsible for performing a single unit of work (like computing tax in the `TaxActivity` or summing up the total price of an order in the `TotalActivity`). In the above example, we provide a composite activity. Composite activities can contain a subordinate workflow, allowing us to create complex, nested workflows. This particular composite activity handles a combination of authorize and debit functions. We'll talk more about composite activities later.

### Error Handler
The error handler is an ErrorHandler instance passed to the defaultErrorHandler property. By default, we specify the blDefaultErrorHandler, which is a simple error handler bean defined in the Broadleaf Commerce application context. This default error handler only serves to log the exception to system.out and then bubbles the exception - stopping this workflow and its processing of activities for the current thread. We'll talk a little more about error handlers later.

## Activity Ordering
If you look back at that initial reference to the `blPaymentWorkflow` at the beginning of this document, you'll notice a slightly peculiar configuration for the activity:

```xml
<bean p:order="1000" id="blPaymentActivity" class="org.broadleafcommerce.core.payment.service.workflow.CompositeActivity">
    <property name="workflow" ref="blAuthorizeAndDebitWorkflow"/>
</bean>
```

The `blPaymentActivity` has a `p:order` property defined. This will set the `order` property for this `Activity`, which determines how the framework will order these activities in relation to other activities. This is really handy when combined with the fact that Broadleaf merges activity lists together within the same bean id. Let's look at a more complicated example of ordering in action with the `blUpdateItemWorkflow`:

```xml
<bean p:order="1000" id="blVerifyCustomerMaxOfferUsesActivity" class="org.broadleafcommerce.core.offer.service.workflow.VerifyCustomerMaxOfferUsesActivity"/>
<bean p:order="2000" id="blPaymentServiceActivity" class="org.broadleafcommerce.core.checkout.service.workflow.PaymentServiceActivity"/>
<bean p:order="3000" id="blRecordOfferUsageActivity" class="org.broadleafcommerce.core.offer.service.workflow.RecordOfferUsageActivity"/>
<bean p:order="4000" id="blCompleteOrderActivity" class="org.broadleafcommerce.core.checkout.service.workflow.CompleteOrderActivity"/>

<bean id="blCheckoutWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.checkout.service.workflow.CheckoutProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <ref bean="blVerifyCustomerMaxOfferUsesActivity" />
            <ref bean="blPaymentServiceActivity" />
            <ref bean="blRecordOfferUsageActivity" />
            <ref bean="blCompleteOrderActivity" />
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

In all Broadleaf workflows each framework-defined activity goes up by 1000, allowing you to order your own activities in-between. For instance, if you want to put a custom activity in-between the recording offer usage and marking the order as completed, you would define the following in your applicationContext-mycompany.xml:

```xml
<bean id="blCheckoutWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <propety name="activities">
        <bean p:order="3500" class="com.mycompany.core.workflow.DecrementInventoryActivity" />
    </property>
</bean>
```

A few important notes about this activity ordering:
- If 2 activities have the exact same order (for instance, both are configured with '3000') then the ordering will be **in-place**. This means that the ordering will be determined by applicationContext merge ordering (as defined in the `patchConfigLocations` in web.xml)
- Integration modules should declare their activity ordering in the 100 range (like 3100, 3200, etc) so that specific implementations can further weave custom activities in-between those as well
- All framework activity ordering can be overridden by referencing the bean id and changing the `p:order` attribute
- **If you have not configured your activity to have an explicit ordering, your activity will be placed at the end of the workflow (more explicitly, the default order for activities is `Ordered.LOWEST_PRECEDENCE`)**

## Rollback Handlers

Rollback handlers provide a way for an activity to register state, and possibly rollback an operation at some later time. Consider this example, step #1 of a checkout workflow could be a debit to a credit card. After the credit card is charged, step #2 may update the cart status. Now, if for some reason the cart status update step fails, it would be useful to have a standardized way to refund or void the credit card charge made previously. This is the purpose of the rollback handler.

Rollback handlers can perform any custom code desired and can operate based on the state that is passed in. As a result, the rollback operation doesn't have to be to an external service like a payment gateway. It could instead be a [compensating transaction](http://en.wikipedia.org/wiki/Compensating_transaction) that returns the database state back to what it was previous to the activity's execution. This is an important distinction, as most workflows themselves are NOT executed under a JDBC transaction, as the workflow lifecycle length makes keeping transactions open impractical. Since the whole workflow is not under a single transaction, there will not be an immediate and automatic rollback of database state upon exception, which mean that a rollback handler must be used to explicitly set the database back to the desired state.

The simplest form of rollback handler is configured via xml application context in the activity declaration for the workflow. Let's look at a modified example of the previous workflow declaration:

```xml
<bean id="blTestRollbackHandler" class="org.broadleafcommerce.core.workflow.state.test.TestRollbackHandler"/>

<bean p:order="1000" id="blVerifyCustomerMaxOfferUsesActivity" class="org.broadleafcommerce.core.offer.service.workflow.VerifyCustomerMaxOfferUsesActivity"/>
<bean p:order="2000" id="blPaymentServiceActivity" class="org.broadleafcommerce.core.checkout.service.workflow.PaymentServiceActivity">
    <property name="rollbackHandler" ref="blTestRollbackHandler"/>
</bean>
<bean p:order="3000" id="blRecordOfferUsageActivity" class="org.broadleafcommerce.core.offer.service.workflow.RecordOfferUsageActivity"/>
<bean p:order="4000" id="blCompleteOrderActivity" class="org.broadleafcommerce.core.checkout.service.workflow.CompleteOrderActivity"/>

<bean id="blCheckoutWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.checkout.service.workflow.CheckoutProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <ref bean="blVerifyCustomerMaxOfferUsesActivity" />
            <ref bean="blPaymentServiceActivity" />
            <ref bean="blRecordOfferUsageActivity" />
            <ref bean="blCompleteOrderActivity" />
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

In the example, we have include a rollbackHandler property for blPaymentServiceActivity (blTestRollbackHandler) that will execute if there is an exception in any of the subsequent activities. (Note, an activity's own rollback handler is not called when that activity fails, just the rollback handlers of those activities that have already succeeded previously in the workflow. It is the activity's responsibilty to rectify its own state, if applicable, when it fails). This test rollback handler does nothing but log some items to the console, but a real implementation would presumably call the payment gateway to reverse or void a payment.

### RollbackHandler Interface

All rollback handlers implement the RollbackHandler interface, which has a single method that must be implemented

```java
public void rollbackState(Activity<? extends ProcessContext> activity, ProcessContext processContext, Map<String, Object> stateConfiguration) throws RollbackFailureException;
```

The contract contains all the information that should be necessary to perform the compensating transaction. The activity in question, as well as the ProcessContext (see next section) are provided. Most important, the stateConfiguration map is provided that contains important information about the operation that was previously performed by the activity. This state information can be used to help reverse the operation. The stateConfiguration is generally provided by the activity during execution, which we'll look at next.

### ActivityStateManager

The ActivityStateManager is a flexible component used to register a rollback handler and any accompanying state. The ActivityStateManager can be called from anywhere in the flow of execution for a workflow (Activity, Module, ErrorHandler, etc...). To get a handle on the singleton ActivityStateManager instance, execute:

```java
ActivityStateManagerImpl.getStateManager();
```

The ActivityStateManager interface provides several methods for registering RollbackHandlers and state. In fact, you can even further refine rollback behavior by calling the overloaded version of registerState that accepts a region parameter. Region allows you to provide a grouping label for one or more RollbackHandlers, which provides an avenue for selectively rolling back a subset of registered rollback handlers. ActivityStateManager also has methods for clearing state and for executing rollbacks, which may also be called at any time (although you'll generally let the system call these latter methods for you automatically).

Let's take a look at a concrete example of registering state as its done in PaymentActivity:

```java
if (getRollbackHandler() != null && automaticallyRegisterRollbackHandlerForPayment) {
    Map<String, Object> myState = new HashMap<String, Object>();
    if (getStateConfiguration() != null && !getStateConfiguration().isEmpty()) {
        myState.putAll(getStateConfiguration());
    }
    myState.put(ROLLBACK_ACTIONTYPE, seed.getActionType());
    myState.put(ROLLBACK_PAYMENTCONTEXT, paymentContext);
    myState.put(ROLLBACK_RESPONSEITEM, paymentResponseItem);

    ActivityStateManagerImpl.getStateManager().registerState(this, context, getRollbackHandler(), myState);
}
```

This snippet is responsible for looking to see if any static state was configured in app context. Then, it takes several key pieces of information about the current payment and adds that to the state configuration. Finally, it registers the Activity, ProcessContext, RollbackHandler and state map with the ActivityStateManager singleton.

### Implicit vs Explicit Registration

By default, one must explicitly register a RollbackHandler in code (see above). This is because most RollbackHandlers will require thread specific state to be registered in order to achieve a viable rollback state. However, for more simple rollback handlers, if no thread specific state is required to achieve a rollback, then the system can be configured for implicit/automatic rollback registration. For example:

```xml
<bean id="myActivity"
      class="com.test.MyActivity">
    <property name="rollbackHandler" ref="blTestRollbackHandler"/>
    <property name="stateConfiguration">
        <map>
            <entry key="testProperty" value="testValue"/>
        </map>
    </property>
    <property name="automaticallyRegisterRollbackHandler" value="true"/>
</bean>
```

In this example, we're specifying a rollbackHandler, some static state and telling the system to automatically register the RollbackHandler. Because we don't care about thread specific state here, this config is all that's required to register the RollbackHandler with the ActivityStateManager singelton.

### Implicit vs Explicit Rollback

By default, registered RollbackHandler instances are automatically executed upon exception in the workflow execution. However, there may be cases where it is advantageous to turn off this behavior and instead to call rollback explicitly from ActivityStateManager in code (e.g. you might want to rollback a specific region, instead of all rollback handlers). To engage explicit rollback behavior, declare

```java
workflow.auto.rollback.on.error=false
```

in your runtime environment configuration property files. Note, this behavior can be overridden for each workflow by setting the autoRollbackOnError property for each workflow in your app context xml.

## ProcessContext

A ProcessContext is a common context object that is passed in and out of every activity in a workflow. This context object usually contains data pertinent to the theme of the workflow. Our payment workflow example uses a SimplePaymentContext instance (shown below), which contains a PaymentSeed instance that exposes several properties required to successfully process a payment request: a map of PaymentInfo instances, the Order and the PaymentResponse. In addition, each ProcessContext provides methods to set and check the state of the workflow using `stopProcess` and `isStopped` methods, respectively. For example, calling stopProcess directly, an activity could stop further processing of a workflow without necessarily raising an exception.

```java
public class SimplePaymentContext implements ProcessContext {

    public final static long serialVersionUID = 1L;

    private boolean stopEntireProcess = false;
    private PaymentSeed seedData;

    public void setSeedData(Object seedObject) {
        this.seedData = (PaymentSeed) seedObject;
    }

    public boolean stopProcess() {
        this.stopEntireProcess = true;
        return stopEntireProcess;
    }

    public boolean isStopped() {
        return stopEntireProcess;
    }

    public PaymentSeed getSeedData() {
        return seedData;
    }

}
```

### Conditional Activity Execution
The `Activity` interface provides support for skipping over that activity based on the items in the `ProcessContext`. This method is invoked before executing each `Activity`. This could prevent duplication of workflow definitions; perhaps a single large workflow could be declared for multiple configurations of a `ProcessContext`. 

## Activities

Activities in their most basic state are instances of the `Activity` interface, which provides simple entry points for executing the activity and retrieving the error handler. Most activities will actually implement the `BaseActivity` abstract class. The `PaymentActivity` is such a class, and it understands how to take a PaymentContext and apply it against a PaymentService to actually enact a payment transaction. We'll talk more about the PaymentActivity when we cover the payment workflow in detail.

An `Activity` is also only relevant for a certain type of workflow (meaning it can only operate on a certain type of `ProcessContext`) defined by Java generics. For instance, this would the the definition of an activity in the `blPricingWorkflow`:
```java
public class TotalActivity extends BaseActivity<PricingContext> {

    @Override
    public PricingContext execute(PricingContext context) throws Exception {
        Order order = context.getSeedData();
        //compute all totals for the order
        return context;
    
    }
}
```
Whereas this `Activity` would be defined in the `blCheckoutWorkflow`:
```java
public class CompleteOrderActivity extends BaseActivity<CheckoutContext> {

    @Override
    public CheckoutContext execute(CheckoutContext context) throws Exception {
        CheckoutSeed seed = context.getSeedData();

        seed.getOrder().setStatus(OrderStatus.SUBMITTED);
        seed.getOrder().setOrderNumber(new SimpleDateFormat("yyyyMMddHHmmssS").format(SystemTime.asDate()) + seed.getOrder().getId());
        seed.getOrder().setSubmitDate(Calendar.getInstance().getTime());

        return context;
    }

}
```

Composite activities also extend `BaseActivity`, so they are valid candidates for members of the activity list in the workflow definition. However, they differ in the fact that they accept a child workflow as their sole configuration. Whenever a composite activity is called by its parent workflow, that call is propagated down into the child workflows where its activities will be called in an orderly fashion. All child workflows are subject to the same ProcessContext instance and all exceptions are bubbled to the top and stopProcess calls at any level stop the entire nested workflow. By utilizing composite activities, we can achieve more complicated, nested behavior in our workflows.

## Error Handlers

```java
public interface ErrorHandler extends BeanNameAware {

    public void handleError(ProcessContext context, Throwable th) throws WorkflowException;

}
```

Error handlers are instances of the simple `ErrorHandler` interface (show above). The error handler provides the Broadleaf user an opportunity to perform some task when an exception takes place during the execution of a workflow. This could be as simple as logging the exception, or perhaps something more complicated like releasing resources. As stated earlier, all default Broadleaf workflows use the DefaultErrorHandler class, which simply logs the exception to `System.out` and bubbles the exception.

## Removing a Broadleaf Workflow
It is possible that you will want to remove one of the workflows that we have defined in the framework in order to perform more exotic functions or to handle very specific use cases. While we would not normally recommend this, we have provided an easy subclass for you to use, the `EmptySequenceProcess`. If you wanted to remove the `blCheckoutWorkflow` because you have subclassed `OrderService` and have your own implementation of `performCheckout()`, simply add this to your applicationContext:
```xml
<bean id="blCheckoutWorkflow" class="org.broadleafcommerce.core.workflow.EmptySequenceProcessor" />
```

## Provided Workflows
Below are some of the items that Broadleaf has workflow concepts for out of of the box ([full applicationContext definition](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/develop/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml)):

| Workflow Bean ID | Description
| :----------------- | :-----------------------
| [blAddItemWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml#L84)  | Used when an item is added to the cart
| [blUpdateItemWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml#L108) | Used when an item is updated in the cart
| [blRemoveItemWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml#L133) | Used when an item is removed from the cart
| [blPricingWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml#L50) | Used by `blPricingService` (which is used by OrderService) to price an Order
| [blCheckoutWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml#L163) | Invoked by `blCheckoutService` in order to complete checkout for an Order (charge payments, decrement inventory, change status to SUBMITTED, etc)
| [blPaymentWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow.xml#L84) | `CompositeActivity` within `blCheckoutWorkflow` to allow multiple payment methods


Paying for orders can also occur in multiple ways and can come from multiple sources. Since the `blPaymentWorkflow` is just a composite activity, you can swap out the default configured workflow for payment (which is `blAuthorizeAndDebitWorkflow`). Commonly, if you do not actually charge the user for an order until the items are shipped out, you might replace the `workflow` property of the `blPaymentWorkflow` with the `blAuthorizeWorkflow` to simply authorize the customer's payment with the payment provider. Then a future fulfillment process would come in and execute the `blDebitWorkflow` to actually charge the payment. The workflows dealing with payment are documented below ([full applicationContext definition](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/workflow/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml)):

| Workflow Bean ID | Description | Types of Payment Used (in declaration order)
| :-----------------   | :------------------ | :--------------------
| [blAuthorizeWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml#L80)  | **Authorize** the payment amount for the order. Assumes debiting will occur later | Gift Card, Account Payment, Credit Card
| [blDebitWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml#L109) | **Debit** the amount for the order for the account. Assumes an auth has already occurred | Gift Card, Account Payment, Credit Card
| **[blAuthorizeAndDebitWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml#L165)** (default) | Perform an **authorize** and **debit** all at once. This is the default workflow injected into the `blPaymentWorkflow` and represents the most common use case for eCommerce sites. This means that full payment for an order is collected at time of checkout | Account Credit, Customer Credit, Account Payment, Gift Card, Credit Card, Bank Account, Check, E-Check, Wire, Money Order
| [blCreditWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml#L200) | **Credits** the account for the amount of the order. Used for refunds and when both the **authorize** and **debit** has occurred and the transaction has been settled | Credit Card, Gift Card, Account Payment
| [blVoidWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml#L228) | **Voids** the account for the amount of the order. Used when the payment has already been **authorized** and **debited**, but the transaction is still marked as 'pending' (has not been settled yet). If settlement has already occurred, the `blCreditWorkflow` should be invoked to give a refund | Credit Card, Gift Card, Account Payment
| [blReverseAuthWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml#L256) | Reverses a previous **authorize** from the `blAuthorizeWorkflow`. This assumes that the **debit** has not already occurred (for instance, a cancelled order). If the debit has occurred, use either the `blCreditWorkflow` or `blVoidWorkflow` depending on the status of settlement | Credit Card, Gift Card, Account Payment
| [blPartialPaymentWorkflow](https://github.com/BroadleafCommerce/BroadleafCommerce/blob/master/core/broadleaf-framework/src/main/resources/bl-framework-applicationContext-workflow-payment.xml#L276) | Submit a **partial payment** for an order. Most common use case would be an authorize that occurs for the entire order at time of sale, but then items in the order are shipped out separately. In most cases, the credit card would be **debited** as each item is shipped out (thus a partial payment) | Credit Card

