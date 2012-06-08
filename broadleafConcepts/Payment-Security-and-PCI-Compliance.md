**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

## Managing Payment Data

Some users will want to store customer account information in their own database, while other users will prefer to allow a third-party payment processor to maintain customer account information and simply maintain a "token" identifier in their own database that references the transaction on the payment processor side, should retrieval of the specifics of the transaction be required at a later date. Considerations in this area become important when you're trying to adhere to PCI requirements and restrictions. The steps required to fulfill PCI requirements in regard to customer account information storage can be numerous and many customers will choose to forego this complexity in favor of allowing another entity to protect this data. Broadleaf Commerce facilitates either approach. First, let's discuss the simpler of the two approaches - allowing a third-party payment processor to maintain customer account information.

Broadleaf Commerce has several pre-written Spring MVC controllers, including a CheckoutController. It is up to you to choose the presentation layer approach that best fits your needs, but regardless of the approach, you will be required at some point to compile the PaymentInfo information to the order before calling performCheckout on the CheckoutService. Most Broadleaf Commerce users will choose Spring MVC and will likely implement their own CheckoutController. However, the CheckoutController in the Broadleaf Commerce codebase provides a good starting point (refer to the `processCheckout` method in `org.broadleafcommerce.core.web.controller.checkout.CheckoutController`). For the simpler approach, CheckoutService provides the `performCheckout` method that accepts the Order instance, as well as a Map instance containing PaymentInfo keys and Referenced values. Review this snippet from the Broadleaf Commerce CheckoutController that builds up the required objects and calls the CheckoutService `performCheckout` method.

```java
Map<PaymentInfo, Referenced> payments = new HashMap<PaymentInfo, Referenced>();
CreditCardPaymentInfo creditCardPaymentInfo = ((CreditCardPaymentInfo) securePaymentInfoService.create(PaymentInfoType.CREDIT_CARD));

creditCardPaymentInfo.setCvvCode(checkoutForm.getCreditCardCvvCode());
creditCardPaymentInfo.setExpirationMonth(Integer.parseInt(checkoutForm.getCreditCardExpMonth()));
creditCardPaymentInfo.setExpirationYear(Integer.parseInt(checkoutForm.getCreditCardExpYear()));
creditCardPaymentInfo.setPan(checkoutForm.getCreditCardNumber());
creditCardPaymentInfo.setReferenceNumber(checkoutForm.getCreditCardNumber());

PaymentInfo paymentInfo = paymentInfoService.create();
paymentInfo.setAddress(checkoutForm.getBillingAddress());
paymentInfo.setOrder(order);
paymentInfo.setType(PaymentInfoType.CREDIT_CARD);
paymentInfo.setReferenceNumber(checkoutForm.getCreditCardNumber());
paymentInfo.setAmount(order.getTotal());
payments.put(paymentInfo, creditCardPaymentInfo);
List<PaymentInfo> paymentInfos = new ArrayList<PaymentInfo>();
paymentInfos.add(paymentInfo);
order.setPaymentInfos(paymentInfos);

order.setStatus(OrderStatus.SUBMITTED);
order.setSubmitDate(Calendar.getInstance().getTime());

try {
    checkoutService.performCheckout(order, payments);
} catch (CheckoutException e) {
    LOG.error("Cannot perform checkout", e);
}
```

As you recall, Referenced instances contain the actual customer account information. When passed in directly as part of the payments parameter to the `performCheckout` method of CheckoutService, the contents of these Referenced instances are never persisted. In this way, you can harvest the necessary payment account information from your customers, use that information to build the required Referenced instances, and then pass this information through with your order and PaymentInfo instances to your payment processing code without ever having that customer payment account information hit a database.

In the example code above, the reference number is set to the credit card number. Obviously, this is not a desirable approach for creating a reference number, since the reference number is an unprotected field in the PaymentInfo entity in the non-secure schema. Rather, in a real implementation, users would set the reference number to some arbitrary value. The reference number may be anything as long as it's the same for both the PaymentInfo and the associated Referenced instance. If your payment processor provides a method of retrieving a token for a transaction in advance, then the token itself is a good candidate for the reference number. The PaymentInfo instances you create and associate with the order will be persisted with the order (NOT the Referenced instances), allowing you to refer back to order in your database and retrieve the reference number / token for research purposes. Note, if you only receive a token back from your payment processor as the result of a transaction, then we suggest you update the reference number field on the PaymentInfo instance in your custom payment module after you've transacted the payment with the processor.

If you choose to manage and persist all payment data yourself, including sensitive customer account information, then you'll need to explicitly save the Referenced instances during checkout. This is as simple as calling the save method of the `SecurePaymentInfoService`. Normally, this would be done when the PaymentInfo and Referenced objects are created, for example, in the CheckoutController. **When you use this approach and associate PaymentInfo instances with the order and persist the Referenced instances, then you can call the performCheckout method in CheckoutService that only requires the order parameter**. In this situation, Broadleaf Commerce is smart enough to retrieve the Referenced instances on own when it requires them.


## <a id="Securing-Account-Information"></a> Securing Account Information

Behind the scenes, whenever you set or get secure values from one or more of Referenced implementations, an encryption module performs encryption and decryption on the fly. You'll recall in our implementation of EmployeePaymentInfoDao, whenever we create or find an instance of EmployeePaymentInfo, we set the encryption module instance. Then, if you recall the EmployeePaymentInfoImpl class, this encryption module is used to encrypt and decrypt the employee PIN value. When creating your own payment types, it's entirely up to you what fields are encrypted. For the built-in payment types included with Broadleaf, the standard expected values are encrypted. For example, PAN (Primary Account Number) for each CreditCardPaymentInfo instance is encrypted.

## <a id="Encryption"></a>Encryption

By default, Broadleaf Commerce employs a useless pass-through implementation for the encryption module. The DefaultEncryptionModule class simply passes through the values adding neither encryption or decryption. To add real encryption and decryption, users will need to add support for their own strategy. The first step is to create a custom implementation of EncryptionModule. The EncryptionModule interface is left purposefully simple to allow the greatest degree of flexibility in implementation. Once an implementation is prepared, then you'll need to notify Broadleaf Commerce to use your custom encryption module instead of the default one by assigning the key id `blEncryptionModule`.

```xml
<bean id="blEncryptionModule" class="com.mycompany.encryption.MyEncryptionModule"/>
```

Choosing a strategy for encryption and decryption of sensitive customer data is an important consideration, especially for PCI compliance. We suggest StrongKey, which serves to centrally manage symmetric encryption keys. Creating a custom encryption module that works in tandem with StrongKey represents a viable approach for key management and secure storage of customer data. Please refer to the StrongKey website for more information: http://www.strongkey.org/. 

