## Background ##
In order to use Broadleaf's default RESTful services, all that is required is some configuration in your application's /WEB-INF/web.xml file.  You will need to define a new Servlet and Servlet mapping:

```xml
<servlet>
    <servlet-name>Jersey Web Application</servlet-name>
    <servlet-class>
        com.sun.jersey.spi.spring.container.servlet.SpringServlet
    </servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>Jersey Web Application</servlet-name>
    <url-pattern>/api/*</url-pattern>
</servlet-mapping>
```

## Getting Started ##

## Extending Broadleaf RESTful services ##

## Creating your own RESTful services ##