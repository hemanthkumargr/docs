> Broadleaf provides a default Locale Resolver. This document will explain how the locales are resolved in Broadleaf, as well as setting Locales up and how to go about using them in your site.

## <a name="wiki-locale-setup" />Locale Setup
Setting up a locale is a very simple process by making use of the load sql files.


###Adding a Locale
To add a locale add the following statements to ```load_content_structure_international.sql``. 

> You will need to add a currency before you can call it out in the locale insert statement (See 'USD', 'EUR', etc.). This allows the ```CURRENCY_CODE``` to exist before it's added to the locale.

```sql
INSERT INTO BLC_LOCALE (LOCALE_CODE, DEFAULT_FLAG, FRIENDLY_NAME, CURRENCY_CODE) VALUES ('en_US', TRUE, 'English', 'USD');
INSERT INTO BLC_LOCALE (LOCALE_CODE, DEFAULT_FLAG, FRIENDLY_NAME, CURRENCY_CODE) VALUES ('en_GB', FALSE,'English (United Kingdom)', 'GBP');
INSERT INTO BLC_LOCALE (LOCALE_CODE, DEFAULT_FLAG, FRIENDLY_NAME, CURRENCY_CODE) VALUES ('es_MX', FALSE, 'Spanish (Mexico)', 'MXN');
INSERT INTO BLC_LOCALE (LOCALE_CODE, DEFAULT_FLAG, FRIENDLY_NAME, CURRENCY_CODE) VALUES ('es_ES', FALSE, 'Spanish (Spain)', 'EUR');
INSERT INTO BLC_LOCALE (LOCALE_CODE, DEFAULT_FLAG, FRIENDLY_NAME, CURRENCY_CODE) VALUES ('fr_FR', FALSE,'French (France)', 'EUR');
```

> Make sure you set only one locale with the ```DEFAULT_FLAG``` set to ```true```. We recommend you keep the default locale insert statement in ```load_content_structure.sql``` for clarity.

###Language Specific Locale
There are cases where two locales use the same langauge, albeit with differences in certains words and phrases. In these cases, you can set a language only locale then tag your contet with ```'en'``` or ```'es'```. By doing this you can, for example, have a general set for all english, and then only tag specific content that varies with the UK version.

```sql
INSERT INTO BLC_LOCALE (LOCALE_CODE, DEFAULT_FLAG, FRIENDLY_NAME, CURRENCY_CODE) VALUES ('en', FALSE, 'English', 'USD');
INSERT INTO BLC_LOCALE (LOCALE_CODE, DEFAULT_FLAG, FRIENDLY_NAME, CURRENCY_CODE) VALUES ('es', FALSE, 'Spanish', 'EUR');
```

## <a name="wiki-locale-resolver" />Locale Resolver 
Broadleaf Commerce relies on the ```BroadleafRequestContext``` to carry the locale information by using the ```BroadleafLocaleResolver``` to insert it into. We go through the following series of checks to resolve the locale.

We have set ```"blLocale"``` to be the name of the attribute that will be set and checked for.

### Request Attribute
We check for a request attribute as a first check to allow implementers to to easily override the session variable.

```java
request.getAttribute("blLocale")
```

###Request Parameter
We then check for a request parameter.

```java
request.getParameter("blLocale")
```

### Session
The Heat Clinic demo site is using the session variable to set the locale.

```java
session.getAttribute("blLocale")
```

###Default
If none of the above methods find a locale, we use the default that has been defined in the database.

Once we go through the checks, we set the locale to the session to enable the site to remain in the selected locale.

```java
request.getSession().setAttribute("blLocale", locale);
```

## <a name="wiki-locales" />Using the Locales  

Now that we have our locales setup in our database and have our locale resolver, we can access them passing in the sesssion attribute.

In the links below, we are adding ```?blLocaleCode=en_US```, this allows the Locale Resolver to come in, grab the attribute from the session, and set in the ```BroadleafRequestContext```.


```html
<a th:href="@{'?blLocaleCode=en_US'}">United States</a>
<a th:href="@{'?blLocaleCode=en_GB'}">United Kingdom</a>
<a th:href="@{'?blLocaleCode=es_MX'}">Mexico</a>
<a th:href="@{'?blLocaleCode=es_ES'}">Spain</a>
<a th:href="@{'?blLocaleCode=fr_FR'}">France</a>
```
> The above links are using the Thymeleaf dialect for links.
