## Anatomy of a Payment Module

Payment modules are used by Broadleaf Commerce to interface with an external entity responsible for the actual acquisition of funds from your customers for purchases made on your Broadleaf Commerce enabled site. Payment can take multiple forms based on the business requirements for your e-commerce site. Some examples of forms of payment are credit card, paypal, electronic debit, gift card, etc... If you encounter a situation where there is no existing Broadleaf Commerce payment module for your payment provider, you may find it necessary to develop your own custom payment module. Let's review the PaymentModule interface from Broadleaf Commerce.

```java
public interface PaymentModule {

    PaymentResponseItem authorize(PaymentContext paymentContext) throws PaymentException;
    
    PaymentResponseItem reverseAuthorize(PaymentContext paymentContext) throws PaymentException;

    PaymentResponseItem debit(PaymentContext paymentContext) throws PaymentException;

    PaymentResponseItem authorizeAndDebit(PaymentContext paymentContext) throws PaymentException;

    PaymentResponseItem credit(PaymentContext paymentContext) throws PaymentException;

    PaymentResponseItem voidPayment(PaymentContext paymentContext) throws PaymentException;

    PaymentResponseItem balance(PaymentContext paymentContext) throws PaymentException;

    Boolean isValidCandidate(PaymentInfoType paymentType);

}
```

All payment modules must implement the PaymentModule interface to be used by Broadleaf Commerce. The interface describes the basic set of payment operations Broadleaf Commerce might expect to be available.

- The `authorize` method is mostly a credit card related concept denoting a pre-check for availability of funds before actually transacting the debit.
- The `reverseAuthorize` releases the authorize created by the authorize method.
- The `debit` method is used to actually acquire the funds from the destination account.
- The `authorizeAndDebit` method is mostly a credit card related concept denoting a pre-check for availability of funds followed by an immediate acquisition of funds in a single call.
- The `credit` method is used to add money to a customer's account.
- The `voidPayment` method is used to cancel a previous debit transaction.
- The `balance` method is used to retrieve the customer's account balance.
- The `isValidCandidate` method is used by Broadleaf Commerce to determine if the module is capable of handling the payment transaction for the given payment type. For example, you wouldn't want a GiftCard module trying to handle a PayPal payment.

If you recall from the [[Payment Workflow Guide | Payment Workflow]], PaymentModules are fronted by PaymentServices and those services are included in payment workflows. The workflow itself defines the particular payment method it's concerned with, so invariably, it up to you to specify which of you PaymentModule methods are called and when. It is for this reason that the PaymentModule interface is left generally broad. For example, it may make sense to utilize authorize for credit cards, but not GiftCards. And, it may make sense to implement the balance method for your GiftCard module, but not for an electronic debit payment type. A module does not need to implement a payment method if it does not make sense for that payment type. For those methods that are not implemented, a PaymentException should be thrown. 

For most users, it may be simpler to extend the DefaultModule and override those methods you intend to support. Default module will automatically throw PaymentExceptions for any non-overridden methods.

## The PaymentContext

When implementing a PaymentModule, the key to communicating with Broadleaf Commerce on the specifics of the transaction is through the PaymentContext instance passed as a parameter to the payment method. Let's take a look at the PaymentContext interface.

```java
public interface PaymentContext {

    public Money getOriginalPaymentAmount();

    public Money getRemainingPaymentAmount();

    public PaymentInfo getPaymentInfo();

    public Referenced getReferencedPaymentInfo();

    public String getTransactionId();

    public void setTransactionId(String transactionId);

    public String getUserName() ;

}
```

- The `getOriginalPaymentAmount` method retrieves the total amount for the entire order
- The `getRemainingPaymentAmount` method retrieves the portion of the order total that still remains (this is meaningful when multiple payment types are used to pay for a single order)
- The `getPaymentInfo` method retrieves the PaymentInfo instance associated with this payment. It's useful for retrieving customer and general payment information.
- The `getReferencedPaymentInfo` method retrieves the Referenced instance associated with this payment. It's useful for retrieving specific account information (primary account number, CVV code, etc...).
- The `getTransactionId` method is mostly used by Broadleaf Commerce to retrieve the transaction id you associate with this payment.
- The `setTransactionId` method allows you to provide a transaction id for this payment - many times this will come from the external payment provider.
- The `getUserName` method provides the user which Broadleaf Commerce considers to be owner of this transaction. This is the same user configured for the payment activity

