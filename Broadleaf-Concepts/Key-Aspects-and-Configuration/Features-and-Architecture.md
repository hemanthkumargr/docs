# Features and Architecture

> Broadleaf Commerce is a fully open source eCommerce framework that has been designed from the ground up for scalability and customizability.

## <a name="wiki-features"></a>Features

### Catalog
Broadleaf provides flexible product and category organization. A core feature of the framework is the ability to extend the product catalog to match the specific needs of your business. The administration platform provides a rich UI that can be used to manage categories and products.

### Promotion System
Broadleaf includes a highly-configurable system for your promotions. The BLC admin is able to manage the following types of promotions without customization:
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

## <a name="wiki-frameworks"></a>Architecture

### Spring Framework
Spring is the enterprise Java platform at Broadleaf's core and provides numerous features, including dependency injection and transaction control.

### Security
Spring Security provides a robust security framework for controlling authentication and authorization at both the code and page level.

### Persistence
JPA and Hibernate represent our ORM infrastructure for persisting our rich domain model.

### Asynchronous Messaging
Asynchronous processing of application messages is achieved via interaction with a modern JMS broker through Spring JMS.

### Search
Flexible domain search capabilities are provided through integration with the popular Compass and Lucene projects.

### Task Scheduling
Repetitive tasks can be scheduled through the Quartz job scheduling system.

### Email
Email support is provided in both synchronous and asynchronous (JMS) modes. Email presentation customization is achieved via Velocity template utilization. Full target email open and link click tracking is supported out-of-the-box.

### Modular Design
Modules provide interaction with important eCommerce touchpoints such as a credit card processor, tax service, or shipping provider. For example, the USPS shipping module is a great example of Broadleaf's modular design. Any number of custom modules may be developed and utilized.

### Configurable Workflows
Key areas in the eCommerce lifecycle are represented as configurable workflows. Implementors have full control over the keys steps in pricing and checkout, allowing manipulation of module order, behavior, and custom execution. Composite workflows are also supported to achieve sophisticated, nested behavior.

### Extensible Design
Extensibility is at the core of our design, and almost every aspect of Broadleaf can be overridden, added to or otherwise modified to enhance or change the default behavior. This includes all of our services, data access objects and entities. 

### Configuration Merging
As an extra bonus to our extensibility model, we offer a custom merge facility for Spring configuration files. We minimize the configuration semantics that an implementer must be aware of, allowing our users to focus on their own configuration particulars. Broadleaf will intelligently merge its own configuration information with that provided by the implementer at runtime.

### Runtime Configuration Management
Configuration properties for services, modules and other subsystems are exposed through JMX so that administrators can alter application behavior without having to bring down the system.

### Presentation Layer Support
A number of pre-written Spring MVC controllers are provided to speed development of the presentation layer of your own Broadleaf site.

### QoS
Quality of Service monitoring for both custom and default modules is provided along with out-of-the-box support for logging and email. Additional custom QoS handlers may be added through our open API.

### PCI Considerations
We have taken measures in our construction and design to help you achieve PCI compliance should you decide to store and use sensitive customer financial account information. Payment account information is referenced separately, allowing you to segregate confidential data onto a separate, secure database platform. API methods have been added to allow inclusion of any PCI compliant encryption scheme. Also, verbose logging is included to track payment interaction history.

### Customizable Administration Platform
The administration application is based on our new Open Admin platform, which provides a clear path for customization using standard object oriented techniques. Developers can now enjoy the same level of extensibility in the admin platform that they already enjoy in the core framework. The presentation layer is based on the well known and trusted GWT and SmartGWT technologies.
