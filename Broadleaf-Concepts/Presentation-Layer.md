# Presentation Layer

There are a few different components to the presentation layer in Broadleaf which we will cover in this documentation. We'll cover our general approach to controllers and how to extend functionality as well as our chosen template engine, Thymeleaf, and how to interact with it in a Broadleaf setting.

## Broadleaf Controllers

The controller strategy in Broadleaf 2.0 has changed since previous versions as a result of user feedback and learning about how current implmentations handled the controller layer. Broadleaf no longer bundles any classes that have the `@Controller` annotation - however, we do provide classes that perform all of the necessary logic. It is up to the implementor to extend the `Broadleaf*Controller` class, annotate their own class with `@Controller` and provide methods that will match certain URLs. We chose this strategy for the following reasons:

1. URLs are completely customizable by you. You get to bind any path for your actions.
2. You can share logic on one Broadleaf controller method in various of your controller methods. For example, if you have an add to cart method and an AJAX/JSON based add to cart method, you can still delegate the actual functionality to the same Broadleaf controller method. You would simply alter the response path.
3. You can very easily add logic before and after the Broadleaf controller logic -- and if that's not enough, you can simply refrain from calling a specific controller method altogether. You can also control the location of your templates and which template gets returned when.

Let's dive into some of these points.

### Customizing URLs

If you don't need to customize any logic for a certain method, all you have to do is bind to a certain path and delegate to the Broadleaf controller method. Let's take a look:

```java
@Controller
public class RatingsController extends BroadleafRatingsController {

    @RequestMapping(value = "/reviews/product/{itemId}", method = RequestMethod.GET)
    public String viewReviewForm(HttpServletRequest request, Model model, 
            @PathVariable("itemId") String itemId, 
            @ModelAttribute("reviewForm") ReviewForm form) {
        return super.viewReviewForm(request, model, form, itemId);
    }
}
```

Here, we define a class called RatingsController and annotate it properly. This class must be in a package that is component scanned by the `applicationContext-servlet.xml` file.

Note how we are binding to the request mapping at `/reviews/product/{itemId}` and simply delegating the logic to the Broadleaf Controller method. Easy!

### Sharing Broadleaf controller logic

In the Heat Clinic demo application, the normal add to cart flow uses JavaScript and expects a JSON response back to update the page. We'll take a look at this method, but first, let's look at the signature of the BroadleafCartController method, `add`.

```java
public String add(HttpServletRequest request, HttpServletResponse response, Model model,
        AddToCartItem itemRequest) throws IOException, AddToCartException, PricingException  {
```

Notice how this method will return a String which represents the specific template path to render (or, potetially, a redirect).

Now, let's take a look at a snippet of the AJAX based add to cart in the Heat Clinic

```java
@RequestMapping(value = "/add", produces = "application/json")
public @ResponseBody Map<String, Object> addJson(HttpServletRequest request, HttpServletResponse response, Model model,
        @ModelAttribute("addToCartItem") AddToCartItem addToCartItem) throws IOException, PricingException, AddToCartException {
    Map<String, Object> responseMap = new HashMap<String, Object>();

    try {
        super.add(request, response, model, addToCartItem);
        ...
    } catch (AddToCartException e) {
        ...
    }
    
    return responseMap;
```

Notice how this method will return a serialized `Map<String, Object>` instead of the String that is returned by `super.add`. This will get converted to JSON via Jackson and will be easily utilizable by the JavaScript that made the call. Also notice that this method products `application/json`, which means that this method will typically only handle XHR requests.

At the same time, we want to support browsers that do not have JavaScript enabled for whatever reason. Therefore, we can define another add method that doesn't produce JSON:

```java
@RequestMapping(value = "/add", produces = "text/html")
public String add(HttpServletRequest request, HttpServletResponse response, Model model,
        @ModelAttribute("addToCartItem") AddToCartItem addToCartItem) throws IOException, PricingException, AddToCartException {
    return super.add(request, response, model, addToCartItem);
}
```

This only simply delegates to the BroadleafCartController.

### Adding custom logic to controllers

This should be a really easy and obvious section:

```java
@RequestMapping(value = "/some/path")
public String doSomething(HttpServletRequest request, HttpServletResponse response, Model model) {
    ... do some cool stuff ...

    // Call the super controller (or not if you want to completely override the functionality)
    String returnPath = super.doSomething(request, response, model);

    ... do more stuff ...

    // Return the template specified by Broadleaf (or not if you want to return your own template)
    return returnPath;
```

## Thymeleaf

