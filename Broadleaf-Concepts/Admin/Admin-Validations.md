## Admin Entity Validations

The admin has a slightly unique way of doing validations. This is hooked up via the `@ValidationConfigurations` annotation on an `@AdminPresentation`.  Let's take a look at the docs for this:

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface ValidationConfiguration {

    /**
     * <p>The fully qualified classname of the org.broadleafcommerce.openadmin.server.service.persistence.validation.PropertyValidator
     * instance to use for validation</p>
     *
     * @return the validator classname
     */
    String validationImplementation();

    /**
     * <p>Optional configuration items that can be used to setup the validator</p>. Most validators should have at least
     * a single configuration item with {@link ConfigurationItem#ERROR_MESSAGE}.
     *
     * @return validator configuration attributes
     */
    ConfigurationItem[] configurationItems() default {};
}
```

This is the main entry point to use server-side validation on a field level. You can now write a customized validator that conforms to the `PropertyValidator` interface to do your validations.

```java
public interface PropertyValidator {

    /**
     * Validates a property for an entity
     *
     * @param entity Entity DTO of the entity attempting to save
     * @param instance actual object representation of <b>entity</b>. This can be cast to entity interfaces (like Sku or
     * Product)
     * @param entityFieldMetadata complete field metadata for all properties in <b>entity</b>
     * @param validationConfiguration the map represented by the set of {@link ConfigurationItem} for a
     * {@link ValidationConfiguration} on a property. This map could be null if this {@link PropertyValidator} is being
     * invoked outside of the context of a particular property (like a global validator)
     * @param propertyMetadata {@link BasicFieldMetadata} corresponding to the property that is being valid
     * @param propertyName the property name of the value attempting to be saved (could be a sub-entity obtained via dot
     * notation like 'defaultSku.name')
     * @param value the value attempted to be saved
     * @return <b>true</b> if this passes validation, <b>false</b> otherwise.
     */
    public PropertyValidationResult validate(Entity entity,
                                            Serializable instance,
                                            Map<String, FieldMetadata> entityFieldMetadata,
                                            Map<String, String> validationConfiguration,
                                            BasicFieldMetadata propertyMetadata,
                                            String propertyName,
                                            String value);
}
```

This interface expects a PropertyValidation result, which is slightly kluge for our @ValidationConfiguration example since we really just want to return a boolean true or false. When implementing a validator via @ValidatorConfiguration, we can subclass the `ValidationConfigurationBasedPropertyValidator` which will auto-populate the PropertyValidationResult with the message from the given `validationConfiguration` map.

But let's look at a concrete example. We have a few validators included in the framework (see [the complete list](http://javadoc.broadleafcommerce.org/current/open-admin-platform/org/broadleafcommerce/openadmin/server/service/persistence/validation)), one of which is a regular expression validator:

```java
public class RegexPropertyValidator implements ValidationConfigurationBasedPropertyValidator {

    @Override
    public boolean alidateInternal(Entity entity, Serializable instance, Map<String, FieldMetadata> entityFieldMetadata, Map<String, String> validationConfiguration, BasicFieldMetadata propertyMetadata, String propertyName, String value) {
        String expression = validationConfiguration.get("regularExpression");
        return value.matches(expression);
    }

}
```

In this validator, the regular expression is set on the validation by the configuration name of 'regularExpression'.  This can be used on an entity like so:

```java
@Entity
public class MyEntity {

	@Column("EMAIL_ADDRESS")
	@AdminPresentation(friendlyName="Email", validationConfigurations={
		@ValidationConfiguration(validationImplementation="org.broadleafcommerce.openadmin.server.service.persistence.validation.RegexPropertyValidator",
		configurationItems={
			@ConfigurationItem(itemName=ConfigurationItem.ERROR_MESSAGE, itemValue="Invalid Email Address"),
			@ConfigurationItem(itemName="regularExpression", itemValue="^([a-zA-Z0-9_.\\-+])+@(([a-zA-Z0-9\\-])+\\.)+[a-zA-Z0-9]{2,4}$")
		})
	})
	protected String emailAddress;

}
```

This configuration could also be modified to include bean names for the `validationImplementation` parameter, such

```java
@Entity
public class MyEntity {

	@Column("EMAIL_ADDRESS")
	@AdminPresentation(friendlyName="Email", validationConfigurations={
		@ValidationConfiguration(validationImplementation="blRegexPropertyValidator",
		configurationItems={
			@ConfigurationItem(itemName=ConfigurationItem.ERROR_MESSAGE, itemValue="Invalid Email Address"),
			@ConfigurationItem(itemName="regularExpression", itemValue="^([a-zA-Z0-9_.\\-+])+@(([a-zA-Z0-9\\-])+\\.)+[a-zA-Z0-9]{2,4}$")
		})
	})
	protected String emailAddress;

}
```

## Global validators
In some cases, you might want to validate all of the properties on all of your entities with a single validator without specifying an @ValidationConfiguration for all of the properties. For example, in Broadleaf, we have a `RequiredPropertyValidator` which checks if the given property is required and returns false if a value is not set. To add a new validator to this global list, simply include your validator bean reference in the `blGlobalEntityPropertyValidators` bean list and it will be invoked for every property on every entity.

## Validating the Broadleaf Entities

Since validations are hooked up via @AdminPresentation, you can override validations on Broadleaf entities without subclassing. For example, let's say that you wanted to override the default validation for the Broadleaf Customer, but you did not want to subclass CustomerImpl.  You can do this via the `mo:overrides` XML attribute in your applicationContext-admin.xml like so:

```xml
<mo:override id="blMetadataOverrides">
    <mo:overrideItem ceilingEntity="org.broadleafcommerce.profile.core.domain.Customer">
        <mo:field name="email">
            <mo:property name="broadleafEnumeration" value="com.pecancompany.core.order.type.PecanCompanyOrderStatus" />
            <mo:validation className="org.broadleafcommerce.openadmin.server.service.persistence.validation.RegexPropertyValidator">
                <mo:property name="errorMessage" value="Invalid Email Address"/>
                <mo:property name="regularExpression" value="^([a-zA-Z0-9_.\\-+])+@(([a-zA-Z0-9\\-])+\\.)+[a-zA-Z0-9]{2,4}$" />
            </mo:validation>
        </mo:field>
    </mo:overrideItem>
</mo:override>
```

Of course if you were already subclassing CustomerImpl and wanted to add validations, you could do so by annotating your class with `@AdminPresentationOverrides`.

## JSR303 Validations

If you have built a fair amount of additional functionality on top of Broadleaf, chances are you are using standard [JSR-303 validations in Spring MVC](http://static.springsource.org/spring/docs/3.1.3.RELEASE/spring-framework-reference/html/validation.html#validation-beanvalidation). You can enable similar support via the admin by setting up the BeanValidatorEntityValidatorService like so in your applicationContext-admin.xml:

```xml
<bean id="blEntityValidatorService" class="org.broadleafcommerce.openadmin.server.service.persistence.validation.BeanValidationEntityValidatorServiceImpl" />
```

This also requires a `javax.validation.validator` to be present in Spring's root applicationContext. You simply configure the default Spring implementation of this interface which will internally use the Hibernate validator:

```xml
<bean class="org.springframework.validation.beanvalidation.LocalValidatorFactoryBean" />
```

Of course this could be any class that conforms to the `javax.validation.validator` interface.
