## Background ##
Broadleaf Commerce uses Jersey which is the default implementation of JAX-RS, or Java API for RESTful Services. Jersey and JAX-RS make use of JAXB to marshal and unmarshal objects to/from from the client.  Jersey provides content negotiation, making use of the standard HTTP Accept and Content-Type headers.  By default Broadleaf accepts and marshals XML and JSON.  Broadleaf Commerce provides a number of service endpoints to allow for a rich suite of functionality including catalog browsing, cart and pricing operations, checkout, and order history.  All of the Broadleaf RESTful APIs can be extended, augmented, or replaced entirely.

## Getting Started ##
In order to use Broadleaf's default RESTful services, all that is required is some configuration in your application's /WEB-INF/web.xml file.  You will need to define a new Servlet and Servlet mapping:

```xml
<servlet>
    <servlet-name>JerseyServlet</servlet-name>
    <servlet-class>
        com.sun.jersey.spi.spring.container.servlet.SpringServlet
    </servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>JerseyServlet</servlet-name>
    <url-pattern>/api/*</url-pattern>
</servlet-mapping>
```

You'll notice several things here. First, the Servlet is a Jersey class that allows Spring Beans to be discovered and used as REST resources.  All of the dependency injection and AOP that that Spring components enjoy can be extended to Jersey-managed endpoints. Also, notice the Servlet mapping. It must be different than the Servlet mapping associated with the controller servlet (e.g. the Spring DispatcherServlet in the case of Spring MVC).  This configuration is required to use Broadleaf's RESTful services and the most basic way to simply get Broadleaf's RESTful services working out of the box.

## Extending Broadleaf RESTful services ##
Extending Broadleaf Commerce is a big topic. Broadleaf's default entities can be extended. Broadleaf's DAOs and Services can also be extended.  See the section on [[Extending Product | Next-Steps#wiki-extending-product]] or Extending Service.

## Creating your own RESTful services ##