> Note: Broadleaf Commerce currently offers integration with Braintree through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

## Prerequisites

- Users must establish their own sandbox accounts with Braintree in order to use the BroadleafCommerce Braintree payment functionality in a test environment. This can be done here: https://www.braintreepayments.com/get-started
- Please familiarize yourself with the Braintree Java API before proceeding: https://www.braintreepayments.com/docs/java

### Set up your Braintree Account
1. Login to your Braintree console
2. Generate an API key by navigating to Account > My User > API Keys
![Braintree Console](images/payment-braintree-console-1.png)
3. Note these values because they will be needed when you configure your environment properties

Once you have established an account with Braintree, begin by including the Braintree Module dependency to your pom.xml.

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-braintree</artifactId>
    <version>${blc.braintree.version}</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```
Make sure to include the dependency in your site pom.xml as well:

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-braintree</artifactId>
</dependency>
```
You should now begin to setup your environment to work with Broadleaf Commerce Braintree support. 
The first step is to make Broadleaf Commerce aware of your Braintree account credentials. 
This is accomplished through environment configuration (see [[Runtime Environment Configuration]]).

Broadleaf allows you to create your own property files per environment (e.g. common.properties, local.properties, development.properties, integrationdev.properties, integrationqa.properties, staging.properties, and production.properties) You will need to enter the following key/value pairs in the appropriate locations:

### common.properties
	braintree.publicKey=?
	braintree.privateKey=?
	braintree.merchantId=?

### development.properties, local.properties etc...
	braintree.redirectUrl=? (e.g. http://localhost:8080/braintree/process)
    braintree.environment=SANDBOX

- braintree.redirectUrl: the URL Braintree should redirect to after completing the order

### production.properties
	braintree.redirectUrl=? (e.g. http://mycompany.com/braintree/process)
    braintree.environment=PRODUCTION

- braintree.redirectUrl: the URL Braintree should redirect to after completing the order

Now that you have your environment set up, let's begin setting up the [[Braintree Module]].

## Integration Test
Once you have acquired your merchant and API keys, it would be beneficial to write your own integration test similar to the `BraintreeCheckoutServiceIntegrationTest` that is included with this module.

To test your keys with the included `BraintreeCheckoutServiceIntegrationTest`, you can clone the `blc-braintree` repo* and add the following property files to your classpath:
- config/bc/override/common.properties
- config/bc/override/development.properties

You will need to put your keys into the correct file according to the instructions above.
Once those properties are in place, you can run on `blc-braintree`:

```java
mvn test
```

> * Access to the blc-braintree repository requires a commercial license. Please contact us at info@broadleafcommerce.org for more information.

## Logging
To help you debug your integration, this module includes several beneficial debug statements.
To enable logging, add the following `log4j.properties` file to your `resources` folder.

    log4j.appender.stdout=org.apache.log4j.ConsoleAppender
    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
    log4j.appender.stdout.layout.ConversionPattern=[%5p] %d{HH:mm:ss} %c{1} - %m%n
    log4j.rootLogger=WARN, stdout
    log4j.category.com.broadleafcommerce=DEBUG
