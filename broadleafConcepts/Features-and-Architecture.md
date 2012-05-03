## <a name="wiki-features" />Features 

### Catalog
BroadleafCommerce provide flexible Product and Category organization. A core feature of the framework is the ability to extend the product catalog to match the specific needs of your business. The administration platform provides a Rich UI that can be used to manage categories and products.

### Promotion System
BroadleafCommerce includes a highly-configurable system for including your pricing promotions. The BLC admin is able to manage the following types of promotions without customization:
- Percent Off / Dollar Off / Fixed Price
- Order, Item, Shipping Level Promotions
- Buy One Get One Promotions
- Promotions based on attributes of the customer, cart, or catalog

### Content Management System
Broadleaf Commerce provides a Content Management System with the following key features:
- Support for end-user managed static pages
- Ability to configure custom content types (e.g. Ads)
- UI for managing static pages, structured content, and images and other assets
- Targeting capability for structured content (e.g. show ad to customer's meeting a defined set of criteria)

## <a name="wiki-frameworks" />Frameworks

### Spring Framework
Spring is the enterprise Java platform on which BroadleafCommerce is based. It provides numerous features, including dependency injection and transaction control.

### Security
Spring Security provides a robust security framework for controlling authentication and authorization at both the code and page level and is utilized by BroadleafCommerce for access control.

### Persistence
JPA and Hibernate represent the BroadleafCommerce ORM infrastructure for controlling persistence of our rich domain model.

### Asynchronous Messaging
BroadleafCommerce achieves asynchronous processing of application messages via interaction with a modern JMS broker through Spring JMS.

### Search
Flexible domain search capabilities in BroadleafCommerce are provided through integration with the popular Compass and Lucene projects.

### Task Scheduling
Scheduling of repetitive tasks in BroadleafCommerce is offered through the Quartz job scheduling system.

### Email
Email support is provided throughout the BroadleafCommerce framework in either synchronous or asynchronous (JMS) modes. Email presentation customization is achieved via Velocity template utilization. Full target email open and link click tracking is supported out-of-the-box.

### Modular Design
Important e-commerce touchpoints are embodied in the concept of BroadleafCommerce "Modules". A module can provide interaction with a credit card processor, or even a shipping provider. The USPS shipping support is a great example of the pluggable architecture BroadleafCommerce employs. Any number of custom modules may be developed and utilized with BroadleafCommerce.

### Configurable Workflows
Key areas in the e-commerce lifecycle are represented as configurable workflows. Implementors have full control over the keys steps in pricing and checkout, allowing manipulation of module ordering, overriding existing module behavior and custom module execution. Composite workflows are also supported to achieve more exotic, nested behavior.

### Extendible Design
BroadleafCommerce is designed from the ground-up with extensibility in mind. Almost every aspect of BroadleafCommerce can be overridden, added to or otherwise modified to enhance or change the default behavior to best fit your needs. This includes all of our services, data access objects and entities. Please refer to the extensibility section of our documentation.

### Configuration Merging
As an extra bonus to our extensibility model, we offer a custom merge facility for Spring configuration files. We minimize the BroadleafCommerceconfiguration semantics that an implementer must be aware of, allowing our users to focus on their own configuration particulars. BroadleafCommerce will intelligently merge its own configuration information with that provided by the implementer at runtime.

### Runtime Configuration Management
BroadleafCommerce exposes configurable properties for services, modules and other subsystems through JMX so that BroadleafCommerceadministrators can alter application behavior without having to bring down the system.

### Presentation Layer Support
BroadleafCommerce also includes a number of pre-written SpringMVC controllers that help to speed development of the presentation layer of your own BroadleafCommerce-driven site.

### QoS
BroadleafCommerce also provides quality of service monitoring for modules (both custom and default modules) and provides support for several QOS handlers out-of-the-box: logging and email. Additional, custom QOS handlers may be added through our open API.

### PCI Considerations
We have taken measures in the construction and design of BroadleafCommerce to help you achieve PCI compliance, should you decide to store and use sensitive customer financial account information. Payment account information is referenced separately, allowing you to segregate confidential data onto a separate, secure database platform. API methods have been added to allow inclusion of any PCI compliant encryption scheme. Also, verbose logging is included to track payment interaction history.

### Customizable Administration Platform
The Broadleaf Commerce administration application is based on our new Broadleaf Commerce Open Admin platform which provides a clear path for customization using standard object oriented techniques. Developers can now enjoy the same level of extensibility in the admin platform that they already enjoy in the core Broadleaf Commerce framework. The Broadleaf Commerce Open Admin platform is based on several well known and trusted presentation layer technologies: GWT and SmartGWT.

