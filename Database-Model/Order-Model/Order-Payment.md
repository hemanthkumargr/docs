###Detailed ERD

[![Order Payment](dataModel/OrderPaymentDetailedERD.png)](_img/dataModel/OrderPaymentDetailedERD.png)

###Tables

| Table                        | Related Entity | Description                                         |
|:-----------------------------|:----------|:----------------------------------------------------|
|BLC_AMOUNT_ITEM               | [AmountItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/payment/domain/AmountItem.html)      | Contains item information for items in a payment  |
|BLC_BANK_ACCOUNT_PAYMENT      | [BankAccountPaymentInfo.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/payment/domain/BankAccountPaymentInfo.html)      | Contains data about a bank account used for payment  |
|BLC_GIFT_CARD_PAYMENT         | [GiftCardPaymentInfo.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/payment/domain/GiftCardPaymentInfo.html)      | Contains data about a gift card used for payment  |
|BLC_CREDIT_CARD_PAYMENT       | [CreditCardPaymentInfo.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/payment/domain/CreditCardPaymentInfo.html)      | Contains information about a credit card used for payment  |
|BLC_ORDER_PAYMENT             | [PaymentInfo.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/payment/domain/PaymentInfo.html)      | Contains payment information for an order  |
|BLC_PAYINFO_ADDITIONAL_FIELDS | n/a      | Contains arbitrary payment data  |
|BLC_PAYMENT_ADDITIONAL_FIELDS | n/a      | Contains arbitrary payment data for the payment response  |
|BLC_PAYMENT_LOG               | [PaymentLog.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/payment/domain/PaymentLog.html)      | Contains summary information for a payment instance  |
|BLC_PAYMENT_RESPONSE_ITEM     | [PaymentResponseItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/payment/domain/PaymentResponseItem.html)      | Contains payment response information from payment gateway  |

###Related Tables

| Table       | Related Entity   | Description                                         |
|:------------|:-----------------|:----------------------------------------------------|
|BLC_ADDRESS  | [Address.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Address.html)          | Contains address information, e.g. city, state, and postal code  |
|BLC_CUSTOMER | [Customer.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Customer.html)          | Represents a customer in Broadleaf  |
|BLC_ORDER    | [Order.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/Order.html)          | Represents an order in Broadleaf  |
|BLC_PHONE    | [Phone.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Phone.html)          | Represents a phone in Broadleaf  |
