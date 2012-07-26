## Spring MVC Configuration

If you're using Spring MVC and want to autowire controllers (especially Broadleaf controllers), it will be necessary to add the following lines to your Spring MVC application context (ie `applicationContext-servlet.xml`)

```xml
<context:component-scan base-package="org.broadleafcommerce">
    <context:include-filter type="regex" expression=".*web.*"/>
    <context:exclude-filter type="regex" expression=".*"/>
</context:component-scan>

<aop:config/>
```

This is in addition to any component-scan that may be required to scan through your own annotated controller classes.

