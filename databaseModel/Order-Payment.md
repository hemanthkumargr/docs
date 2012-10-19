###Detailed ERD

![Order Payment](images/dataModel/OrderPaymentDetailedERD.png)

###Tables

| Table                        | Java Docs | Description                                         |
|:-----------------------------|:----------|:----------------------------------------------------|
|BLC_AMOUNT_ITEM               | link      | Contains item information for items in a payment  |
|BLC_BANK_ACCOUNT_PAYMENT      | link      | Contains data about a bank account used for payment  |
|BLC_GIFT_CARD_PAYMENT         | link      | Contains data about a gift card used for payment  |
|BLC_CREDIT_CARD_PAYMENT       | link      | Contains information about a credit card used for payment  |
|BLC_ORDER_PAYMENT             | link      | Contains payment information for an order  |
|BLC_PAYINFO_ADDITIONAL_FIELDS | link      | Contains arbitrary payment data  |
|BLC_PAYMENT_ADDITIONAL_FIELDS | link      | Contains arbitrary payment data for the payment response  |
|BLC_PAYMENT_LOG               | link      | Contains summary information for a payment instance  |
|BLC_PAYMENT_RESPONSE_ITEM     | link      | Contains payment response information from payment gateway  |

###Related Tables

| Table                       | Java Docs	    | Description                                         |
|:----------------------------|:--------------|:----------------------------------------------------|
|BLC_ADDRESS  | link          | Contains address information, e.g. city, state, and postal code  |
|BLC_CUSTOMER | link          | Represents a customer in Broadleaf  |
|BLC_ORDER    | link          | Represents an order in Broadleaf  |
|BLC_PHONE    | link          | Represents a phone in Broadleaf  |
