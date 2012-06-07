Broadleaf Commerce currently offers integration with the PayPal Express API. This allows users to add a ![Checkout with PayPal](https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif) button to their existing eCommerce checkout workflow. Upon clicking the PayPal button, the customer would be re-directed to PayPal's site to input the necessary payment/shipping information (or saved information). Once completed, PayPal would re-direct the customer back to your Broadleaf Commerce site with an authorization token to complete checkout. Broadleaf would internally handle the processing of the order once confirmation has been received. Note: PayPal requires you to conform to certain UI requirements in order to integrate with them. Please see [[Express Checkout User Interface Requirements | https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECUIRequirements]] for more information.

Now that you know the workflow of adding PayPal to your site, let's set up the configurations for the PayPal Module.

**You must have completed the [[PayPal Environment Setup]] before continuing**

## Configuring PayPal Payments