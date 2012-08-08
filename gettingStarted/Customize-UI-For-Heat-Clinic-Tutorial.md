In this tutorial, you will learn how to modify key parts of the Heat Clinic UI, including individual pages, templates, and content managed by the Broadleaf CMS. If you'd like to learn more about the UI in Broadleaf, please review the [[presentation layer documentation | Presentation Layer]] section.

> We will assume that you have already completed the [[Getting Started]] section and have successfully gotten both the website and admin servers up and running. You will also want to become familiar with the [Thymeleaf templating engine](http://www.thymeleaf.org/) as that is the default used by Broadleaf and the Heat Clinic demo.

## Modifying an individual page

Let's begin by changing the greeting seen by logged in users for the Heat Clinic:

![Initial Header Greeting](/images/customize-ui-tutorial-1.png)

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


