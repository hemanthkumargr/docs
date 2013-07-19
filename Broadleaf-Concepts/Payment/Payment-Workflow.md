# Payment Workflow

> Note - Please familiarize yourself with [[Workflows and Activities]] before proceeding.

## Overview

Let's take a look at the default payment workflow configuration:

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

For this workflow, we've defined a single composite activity called `blAuthorizeAndDebitWorkflow`. Let's take a look at this workflow definition as well:

```xml
<bean id="blAuthorizeAndDebitWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentProcessContextFactory">
            <property name="paymentActionType" value="AUTHORIZEANDDEBIT"/>
        </bean>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blGiftCardService"/>
                <property name="userName" value="web"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blBankAccountService"/>
                <property name="userName" value="web"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blCreditCardService"/>
                <property name="userName" value="web"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

Payment configuration differs from other workflows configurations in that there are some unique requirements when setting them up.

For payment workflows:
- Composite activities and normal activities should not be mixed in the same workflow
- A workflow containing composite activities should use the `SimplePaymentProcessContextFactory` for the `processContextFactory` property
- A workflow containing normal activities should use the `PaymentProcessContextFactory` for the `processContextFactory` property

Based on these requirements, the default payment workflow for Broadleaf is setup to us a parent composite workflow that calls a subordinate authorize and debit workflow as one of its activities. We could easily add in additional subordinate workflows for more complicated behavior.

Looking a little more in-depth at the authorize and debit workflow, we see that the `PaymentProcessContextFactory` is being passed a `paymentActionType` property. PaymentActionType defines the type of payment transaction this payment workflow is concerned with. There are various transaction types available including authorize, debit, authorizeanddebit, credit, void payment and balance. As a result, every activity you setup in this workflow will execute that transaction type against its associated payment service.

Next, each PaymentActivity in the activities list is passed a PaymentService instance and a user name. Out-of-the-box, Broadleaf has configured three generic payment services: Gift Card, Bank Account and Credit Card. Each of these services is tied to a module (see [[Creating a Payment Module]]). In the case of the default Broadleaf implementation, each of these modules is configured to be an instance of DefaultModule, which is merely a placeholder type and will not initiate real transactions. To enable real payment transactions, Broadleaf users must override the definition of one or more of these modules to interact with a real payment system, which we'll cover blow. The username property is for logging purposes and identifies the agent (in this case, "web") who executed the payment transaction.

| Class                              | Requirement       | Values                                                            |
| :--------------------------------- | :---------------- | :---------------------------------------------------------------- |
| SimplePaymentProcessContextFactory | None              | N/A                                                               |
| CompositeActivity                  | workflow          | Instance of SequenceProcessor                                     |
| PaymentProcessContextFactory       | paymentActionType | AUTHORIZE, DEBIT, AUTHORIZEANDDEBIT, CREDIT, VOIDPAYMENT, BALANCE |
| PaymentActivity                    | paymentService    | Instance of PaymentService                                        |
|                                    | userName          | Arbitrary String value                                            |
| defaultErrorHandler                | None              | N/A                                                               |

In most all cases, the default payment configuration for Broadleaf Commerce will not be sufficient. Users must therefore override the default configuration to fit their needs. In the simplest case, users may only need to override one or more of the payment modules defined by Broadleaf Commerce. For example, if your site will only accept credit cards for payment and you plan on only performing a single authorize/debit call to your end credit card processor, then overriding the credit card module will be enough. This is because Gift Card and Bank Account will continue to be registered with the Default Module, which as you remember, is merely a placeholder and will not engage transactions. As a result, with this simple tweak in your application configuration, you will acquire real credit card transaction processing. 

Let's take a look at what this custom configuration would look like in your own application context file.

## Only changing a module

```xml
<bean id="blCreditCardModule" class="com.mycompany.payment.service.module.MyCreditCardModule">
    <property name="myParam" value="myValue"/>
     ...
</bean>
```

Here, we've overridden the bean id `blCreditCardModule` and provided our own implementation so that Broadleaf will use it instead of the DefaultModule instance registered to this id internally. For instructions on how to create your own payment module, see [[Creating a Payment Module]]

## Supporting more than just the Authorize and Debit transaction type

Some users may want to break up the authorize and debit events into two separate workflows. In fact, some users may want to debit only for certain types of orders and perhaps authorize only for others. We'll start first with the simplest of these cases - separate workflows for authorize and debit. First, in your own application context, you will need to override the composite payment workflow with your own definition, like this:

```xml
<bean id="blPaymentWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.SimplePaymentProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.CompositeActivity">
                <property name="workflow" ref="myAuthorizeWorkflow"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.CompositeActivity">
                <property name="workflow" ref="myDebitWorkflow"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

