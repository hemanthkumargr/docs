## Background ##
Broadleaf Commerce uses Jersey which is the default implementation of JAX-RS, or Java API for RESTful Services. Jersey and JAX-RS make use of JAXB to marshal and unmarshal objects to/from from the client.  Jersey provides content negotiation, making use of the standard HTTP Accept and Content-Type headers.  By default Broadleaf accepts and marshals XML and JSON.  Broadleaf Commerce provides a number of service endpoints to allow for a rich suite of functionality including catalog browsing, cart and pricing operations, checkout, and order history.  All of the Broadleaf RESTful APIs can be extended, augmented, or replaced entirely.

The approach and design was meant to provide out-of-the-box services, but with the ability to extend the data model and override the business logic.  Rather than annotate each domain model with JAXB annotations we chose to use a wrapper concept.  This provided two major advantages:

1. Allows us to provide more coarse and aggregate APIs to RESTful API clients since the internal Broadleaf APIs and domain objects are likely too fine grained.

2. Allows us to override the marshaling and unmarshaling of data (allowing you to add or remove data that will be exposed, depending on your requirements.

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

You'll notice several things here. First, the Servlet is a Jersey class that allows Spring Beans to be discovered and used as REST resources.  All of the dependency injection and AOP that that Spring components enjoy can be extended to Jersey-managed endpoints. Also, notice the Servlet mapping. It must be different than the Servlet mapping associated with the controller servlet (e.g. the Spring DispatcherServlet in the case of Spring MVC).  

In addition, you will have to make Broadleaf's default endpoints available to the Spring Application Context.  To do this, add the appropriate package to the component scan in your merged application context:

```xml
<context:component-scan base-package="org.broadleafcommerce.core.web.api"/>
```

This configuration is required to use Broadleaf's RESTful services and the most basic way to simply get Broadleaf's RESTful services working out of the box.

Lastly, it is recommended that you configure a filter to set the customer state, if known, on each request.  Broadleaf has a default filter that handles this.  You might want to replace it with your own implementation, especially if implementing some kind of security filter. To use Broadleaf's default filter out of the box, you must configure this filter in the merged application context.  Typically, we recommend using applicationContext-security.xml, if you are using the application as it is created with the Broadleaf Maven archetype.

```xml
<bean id="blRestCustomerStateFilter"
          class="org.broadleafcommerce.profile.web.core.security.RestApiCustomerStateFilter"/>

<bean id="blRequestWrapperFilter"
	  class="org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter" />

<bean id="springSecurityFilterChain" class="org.springframework.security.web.FilterChainProxy">
    <sec:filter-chain pattern="/api/**" 
                filters="blRequestWrapperFilter,
                         blRestCustomerStateFilter"/>
    ...
</bean>
```

## Extending Broadleaf RESTful services ##
Extending Broadleaf Commerce is a big topic. Broadleaf's default entities can be extended. Broadleaf's DAOs and Services can also be extended.  See the section on [[Extending Product | Next-Steps#wiki-extending-product]] or [[Extending Service | Next-Steps#wiki-extending-service]] for more information on generally extending Broadleaf's domain and service objects.  After extending the domain and/or services, you may want to expose the new data and/or functionality to clients of your RESTful API.  Broadleaf provides a mechanism for this and attempts to be as flexible as possible.

Perhaps the best way to describe how this works is to use an example.  Catalog-related entities are among the Broadleaf entities most often extended.  Broadleaf, for example, provides a entities for Category, Product, and Sku.  Let's assume that you are developing an eCommerce store to sell hot sauce.  You want to extend Broadleaf's Product to include the [[Scoville Heat Units | http://en.wikipedia.org/wiki/Scoville_scale]].  Again, you can find details on how to extend a Product [[here | Next-Steps#wiki-extending-product]].  So, you create a new class called HotSauce:

```java
import org.broadleafcommerce.core.catalog.domain.ProductImpl;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;

@Entity
@Table("HOT_SAUCE")
public class HotSauce extends ProductImpl {

    @Column(name="SCOVILLE_UNITS")
    private Integer scovilleUnits;

    public void setScovilleUnits(Integer units) {
        this.scovilleUnits = units;
    }

    public Integer getScovilleUnits() {
        return this.scovilleUnits;
    }
}
```

Assuming that you have your JPA and necessary Spring configurations correct, your HotSauce class can be used as Broadleaf's "Product".  Let's assume that you want to expose the Scoville Units to Broadleaf's RESTful catalog API.  Let's also assume that you want to suppress the active start date and active end date that are exposed by default.  The key is to override the ProductWrapper that provides the data serialization:

```java
package com.mycompany;

import org.broadleafcommerce.core.web.api.wrapper.ProductWrapper;
import javax.xml.bind.annotation.*;

@XmlRootElement(name = "hotSauce")
@XmlAccessorType(value = XmlAccessType.FIELD)
public class HotSauceWrapper extends ProductWrapper {
    @XMLElement
    private Integer scovilleUnits;

    @Override
    public void wrap(Product model, HttpServletRequest request) {
        //First, call the super method to get the default behavior
        super.wrap(model, request);
        //Next, cast the product passed in to HotSauce and use it to set the Scoville Units
        this.scovilleUnits = ((HotSauce)model).getScovilleUnits();
        //Last, suppress the active dates by setting them to null. Null values will not be serialized.
        super.activeStartDate = null;
        super.activeEndDate = null;
    }
}
```

In the merge configuration, you will also need to override the definition of this bean:

```xml
<bean id="org.broadleafcommerce.core.web.api.wrapper.ProductWrapper" class="com.mycompany.HotSauceWrapper" scope="prototype"/>
```

And that's it! Broadleaf's merge process will replace the default wrapper implementation with your HotSauceWrapper implementation.  Your wrap logic will control what gets serialized and what doesn't.  Any calls to get a HotSauce product will result in your wrapper class being instantiated and your wrap method being called. The Scoville Units will be returned as part of the message, and the active start and end dates will be suppressed.

## Creating your own RESTful services ##
In order to create a net new RESTful service, you simply need to implement an endpoint.  More information about JAX-RS is available [[here | http://docs.oracle.com/javaee/6/tutorial/doc/giepu.html]]. The important things to note are:

1. Make sure that your RESTful endpoint is a Spring-managed bean. This can be accomplished by using the @Component or @Service annotations, or by adding the bean to the merged application context via XML configuration.

2. Ensure that that the Spring-managed endpoint contains the necessary @Scope, @Path, @Produces, @Consumes annotations.

Here is an example:
```java
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Context;
import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;

// The Java class will be hosted at the URI path "/myresource"
@Component("myEndpoint")
@Scope("singleton")
@Path("/myresource")
@Produces(value={MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
@Consumes(value={MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public class MyNewEndpoint {

    @Resource(name = "myEntityService")
    private MyEntityService myEntityService;
    
    @GET
    @Path("/{id}")
    public MyResourceWrapper findMyResourceById(@Context HttpServletRequest req, @PathParam("id") Long id) {
        MyResourceWrapper wrapper = new MyResourceWrapper();
        MyEntity myEntity = myEntityService.findById(id);
        wrapper.wrap(myEntity, req);
        return wrapper;
    }
}
```
That is all that is required.  If this bean is registered with the Spring application context, either using a component scan or defining it directly in the merge application context XML file, and the web.xml file is modified as described above, then the new endpoint will be exposed as a RESTful service.

Here is the resource class that defines the object being returned:

```java
import javax.xml.bind.annotation.*;
import org.broadleafcommerce.core.web.api.wrapper.APIWrapper;

@XmlRootElement(name = "myResource")
@XmlAccessorType(value = XmlAccessType.FIELD)
public class MyResourceWrapper implements APIWrapper<MyEntity>  {

    @XMLAttribute
    private Long id;

    @XMLElement
    private String name;

    @Override
    public void wrap(MyEntity model, HttpServletRequest request) {
        this.id = model.getId();
        this.name = model.getName();
    }
}
```
The key here is that the wrap method allows you to set the properties that are required to be serialized. Since they are annotated with JAXB annotations, they will be serialized as XML or JSON, depending on the Accept header of the request. Also notice that the HttpServletRequest is passed to the endpoint method and is made available to the wrap method. This is important if there is something from the request that is required to build the response (e.g. request URI used to build a new URL for content or media). In this example, we simply ignore the HttpServletRequest in the wrap method.  Also, if you make the wrapper class a Spring-managed prototype bean, you can have a number of additional benefits such as making it ApplicationContextAware, injecting services into it for further processing during wrapping, etc. If you do this, be sure it is prototype scoped, and that anything you do not wish to serialize is annotated as XMLTransient. Also be sure to use the application context to retrieve an instance. This is important because the endpoint is a singleton and the wrapper bean is a prototype:

```java
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Context;
import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import javax.annotation.Resource;

// The Java class will be hosted at the URI path "/myresource"
@Component("myEndpoint")
@Scope("singleton")
@Path("/myresource")
@Produces(value={MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
@Consumes(value={MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public class MyNewEndpoint implements ApplicationContextAware {

    private ApplicationContext context;

    @Resource(name = "myEntityService")
    private MyEntityService myEntityService;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
    }
    
    @GET
    @Path("/{id}")
    public MyResourceWrapper findMyResourceById(@Context HttpServletRequest req, @PathParam("id") Long id) {
        //Notice here that we use the application context to get the bean instance.  See the bean 
        //definition below. Notice the dependency injection.
        MyResourceWrapper wrapper = (MyResourceWrapper)context.getBean("myResourceWrapper");
        MyEntity myEntity = myEntityService.findById(id);
        wrapper.wrap(myEntity, req);
        return wrapper;
    }
}
```

```java
import javax.xml.bind.annotation.*;
import org.broadleafcommerce.core.web.api.wrapper.APIWrapper;
import org.broadleafcommerce.cms.file.service.StaticAssetService;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Scope;
import javax.annotation.Resource;

@Component("myResourceWrapper")
@Scope("prototype")
@XmlRootElement(name = "myResource")
@XmlAccessorType(value = XmlAccessType.FIELD)
public class MyResourceWrapper implements APIWrapper<MyEntity>  {

    @XMLTransient //We don't want to serialize this so we make it XMLTransient
    @Resource(name="blStaticAssetService")
    private transient StaticAssetService staticAssetService;

    @XMLAttribute
    private Long id;

    @XMLElement
    private String name;

    @XMLElement
    private String mediaUrl;

    @Override
    public void wrap(MyEntity model, HttpServletRequest request) {
        this.id = model.getId();
        this.name = model.getName();
        
        //Notice here we use an injected Broadleaf service to create the appropriate URL
        this.mediaUrl = staticAssetService.
            convertAssetPath(model.getMediaUrl(), request.getContextPath(), request.isSecure()));
    }
}
```