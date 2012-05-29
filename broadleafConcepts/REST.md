Broadleaf Commerce exposes a set of functional APIs as _RESTful_ services. These services are designed using [[JAX-RS | http://docs.oracle.com/javaee/6/tutorial/doc/gijqy.html]], [[JAXB | http://www.oracle.com/technetwork/articles/javase/index-140168.html]], and [[Jersey | http://jersey.java.net/]]. They allow integration with Broadleaf functionality from other applications, including mobile applications.  Broadleaf's RESTful APIs are easy to expose, easy to extend, and provide a simple pattern for adding net new functionality.

Broadleaf, via Jersey, provides content negotiation.  Broadleaf supports XML and JSON formats for messages.

## Functionality ##
The following provides a list of current RESTful endpoints provided with Broadleaf Commerce:
### Catalog ###
<table>
  <tr>
    <th>URI</th><td>Description</td><th>Method</th><th>Query Parameters</th>
  </tr>
  <tr>
    <td>/catalog/product/{id}</td>
    <td>Returns a representation of a Broadleaf product by its ID</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/products</td>
    <td>Returns a representation of a paginated list of products</td>
    <td>GET</td>
    <td>
       <ul>
       <li>name</li>
       <li>limit (default 20)</li>
       <li>offset (default 0)</li>
       </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/product/{id}/skus</td>
    <td>Returns a list of skus for a particular product</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/categories</td>
    <td>Returns a representation of a paginated list of product categories</td>
    <td>GET</td>
    <td>
       <ul>
       <li>name</li>
       <li>limit (default 20)</li>
       <li>offset (default 0)</li>
       </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/category/{id}/categories</td>
    <td>Returns a list of subcategories for a particular product category</td>
    <td>GET</td>
    <td>None</td>
  </tr>
</table>
### Order ###

### Customer ###

