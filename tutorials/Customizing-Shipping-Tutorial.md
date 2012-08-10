Content coming soon **Work In Progress**

##Introduction

Broadleaf provides two different shipping fee calculation strategies out-of-the-box: fixed-fee and banded by price or weight. Also, Broadleaf provides the flexibility to integrate a third-party shipping module (for example, UPS).  In this tutorial, we will implement shipping calculation by banded price.

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