As of 2.0, Broadleaf by default will use Thymeleaf as a templating engine. You can learn more about Thymeleaf itself on the [Thymeleaf Website](http://www.thymeleaf.org/). In this section, we'll cover a few specific integration points between Broadleaf and Thymeleaf including dialects, the template resolver, and the view resolver.

### Dialects

Dialects are groups of processors, and processors are basically methods that either manipulate the model or page structure and are invoked directly from the .html page.

> Note: If you're familiar with JSP taglibs and tags, the equivalent concepts in Thymeleaf are dialects and processors.

In addition to the default Thyemleaf dialect which provides a rich set of processors, Broadleaf provides its own dialect to interact with the system. This dialect is invoked with the `blc:` prefix and you can find all of the available processors by inspecting the `org.broadleafcommerce.core.web.processor` and `org.broadleafcommerce.cms.web.processor` packages. Typical usage of these processors is viewable directly in the source code for the Heat Clinic application.

As you are building your own application, you may find the need to create your own processors. To do this, you would want to create your own dialect and processor, and then notify the templating engines in Broadleaf about your new dialects. For example, you would place the following in your application context:

```xml
<bean id="myDialect" class="com.mycompany.web.dialect.MyDialect">
    <property name="processors">
      <set>
        <bean class="com.mycompany.web.processor.MyProcessor" />
      </set>
    </property>     
</bean> 

<bean id="blWebTemplateEngine" class="org.thymeleaf.spring3.SpringTemplateEngine">
    <property name="dialects">
        <set>
            <ref bean="myDialect" />
        </set>
    </property>
</bean> 

<bean id="blEmailTemplateEngine" class="org.thymeleaf.spring3.SpringTemplateEngine">
    <property name="dialects">
        <set>
            <ref bean="myDialect" />
        </set>
    </property>
</bean>
```

When the application context merge happens, your `myDialect` bean would get added to the default dialects Broadleaf provides, which includes the `thymeleafSpringStandardDialect` and the `blDialect` beans.

### Template Resolver

Typically, during development, you will want to use the template resolver that is pre-configured inside of Broadleaf, which looks like this:

```xml
<bean id="blWebTemplateResolver" class="org.thymeleaf.templateresolver.ServletContextTemplateResolver">
    <property name="prefix" value="/WEB-INF/templates/" />
    <property name="suffix" value=".html" />
    <property name="templateMode" value="HTML5" />
    <property name="cacheable" value="false"/>
    <property name="characterEncoding" value="UTF-8" />
</bean> 
```

When you move to production, you will want to override this bean definition by redeclaring the `blWebTemplateResolver` and `blEmailTemplateResolver` beans in your applicationContext file and turn caching on.

Additionally, Broadleaf provides a specialized template resolver in the form of `BroadleafThymeleafServletContextTemplateResolver`. When you configure the template resolvers to use this class instead of the Thymeleaf provided class, you will be able to specify a certain theme based on request attributes. A theme could control any applicable prefixes and suffixes to apply to a given template.

### View Resolver

Broadleaf utilizes a pattern similar to Tiles where a specific page is simply a fragment and a container layout is specified for that fragment. However, we also introduce a few other things that will be covered below.

Let's take a look at the view resolver configuration for the Heat Clinic:

```xml
<bean class="org.broadleafcommerce.common.web.BroadleafThymeleafViewResolver">
    <property name="templateEngine" ref="blWebTemplateEngine" />
    <property name="order" value="1" />
    <property name="cache" value="false" />
    <property name="fullPageLayout" value="layout/fullPageLayout" />
    <property name="characterEncoding" value="UTF-8" />
    <property name="layoutMap">
        <map>
            <entry key="account/" value="layout/accountLayout" />
            <entry key="catalog/" value="NONE" />
            <entry key="checkout/" value="layout/checkoutLayout" />
            <entry key="checkout/confirmation" value="layout/fullPageNoNavLayout" />
            <entry key="layout/" value="NONE" />
        </map>
    </property>
</bean>
```

To understand what's happening here, we'll walk through an example. Say that the controller responsible for rendering the account pages returns the String `account/manageWishlist`. Layouts are determined by longest prefix match in the `layoutMap` as defined above. We can see that the longest match here is the `account/` prefix, which corresponds to the `layout/accountLayout` template.

Both of these items will be resolved by the template resolver, and we will end up with handles on the two files, `/WEB-INF/templates/account/manageWishlist.html` and `/WEB-INF/templates/layout/accountLayout.html`. We then know to render the accountLayout layout and embed the manageWishlist fragment inside of it. If a prefix does not match, it will use the `fullPageLayout` by default.

However, there is an important and powerful exception to this rule. If you request a given URL via XHR (AJAX), the layout will NOT embed the fragment -- instead, the fragment will be returned to you as a standalone piece! This enables rich, AJAX-heavy webpages that still support bookmarking, semantic URLs, and non-JavaScript browsers and search engine crawlers.

If you specify `NONE` as the layout to use, you are indicating that the page is standalone and will never be embedded in a layout.
