# Avalara Environment Setup

## Prerequisites

* Users must establish their own developer account with Avalara in order to use the Broadleaf Avalara Tax module, in a testing environment. This can be accomplished here: http://developer.avalara.com/api-get-started
* Users must establish a live account with Avalara in order to start using the module in production correctly. This can be done here: http://www.avalara.com/products/avatax

You will want to keep note of the items listed below, as they may be in use with the Avalara Tax Module

* Account Number
* License Key
* Company Code
* Login
* Password

First start out by adding the Avalara tax module to your exsisting project. Add this dependency to your pom.xml :

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-avalara</artifactId>
    <version>1.0.0-SNAPSHOT</version> --Edit the version
</dependency>
```


Next you will want to add `bl-avalara-applicationContext.xml` to the patch config list in the Site web.xml, will look similar to this:

```xml
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
        classpath:/bl-open-admin-contentClient-applicationContext.xml
        classpath:/bl-cms-contentClient-applicationContext.xml
        classpath:/applicationContext.xml
        classpath:/bl-avalara-applicationContext.xml
        /WEB-INF/applicationContext-datasource.xml
        /WEB-INF/applicationContext-email.xml
        /WEB-INF/applicationContext-security.xml
        /WEB-INF/applicationContext-filter.xml
        /WEB-INF/applicationContext.xml
    </param-value>
</context-param>
```

You will also need to add it to the web.xml under admin, will look similar to this:

```xml
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
        classpath:/bl-open-admin-contentClient-applicationContext.xml
        classpath:/bl-open-admin-contentCreator-applicationContext.xml
        classpath:/bl-admin-applicationContext.xml
        classpath:/bl-cms-contentClient-applicationContext.xml
        classpath:/bl-cms-contentCreator-applicationContext.xml
        classpath:/applicationContext.xml
        classpath:/bl-avalara-applicationContext.xml
        /WEB-INF/applicationContext-datasource.xml
        /WEB-INF/applicationContext-admin-security.xml
        /WEB-INF/applicationContext-admin-filter.xml
        /WEB-INF/applicationContext-admin.xml
    </param-value>
</context-param>
```

