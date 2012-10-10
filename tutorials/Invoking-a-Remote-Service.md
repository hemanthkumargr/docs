In some instances, you might need to write your own avenues for communicating with the server from the GWT client-side.  Some use cases for this would be adding a button that invokes a function on the server, or creating a highly-customized form (that does not depend on an entity) to go through a complex workflow on the server.  In this example, we will be writing a service that does both

## Create your Service-side Service Contract
This first class is the contract that the server-side code will use.  Notice that this extends from GWT's RemoteService class.  So in MyCompanyCustomService.java:
```java

import com.google.gwt.user.client.rpc.RemoteService;

public interface MyCompanyCustomService extends RemoteService {

    @Secured("PERMISSION_OTHER_DEFAULT")    
    public Integer doSomethingWithProductId(Long productId) throws ApplicationSecurityException;
}
```

## Create your Client-side Service Contract
Now, you need to write the client-side interface that you will use in your GWT code.  Note that this returns void, but the `AsyncCallback` parameter is generically typed to `Integer`.  The generic type of the callback has to correspond to the return type of the method (could be Void) and should also have the same parameters and the addition of the callback.  So if the remote service had 2 parameters, this async service would have 3: the 2 parameters of the remote service and the callback.

So, in MyCompanyCustomServiceAsync.java:
```java
public interface MyCompanyCustomServiceAsync {
    public void doSomethingWithProductId(Long productId, AsyncCallback<Integer> callback);
}
```

Now we need to associate the AsyncService (that your client-side GWT code will use) with the remote service contract.  To do this, we recommend creating a generic `AppServices` class that will hold all of your custom services in this fashion.  So, in AppServices.java:
```java
public class AppServices {

public static final MyCompanyCustomServiceAsync GENERAL = GWT.create(MyCompanyCustomService.class);

    static {
        ServiceDefTarget endpoint = (ServiceDefTarget) GENERAL;
        endpoint.setServiceEntryPoint("admin.mycompany.service");
    }
}
```

## Adding your Server-side Implementation
Now that we have the client-side written, we need to write our server-side implementation.  As stated earlier, our implementation will implement the `MyCompanyCustomService`, and should also be marked as a Spring bean:
```java
@Service("myCompanyCustomService")
public class MyCompanyCustomRemoteService implements MyCompanyCustomService {

    @Service("blCatalogService")
    protected CatalogService catalogService;

    public Integer doSomethingWithProductId(Long productId) throws ApplicationSecurityException {
        Product product = catalogService.findProductById(productId);
        ...
    }
}
```

Now we need to hook up the GWT endpoint to our Spring bean.  In applicationContext-servlet.xml, you should redeclare the bean that BLC has while adding your own endpoint:
```xml
    <bean id="adminUrlMapping" class="org.broadleafcommerce.openadmin.security.CompatibleGWTSecuredHandler">
        <property name="mappings">
            <map>
                <entry key="/**/security.service" value-ref="blAdminSecurityRemoteService"/>
                <entry key="/**/dynamic.entity.service" value-ref="blDynamicEntityRemoteService"/>
                <entry key="/**/upload.progress.service" value-ref="blUploadRemoteService"/>
                <entry key="/**/utility.service" value-ref="blUtilityRemoteService"/>
                <entry key="/**/admin.catalog.service" value-ref="blAdminCatalogRemoteService"/>
                <entry key="/**/admin.export.service" value-ref="blAdminExporterRemoteService"/>
                <!--- Custom service -->
                <entry key="/**/admin.mycompany.service" value-ref="myCompanyCustomService"/>
            </map>
        </property>
        <property name="serviceExporterFactory">
            <bean class="org.broadleafcommerce.openadmin.security.CompatibleGWTSecuredRPCServiceExporterFactory"/>
        </property>
    </bean>
```


## Dealing with Custom Java Objects and GWT Remote Services
By default, GWT will deal just fine with simple parameters (Long, Boolean, String, etc).  In some scenarios, you might want to send over (and return back) a complex Java object that you create yourself.  The only thing you have to do to enable this functionality is to ensure that your custom object implements both the `Serializable` (from `java.io`) as well as `IsSerializable` (from `com.google.gwt`). The `IsSerializable` interface is just a marker interface that GWT uses during its compilation step to ensure that your custom Java class is compiled down to Javascript.  With this, you can now use your complex Java object in any method or return value dealing with server-side communication.