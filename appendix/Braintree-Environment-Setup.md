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

You should now begin to setup your environment to work with Broadleaf Commerce Braintree support. 
The first step is to make Broadleaf Commerce aware of your Braintree account credentials. 
This is accomplished through environment configuration (see [[Runtime Environment Configuration]]).

```xml
<bean id="blConfiguration" class="org.broadleafcommerce.common.config.RuntimeEnvironmentPropertiesConfigurer">
    <property name="propertyLocations">
        <set>
            <value>classpath:config/bc/</value>
            <value>classpath:config/bc/braintree/</value>
            <value>classpath:my/path/to/property/files</value>
        </set>
    </property>
        <property name="environments">
            <set>
                <value>production</value>
                <value>staging</value>
                <value>integrationqa</value>
                <value>integrationdev</value>
                <value>development</value>
                <value>local</value>
            </set>
        </property>
    <property name="defaultEnvironment" value="development"/>
    <property name="ignoreUnresolvablePlaceholders" value="true"/>
</bean>
```

> Note: The configuration shown above should be entered into your application context. 

The propertyLocations set contains first, the path to the internal Broadleaf Commerce environment configuration. Second is the location the internal Broadleaf Commerce PayPal configuration. Third should be the path to your environment configuration property files - this is the key item. The environments property should be left alone, as it contains the environments that Broadleaf Commerce is pre-configured for with Braintree information.

Now that you have given Broadleaf Commerce the new path to search for your particular environment configuration, you should enter your PayPal API credentials. For each of the environment property files (local.properties, development.properties, integrationdev.properties, integrationqa.properties, staging.properties, and production.properties), enter the following key/value pairs:

	braintree.publicKey=[my Braintree API public key]
	braintree.privateKey=[my Braintree API private key]
	braintree.merchantId=[my Braintree API merchant ID]
	braintree.redirectUrl=[the URL Braintree should redirect to after completing the order, for example: http://localhost:8080/mycompany/braintree/process]


There are several properties already configured by environment in Broadleaf, but can be overridden in your configuration if you would like. 
Now that you have your environment set up, let's begin setting up the [[Braintree Module]].
