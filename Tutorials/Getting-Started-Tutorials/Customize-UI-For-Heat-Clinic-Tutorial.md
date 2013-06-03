# Customize UI For Heat Clinic Tutorial

In this tutorial, you will learn how to modify key parts of the Heat Clinic UI, including individual pages, templates, and content managed by the Broadleaf CMS. If you'd like to learn more about the UI in Broadleaf, please review the [[presentation layer documentation | Presentation Layer]] section.

> We will assume that you have already completed the [[Getting Started]] section and have successfully gotten both the website and admin servers up and running. You will also want to become familiar with the [Thymeleaf templating engine](http://www.thymeleaf.org/) as that is the default used by Broadleaf and the Heat Clinic demo.

## Modifying an individual page

Let's begin by changing the greeting seen by logged in users for the Heat Clinic:

![Initial Header Greeting](customize-ui-tutorial-1.png)

We're going to simply change the word Welcome to the word Hello.

### Finding the HTML files

All of the HTML files that are used by the Heat Clinic demo application are located under the following path:

```text
site/src/main/webapp/WEB-INF/templates/
```

We're after a partial piece of the layout -- the header. This file is at

```text
layouts/partials/header.html
```

Let's take a look at the relevant chunk:

```html
<div th:if="${customer.anonymous}"  th:remove="tag">
    <a class="account" th:href="@{/login}">Login</a> 
    &nbsp;|&nbsp; 
    <a class="account" th:href="@{/register}">Register</a> 
    &nbsp;|&nbsp; 
</div>

<div th:unless="${customer.anonymous}" th:remove="tag">
    <span>Welcome, <a class="my-account" th:href="@{/account}" th:text="${customer.firstName}"></a></span>  
    &nbsp;|&nbsp; 
    <a th:href="@{/logout}">Logout</a> 
    &nbsp;|&nbsp; 
</div>
```

These two divs are mutually exclusive. Notice that they both share the check for whether the current customer is anonymous (`${customer.anonymous}`), with one div handling each case. This is evaluated via the `th:if` and `th:unless` tags. 

> Unfamiliar users will definitely want to review the [Thymeleaf Documentation](http://www.thymeleaf.org/doc/Tutorial%20-%20Using%20Thymeleaf%2020120517.pdf) to learn more about this templating engine.

We can see in the non-anonymous div the line `Welcome, ...`. Let's simply change that to `Hello, ...` and take a look!

![Modified Header Greeting](customize-ui-tutorial-2.png)

> Note: You will likely have to restart your server to see the change. If you'd like to prevent restarts, please take a look at our [[JRebel Setup]] guide.

## Changing templates

Broadleaf uses a powerful template resolution mechanism to determine which layout to apply to pages when necessary (sometimes always, sometimes only for non-AJAX requests).

Let's look at a piece of `site/src/main/webapp/WEB-INF/applicationContext-servlet.xml`

```xml
<bean class="org.broadleafcommerce.common.web.BroadleafThymeleafViewResolver">
    ...
    <property name="fullPageLayout" value="layout/fullPageLayout" />
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

The layout to apply is determined by a longest prefix match of the requested file. Here, we'll change the `checkout/confirmation` layout - but first, let's see what a normal confirmation page looks like:

![Initial Confirmation Page](customize-ui-tutorial-3.png)

Notice how there is no navigation on the confirmation page. However,

if we change this line:

```xml
<entry key="checkout/confirmation" value="layout/fullPageNoNavLayout" />
```

to

```xml
<entry key="checkout/confirmation" value="layout/fullPageLayout" />
```

we will instead render the confirmation snippet in the normal full page layout, like so:

![Modified Confirmation Page](customize-ui-tutorial-4.png)

Easy!

## Modifying content with the Broadleaf CMS

Let's take a look at the standard /faq page on the Heat Clinic

![Initial FAQ Page](customize-ui-tutorial-5.png)

The FAQ page is set up to use the Basic Template, which is defined in `load_content_structure.sql` as using the `content/default` template. Because there is no entry in the `layoutMap` for this template, we will be embedding it into the `layout/fullPageLayout` layout.

Let's go into the admin in the `Content Management --> Pages` section and modify the /faq page with our own custom greeting

![FAQ Admin](customize-ui-tutorial-6.png)

Let's change the greeting and hit save. We'll see the following:

![Modified FAQ Page](customize-ui-tutorial-7.png)

You should now be familiar with the Broadleaf UI!
