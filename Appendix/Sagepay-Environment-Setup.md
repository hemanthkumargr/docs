# Sagepay Environment Setup

> Note: Broadleaf Commerce currently offers integration with Sagepay through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

## Prerequisites

- Users must establish their own test accounts with SagePay

### Set up your Sagepay Account
1. Register for a Sagepay developer account http://www.sagepay.com/developers/sign_up
2. After registration you should receive information regarding your developer account.
3. Note this information because it will be needed when you configure your environment properties

Once you have established an account with Sagepay, begin by including the Sagepay Module dependency to your pom.xml.

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-sagepay-form</artifactId>
    <version>${blc.sagepay.version}</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
<dependency>
    <groupId>com.sagepay</groupId>
    <artifactId>sagepay-api</artifactId>
    <version>1.1.0</version>
    <scope>compile</scope>
    <type>jar</type>
    <optional>true</optional>
</dependency>
<dependency>
    <groupId>com.sagepay</groupId>
    <artifactId>sagepay-util-nodep</artifactId>
    <version>1.1.0</version>
    <scope>compile</scope>
    <type>jar</type>
    <optional>true</optional>
</dependency>
```

Make sure to include the dependency in your site pom.xml as well.

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-sagepay-form</artifactId>
</dependency>
<dependency>
     <groupId>com.sagepay</groupId>
     <artifactId>sagepay-api</artifactId>
</dependency>
<dependency>
     <groupId>com.sagepay</groupId>
     <artifactId>sagepay-util-nodep</artifactId>
</dependency>
```

You should now begin to setup your environment to work with Broadleaf Commerce Sagepay support. 
The first step is to make Broadleaf Commerce aware of your Sagepay account credentials. 
This is accomplished through environment configuration (see [[Runtime Environment Configuration]]).

Broadleaf allows you to create your own property files per environment (e.g. common.properties, local.properties, development.properties, integrationdev.properties, integrationqa.properties, staging.properties, and production.properties) You will need to enter the following key/value pairs in the appropriate locations:

### common.properties
    sagepay.currency=? Currency Code (e.g. GBP)
    sagepay.cartDescription=? (e.g. My Company's Cart)

### development.properties, local.properties etc...
    sagepay.purchaseUrl=? 
    sagepay.successUrl=?  (e.g. https://localhost:8080/checkout/confirmation)
    sagepay.failureUrl=?
    sagepay.vendor=?  - Your test account vendor name
    sagepay.encryptionPassword=? Your test account encryption password

- sagepay.purchaseUrl: `https://test.sagepay.com/gateway/service/vspform-register.vsp` for Test Accounts or `https://test.sagepay.com/Simulator/VSPFormGateway.asp` for the simulator

### staging.properties
    sagepay.purchaseUrl=https://test.sagepay.com/gateway/service/vspform-register.vsp
    sagepay.successUrl=?
    sagepay.failureUrl=?
    sagepay.vendor=?
    sagepay.encryptionPassword=?

### production.properties
    sagepay.purchaseUrl=https://live.sagepay.com/gateway/service/vspform-register.vsp
    sagepay.successUrl=?
    sagepay.failureUrl=?
    sagepay.vendor=?
    sagepay.encryptionPassword=?

Now that you have your environment set up, let's begin setting up the [[Sagepay Module]].

## Logging
To help you debug your integration, this module includes several beneficial debug statements.
To enable logging, add the following `log4j.properties` file to your `resources` folder.

    log4j.appender.stdout=org.apache.log4j.ConsoleAppender
    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
    log4j.appender.stdout.layout.ConversionPattern=[%5p] %d{HH:mm:ss} %c{1} - %m%n
    log4j.rootLogger=WARN, stdout
    log4j.category.com.broadleafcommerce=DEBUG
