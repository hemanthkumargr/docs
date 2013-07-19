# REST Endpoints

## Request/Response Formats
All of the endpoints below have the ability to produce and consume both **XML** and **JSON**. To ensure that you are receiving JSON in a response, ensure that this request HTTP header is set:

```
Accept: application/json
```

To tell the endpoint that you are sending it JSON (like in a PUT or POST), use this HTTP header:

```
Content-Type: application/json
```

And of course, to ensure that all requests/responses are in JSON, use both of those headers combined:

```
Accept: application/json
Content-Type: application/json
```

## Functionality

The following provides a list of current RESTful endpoints provided with Broadleaf Commerce:

### Catalog

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
    <td>/catalog/search/products</td>
    <td>Returns a representation of a paginated list of products along with any search facets that may be used to filter the search.</td>
    <td>GET</td>
    <td>
       <ul>
       <li>q - a query parameter such as product name or keyword(s)</li>
       <li>page - the page to return in a paginated situation (default=1)</li>
       <li>pageSize - the number of records to return per page (default=15)</li>
       </ul>
       Additionally, you may pass in search facets (which are returned in the result of an initial query). Facets may be something like: price=range[0.00000:15.00000]&price=range[15.00000:30.00000]. This will add two values to a facet, allowing for a range in price from $0-$30.
    </td>
  </tr>
  <tr>
    <td>/catalog/search/category/{categoryId}/products</td>
    <td>Returns a representation of a paginated list of products within a category, along with any search facets that may be used to filter the search.</td>
    <td>GET</td>
    <td>
       <ul>
       <li>categoryId - the category that you wish to search</li>
       <li>q - a query parameter such as product name or keyword(s)</li>
       <li>page - the page to return in a paginated situation (default=1)</li>
       <li>pageSize - the number of records to return per page (default=15)</li>
       </ul>
       Additionally, you may pass in search facets (which are returned in the result of an initial query). Facets may be something like: price=range[0.00000:15.00000]&price=range[15.00000:30.00000]. This will add two values to a facet, allowing for a range in price from $0-$30.
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

### Order

>NOTE: The customer ID must be passed on each request. It can be passed on a query parameter or a request header. But it must be keyed as "customerId"**

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
  <tr>
    <td>/cart/items/{itemId}</td>
    <td>Updates the quantity of an item and optionally reprices the cart
    <td>PUT</td>
    <td>
      <ul>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/cart/offer</td>
    <td>Adds a promotional code to an order</td>
    <td>POST</td>
    <td>
      <ul>
      <li>promoCode</li>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/cart/offer</td>
    <td>Deletes a promotional code from an order</td>
    <td>DELETE</td>
    <td>
      <ul>
      <li>promoCode</li>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/cart/offers</td>
    <td>Deletes all promotional codes from an order and optionally reprices</td>
    <td>DELETE</td>
    <td>
      <ul>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/cart/fulfillment/groups</td>
    <td>Returns a list of fulfillment groups for a particular order</td>
    <td>GET</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/cart/fulfillment/groups</td>
    <td>Deletes all fulfillment groups from an order</td>
    <td>DELETE</td>
    <td>
      <ul>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/cart/fulfillment/group</td>
    <td>Adds a new fulfillment group to the order. Accepts a fulfillment group representation in JSON or XML format.</td>
    <td>POST</td>
    <td>
      <ul>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/cart/fulfillment/group/{fulfillmentGroupId}</td>
    <td>Updates the fulfillment group identified by the ID in the URI. Accepts a fulfillment group representation in JSON or XML format.</td>
    <td>PUT</td>
    <td>
      <ul>
      <li>priceOrder (default true)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>/orders</td>
    <td>Returns a list of orders. The order history is for the customer who's ID is passed in.</td>
    <td>GET</td>
    <td>
      <ul>
      <li>orderStatus (default SUBMITTED)</li>
      </ul>
    </td>
  </tr>
</table>

### Checkout

<table>
  <tr>
    <th>URI</th><td>Description</td><th>Method</th><th>Query Parameters</th>
  </tr>
  <tr>
    <td>/cart/checkout</td>
    <td>Accepts a list of PaymentMapWrapper representations in JSON or XML format. Returns a completed order.</td>
    <td>POST</td>
    <td>None</td>
  </tr>
  <tr>
    <td>/cart/checkout/payment/response</td>
    <td>This should only be called for modules that need to engage the workflow directly without doing a complete checkout. For example, when using PayPal for doing an authorize and retrieving the redirect: url to PayPal. This takes in a single PaymentReferenceMap representation. Returns a PaymentResponseItem representation.</td>
    <td>POST</td>
    <td>None</td>
  </tr>
</table>
