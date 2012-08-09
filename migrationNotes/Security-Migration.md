One key difference between Broadleaf versions 1.6 and 2.0 is the upgrade from Spring 3.0 to Spring 3.1.  This includes Spring security.  The changes to the Spring Security configuration are fairly minimal for most applications.  First, it is assumed that you have updated your Maven dependencies to include the 2.0 version of the Broadleaf Framework.  This should pull in the transitive dependencies, including Spring Security 3.1.

First, make sure that you are using Spring 3.1 namespaces in the Spring Security application context resources:
```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:p="http://www.springframework.org/schema/p"
    xmlns:sec="http://www.springframework.org/schema/security"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:util="http://www.springframework.org/schema/util"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="
    	http://www.springframework.org/schema/beans
    	http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
    	http://www.springframework.org/schema/context
    	http://www.springframework.org/schema/context/spring-context-3.1.xsd
    	http://www.springframework.org/schema/security
    	http://www.springframework.org/schema/security/spring-security-3.1.xsd
    	http://www.springframework.org/schema/util
    	http://www.springframework.org/schema/util/spring-util-3.1.xsd">
```

## Site War
In 1.6, if you used the Broadleaf Maven Archetype for generating a Broadleaf project, then you will have a project called `site-war`.  The Spring Security file for `site-war` is located at `site-war/src/main/webapp/WEB-INF/applicationContext-security.xml`.  This should be updated to include the new configuration, which looks like this:
```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:p="http://www.springframework.org/schema/p"
    xmlns:sec="http://www.springframework.org/schema/security"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:util="http://www.springframework.org/schema/util"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="
    	http://www.springframework.org/schema/beans
    	http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
    	http://www.springframework.org/schema/context
    	http://www.springframework.org/schema/context/spring-context-3.1.xsd
    	http://www.springframework.org/schema/security
    	http://www.springframework.org/schema/security/spring-security-3.1.xsd
    	http://www.springframework.org/schema/util
    	http://www.springframework.org/schema/util/spring-util-3.1.xsd">

    <context:component-scan base-package="org.broadleafcommerce.common.web.security"/>
    <context:component-scan base-package="org.broadleafcommerce.profile.web.core.security"/>
    <context:component-scan base-package="org.broadleafcommerce.core.web.order.security"/>
    
    <!-- Resources do not need security -->
	<sec:http pattern="/css/**" security="none" />
	<sec:http pattern="/img/**" security="none" />
	<sec:http pattern="/js/**" security="none" />       
	<sec:http pattern="/favicon.ico" security="none" />       
	<sec:http pattern="/robots.txt" security="none" />       
	
	<!-- Set up Spring security for the application -->
	<sec:http auto-config="false" authentication-manager-ref="blAuthenticationManager" >
		<!-- We handle session fixation protection ourselves  -->
	    <sec:session-management session-fixation-protection="none" />
	    
		<!-- Specify these URLs as requiring HTTPS to encrypt user data  -->
		<sec:intercept-url pattern="/register*" requires-channel="https" />
		<sec:intercept-url pattern="/login*/**" requires-channel="https"  />
		<sec:intercept-url pattern="/account/**" access="ROLE_USER" requires-channel="https" />
		<sec:intercept-url pattern="/checkout/**" requires-channel="https" />
		<sec:intercept-url pattern="/confirmation/**" requires-channel="https" />
		
		<!-- Since the cart page is viewing as a modal, we want to allow it on any page -->
		<sec:intercept-url pattern="/cart/**" requires-channel="any" />
		
		<!-- All URLs not explicitly specified as https will be served under http -->
        <sec:intercept-url pattern="/" requires-channel="http"/>
        <sec:intercept-url pattern="/**" requires-channel="http"/>
		
		<!-- Define the login form along with the success and failure handlers -->
		<sec:form-login login-page='/login'
			authentication-success-handler-ref="blAuthenticationSuccessHandler"
			authentication-failure-handler-ref="blAuthenticationFailureHandler"
			login-processing-url="/login_post.htm" 
		/>
		
		<!-- Provide the logout handler -->
		<sec:logout delete-cookies="ActiveID" invalidate-session="true" logout-url="/logout"/>
		
		<!-- Specify our custom filters -->
		<sec:custom-filter ref="blCustomerStateFilter" after="REMEMBER_ME_FILTER"/>
		<sec:custom-filter ref="blCartStateFilter" before="ANONYMOUS_FILTER"/>
		<sec:custom-filter ref="blSessionFixationProtectionFilter" before="SESSION_MANAGEMENT_FILTER"/>
	</sec:http>
	
	<!--  The BLC Authentication manager.   -->
	<sec:authentication-manager alias="blAuthenticationManager">
		<sec:authentication-provider user-service-ref="blUserDetailsService">
			<sec:password-encoder ref="blPasswordEncoder" />
		</sec:authentication-provider>
	</sec:authentication-manager>
	
    <!--  User details service that authenticates using customer data in the database. -->
	<sec:jdbc-user-service data-source-ref="webDS"
		id="blUserDetailsService"
		users-by-username-query="SELECT USER_NAME,PASSWORD,TRUE FROM BLC_CUSTOMER WHERE USER_NAME=?"
		authorities-by-username-query="SELECT c.USER_NAME,r.ROLE_NAME from BLC_CUSTOMER c 
	                                      JOIN BLC_CUSTOMER_ROLE cr ON c.CUSTOMER_ID = cr.CUSTOMER_ID 
	                                      JOIN BLC_ROLE r ON cr.ROLE_ID = r.ROLE_ID 
	                                      WHERE USER_NAME=?" />
	                                      
    <!-- Sets the login failure URL -->
	<bean id="blAuthenticationFailureHandler" class="org.broadleafcommerce.common.security.BroadleafAuthenticationFailureHandler">
		<constructor-arg value="/login?error=true" />
		<property name="redirectStrategy" ref="blAuthenticationFailureRedirectStrategy" />
	</bean>

    <!-- Sets the login success URL -->
	<bean id="blAuthenticationSuccessHandler" class="org.broadleafcommerce.core.web.order.security.BroadleafAuthenticationSuccessHandler">
		<property name="redirectStrategy" ref="blAuthenticationSuccessRedirectStrategy" />
		<property name="defaultTargetUrl" value="/account" />
		<property name="alwaysUseDefaultTargetUrl" value="true" />
	</bean>
	
</beans>
```
This effectively provides a simple JDBC User Service that pulls the customer and roles from the Broadleaf Database.  It also provides a standard Spring Authentication Manager that uses the JDBC User Details Service to authenticate.  You'll notice a section that removes all security for certain resources:
```xml
<!-- Resources do not need security -->
<sec:http pattern="/css/**" security="none" />
<sec:http pattern="/img/**" security="none" />
<sec:http pattern="/js/**" security="none" />       
<sec:http pattern="/favicon.ico" security="none" />       
<sec:http pattern="/robots.txt" security="none" />
```
You might need to add or modify this section if you want to ensure that no security is required for certain additional resources.  You'll also notice a section that defines all of the resources that should be secured:
```xml
<!-- Set up Spring security for the application -->
	<sec:http auto-config="false" authentication-manager-ref="blAuthenticationManager" >
		<!-- We handle session fixation protection ourselves  -->
	    <sec:session-management session-fixation-protection="none" />
	    
		<!-- Specify these URLs as requiring HTTPS to encrypt user data  -->
		<sec:intercept-url pattern="/register*" requires-channel="https" />
		<sec:intercept-url pattern="/login*/**" requires-channel="https"  />
		<sec:intercept-url pattern="/account/**" access="ROLE_USER" requires-channel="https" />
		<sec:intercept-url pattern="/checkout/**" requires-channel="https" />
		<sec:intercept-url pattern="/confirmation/**" requires-channel="https" />
		
		<!-- Since the cart page is viewing as a modal, we want to allow it on any page -->
		<sec:intercept-url pattern="/cart/**" requires-channel="any" />
		
		<!-- All URLs not explicitly specified as https will be served under http -->
        <sec:intercept-url pattern="/" requires-channel="http"/>
        <sec:intercept-url pattern="/**" requires-channel="http"/>
		
		<!-- Define the login form along with the success and failure handlers -->
		<sec:form-login login-page='/login'
			authentication-success-handler-ref="blAuthenticationSuccessHandler"
			authentication-failure-handler-ref="blAuthenticationFailureHandler"
			login-processing-url="/login_post.htm" 
		/>
		
		<!-- Provide the logout handler -->
		<sec:logout delete-cookies="ActiveID" invalidate-session="true" logout-url="/logout"/>
		
		<!-- Specify our custom filters -->
		<sec:custom-filter ref="blCustomerStateFilter" after="REMEMBER_ME_FILTER"/>
		<sec:custom-filter ref="blCartStateFilter" before="ANONYMOUS_FILTER"/>
		<sec:custom-filter ref="blSessionFixationProtectionFilter" before="SESSION_MANAGEMENT_FILTER"/>
	</sec:http>
```
If you are using the standard Broadleaf Authentication Provider (e.g. the JDBC User Details Service), this is the only other section that you might need to change.  This section provides several functions. First, it uses the configured Authentication Manager to provide the authentication mechanism.  It defines how sessions should be managed.  Broadleaf provides session management and session fixation via the `blSessionFixationProtectionFilter`.  This section also specifies which URLs should be protected by `HTTPS`.  A login form is defined to tell Spring where to direct the user if they require login.  A logout handler is defined, which tells Spring to delete a cookie, invalidate the session, and which page to take the user to after logout.  Finally a list of custom filters are defined.  These filters should not be removed as they are important to the correct operation of Broadleaf Commerce.

