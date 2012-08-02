> Note: Broadleaf Commerce currently offers integration with Braintree through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

![Braintree Diagram](images/payment-braintree-diagram.png)

## How It Works
1. On the final checkout page, the customer fills out their credit card and billing information and hits submit. This form will POST directly to Braintree with the required information contained within hidden fields and regular form fields.
2. Braintree will then process an Authorize and Debit transaction against the billing and credit card information submitted and send a redirect request to the customer's browser.
3. The customer's browser will then redirect to a Broadleaf URL with a token to complete checkout.
4. Broadleaf will process the response and confirm the transaction with Braintree using the token.
5. Braintree will send back a confirmation response.
6. Broadleaf will then redirect the user to either a confirmation or error page to end the checkout flow. 

There are two ways to get started integrating this payment gateway into your eCommerce application.
Broadleaf offers a [[Braintree Quick Start]] solution that allows developers to easily add Braintree functionality
with little configuration. If you have a simple eCommerce store and want an easy way to start accepting payment, this is a good place to start.
On the other hand, if your application has a more complex payment workflow, you can customize your implementation using the [[Braintree Advance Configuration]] guide.
`