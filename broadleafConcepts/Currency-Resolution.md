> Broadleaf provides a default Currency Resolver. This document will explain how the Currencies are resolved in Broadleaf, as well as setting Currencies up and how to go about using them in your site.
> The currency is used to determine a ```pricelist``` for the product catalog.

## <a name="wiki-currency-setup" />Currency Setup
Setting up a Currency is a very simple process by making use of the load sql files.


###Adding a Currency
To add a Currency add the following statements to ```load_content_structure_international.sql``. 

> If no currency is set, it will default null. If this is the case, you will need to leave the ```CURRENCY_CODE``` field in ```BLC_LOCALE``` to ```null``` (Don't include it in the insert statement).

```sql
INSERT INTO BLC_CURRENCY(CURRENCY_CODE, FRIENDLY_NAME, DEFAULT_FLAG) VALUES('USD', 'US Dollar', true);
INSERT INTO BLC_CURRENCY(CURRENCY_CODE, FRIENDLY_NAME, DEFAULT_FLAG)VALUES('EUR', 'EURO Dollar', false);
INSERT INTO BLC_CURRENCY(CURRENCY_CODE, FRIENDLY_NAME, DEFAULT_FLAG) VALUES('GBP', 'GB Pound', false);
INSERT INTO BLC_CURRENCY(CURRENCY_CODE, FRIENDLY_NAME, DEFAULT_FLAG) VALUES('MXN', 'Mexican Peso', false);
```

> Make sure you set only one Currency with the ```DEFAULT_FLAG``` set to ```true```.


## <a name="wiki-Currency-resolver" />Currency Resolver 
Broadleaf Commerce relies on the ```BroadleafRequestContext``` to carry the Currency information by using the ```BroadleafCurrencyResolver``` to insert it into. We go through the following series of checks to resolve the Currency.

We have set ```"blCurrency"``` to be the name of the attribute that will be set and checked for.

### Request Attribute
We check for a request attribute as a first check to allow implementers to to easily override the session variable.

```java
request.getAttribute("blCurrency")
```

###Request Parameter
We then check for a request parameter.

```java
request.getParameter("blCurrency")
```

### Session
The Heat Clinic demo site is using the session variable to set the Currency.

```java
session.getAttribute("blCurrency")
```

### Locale
If the session variable hasn't been set than the Currency Resolver will try to get it from the currently set locale.

```java
locale.getDefaultCurrency();
```

###Default
If none of the above methods find a Currency, we use the default that has been defined in the database.

Once we go through the checks, we set the Currency to the session to enable the site to remain in the selected Currency.

```java
request.getSession().setAttribute("blCurrency", Currency);
```

## <a name="wiki-Currenciess" />Using the Currenciess  

Now that we have our Currenciess setup in our database and have our Currency resolver, we can access them passing in the sesssion attribute.

In the links below, we are adding ```?blCurrencyCode=USD```, this allows the Currency Resolver to come in, grab the attribute from the session, and set in the ```BroadleafRequestContext```.

> The formatting is pulled from the locale, so setting the currency in this way will switch the currency and display the currency code instead of symbol to avoid confusion that may arise from more then one currency using the same symbol.


```html
<a th:href="@{'?blCurrencyCode=USD'}">US Dollar</a>
<a th:href="@{'?blCurrencyCode=GBP'}">British Pound</a>
<a th:href="@{'?blCurrencyCode=MXN'}">Mexican Peso</a>
<a th:href="@{'?blCurrencyCode=EUR'}">Euro</a>
<a th:href="@{'?blCurrencyCode=EUR'}">Euro</a>
```
> The above links are using the Thymeleaf dialect for links.
