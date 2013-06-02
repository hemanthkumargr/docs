# QoS Configuration

You should configure the QoS (Quality Of Service) monitoring for vendor services. QoS does not interfere with a call to a vendor service (such as USPS), but does provide a way for that service to report on its status. Based on how you configure QoS, you can be notified of vendor service status changes in any number of ways. By default, Broadleaf will merely log vendor service status changes to the console. If this behavior is sufficient, then no further configuration is required. However, Broadleaf also provides support for email notifications for QoS status changes.

## <a name="wiki-config" />QoS Configuration

Let's take a look at some configuration:

```xml
<bean id="baseEmailInfo" abstract="true">
    <property name="sendEmailReliableAsync" value="false"/>
    <property name="fromAddress" value="test@broadleafcommerce.org"/>
    <property name="sendAsyncPriority" value="8"/>
</bean>

<bean id="serviceStatusEmail" class="org.broadleafcommerce.common.email.service.info.EmailInfo" parent="baseEmailInfo"/>

<bean id="compositeStatusHandler" class="org.broadleafcommerce.common.vendor.service.monitor.handler.CompositeStatusHandler">
    <property name="handlers">
        <list>
            <bean class="org.broadleafcommerce.common.vendor.service.monitor.handler.LogStatusHandler"/>
            <bean class="org.broadleafcommerce.common.vendor.service.monitor.handler.EmailStatusHandler">
                <property name="emailInfo" ref="serviceStatusEmail"/>
                <property name="emailTarget">
                    <bean class="org.broadleafcommerce.common.email.domain.EmailTargetImpl">
                        <property name="emailAddress" value="test@broadleafcommerce.org"/>
                    </bean>
                </property>
            </bean>
        </list>
    </property>
</bean>

<bean id="blServiceMonitor" class="org.broadleafcommerce.common.vendor.service.monitor.ServiceMonitor" init-method="init">
    <property name="defaultHandler" ref="compositeStatusHandler"/>
</bean>
```

Here we have overridden the key id `blServiceMonitor`, providing the CompositeStatusHandler to the defaultHandler property. We have also configured the compositeStatusHandler bean, adding a list of status handlers. Each status handler is responsible for performing some task when notified of a QoS status change. The LogStatusHandler instance simply logs the status change event to the console (this is the default behavior). The EmailStatusHandler instance will take the same QoS change event and send a notification email. Please refer to the [[Email Configuration]] section for more information on configuring general email support in Broadleaf. Note, all vendor services (including USPS support) are monitored by the ServiceMonitor instance. Therefore, changes to its configuration have a global effect on status change behavior for all vendor services.

We can also specify specific status handlers for particular services. For example, this explicitly defines the status handlers for both USPS and CyberSource payment services:

```xml
<bean id="blServiceMonitor" class="org.broadleafcommerce.common.vendor.service.monitor.ServiceMonitor" init-method="init">
    <property name="defaultHandler" ref="compositeStatusHandler"/>
    <property name="serviceHandlers">
         <map>
            <entry key-ref="blShippingCalculationService" value-ref="compositeStatusHandler"/>
            <entry key-ref="blCyberSourceCreditCardPaymentService" value-ref="compositeStatusHandler"/>
        </map>
    </property>
</bean>
```

In this example, entries have been added for each of the services to the serviceHandlers property of the blServiceMonitor bean. Note, if an explicit handler is not defined, the defaultHandler will be used.

## <a name="wiki-customization" />QoS Customization

You may find that the default QoS handlers provided by Broadleaf (logging and email) do not cover your needs. In the case of a vendor service failure, you may want to execute additional activities (i.e. attempt to restart a remote service or cleanup resources). In these cases, you'll need to implement a custom QoS handler. All QoS handlers implement the simple StatusHandler interface from Broadleaf:

```java
public interface StatusHandler {

    public void handleStatus(String serviceName, ServiceStatusType status);

}
```

The serviceName is provided by your ServiceStatusDetectable implementing vendor service. Usually, serviceName will be the fully-qualified classname of the vendor service, but this is not a requirement. ServiceStatusType is an enumeration describing the different states a service can be in (UP,DOWN,PAUSED). Whenever your vendor service changes states, your handler will be notified. Your implementation of the handleStatus method can utilize the serviceName and status to decide the best course of action.

