There are currently 9 key modules included as part of the Broadleaf Commerce framework (not including third party modules)

## broadleaf-common
A collection of classes shared by various modules. 
> Depends on broadleaf-instrument

## broadleaf-framework
Core Broadleaf framework classes
> Depends on broadleaf-common, broadleaf-profile, broadleaf-contentmanagement-module

## broadleaf-framework-web
Spring MVC controllers and related items
> Depends on broadleaf-framework, broadleaf-profile, broadleaf-profile-web

## broadleaf-profile
Customer profile related classes, utility classes, email, configuration merge
> Depends on broadleaf-common

## broadleaf-profile-web
Spring MVC controllers and related items supporting the profile module
> Depends on broadleaf-profile

## broadleaf-instrument
Allows for runtime instrumentation to override certain Broadleaf annotations 
> No dependencies

## broadleaf-open-admin-platform
Framework for creating extensible administration GUIs for Hibernate managed domains
> Depends on broadleaf-common

## broadleaf-contentmanagement-module
A full-featured content management system that is managed via the administration tool
> Depends on broadleaf-open-admin-platform

## broadleaf-admin-module
Contents: Broadleaf Commerce specific administration module that plugs into the open admin platform
> Depends on broadleaf-framework, broadleaf-open-admin-platform, broadleaf-contentmanagement-module
