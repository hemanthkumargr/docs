# CyberSource Silent Post Module

> Note: Broadleaf Commerce currently offers integration with CyberSource using the Silent Order Post method through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

<img src="images/payment-cybersource-silentpost-diagram.png" class="no_border" alt="Braintree Diagram">

## How It Works
1. On the final checkout page, the customer fills out their credit card and billing information and hits submit. This form will POST directly to CyberSource with the required information contained within hidden fields and regular form fields.
2. CyberSource will then process an Authorize and Debit transaction against the billing and credit card information submitted and send a redirect request to the customer's browser.
3. The customer's browser will then redirect to a Broadleaf URL based on the outcome of the transaction.
4. Broadleaf will complete the checkout flow based on the response from CyberSource and forward to the appropriate confirmation or error page.

There are two ways to get started integrating this payment gateway into your eCommerce application.
Broadleaf offers a [[CyberSource SOP Quick Start]] solution that allows developers to easily add CyberSource SOP functionality
with little configuration. If you have a simple eCommerce store and want an easy way to start accepting payment, this is a good place to start.
On the other hand, if your application has a more complex payment workflow, you can customize your implementation using the [[CyberSource SOP Advance Configuration]] guide.