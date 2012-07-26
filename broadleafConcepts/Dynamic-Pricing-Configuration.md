(This is a snippet -- the content for this page needs to be written)
```xml
<filter>
	<filter-name>dynamicSkuPricingFilter</filter-name>
	<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
	<init-param>
		<param-name>targetBeanName</param-name>
		<param-value>myCompanyDynamicSkuPricingFilter</param-value>
	</init-param>
</filter>

<filter-mapping>
	<filter-name>dynamicSkuPricingFilter</filter-name>
	<url-pattern>/*</url-pattern>
</filter-mapping>
```

Add that to `web.xml`
