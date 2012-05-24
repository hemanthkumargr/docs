```xml
<filter>
	<filter-name>dynamicSkuPricingFilter</filter-name>
	<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
	<init-param>
		<param-name>targetBeanName</param-name>
		<param-value>myCompanyDynamicSkuPricingFilter</param-value>
	</init-param>
</filter>
```

Add that to `web.xml`