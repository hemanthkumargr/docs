## <a name="wiki-overview" />Overview


... this section should probably go here somewhere, and maybe in an appendix as well ...

The project structure that is created for you by the Maven archetype is a multi-module maven project. If you're unfamiliar with Maven, this can be a bit daunting at first -- however, it's nothing more than a simple hierarchical project structure consisting of 5 separate projects. This breakdown supports the sharing and modularity that we believe is ideal for an enterprise scale eCommerce implementation.

The skeleton project contains the following modules:

1. **admin** - The admin project contains your customizations to the Broadleaf Commerce admin. Typically, this will include GWT based custom views, presenters and datasources. Modifying the admin is an advanced topic and [[separate documentation | Admin]] is available.

2. **admin-war** - The admin-war project contains the non-GWT based web components for the Broadleaf Commerce admin. This includes the spring-security configuration. The project also contains the import.sql file used to load data into the application on server startup.

3. **core** - The core project contains code (typically services and domain objects) that you want to share between the admin and site projects.

4. **site** - The site project contains your customizations for your site. Typically, this project will contain Controllers, Filters, Servlets, and Utility classes that are used by your site but not needed by the admin.

5. **site-war** - The site-war project contains JSPs, JavaScript libraries and other web specific artifacts. It serves as the launching point for the website and contains the spring-mvc and spring-security configuration files.

6. **test** - The test project contains your project's custom unit and integration tests.

