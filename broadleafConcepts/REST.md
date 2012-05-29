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
    <td>
       <ul>
       <li>active (default true)</li>
       <li>limit (default 20)</li>
       <li>offset (default 0)</li>
       </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/category/{id}/activeSubcategories</td>
    <td>Returns a list of active subcategories for a particular product category</td>
    <td>GET</td>
    <td>
       <ul>
       <li>limit (default 20)</li>
       <li>offset (default 0)</li>
       </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/category/{id}</td>
    <td>Returns a representation of a product category, keyed by ID. Parameters allow one to control how much additional, nested data is returned.</td>
    <td>GET</td>
    <td>
      <ul>
      <li>productLimit (default 20)</li>
      <li>productOffset (default 0)</li>
      <li>subcategoryOffset (default 0)</li>
      <li>subcategoryDepth (default 1)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/category/{id}/proucts</td>
    <td>Returns a list of products for a particular category</td>
    <td>GET</td>
    <td>
      <ul>
        <li>limit (default 20)</li>
        <li>offset (default 0)</li>
        <li>activeOnly (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/product/{id}/related-products/upsale</td>
    <td>Returns a list of related upsale products for a particular catalog product</td>
    <td>GET</td>
    <td>
      <ul>
        <li>limit (default 20)</li>
        <li>offset (default 0)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/product/{id}/related-products/crosssale</td>
    <td>Returns a list of related cross sell products for a particular catalog product</td>
    <td>GET</td>
    <td>
      <ul>
        <li>limit (default 20)</li>
        <li>offset (default 0)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/catalog/product/{id}/product-attributes</td>
    <td>Returns a list of product attributes for a particular catalog product</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/sku/{id}/sku-attributes</td>
    <td>Returns a list of sku attributes for a particular catalog sku</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/sku/{id}</td>
    <td>Returns a representation of a particular catalog sku</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/sku/{id}/media</td>
    <td>Returns a list of media items for a particular catalog sku</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/product/{id}/media</td>
    <td>Returns a list of media items for a particular catalog product</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/category/{id}/media</td>
    <td>Returns a list of media items for a particular product category</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/catalog/product/{id}/categories</td>
    <td>Returns a list of categories for a particular product</td>
    <td>GET</td>
    <td>None</td>
  </tr>
</table>
### Order ###
**NOTE: The customer ID must be passed on each request. It can be passed on a query parameter or a request header. But it must be keyed as "customerId"**
<table>
  <tr>
    <th>URI</th><td>Description</td><th>Method</th><th>Query Parameters</th>
  </tr>
  <tr>
    <td>/cart</td>
    <td>Returns a representation of the customer's shopping cart.</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/cart</td>
    <td>Creates a new cart for the customer. If the customer ID is unknown because a customer record does not yet exist, it need not be passed in. A new customer will be created. The new cart along with the customer will be returned.</td>
    <td>POST</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/cart/{categoryId}/{productId}/{skuId}</td>
    <td>Adds the sku and its associated category and product references to the shopping cart. Optionally reprices the order. Returns a representation of the cart.</td>
    <td>POST</td>
    <td>
      <ul>
      <li>quantity (default 1)</li>
      <li>priceOrder (default true)</li>
      <ul>
    </td>
  </tr>
  <tr>
    <td>/cart/items/{itemId}</td>
    <td>Deletes the item from the cart and optionally reprices the order</td>
    <td>DELETE</td>
    <td>
      <ul>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
</table>
### Checkout ###
