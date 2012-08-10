Content coming soon **Work In Progress**

##Introduction

Broadleaf provides two different shipping fee calculation strategies out-of-the-box: fixed-fee and banded by price or weight. Also, Broadleaf provides the flexibility to integrate a third-party shipping module (for example, UPS).  In this tutorial, we will implement shipping calculation for Acme Co by banded price.

## Prerequisites 

Understanding of Broadleaf orders, fulfillment groups, etc.

## Requirements

Acme Co requires three different shipping speeds (First Class, Priority, and Express) as well as a pricing for that speed based on the total amount of the fulfillment group.


The following table represents the shipping requirements for Acme Co:

| Shipping Speed         | Banded Price Range | Price |   
| :----------            | :-------           | :---- |
| First Class (2-7 days) | $0 - $50           | $4.99 |
| First Class (2-7 days) | $50 - $100         | $6.99 |
| First Class (2-7 days) | $100 +             | $8.99 |
| Priority (2-5 days)    | $0 - $50           | $5.99 |
| Priority (2-5 days)    | $50 - $100         | $7.99 |
| Priority (2-5 days)    | $100 +             | $9.99 |
| Express (1-2 days)     | $0 - $50           | $7.99 |
| Express (1-2 days)     | $50 - $100         | $10.99 |
| Express (1-2 days)     | $100.01 +          | $12.99 |

##