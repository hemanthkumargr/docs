**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

## <a name="wiki-basic" />Basic Configuration

Broadleaf has a flexible engine for sending template-driven emails to your customers. These emails may be configured to be sent out as part of a workflow step (i.e. order confirmation email at the end of the checkout workflow), or sent out as part of a Quartz scheduled job (i.e. weekly customer newsletter). The appearance of emails may be text only, or may be based on an exotic Velocity template that you create - the choice is yours. Let's start by reviewing a sample order confirmation email configuration.

```
<bean id="blMailSender" class="org.springframework.mail.javamail.JavaMailSenderImpl">
    <property name="host" value="172.16.8.1" />
    <property name="port" value="25" />
    <property name="protocol" value="smtp" />
    <property name="javaMailProperties">
        <props>
            <prop key="mail.smtp.starttls.enable">true</prop>
            <prop key="mail.smtp.timeout">25000</prop>
        </props>
    </property>
</bean>

<bean id="baseEmailInfo" abstract="true">
    <property name="sendEmailReliableAsync" value="true"/>
    <property name="fromAddress" value="My Store &lt;contact@mystore.com&gt;"/>
    <property name="sendAsyncPriority" value="8"/>
</bean>

<bean id="orderConfirmationEmailInfo" class="org.broadleafcommerce.common.email.service.info.EmailInfo" parent="baseEmailInfo" scope="prototype">
    <property name="emailTemplate" value="com/mycompany/web/email/template/orderConfirmation.vm"/>
    <property name="emailType" value="ORDERCONFIRMATION"/>
    <property name="subject" value="Thank You For Your Order!"/>
</bean>
```

The first item we set up is the `mailSender` bean, which represents standard Spring support for Java mail and SMTP. Secondly, we create a bean instance of the Broadleaf class EmailInfo. All emails sent through the Broadleaf Commerce email system utilize an instance of EmailInfo for configuration.

We create an abstract bean that holds pieces of information common to all emails, such as the `fromAddress` and other factors. You'll notice we also set values for `sendEmailReliableAsync` and `sendAsyncPriority`. These properties are related to utilization of JMS for asynchronous execution of email distribution. More on this topic in the [Asynchronous Distribution](#wiki-async-distribution) section further down.

Lastly, we create the EmailInfo instance for our order confirmation email with the id `orderConfirmationEmailInfo`. Here we specify the Velocity template to use for this email, an arbitrary identifier for the emailType and the subject for the email.

