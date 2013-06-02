

###Detailed ERD

[![Catalog Reviews Detail](dataModel/CatalogReviewsDetailedERD.png)](_img/dataModel/CatalogReviewsDetailedERD.png)

###Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_REVIEW_DETAIL    | [ReviewDetail.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/rating/domain/ReviewDetail.html)          | Represents a review.  |
|BLC_REVIEW_FEEDBACK  | [ReviewFeedback.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/rating/domain/ReviewFeedback.html)          | Represents a the feedback for a review.  |
|BLC_RATING_DETAIL    | [RatingDetail.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/rating/domain/RatingDetail.html)          | Represents the detail of a rating.  |
|BLC_RATING_SUMMARY   | [RatingSummary.java](http://javadoc.broadleafcommerce.org/current/framework/org/broadleafcommerce/core/rating/domain/RatingSummary.html)          | Represents the summary of a rating.  |



###Related Tables

| Table               | Related Entity    | Description                                         |
|:--------------------|:------------------|:----------------------------------------------------|
|BLC_CUSTOMER         | [Customer.java](http://javadoc.broadleafcommerce.org/current/profile/org/broadleafcommerce/profile/core/domain/Customer.html)          | Represents a customer in Broadleaf Commerce.  |