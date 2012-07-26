> Note: Broadleaf Commerce currently offers integration with Braintree through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

## Prerequisites

- Users must establish their own sandbox accounts with Braintree in order to use the BroadleafCommerce Braintree payment functionality in a test environment. This can be done here: https://www.braintreepayments.com/get-started
- Please familiarize yourself with the Braintree Java API before proceeding: https://www.braintreepayments.com/docs/java

Once you have established an account with Braintree, begin by including the Braintree Module dependency to your pom.xml.

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-braintree-module</artifactId>
    <version>${blc.commercial.version}</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```
Make sure to include the dependency in your site pom.xml as well:

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-braintree-module</artifactId>
</dependency>
```
You should now begin to setup your environment to work with Broadleaf Commerce Braintree support. 
The first step is to make Broadleaf Commerce aware of your Braintree account credentials. 
This is accomplished through environment configuration (see [[Runtime Environment Configuration]]).

Broadleaf allows you to create your own property files per environment (e.g. common.properties, local.properties, development.properties, integrationdev.properties, integrationqa.properties, staging.properties, and production.properties) You will need to enter the following key/value pairs in the appropriate locations:

	braintree.publicKey=[my Braintree API public key]
	braintree.privateKey=[my Braintree API private key]
	braintree.merchantId=[my Braintree API merchant ID]
	braintree.redirectUrl=[the URL Braintree should redirect to after completing the order, for example: http://localhost:8080/mycompany/braintree/process]


There are several properties already configured by environment in Broadleaf, but can be overridden in your configuration if you would like. 
Now that you have your environment set up, let's begin setting up the [[Braintree Module]].