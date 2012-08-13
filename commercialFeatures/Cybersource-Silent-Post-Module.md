> Note: Broadleaf Commerce currently offers integration with CyberSource using the Silent Order Post method through a commercial integration module. To obtain this third party integration or if you have any questions about this module, please contact us at info@broadleafcommerce.org

## How It Works
1. On the final checkout page, the customer fills out their credit card and billing information and hits submit. This form will POST directly to CyberSource with the required information contained within hidden fields and regular form fields.
2. CyberSource will then process an Authorize and Debit transaction against the billing and credit card information submitted and send a redirect request to the customer's browser.
3. The customer's browser will then redirect to a Broadleaf URL based on the outcome of the transaction.
4. Broadleaf will then redirect the user to either a confirmation or error page to end the checkout flow.