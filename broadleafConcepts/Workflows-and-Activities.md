**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

Broadleaf provides configurable workflows for key phases of the eCommerce process - namely, checkout, payment and pricing. These worflows are represented in xml in the Spring application context file. At the most basic level, Broadleaf provides a default configuration for checkout and payment that covers the basic steps using simple modules. Most users will want to override part, or all, of the steps defined in these default configurations to fit their own needs and business rules. We'll start out by describing the default configuration, and then advance later into customization strategies.

## Anatomy of a workflow

```xml
<bean id="blPaymentWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.SimplePaymentProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.CompositeActivity">
                <property name="workflow" ref="blAuthorizeAndDebitWorkflow"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

Every workflow is actually an instance of the `SequenceProcessor` class from Broadleaf. This class manages the orderly activation of subordinate activities as well handling error states, should they occur. Workflows are configured in three main areas, the process context factory, the activities list, and the error handler. 

- The processContextFactory property must be set with an instance of a class implementing the ProcessContextFactory interface. All such implementers are responsible for creating an instance of a class implementing the ProcessContext interface. In our example, the SimplePaymentProcessContextFactory class is used, which creates an instance of the SimplePaymentContext function of a ProcessContext later.

- The activities property must be fulfilled with a list containing one or more activities. In our example, we provide a composite activity. Composite activities can contain a subordinate workflow, allowing us to create complex, nested workflows. This particular composite activity handles a combination of authorize and debit functions. We'll talk more about composite activities later.

- The error handler is an ErrorHandler instance passed to the defaultErrorHandler property. By default, we specify the blDefaultErrorHandler, which is a simple error handler bean defined in the Broadleaf Commerce application context. This default error handler only serves to log the exception to system.out and then bubbles the exception - stopping this workflow and its processing of activities for the current thread. We'll talk a little more about error handlers later.

## ProcessContext

A ProcessContext is a common context object that is passed in and out of every activity in a workflow. This context object usually contains data pertinent to the theme of the workflow. Our payment workflow example uses a SimplePaymentContext instance (shown below), which contains a PaymentSeed instance that exposes several properties required to successfully process a payment request: a map of PaymentInfo instances, the Order and the PaymentResponse. In addition, each ProcessContext provides methods to set and check the state of the workflow using stopProcess and isStopped methods, respectively. For example, calling stopProcess directly, an activity could stop further processing of a workflow without necessarily raising an exception.

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

## Activities

Activities in their most basic state are instances of the `Activity` interface, which provides simple entry points for executing the activity and retrieving the error handler. Most activities will actually implement the `BaseActivity` abstract class. The `PaymentActivity` is such a class, and it understands how to take a PaymentContext and apply it against a PaymentService to actually enact a payment transaction. We'll talk more about the PaymentActivity when we cover the payment workflow in detail.

Composite activities also extend `BaseActivity`, so they are valid candidates for members of the activity list in the workflow definition. However, they differ in the fact that they accept a child workflow as their sole configuration. Whenever a composite activity is called by its parent workflow, that call is propagated down into the child workflows where its activities will be called in an orderly fashion. All child workflows are subject to the same ProcessContext instance and all exceptions are bubbled to the top and stopProcess calls at any level stop the entire nested workflow. By utilizing composite activities, we can achieve more complicated, nested behavior in our workflows.

## Error Handlers

```java
public interface ErrorHandler extends BeanNameAware {

    public void handleError(ProcessContext context, Throwable th) throws WorkflowException;

}
```

Error handlers are instances of the simple `ErrorHandler` interface (show above). The error handler provides the Broadleaf user an opportunity to perform some task when an exception takes place during the execution of a workflow. This could be as simple as logging the exception, or perhaps something more complicated like releasing resources. As stated earlier, all default Broadleaf workflows use the DefaultErrorHandler class, which simply logs the exception to `System.out` and bubbles the exception.

