## Prerequisites

- Users must establish their own sandbox accounts with PayPal in order to use the BroadleafCommerce PayPal payment functionality in a test environment. This can be done here: https://developer.paypal.com/devscr?cmd=_signup-run
- Users must also establish PayPal API Credentials in order perform various operations on the PayPal Express API. The API credentials for your business account (api username, api password, signature) are obtained via the steps mentioned on this page: https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECAPICredentials
- Note: Users must sign up for an actual Business Account to start accepting transactions on a production site. This can be done here: https://merchant.paypal.com/cgi-bin/marketingweb?cmd=_render-content&content_ID=merchant/express_checkout&nav=2.1.5
- Please familiarize yourself with the PayPal Express Checkout Prerequisites before proceeding. https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECGettingStarted

Once you have established an account with PayPal, begin by including the PayPal Module dependency to your pom.xml.

```xml
<dependency>
    <groupId>org.broadleafcommerce</groupId>
    <artifactId>broadleaf-paypal</artifactId>
    <version>${broadleaf.thirdparty.version}</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

You should now begin to setup your environment to work with Broadleaf Commerce PayPal support. The first step is to make Broadleaf Commerce aware of your PayPal account credentials. This is accomplished through environment configuration (see [[Runtime Environment Configuration]]).

```xml
<bean id="blConfiguration" class="org.broadleafcommerce.common.config.RuntimeEnvironmentPropertiesConfigurer">
    <property name="propertyLocations">
        <set>
            <value>classpath:config/bc/</value>
            <value>classpath:config/bc/paypal/</value>
            <value>classpath:my/path/to/property/files</value>
        </set>
    </property>
        <property name="environments">
            <set>
                <value>production</value>
                <value>staging</value>
                <value>integrationQA</value>
                <value>integrationDev</value>
                <value>development</value>
                <value>local</value>
            </set>
        </property>
    <property name="defaultEnvironment" value="development"/>
    <property name="ignoreUnresolvablePlaceholders" value="true"/>
</bean>
```

The configuration shown above should be entered into your application context. There are several items of note. The propertyLocations set contains first, the path to the internal Broadleaf Commerce environment configuration. Second is the location the internal Broadleaf Commerce PayPal configuration. Third should be the path to your environment configuration property files - this is the key item. The environments property should be left alone, as it contains the four environments that Broadleaf Commerce is pre-configured for with PayPal information.

Now that you have given Broadleaf Commerce the new path to search for your particular environment configuration, you should enter your PayPal API credentials. For each of the environment property files (development.properties, integration.properties, staging.properties, and production.properties), enter the following key/value pairs:

    paypal.user=[my generated PayPal API username]
	paypal.password=[my generated PayPal API password]
	paypal.signature=[my generated PayPal API signature]
	paypal.return.url=[the URL PayPal should redirect to after completing the order, for example: http://localhost:8080/mycompany/paypal/process]
	paypal.cancel.url=[the URL PayPal should redirect to if a user abandons the order, for example: http://localhost:8080/mycompany/cart]

Note: It is important that the same keys exist in ALL properties files. It is OK for the values to be blank as long as the keys exist in the file.

The api.url, user.redirect.url and version properties are all already configured by environment in Broadleaf, but can be overridden in your configuration if you would like. We'll cover the PayPal payment configuration in the [[PayPal Module]] section.
