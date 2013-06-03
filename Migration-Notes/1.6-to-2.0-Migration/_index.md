# 1.6 to 2.0 Migration

The transition from 1.6 to 2.0 consists of several different migration steps. We have added a lot of features and refactored key components in Broadleaf to support future development, and unfortunately, that means migrating to 2.0 requires some effort. Where possible, we have maintained legacy support to ease the transitional period.

> **This section is a work in progress and is not yet comprehensive**

## Sequence Generation

The default table generator approach used be Hibernate changed between the version of Hibernate we were previously using, and the one we use now. As a result, the table generation approach used by versions 1.5 and 1.6 of Broadleaf was org.hibernate.id.MultipleHiLoPerTableGenerator, which is not optimal. We have made a change in Broadleaf Commerce version 2.0 and beyond to cause Hibernate to use the desired org.hibernate.id.enhanced.TableGenerator strategy instead.
This has the side-effect of requiring a migration of data in the SEQUENCE_GENERATOR table.

**[[Learn about migrating the SEQUENCE_GENERATOR table data | 1.6 to 2.0 SEQUENCE_GENERATOR Migration]]**

## OrderService / CartService

Cart operations such as add, update and remove have been moved out of the order service and into Broadleaf workflows. Your options are to either refactor your code to utilize the power of workflows or utlize the legacy order services.

Pre-2.0, the add to cart / remove from cart / update cart logic was embedded in the OrderService. As we were involved in various implementations, we learned that many users want to customize these operations to add their own domain specific logic. As a result of this, we have developed workflow-based cart operations, which allow you to hook in your custom activities and error handlers. You can learn more about these new workflows on the [[Cart Operations]] page.

However, we realize that this is a substantial change that not all users want to make. Therefore, we've kept the old services and renamed them to `LegacyOrderService` and `LegacyCartService`. 

Your options are to either refactor your code to function in workflows or use the legacy services.

**[[Learn about migrating order service | 1.6 to 2.0 Order Service Migration]]**

## Fulfillment Group Item Strategy

Typically, in earlier versions of Broadleaf, you were on your own to create fulfillment group items and their relationship to orderitems. You also had to create your own fulfillment groups and relate your fg items to your fulfillment groups.

Broadleaf 2.0 greatly improves this experience - for most applications, you will now be able to rely on the "sync" fulfillment group item strategy, which will utilize one default fulfillment group and mirror all of the order items into fulfillment group items for you.

**[[Learn about migrating fulfillment group item strategy | 1.6 to 2.0 Fulfillment Group Item Strategy Migration]]**

## Security

One key difference between Broadleaf versions 1.6 and 2.0 is the upgrade from Spring 3.0 to Spring 3.1.  This includes Spring Security.  The changes to the Spring Security configuration are fairly minimal for most applications. 

**[[Learn about migrating your security | 1.6 to 2.0 Security Migration]]**

## Project Structure

We have restructured the project structure to only utilize three Maven modules instead of five. We have found that the extra modules are only necessary in very specific circumstances and that three projects is much more manageable for the average case. This is an optional step.

**[[Learn about migrating your project structure | 1.6 to 2.0 Project Structure Migration]]**
