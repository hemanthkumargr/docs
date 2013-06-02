# Invoking a Remote Service

In some instances, you might need to write your own avenues for communicating with the server from the GWT client-side.  Some use cases for this would be adding a button that invokes a function on the server, or creating a highly-customized form (that does not depend on an entity) to go through a complex workflow on the server.  In this example, we will be writing a service that does both

## Create your Server-side Service Contract
This first class is the contract that the server-side code will use.  Notice that this extends from GWT's RemoteService class.  So in MyCustomService.java:
```java

import com.google.gwt.user.client.rpc.RemoteService;

public interface MyCustomService extends RemoteService {

    @Secured("PERMISSION_OTHER_DEFAULT")    
    public Boolean doSomethingWithProductId(Long productId) throws ApplicationSecurityException;
}
```
> The `@Secured` annotation will also secure this service to logged in users. You could technically secure services for different types of users by using the other AdminUserRoles but that is beyond the scope of this document.

## Create your Client-side Service Contract
Now you need to write the client-side interface that you will use in your GWT code.  The first parameter(s) of this method should be the same parameters as the server-side method, with the addition of an `AsyncCallback`.  So if the remote service had 2 parameters, this async service would have 3: the 2 parameters of the remote service and the callback.  Note that this client-side method returns void (which will always be the case), but the `AsyncCallback` parameter is generically typed to `Integer`.  The **generic type of the callback has to correspond to the return type of the server-side method** (could be `Void`).

In our case, the server-side code has a single parameter (a `Long`), so MyCustomServiceAsync.java looks like:
```java
public interface MyCustomServiceAsync {
    public void doSomethingWithProductId(Long productId, AsyncCallback<Boolean> callback);
}
```

Now we need to associate the AsyncService (that your client-side GWT code will use) with the remote service contract.  To do this, we recommend creating a generic `AppServices` class that will hold all of your custom services in this fashion.  So, in AppServices.java:
```java
public class AppServices {

public static final MyCustomServiceAsync GENERAL = GWT.create(MyCustomService.class);

    static {
        ServiceDefTarget endpoint = (ServiceDefTarget) GENERAL;
        endpoint.setServiceEntryPoint("admin.mycompany.service");
    }
}
```

## Reference your newly-created endpoint in your presenter
Now that all of our client-side code is created, let's go and use this in a presenter.  I will assume for the sake of this article that there is already a `ToolStripButton` somewhere on the view that will be used to control this service. We'll register our button handler in the `bind()` method of our subclass of `OneToOneProductSkuPresenter`:
```java
public void bind() {
    super.bind();
    getDisplay().getInvokeServiceButton().addClickHandler(new ClickHandler() {
        @Override
        public void onClick(ClickEvent event) {
            //grab the currently selected Product from the view
            final Long productId = Long.parseLong(getDisplay().getListDisplay().getGrid().getSelectedRecord().getAttribute("id"));
            AppServices.GENERAL.doSomethingWithProductId(productId, new AsyncCallback<Boolean>() {
                @Override
                public void onFailure(Throwable caught) {
                    SC.say("There was a problem invoking the remote service");
                }
                /**
                 * Called if there were no exceptions while invoking the remote service.
                 * The parameter of this method is the result of calling the server-side method
                 */
                @Override
                public void onSuccess(Boolean result) {
                    SC.say("The remote service returned " + result);
                }
            });
        }
    });
}
```

## Adding your Server-side Implementation
Now that we have the client-side written, we need to write our server-side implementation.  As stated earlier, our implementation will implement the `MyCustomService`, and should also be marked as a Spring bean.  Since we are now in Server-Side Land&trade; we can do dependency injection just like any other service:
```java
@Service("myCustomService")
public class MyCustomRemoteService implements MyCustomService {

    @Service("blCatalogService")
    protected CatalogService catalogService;

    public Boolean doSomethingWithProductId(Long productId) throws ApplicationSecurityException {
        Product product = catalogService.findProductById(productId);
        ...

        return success;
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
                <entry key="/**/admin.mycompany.service" value-ref="myCustomService"/>
            </map>
        </property>
        <property name="serviceExporterFactory">
            <bean class="org.broadleafcommerce.openadmin.security.CompatibleGWTSecuredRPCServiceExporterFactory"/>
        </property>
    </bean>
```
> **Note:** the reason that you have to redeclare the previous GWT services is because the servlet application contexts are not automatically merged like the application contexts specified in `patchConfigLocations` in your web.xml.

## Dealing with Custom Java Objects and GWT Remote Services
By default, GWT will deal just fine with simple parameters back and forth (Long, Boolean, String, etc).  In some scenarios, you might want to send over (and return back) a complex Java object that you create yourself (using a DTO pattern).  The only thing you have to do to enable this functionality is to ensure that your custom object implements both the `Serializable` (from `java.io`) as well as `IsSerializable` (from `com.google.gwt`). The `IsSerializable` interface is just a marker interface that GWT uses during its compilation step to ensure that your custom Java class is compiled down to Javascript.  With this, you can now use your complex Java object in any method or return value dealing with server-side communication.

An example of this would be our entire `Entity` and `Property` paradigms that we use to pull back entities (which just uses a remote service just like we described in this document).
```java
import com.google.gwt.user.client.rpc.IsSerializable;

import java.io.Serializable;

public class Entity implements IsSerializable, Serializable {

    private static final long serialVersionUID = 1L;

    private String[] type;
    private Property[] properties;
    private boolean isDirty = false;
    private Boolean isDeleted = false;
    private Boolean isInactive = false;
    private Boolean isActive = false;
    private Boolean isLocked = false;
    private String lockedBy;
    private String lockedDate;
    private boolean multiPartAvailableOnThread = false;
    private boolean isValidationFailure;
    private String[][] validationErrors;
    ...
    ...
```
