Broadleaf Commerce currently offers integration with the PayPal Express API. See [[Getting Started With Express Checkout | https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECGettingStarted]] for more information. This module allows users to complete their shopping experience using their PayPal account.

Upon clicking the PayPal button, the customer would be re-directed to PayPal's site to authenticate his or her identity. 
Once the customer has reviewed the transaction, PayPal would re-direct the customer back to your Broadleaf Commerce site with an authorization token to complete checkout. 
The customer would then review and confirm the order and Broadleaf would internally handle the processing of the order and the settlement with PayPal. 
> Note: PayPal requires you to conform to certain UI requirements in order to integrate with them. Please see [[Express Checkout User Interface Requirements | https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_api_ECUIRequirements]] for more information.

![Paypal Diagram](images/payment-paypal-diagram.png)

There are two ways to get started integrating the PayPal module into your web application. 
Broadleaf offers a [[PayPal Quick Start]] solution that allows developers to easily add PayPal functionality with little configuration.
If you have a complex payment workflow, please take a look at our [[PayPal Advance Configuration]]

Here's a feature list to help you decide which approach to choose:
(This list does not contain all the capabilities of the module)

### Feature List
<table>
  <tr>
    <th>Feature</th>
    <th>Quick Start</th>
    <th>Advance Configuration</th>
  </tr>
  <tr>
    <td>Customizable Logo and Color Scheme on PayPal </td>
    <td>[[/images/layout/accept.png]]</td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
  <tr>
    <td>Single payments using PayPal or another credit card payment gateway. </td>
    <td>[[/images/layout/accept.png]]</td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
  <tr>
    <td>Partial payments using custom defined payment activities </td>
    <td></td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
  <tr>
    <td>Capture shipping information in Broadleaf </td>
    <td>[[/images/layout/accept.png]]</td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
  <tr>
    <td>Capture shipping information on PayPal </td>
    <td></td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
  <tr>
    <td>Saving PayPal details to Broadleaf profile </td>
    <td></td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
  <tr>
    <td>Simple Authorization and Checkout</td>
    <td>[[/images/layout/accept.png]]</td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>  
  <tr>
    <td>Refund Transaction</td>
    <td></td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
  <tr>
    <td>Void Transaction</td>
    <td></td>
    <td>[[/images/layout/accept.png]]</td>
  </tr>
    <td></td>
    <td>[[PayPal Quick Start]]</td>
    <td>[[PayPal Advance Configuration]]</td>
  </tr>  
</table>