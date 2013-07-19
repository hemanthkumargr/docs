# Rest

Broadleaf Commerce exposes a set of functional APIs as _RESTful_ services.
These services are designed using [JAX-RS](http://docs.oracle.com/javaee/6/tutorial/doc/gijqy.html),
[JAXB](http://www.oracle.com/technetwork/articles/javase/index-140168.html), and
[Jersey](http://jersey.java.net/). They allow integration with Broadleaf functionality from other applications, including mobile applications.
Broadleaf's RESTful APIs are easy to expose, easy to extend, and provide a simple pattern for adding net new functionality.

Broadleaf, via Jersey, provides content negotiation.  Broadleaf supports XML and JSON formats for messages.