While the specific informational needs of each payment processor's API will differ, you should have access here to the building blocks necessary to construct any payment transaction request. Here are some hints:

- Call `paymentContext.getPaymentInfo().getOrder()` to get access to the entire order.
- Call `paymentContext.getPaymentInfo().getAddress()` to get the billing address.
- If you need the shipping address, you can call `order.getFulfillmentGroups().get(0).getAddress()`.
- Call `paymentContext.getPaymentInfo().getAmount()` to get the actual amount you should charge for this payment.
- Call `paymentContext.getReferencedPaymentInfo()` and cast to the appropriate secure payment type to access specific payment account information. For example, for credit cards, you would cast to `CreditCardPaymentInfo`.

## The PaymentResponseItem

In response to a payment request, all modules must provide a PaymentResponseItem instance. Let's take a look at this interface.

```java
public interface PaymentResponseItem extends Serializable {

    public String getAuthorizationCode();

    public void setAuthorizationCode(String authorizationCode);

    public String getMiddlewareResponseCode();

    public void setMiddlewareResponseCode(String middlewareResponseCode);

    public String getMiddlewareResponseText();

    public void setMiddlewareResponseText(String middlewareResponseText);

    public String getProcessorResponseCode();

    public void setProcessorResponseCode(String processorResponseCode);

    public String getProcessorResponseText();

    public void setProcessorResponseText(String processorResponseText);

    public String getReferenceNumber();

    public void setReferenceNumber(String referenceNumber);

    public Money getAmountPaid();

    public void setAmountPaid(Money amount);

    public Boolean getTransactionSuccess();

    public void setTransactionSuccess(Boolean transactionSuccess);

    public Date getTransactionTimestamp();

    public void setTransactionTimestamp(Date transactionTimestamp);

    public String getImplementorResponseCode();

    public void setImplementorResponseCode(String implementorResponseCode);

    public String getImplementorResponseText();

    public void setImplementorResponseText(String implementorResponseText);

    public String getTransactionId();

    public void setTransactionId(String transactionId);

    public String getAvsCode();

    public void setAvsCode(String avsCode);

    public String getCvvCode();

    public void setCvvCode(String cvvCode);

    public Money getRemainingBalance();

    public void setRemainingBalance(Money remainingBalance);

    public TransactionType getTransactionType();

    public void setTransactionType(TransactionType transactionType);

    public Map<String, String> getAdditionalFields();

    public void setAdditionalFields(Map<String, String> additionalFields);

    public Long getPaymentInfoId();

    public void setPaymentInfoId(Long paymentInfoId);

    public String getUserName();

    public void setUserName(String userName);

    public Customer getCustomer();

    public void setCustomer(Customer customer);

    public String getPaymentInfoReferenceNumber();

    public void setPaymentInfoReferenceNumber(String paymentInfoReferenceNumber);

}
```

The prescribed method for generating an instance of PaymentResponseItem is through the PaymentInfoService `createResponseItem` method. Simply inject an instance of the `PaymentInfoService` service into your module to gain access to this method.

Many of these fields are self explanatory and we won't go into detail on every one here. Also, it is not required that you fill out every field in this concrete implementation. In fact, the following fields are the only necessities:

- referenceNumber
- transactionTimestamp
- amountPaid (unless you're only making a balance call)
- transactionSuccess

However, under most circumstances, you'll want to fill out additional fields in this response.
- Multiple type of response codes can be saved, at both the implementor, middleware and processor levels.
- remainingBalance is intended to represent an account balance. remainingBalance should be set for those modules that support the balance method.

Some fields are handled by Broadleaf Commerce internally and can be safely ignored:

- transactionType
- paymentInfoId
- userName
- customer
- paymentInfoReferenceNumber

## Additional Response Information

If your payment type requires additional response fields that are not included in PaymentResponseItem, you may easily add additional, arbitrary fields to the additionalFields map. A great example of this type of usage would be if you're trying to maintain a transaction token provided by your credit card processor instead of maintaining your customer's account information yourself (see the discussion in the [[Payment Security]]), you would simply create an arbitrary key to represent your custom response value and add the pair to the additionalFields map of the PaymentResponseItem instance.

