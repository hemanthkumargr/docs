# CyberSource SOAP API Environment Setup

> Note - these are the same steps for establishing an account and generating a security key for both CyberSource Payment and CyberSource Tax. You do not need to repeat them twice if you are using CyberSource for both tax and payment.

## Prerequisites

- Users must establish their own test account with CyberSource in order to use the BroadleafCommerce CyberSource payment functionality (https://apps.cybersource.com/cgi-bin/register/reg_form.pl). Note, this is only a test account - you will need to contact a CyberSource sales representative to set up a real merchant account.
- Familiarize yourself with the CyberSource SOAP API (http://www.cybersource.com/support_center/implementation/downloads/soap_api/SOAP_toolkits.pdf). BroadleafCommerce takes care of all the heavy lifting here, but it doesn't hurt to have the documentation that describes the destination urls, etc... should you need to reference them in the future.
- Log in to the CyberSource Business Center (https://ebctest.cybersource.com/ebctest/login/Login.do). Once logged in, generate a security key so that BroadleafCommerce can interact with the test environment. Click "Account Management" in the left navagation, followed by "Transaction Security Keys". Now click the "Security Keys for the SOAP Toolkit API" link. Finally, click the "generate key" button to create a new key. Copy this key value to a safe place, as you will need to include it in your BroadleafCommerce environment configuration in the next steps.

Once you have established an account with CyberSource, you should begin to setup your environment to work with Broadleaf Commerce CyberSource support. The first step is to make Broadleaf Commerce aware of your CyberSource account credentials. This is accomplished through environment configuration (see [[Runtime Environment Configuration]]).

Specifically, you will need to add, at a minimum, the following properties to your application. Likely, you will want to add them to `common-shared.properties` in the core project

```text
cybersource.merchant.id=[my CyberSource merchant id]
cybersource.transaction.key=[my CyberSource security key for the API that I generated in the step above]
```

Additionally, you'll need to configure the Spring bean for the CyberSourceServiceManager. This bean is in charge of managing several CyberSource services for Broadleaf at the same time: the CyberSource credit card payment service and the CyberSource tax service. Add the following bean declaration to your application context:

```xml
<bean id="blCyberSourceServiceManager" class="org.broadleafcommerce.vendor.cybersource.service.CyberSourceServiceManagerImpl">
    <property name="merchantId" value="${cybersource.merchant.id}"/>
    <property name="serverUrl" value="${cybersource.server.url}"/>
    <property name="libVersion" value="${cybersource.lib.version}"/>
    <property name="registeredServices">
        <list>
            <ref bean="blCyberSourceCreditCardPaymentService"/>
            <ref bean="blCyberSourceTaxService"/>
        </list>
    </property>
</bean>
```

The merchantId, serverUrl and libVersion properties are all already configured by environment in Broadleaf, but can be overridden in your configuration if you would like. You'll also notice that we've registered both the payment service and the tax service in the manager. If you're not using the CyberSource payment service, then you can safely omit the blCyberSourceCreditCardPaymentService reference. We'll cover the CyberSource payment configuration in the [[CyberSource SOAP API Payment Module]] section.

You must also declare a bean that will handle the password callback issued by the Axis webservice call to the CyberSource remote tax service.

```xml
<bean id="cyberSourcePasswordCallback" class="org.broadleafcommerce.vendor.cybersource.service.CyberSourcePasswordCallback">
    <property name="transactionKey" value="${cybersource.transaction.key}"/>
</bean>
```

- `transactionKey` - retrieved from your environment property file that you setup earlier.
