# Extending Services Tutorial

### Overriding a Broadleaf Component ###
Broadleaf Commerce has a unique Spring Application Context merge capability that merges your application context with Broadleaf's default context.  This allows you to override bean definitions or add completely new ones.  Overriding a bean definition is as simple as implementing a Broadleaf interface (e.g. a service interface like SearchService): 
```java
public MySearchService implements SearchService {
    ...
    
    public List<Product> performSearch(String input) {
        ...
    }

    ...
}
```

Then, to make Broadleaf use your implementation instead of the default implementation, you just override the bean definition in the merged application context:
```xml
<bean id="org.broadleafcommerce.core.search.service.SearchService" class="com.mycompany.core.catalog.service.MySearchService"/>
```

Broadleaf will replace its default implementation of search service with your specified implementation and use it internally wherever there might be a dependency.  This goes for almost all beans that Broadleaf defines.

### Extending a Broadleaf Component ###
You may also wish to extend Broadleaf functionality rather than completely reimplementing an interface.  This can be done by simply extending a concrete implementation of a service and then redefining it just as we did with the SearchService above.

_**WARNING: One thing to consider is that Broadleaf uses AOP for a number of functions, including pricing. Be careful when extending Broadleaf services, especially when calling a super method. The AOP might not be invoked in these cases.**_

For example, CartService and OrderService have pricing functionality on a number of methods. This handled by an AOP interceptor.  If you extend CartService, for example, and create a new method that has custom functionality, but delegates to a super method, then the AOP interceptor will not get invoked.  The only options in this case are to override the exact superclass method (rather than creating a new method signature) or to wrap, or decorate, the CartService with a completely new service. This will ensure that the calls to the CartService are invoked via its interface and that the AOP interceptor(s) are invoked as well.
