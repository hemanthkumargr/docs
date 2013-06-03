# Merge Configuration

Merge configuration is handled through your web.xml file. The merge facility in Broadleaf primarily operates by intelligently mixing one or more Spring application context files. The final merged version of the application context is then passed to Spring for processing. 

For BroadleafCommerce to know what files to merge with its internal application context information, you must specify a list in your `web.xml` file for your web module (WAR). Let's take a look at an example.

First, we provide a context param entitled `patchConfigLocation` which denotes a list of your applicationContext files. Add as many as you like - they will all be merged into the Broadleaf configuration. 

```xml
<context-param>
    <param-name>patchConfigLocation</param-name>
    <param-value>
        /WEB-INF/applicationContext-custom.xml
        /WEB-INF/applicationContext-email.xml
        /WEB-INF/applicationContext-search.xml
        /WEB-INF/applicationContext-security.xml
    </param-value>
</context-param>
```

Once that's done, you will need to specify the class `org.broadleafcommerce.common.web.extensibility.MergeContextLoaderListener` as a listener for your web app. This class is responsible for initiating the merge between the internal Broadleaf application context information and your application context files.

```xml
<listener>
    <listener-class>org.broadleafcommerce.common.web.extensibility.MergeContextLoaderListener</listener-class>
</listener>
```

Broadleaf will merge your various applicationContext files along with various applicationContext files that exist in Broadleaf itself. When there are conflicting declarations of beans, Broadleaf understands how to handle and merge or override them.

For example, if you were to specify a bean with id `blOrderService`, Broadleaf would utilize your specified bean. However, there are certain cases where an override is not desired, but a merge of the bean contents. For example, let's take a look at part of the `blWebTemplateEngine` bean:

```xml
<bean id="blWebTemplateEngine" class="org.thymeleaf.spring3.SpringTemplateEngine">
    <property name="dialects">
        <set>
            <ref bean="thymeleafSpringStandardDialect" />
            <ref bean="blDialect" />
        </set>
    </property>
</bean> 
```

If you were to want to add your own custom dialect, you could simply place the following bean definition in your applicationContext file:

```xml
<bean id="blWebTemplateEngine" class="org.thymeleaf.spring3.SpringTemplateEngine">
    <property name="dialects">
        <set>
            <ref bean="myCustomDialect" />
        </set>
    </property>
</bean> 
```

We have identified this bean property as a property to be merged, not overriden, and as such, the bean that would be produced for Spring would be:

```xml
<bean id="blWebTemplateEngine" class="org.thymeleaf.spring3.SpringTemplateEngine">
    <property name="dialects">
        <set>
            <ref bean="thymeleafSpringStandardDialect" />
            <ref bean="blDialect" />
            <ref bean="myCustomDialect" />
        </set>
    </property>
</bean> 
```