In this case, we've changed the activity list in the composite workflow to represent two new composite activities: `myAuthorizeWorkflow` and `myDebitWorkflow`. Next, we need to actually define these workflows:

```xml
<bean id="myAuthorizeWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentProcessContextFactory">
            <property name="paymentActionType" value="AUTHORIZE"/>
        </bean>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blGiftCardService"/>
                <property name="userName" value="web"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blBankAccountService"/>
                <property name="userName" value="web"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blCreditCardService"/>
                <property name="userName" value="web"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>

<bean id="myDebitWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentProcessContextFactory">
            <property name="paymentActionType" value="DEBIT"/>
        </bean>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blGiftCardService"/>
                <property name="userName" value="web"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blBankAccountService"/>
                <property name="userName" value="web"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blCreditCardService"/>
                <property name="userName" value="web"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

Now, we have two new workflow beans with the desired ids (`myAuthorizeWorkflow` and `myDebitWorkflow`). In addition, we've set the appropriate `paymentActionType` for each PaymentProcessContextFactory: AUTHORIZE and DEBIT, respectively. The parent, composite workflow will be called first, and since workflows execute their activities in order, the authorize workflow is called first, followed by the debit workflow. Now, Broadleaf Commerce will first attempt to authorize against the payment services provides. If, and only if, authorization is successful, will Broadleaf Commerce attempt to debit against the services provided. Please note, there are PaymentInfo instances associated with every order that define the various tender types that are being used to pay for the order. Broadleaf Commerce is smart enough to detect these PaymentInfo items and associate each PaymentInfo amount with the appropriate payment service. 

For example, you may wish for some orders to be paid for partially with a gift card and partially with a credit card. Also note, since this is your own configuration in your application context, it is not necessary for you to configure PaymentActivity instances for services you don't plan on using. As a result, if you're only using credit cards, you could shorten your authorize and debit workflows to something like the following:

```xml
<bean id="myAuthorizeWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentProcessContextFactory">
            <property name="paymentActionType" value="AUTHORIZE"/>
        </bean>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blCreditCardService"/>
                <property name="userName" value="web"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>

<bean id="myDebitWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentProcessContextFactory">
            <property name="paymentActionType" value="DEBIT"/>
        </bean>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blCreditCardService"/>
                <property name="userName" value="web"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

## Business Rule Customization

In cases where you need finer control over when debit and/or authorize transactions are called, you will need to add some business logic to your own PaymentService override. Broadleaf Commerce has three payment services configured by default: Gift Card, Bank Account and Credit Card. Their internal bean ids are as follows:

```xml
<bean id="blGiftCardService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
    <property name="paymentModule" ref="blGiftCardModule"/>
</bean>

<bean id="blCreditCardService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
    <property name="paymentModule" ref="blCreditCardModule"/>
</bean>

<bean id="blBankAccountService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
    <property name="paymentModule" ref="blBankAccountModule"/>
</bean>
```

As you would expect, the first step is to create a new bean definition for the service you would like to override in your own application context. We'll continue with the credit card example and override that service.

```xml
<bean id="blCreditCardService" class="com.mycompany.payment.service.MyPaymentServiceImpl">
    <property name="paymentModule" ref="blCreditCardModule"/>
</bean>
```

We've taken over the bean id "blCreditCardService" and have pointed it at our service implementation. Now, we'll need to implement MyPaymentServiceImpl.

```java
public class MyPaymentServiceImpl extends PaymentServiceImpl {

    @Override
    public PaymentResponseItem authorize(PaymentContext paymentContext) throws PaymentException {
        // Only perform a credit card authorize for orders with totals greater than $50
        if (paymentContext.getPaymentInfo().getAmount().doubleValue() > 50D) {
             return super.authorize(paymentContext);
        }
        return null;
    }
}
```

For this example, we've simply changed the business rules to only authorize credit cards when the PaymentInfo amount is over $50.00. Through the PaymentContext instance, you have access to the entire order, so the sky's the limit on the factors you can use to drive your business logic.

## Explicit execution of payment

The payment workflow is called automatically from several locations in the Broadleaf codebase. However, you may find from time to time that you need to call payment explicitly from your own custom code. This is easily accomplished by injecting the `CompositePaymentService` into your custom class by referencing the key id `blCompositePaymentService`.

## Supporting more than gift card, credit card, and bank account

The final scenario arises when you want to support a payment type that is not already supported by Broadleaf out-of-the-box. For example, you may want to use Broadleaf to setup an internal company store and support employee payroll deduction as a method of payment. We've written a [[Customizing Payment Tutorial]] that will guide you in this effort.
