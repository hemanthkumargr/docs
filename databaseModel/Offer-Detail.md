

###Detailed ERD

[![Offer Detail](images/dataModel/OfferDetailedERD.png)](images/dataModel/OfferDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_OFFER            | [Offer.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/Offer.html)          | Represents an Offer in Broadleaf.  |
|BLC_OFFER_CODE       | [OfferCode.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/OfferCode.html)          | Represents an Offer Code.  |
|BLC_OFFER_AUDIT      | [OfferAudit.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/OfferAudit.html)          | Represents an Offer Audit.  |
|BLC_OFFER_CANDIDATE_FG_OFFER| [CandidateFulfillmentGroupOffer.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/CandidateFulfillmentGroupOffer.html)   | Represents an Offer candidate.  |
|BLC_CANDIDATE_ITEM_OFFER    | [CandidateItemOffer.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/CandidateItemOffer.html)   | Represents an Offer Item candidate.  |
|BLC_CANDIDATE_ORDER_OFFER   | [CandidateOrderOffer.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/CandidateOrderOffer.html)   | Represents an Offer Order candidate.  |
|BLC_ADDITIONAL_OFFER_INFO   | -   | Represents additional information for an Offer.  |
|BLC_OFFER_INFO       | [OfferInfo.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/OfferInfo.html)          | Links to the Offer Info fields.  |
|BLC_OFFER_INFO_FIELDS| -          | Represents an Offer Info fields.  |
|BLC_OFFER_RULE       | [OfferRule](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/OfferRule.html)          | Represents a rule to be applied to an Offer.  |
|BLC_OFFER_RULE_MAP   | -          | Maps an Offer to a Rule.  |
|BLC_OFFER_ITEM_CRITERIA | [OfferItemCriteria.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/OfferItemCriteria.html)       | Represents an Offer item criteria.  |
|BLC_QUAL_CRIT_OFFER_XREF| [CriteriaOfferXref.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/offer/domain/CriteriaOfferXref.html)       | Cross reference table that points to an Offer item criteria.  |
|BLC_TAR_CRIT_OFFER_XREF | -       | Cross reference table that points to an Offer target item criteria.  |


###Related Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_FULFILLMENT_GROUP| [FulfillmentGroup.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/FulfillmentGroup.html)          | Holds fulfillment information about an order.  |
|BLC_ORDER_ITEM       | [OrderItem.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/OrderItem.html)          | An abstract representation of an item on an order.  |
|BLC_ORDER            | [Order.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/order/domain/Order.html)      | Represents an order in Broadleaf  |