Broadleaf provides two different shipping fee calculation strategies out-of-the-box: fixed-fee and banded by total fulfillment group retail price or weight. Also, Broadleaf provides the flexibility to integrate a third-party shipping module (for example, UPS).  

In this tutorial, we will implement a shipping calculation module for **Acme Co**. Specifically, we will utilize the banded price fulfillment option.

## Prerequisites 

- [[Shipping]]

## Acme Co Shipping Requirements

Our example company 'Acme Co' requires three different options for order fulfillment: First Class, Priority, and Express. First Class shipping is estimated to be shipped to the customer within 2-7 days, Priority in 2-5 days, and Express in 1-2 days. 

Pricing of each fulfillment option is also contingent on the sum of the price of the products in the fulfillment group. As Broadleaf allows for shipping to multiple addresses, think of a fulfillment group as a group of items to be sent to a particular address.

The following table represents the shipping option / price requirements for Acme Co:

| Shipping Speed         | Fulfillment Group Retail Price Range | Shipping Fee |    
| :----------            | :-------                             | :----------- |
| First Class (2-7 days) | $0 - $50                             | $4.99        |
| First Class (2-7 days) | $50 - $100                           | $6.99        |
| First Class (2-7 days) | $100 +                               | $8.99        |
| Priority (2-5 days)    | $0 - $50                             | $5.99        |
| Priority (2-5 days)    | $50 - $100                           | $7.99        |
| Priority (2-5 days)    | $100 +                               | $9.99        |
| Express (1-2 days)     | $0 - $50                             | $7.99        |
| Express (1-2 days)     | $50 - $100                           | $10.99       |
| Express (1-2 days)     | $100.01 +                            | $12.99       |

## Configuring Banded Shipping

As of Broadleaf 2.0, fulfillment options are configured by inserting the data directly into the database. This can be done by placing the following INSERT statements into one of the sql load scripts (e.g., `load_code_tables.sql`) or running these statements directly against the database. 

In future versions of Broadleaf, fulfillment options will be configurable via the Broadleaf Admin. 

To configure banded shipping we need to create Fulfillment Options and the Price Bands that will correspond to each option. 

### Fulfillment Options

The Fulfillment Options for Acme Co are 'First Class', 'Priority', and 'Express'. Information about the schema and properties of Fulfillment Options can be found in `FulfillmentOptionImpl` and `BandedPriceFulfillmentOptionImpl`.  We need to insert one record to correspond with each option in the table `BLC_FULFILLMENT_OPTION`:

```sql

INSERT INTO BLC_FULFILLMENT_OPTION (FULFILLMENT_OPTION_ID, NAME, LONG_DESCRIPTION, USE_FLAT_RATES, FULFILLMENT_TYPE) VALUES (1, 'First Class', '2 - 7 Days', 0, 'PHYSICAL');
INSERT INTO BLC_FULFILLMENT_OPTION (FULFILLMENT_OPTION_ID, NAME, LONG_DESCRIPTION, USE_FLAT_RATES, FULFILLMENT_TYPE) VALUES (2, 'Priority', '2 - 5 Days', 0, 'PHYSICAL');
INSERT INTO BLC_FULFILLMENT_OPTION (FULFILLMENT_OPTION_ID, NAME, LONG_DESCRIPTION, USE_FLAT_RATES, FULFILLMENT_TYPE) VALUES (3, 'Express', '1 - 2 Days', 0, 'PHYSICAL');

```

To declare a fulfillment option as a banded price fulfillment option, records must also be inserted in `BLC_FULFILLMENT_OPT_BANDED_PRC`:

``` sql

INSERT INTO BLC_FULFILLMENT_OPT_BANDED_PRC (FULFILLMENT_OPTION_ID) VALUES (1);
INSERT INTO BLC_FULFILLMENT_OPT_BANDED_PRC (FULFILLMENT_OPTION_ID) VALUES (2);
INSERT INTO BLC_FULFILLMENT_OPT_BANDED_PRC (FULFILLMENT_OPTION_ID) VALUES (3);

```

### Price Bands

Price Bands contain the following information (as seen in `FulfillmentPriceBandImpl`):
- `id`: the unique identifier of the band
- `resultAmount`: the price for the band
- `resultAmountType`: how the price is to be applied to the fulfillment group ('RATE' or 'PERCENTAGE')
- `retailPriceMinimumAmount`: the lowest price applicable to the band
- `fulfillmentOptionId`: the unique identifier of the fulfillment option the to which the band

To configure the price bands specified in the table above, run the following sql statements directly against the database:

``` sql

INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (1, 4.99, 'RATE', 0, 1);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (2, 6.99, 'RATE', 50.01, 1);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (3, 8.99, 'RATE', 100.01, 1);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (4, 5.99, 'RATE', 0, 2);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (5, 7.99, 'RATE', 50.01, 2);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (6, 9.99, 'RATE', 100.01, 2);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (7, 7.99, 'RATE', 0, 3);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (8, 10.99, 'RATE', 50.01, 3);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (9, 12.99, 'RATE', 100.01, 3);

```

## SQL

Below is an aggregation of all the sql commands needed to configure banded shipping by price for Acme Co.

``` sql
INSERT INTO BLC_FULFILLMENT_OPTION (FULFILLMENT_OPTION_ID, NAME, LONG_DESCRIPTION, USE_FLAT_RATES, FULFILLMENT_TYPE) VALUES (1, 'First Class', '2 - 7 Days', 0, 'PHYSICAL');
INSERT INTO BLC_FULFILLMENT_OPTION (FULFILLMENT_OPTION_ID, NAME, LONG_DESCRIPTION, USE_FLAT_RATES, FULFILLMENT_TYPE) VALUES (2, 'Priority', '2 - 5 Days', 0, 'PHYSICAL');
INSERT INTO BLC_FULFILLMENT_OPTION (FULFILLMENT_OPTION_ID, NAME, LONG_DESCRIPTION, USE_FLAT_RATES, FULFILLMENT_TYPE) VALUES (3, 'Express', '1 - 2 Days', 0, 'PHYSICAL');

INSERT INTO BLC_FULFILLMENT_OPT_BANDED_PRC (FULFILLMENT_OPTION_ID) VALUES (1);
INSERT INTO BLC_FULFILLMENT_OPT_BANDED_PRC (FULFILLMENT_OPTION_ID) VALUES (2);
INSERT INTO BLC_FULFILLMENT_OPT_BANDED_PRC (FULFILLMENT_OPTION_ID) VALUES (3);

INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (1, 4.99, 'RATE', 0, 1);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (2, 6.99, 'RATE', 50.01, 1);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (3, 8.99, 'RATE', 100.01, 1);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (4, 5.99, 'RATE', 0, 2);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (5, 7.99, 'RATE', 50.01, 2);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (6, 9.99, 'RATE', 100.01, 2);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (7, 7.99, 'RATE', 0, 3);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (8, 10.99, 'RATE', 50.01, 3);
INSERT INTO BLC_FULFILLMENT_PRICE_BAND (FULFILLMENT_PRICE_BAND_ID, RESULT_AMOUNT, RESULT_AMOUNT_TYPE, RETAIL_PRICE_MINIMUM_AMOUNT, FULFILLMENT_OPTION_ID) VALUES (9, 12.99, 'RATE', 100.01, 3);

```