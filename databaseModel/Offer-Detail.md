

###Detailed ERD

![Offer Detail](images/dataModel/OfferDetailedERD.png)

###Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_OFFER            | link          | Represents an Offer in Broadleaf.  |
|BLC_OFFER_CODE       | link          | Represents an Offer Code.  |
|BLC_OFFER_AUDIT      | link          | Represents an Offer Audit.  |
|BLC_OFFER_CANDIDATE_FG_OFFER| link   | Represents an Offer candidate.  |
|BLC_CANDIDATE_ITEM_OFFER    | link   | Represents an Offer Item candidate.  |
|BLC_CANDIDATE_ORDER_OFFER   | link   | Represents an Offer Order candidate.  |
|BLC_ADDITIONAL_OFFER_INFO   | link   | Represents additional information for an Offer.  |
|BLC_OFFER_INFO       | link          | Links to the Offer Info fields.  |
|BLC_OFFER_INFO_FIELDS| link          | Represents an Offer Info fields.  |
|BLC_OFFER_RULE       | link          | Represents a rule to be applied to an Offer.  |
|BLC_OFFER_RULE_MAP   | link          | Maps an Offer to a Rule.  |
|BLC_OFFER_ITEM_CRITERIA | link       | Represents an Offer item criteria.  |
|BLC_QUAL_CRIT_OFFER_XREF| link       | Cross reference table that points to an Offer item criteria.  |
|BLC_TAR_CRIT_OFFER_XREF | link       | Cross reference table that points to an Offer target item criteria.  |


###Related Tables

| Table               | Java Docs	   | Description                                         |
|:--------------------|:--------------|:----------------------------------------------------|
|BLC_FULFILLMENT_GROUP| link          | Holds fulfillment information about an order.  |
|BLC_ORDER_ITEM       | link          | An abstract representation of an item on an order.  |
|BLC_ORDER            | link          | Represents an order in Broadleaf.  |