A list of all possible properties can be found at the [bottom of this page](#wiki-prop-ref)

## <a name="wiki-prep-code" />Preparing the Code to Send Emails

You'll likely want to establish your own service class that's responsible for sending out emails. Let's take a look at an example interface for a service capable of sending our order confirmation email:

```java
public interface MyEmailWebService {
    void sendOrderConfirmation(Date orderDate, String orderId, String emailAddress) throws IOException;
}
```

and an implementation: 

```java
@Service("myEmailService")
public class MyEmailServiceImpl implements ApplicationContextAware, MyEmailWebService {

    @Resource(name="blEmailService")
    protected EmailService emailService;

    protected ApplicationContext applicationContext;

    public void sendOrderConfirmation(Date orderDate, String orderId, String emailAddress) throws IOException {
        HashMap<String, Object> props = new HashMap<String, Object>();
        props.put("orderDate", orderDate);
        props.put("orderId", orderId);
        emailService.sendTemplateEmail(emailAddress, getOrderConfirmationEmailInfo(), props);
    }

    // Method based injection because we need to reference prototype scoped beans in a singleton bean
    protected EmailInfo getOrderConfirmationEmailInfo() {
        return (EmailInfo) applicationContext.getBean("orderConfirmationEmailInfo");
    }

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
```

Our service has only one major method called `sendOrderConfirmation`. This method accepts the order date, the order id and the customer email address. For this email, the order date and order id are important variables for the content of the email. We create a HashMap to hold these variables and pass them to the `EmailService sendTemplateEmail` method along with the email address and an instance of our order confirmation EmailInfo. 

> Note, in the implementation, we don't inject the EmailInfo instance directly. Since the service class is created with singleton scope, it is created only once, and even if we inject prototype scoped beans from Spring, they will end up acting like singletons as well. For our EmailInfo instances, we need a new instance for every use, so we use an instance of ApplicationContext to retrieve a new EmailInfo instance when required.

Now that you have a service to initiate the sending of your email, you'll want to add code to call it. For an order confirmation email, it makes the most sense to send the email in the last step of the checkout workflow. To achieve this end, we'll override the last activity in the checkout flow with a custom activity.

```
<bean id="blCheckoutWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.checkout.service.workflow.CheckoutProcessContextFactory"/>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.offer.service.workflow.VerifyCustomerMaxOfferUsesActivity"/>
            <bean class="org.broadleafcommerce.core.checkout.service.workflow.PaymentServiceActivity"/>
            <bean class="org.broadleafcommerce.core.offer.service.workflow.RecordOfferUsageActivity"/>
            <bean class="com.mycompany.checkout.service.workflow.MyCompleteOrderActivity"/>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

In this workflow configuration, we've changed the last activity to a new custom activity we've developed. 

>Please refer to the [[checkout workflow configuration | Checkout Workflow]] guide and the general [[workflow and activities | Workflow and Activities]] guide for more information.

We'll also need to implement our new custom activity:

```java
public class MyCompleteOrderActivity extends CompleteOrderActivity {

    @Resource(name="myEmailService")
    MyEmailService myEmailService;

    @Override
    public ProcessContext execute(ProcessContext context) throws Exception {
        CheckoutSeed seed = ((CheckoutContext) context).getSeedData();
        Order order = seed.getOrder();
        myEmailService.sendOrderConfirmation(order.getSubmitDate(), order.getId().toString(), order.getCustomer().getEmailAddress());
        return super.execute(context);
    }
}
```

This activity utilizes the Order instance in the CheckoutContext passed into the execute method to harvest the necessary information to send the email through injected MyEmailService instance. Once this goal is achieved, the call is passed off to the superclass for normal handling.

## <a name="wiki-prep-template" />Preparing the Template

We also need a [Velocity](http://velocity.apache.org/engine/releases/velocity-1.6.2/user-guide.html) template for our order confirmation email. Velocity templates provide you a rich mechanism for creating and formatting elaborate emails with dynamic content. Let's take a look at a simple template for our order confirmation email:

```html
<html>
  <head><title>Order Confirmation Email</title></head>
  <body background="#FFFFFF">
    <h1>Thank You For Your Order!</h1>
    <table>
      <tr><td>Order Date:</td><td>$date.format('h:mm a',$orderDate)</td></tr>
      <tr><td>Order Id:</td><td>$orderId</td></tr>
    </table>
  </body>
</html>
```

This template (`OrderConfirmation.vm`) formats a simple HTML email with several items of dynamic content. You'll notice that we specify the orderdate and orderid variables in the template. These variables will be inserted dynamically by the Velocity engine when the template is parsed. In addition, you'll notice we employ a format call from the "date" variable to achieve properly formatted date output. The date variable is actually an instance of the Velocity DateTool and is made available to all your templates by default by Broadleaf. 

A list of all available tools in your templates can be found at the [bottom of this page](#wiki-template-ref)

Note, if you wish to use the serverinfo variable, you should override the bean definition for "blServerInfo" and provide your own configuration. Something like the following is in order:

```xml
<bean id="blServerInfo" class="org.broadleafcommerce.email.service.info.ServerInfo">
    <property name="serverName" value="myHost.com"/>
    <property name="serverPort" value="80"/>
</bean>
```

## <a name="wiki-async-distribution" />Asynchronous Distribution

Many users will wish to employ asynchronous sending for Broadleaf Commerce emails. Asynchronous emails have the following advantages:

* Client thread is not blocked while email is sent
* Better utilization of customer handling resources
* Guaranteed delivery

Broadleaf Commerce achieves asynchronous sending via a JMS (Java Message Service) compliant message broker. We suggest [Apache ActiveMQ](http://activemq.apache.org/) for an open-source, high-performance message broker, although most JMS message brokers should work. Once your message broker is installed and operational, you'll need to configure Broadleaf Commerce to post and consume messages.

```xml
<bean id="jmsFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
    <property name="brokerURL" value="failover:(tcp://localhost:61616)?randomize=false"/>
</bean>

<bean id="jmsDestination" class="org.springframework.jndi.JndiObjectFactoryBean" abstract="true">
    <property name="jndiEnvironment">
        <props>
            <prop key="java.naming.factory.initial">
                org.apache.activemq.jndi.ActiveMQInitialContextFactory
            </prop>
            <prop key="java.naming.provider.url">
                failover:(tcp://localhost:61616)?randomize=false
            </prop>
        </props>
    </property>
</bean>

<bean id="emailServiceQueue" parent="jmsDestination">
    <property name="jndiName" value="EmailServiceQueue"/>
    <property name="jndiEnvironment">
        <props merge="true">
            <prop key="queue.EmailServiceQueue">
                my.queue.EmailService
            </prop>
        </props>
    </property>
</bean>

<bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate">
    <property name="connectionFactory" ref="jmsFactory"/>
</bean>

<bean id="redeliveryPolicy" class="org.apache.activemq.RedeliveryPolicy">
    <property name="maximumRedeliveries" value="2"/>
    <property name="initialRedeliveryDelay" value="1000"/>
</bean>

<bean id="consumerConnection" class="org.springframework.jms.connection.SingleConnectionFactory">
    <property name="targetConnectionFactory">
        <bean class="org.apache.activemq.ActiveMQConnectionFactory">
            <property name="brokerURL" value="failover:(tcp://localhost:61616)?randomize=false"/>
            <property name="redeliveryPolicy" ref="redeliveryPolicy"/>
        </bean>
    </property>
</bean>

<bean id="emailServiceContainer" class="org.springframework.jms.listener.DefaultMessageListenerContainer">
    <property name="connectionFactory" ref="consumerConnection"/>
    <property name="destination" ref="emailServiceQueue"/>
    <property name="messageListener" ref="emailServiceMessageListener"/>
    <property name="pubSubNoLocal" value="true"/>
    <property name="sessionTransacted" value="true"/>
    <!-- control the consumption load -->
    <property name="concurrentConsumers" value="2"/>
    <property name="maxConcurrentConsumers" value="2"/>
    <property name="cacheLevelName" value="CACHE_CONSUMER"/>
    <property name="acceptMessagesWhileStopping" value="false"/>
</bean>

<bean id="emailServiceProducer" class="org.broadleafcommerce.common.email.service.jms.JMSEmailServiceProducerImpl">
    <property name="emailServiceTemplate" ref="jmsTemplate"/>
    <property name="emailServiceDestination" ref="emailServiceQueue"/>
</bean>

<bean id="emailServiceMessageListener" class="org.broadleafcommerce.common.email.service.jms.EmailServiceMDP"/>

<bean id="blEmailService" class="org.broadleafcommerce.common.email.service.EmailServiceImpl">
    <property name="emailServiceProducer" ref="emailServiceProducer"/>
</bean>
```

Most of the items exhibited here are boilerplate configuration for [Spring and JMS/ActiveMQ](http://activemq.apache.org/spring-support.html). We configure the connection factory, queue and listener container much like any other Spring JMS configuration. The key configuration items from a Broadleaf Commerce perspective are the `emailServiceProducer`, `emailServiceMessageListener` and `blEmailService` beans. These beans are primarily responsible for posting messages to and reading messages from a queue. The configuration for the emailServiceProducer beans requires a `org.springframework.jms.core.JmsTemplate` and a `javax.jms.Destination` (provided by the JndiObjectFactoryBean) instance. The emailServiceMessageListener bean has no direct requirements and should be set to `org.broadleafcommerce.common.email.service.jms.EmailServiceMDP`, unless additional behavior is required at the moment of delivery, which would require an override or new version of EmailServiceMDP. Finally, for asynchronous configuration, the key bean id must be overridden with an instance of EmailServiceImpl providing our EmailServiceProducer instance to the emailServiceProducer property.

## <a name="wiki-sync-distribution" /> Synchronous Distribution

Some users will not require asynchronous email sending. If time spent sending an email is not important to your process and if guaranteed delivery is not a requirement, then synchronous email is the right choice for you. Synchronous sending does not require the presence or configuration for a JMS message broker. Instead, only a simple alteration to our earlier configuration is required. Recall our configuration for baseEmailInfo:

```xml
<bean id="baseEmailInfo" abstract="true">
    <property name="sendEmailReliableAsync" value="true"/>
    <property name="fromAddress" value="My Store &lt;contact@mystore.com&gt;"/>
    <property name="sendAsyncPriority" value="8"/>
</bean>
```

The following converts our baseEmailInfo bean into a synchronous email:

```
<bean id="baseEmailInfo" abstract="true">
    <property name="sendEmailReliableAsync" value="false"/>
    <property name="fromAddress" value="My Store &lt;contact@mystore.com&gt;"/>
</bean>
```

## <a name="wiki-non-template-emails" />Non-Template Emails

Some users will prefer not to use a Velocity template to drive the formatting and presentation of their emails. In fact, some of your email needs may be very simplistic and creation of a Velocity template is overkill. In these cases, you'll want to simply supply the body content for your email as a simple string. Let review how we would configure this type of email:

```xml
<bean id="orderConfirmationEmailInfo" class="org.broadleafcommerce.common.email.service.info.EmailInfo" parent="baseEmailInfo" scope="prototype">
    <property name="messageBody" value="This is a test email!"/>
    <property name="emailType" value="ORDERCONFIRMATION"/>
    <property name="subject" value="Thank You For Your Order!"/>
</bean>
```

Here, we've altered the configuration for our orderConfirmationEmailInfo bean, removing the emailTemplate property and replacing it with the messageBody property. If you recall, the messageBody field of the EmailInfo class allows the programmer to supply the specific text that will be included in the body of the email.

Configuring the email in this way will normally not be useful, as it is restrictive approach to the construction of the string for the messageBody property. Rather, most users will prefer to programmatically set the messageBody field on their own EmailInfo instances. A good place to do this is in your custom email service class. Recall the sendOrderConfirmation method from the MyEmailServiceImpl class:

```java
public void sendOrderConfirmation(Date orderDate, String orderId, String emailAddress) throws IOException {
    HashMap<String, Object> props = new HashMap<String, Object>();
    props.put("orderDate", orderDate);
    props.put("orderId", orderId);
    emailService.sendTemplateEmail(emailAddress, getOrderConfirmationEmailInfo(), props);
}
```

A minor refactoring of this method will allow you to customize the messageBody of this email:

```java
public void sendOrderConfirmation(Date orderDate, String orderId, String emailAddress) throws IOException {
    EmailInfo emailInfo = getOrderConfirmationEmailInfo();
    emailInfo.setMessageBody("this is a test!");
    emailService.sendBasicEmail(emailInfo, new EmailTargetImpl(emailAddress), null);
}
```

Here, we simply call the `setMessageBody` method on the EmailInfo instance before passing it to the sendBasicEmail method. The API for sendBasic email requires an EmailInfo, EmailTarget and HashMap instance. We pass in our modified EmailInfo instance to satisfy the first requirement. The EmailTarget requirement is fulfilled by passing in an instance of EmailTargetImpl which can be instantiated simply by calling the constructor with the destination email address as an argument (EmailTarget also provides CC and BCC fields). Note, there is an overloaded version of the sendTemplateEmail method that takes an EmailTarget instance as well. Finally, since we're not using a template, there is no need to add custom properties, so we can safely pass in a null value for the HashMap instance.

## <a name="wiki-file-attachments" />Adding File Attachments

You may also create emails with Broadleaf Commerce that contain file attachments. Let's revisit our basic email example from above and add a few attachments:

```java
public void sendOrderConfirmation(Date orderDate, String orderId, String emailAddress) throws IOException {
        EmailInfo emailInfo = getOrderConfirmationEmailInfo();
        emailInfo.setMessageBody("this is a test!");

        StringBuffer file = new StringBuffer();
        file.append("name,address,city,state,zip\n");
        file.append("john,123 test road,dallas,tx,75240\n");
        file.append("jess,546 test road,dallas,tx,75244\n");

        Attachment attachment = new Attachment();
        attachment.setData(file.toString().getBytes());
        attachment.setMimeType("text/plain");
        attachment.setFilename("OrderMembers.txt");
        emailInfo.getAttachments().add(attachment);

        emailService.sendBasicEmail(emailInfo, new EmailTargetImpl(emailAddress), null);
}
```

In this example, we've created a theoretical CSV file attachment by building a properly formatted String instance and then creating an Attachment instance using the bytes from that String and the proper MIME type. One could also retrieve the bytes from a local file, or any other source you can convert to a byte array.

## <a name="wiki-prop-ref" />Email Property Reference

| Property | Description | Java / XML config |
|:---------|:------------|:--------------------------:|
| emailType | Arbitrary name given to this type of email. Useful when grouping emails. | Both |
| emailTemplate | Fully-qualified path to a Velocity template used to generate the email presentation | Both |
| subject | The subject for the email | Both |
| fromAddress | The fromAddress for the email | Both |
| messageBody | Set messageBody for emails that are not template driven. | Both |
| attachments | File attachments associated with the email | Programmatic |
| sendEmailReliableAsync | Use JMS to execute the distribution of this email. Otherwise, emails are sent in the calling thread. | Both |
| sendAsyncPriority | Assign the relative JMS priority for this email. Applies only to asynchronous email distribution. | Both |

## <a name="wiki-template-ref" />Template Tool Reference

| Variable   | Tool                                                 |
|:-----------|:-----------------------------------------------------|
| number     | org.apache.velocity.tools.generic.NumberTool         |
| date       | org.apache.velocity.tools.generic.ComparisonDateTool |
| list       | org.apache.velocity.tools.generic.ListTool           |
| math       | org.apache.velocity.tools.generic.MathTool           |
| iterator   | org.apache.velocity.tools.generic.IteratorTool       |
| alternator | org.apache.velocity.tools.generic.AlternatorTool     |
| sorter     | org.apache.velocity.tools.generic.SortTool           |
| esc        | org.apache.velocity.tools.generic.EscapeTool         |
| serverInfo | org.broadleafcommerce.email.service.info.ServerInfo  |

