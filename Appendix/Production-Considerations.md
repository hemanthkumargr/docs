# Production Considerations

## Email Configuration

Please see the [[Email Configuration]] section for more information on configuring your emails.

##Caching

Caching in Broadleaf Commerce is handled in general with the Ehcache library (http://ehcache.org). The main caching consideration
is the Hibernate level 2 cache. This cache serves to reduce the amount of trips the application need make to the database
for retrieving product and catalog information, to name a few. While browsing a merchants catalog, for example, rather than going
back to the database every time to get product information, the application can store this information locally for faster
retrieval.

Broadleaf Commerce predefines several cache regions that can be tweaked by each implementation for peak performance. Most of the
settings are in regard to time-to-live, and the like. These settings define how long Hibernate will keep the information in
memory before considering it "stale" and refreshing the data from the database. If you have relaxed real-time data requirements,
then tweaking the timeout settings in your own cache override configuration xml is probably enough. See [[Persistence-Configuration]],
as well as the cache configuration in the demo application [[Getting-Started]], for more info about ehcache configuration.

For implementations that have realtime data changes requirements to all nodes in the production cluster (e.g. a change
made in the admin is immediately visible in all cluster nodes), a more exotic setup is called for. We have some upcoming
feature roadmap items that will provide some additional API that helps address this requirement, but for now,
implementers need to add this type of support to their own implementations. This generally involves the following:

1) Track an update event for a particular entity made in the admin.
2) Post a JMS message that details the impacted entity or entities.
3) Add a message driven pojo (MDP) to your implementation configuration that listens for this JMS message.
4) The MDP catches the message and will harvest the id of the impacted entity and drop that entity from the local ehcache.

Each node of the cluster has an active MDP such that any message posted to JMS will cause the aforementioned entity to be
dropped from every node's cache in the cluster. As a result, if the entity is requested by the application, it will be forced to
go to the database to get the item value, rather than the cache, which will result in the new value being used.

A distributed cache option (ehcache and Terracotta offer a solution for this) is also available. Please see the ehcache/Terracotta
documentation for more information and pricing.

Finally, for extremely large catalogs with a high frequency of cache update, more exotic caching solutions may be called
for to mitigate excessive Java garbage collection from cache puts and removes. Terracotta's BigMemory product offers a good solution to this type of caching
problem and Broadleaf Commerce is compatible with this solution. In addition, we have built a BigMemory specific module for
our Hydrated Cache solution that works in concert with Hibernate's level 2 cache to offer full in-memory object cache for entity
properties, in addition to the dehydrated state maintained by Hibernate. Refer to this webinar for more information,
http://www.slideshare.net/crederajfischer/bigmemory-for-bigproblems-improving-performance-of-a-real-world-ecommerce-application-based-on-hibernate-broadleaf-commerce.

##Data Propagation Between Environments

In general, we recommend that developers maintain a local database to support the Broadleaf Commerce implementation and
utilize import sql scripts to seed the necessary data for development. This enhances productivity and efficiency during the early
development phases. This is supported in the default state of the Broadleaf Commerce demo, as the persistence configuration
will cause the database schema to be rebuilt and imported when the demo is launched.

Integrated Dev and QA will likely more closely resemble real production data, as they will be useful for testing. In these
environments (including production), the auto rebuild and re-import feature should be disabled. Refer to [[Database-Configuration]]
for more information.

As for previewing data changes before promoting to production, we are currently working on a change set feature for the admin tool
that will allow administrative users to update categories, products and promotions (in addition to CMS items) and preview those
changes in a live version of the site before promoting those changes to a live status where they would be visible to regular
users. In addition, the ability to schedule these changes to become live at a future date will be supported. This will be
a commercial feature available as part of an enterprise support contract, in addition to being available as an a la carte
feature. Please contact us for pricing and availability.

##Security

Security for web applications is a pretty wide open topic, but there are some built-in protections and supporting tools included
with Broadleaf Commerce.

1) Spring Security - this security framework is used extensively by Broadleaf Commerce and serves and the primary security
infrastructure to protecting access to certain portions of the site. Spring Security can be configured to use the database
as the backing source of authentication information, as well as other sources, such as LDAP and CAS. Using Spring Security, modern
security specifications such as SAML and OAUTH can be utilized as well.

2) Broadleaf Commerce Exploit Protection Service - Broadleaf Commerce also offers a component that can be configured to add
protection against modern XSS (Cross Site Scripting) and CSRF (Cross Site Request Forgery) attacks using the venerable OWASP AntiSamy Project (https://www.owasp.org/index.php/Category:OWASP_AntiSamy_Project).
This component is configured for use by default in both the demo and admin applications. This component is specifically called from Broadleaf Commerce
pre-built Spring MVC controllers and care should be taken to utilize this protection as well in custom built controllers.

3) Broadleaf Commerce utilizes JPA/Hibernate best practices for prepared statements that protects against SQL injection threats.

In addition to the above, general care should be taken to protect sensitive user information. Login passwords should always
be encrypted. Also, depending on the PCI scope your implementation is targeted for, you may have to take extra measures
to protect user payment information. We suggest that all Broadleaf Commerce implementations utilize a payment gateway that
offers a complete PCI certified solution and data center. In such a case, you will not need to store sensitive user payment
information locally, thereby lessening your overall risk. Refer to [[Payment-Security-and-PCI-Compliance]] for more information.

Also, third party security providers also offer services including frequent site security scans that can be used to remotely
test your site for common vulnerabilities and risks. This is a great extra measure to help harden the security for your
production site, and is necessary in some cases to achieve compliance with certain PCI requirements.

##Encryption

There are a number of excellent encryption strategies that you can employ to secure sensitive information in your web application.
It is important to consider various factors such as encryption strength, key rotation strategy, etc.

When starting up the application with the `production` environment key, you will receive a warning if you have not specified your 
own encryption module. The default module provided by Broadleaf, `PassthroughEncryptionModule`, will not actually perform any type
of encryption or decryption. This is ok for development, but we **highly** recommend employing a strategy that actually will do some
type of encryption.

##Load Balancing

Load balancing is the primary method used in Broadleaf Commerce implementations to scale an application and allow it
to service a larger number of simultaneous users. "Horizontally" scaling the application by adding additional application
server instances places additional horse power behind your application.

Different app containers handle the specifics of load balancing differently (refer to your app container docs for more info),
but the overall idea is the same.

1) A load balancing appliance is placed in front of several web servers. The appliance can be a specialized piece of hardware,
or load balancing software installed on commodity hardware. Load balancers generally provide session affinity and can help
optimize HTTPS performance by decrypting SSL traffic at this layer.

2) One of more web servers (e.g. Apache Web Server) are placed behind the load balancer and can be used to perform a number of
functions, such as: url rewrite, reverse proxy and static image retrieval.

3) The application servers (e.g. Apache Tomcat) are placed behind the web servers and provide housing and execution for your
Broadleaf Commerce e-commerce site.

By adding additional instances of the application server (and possibly additional instances of the web server), you give
the load balancing layer more instances of the applications with which to serve your users, which boosts performance and
availability under load.

Horizontal scale can also extend to the data layer through a technology generally known as database sharding. This approach
allows for the separation of large amounts of data across several real database instances. In front of the several database
instances is a smart managing component that knows how to generate the appropriate queries to each database and "stitch" the
comprehensive results back together to pass to your application. The teiid project has some interesting features in this
area (http://www.jboss.org/teiid/).
