## Prerequisites

- Users must establish their own account with CyberSource in order to use the BroadleafCommerce CyberSource payment functionality (https://apps.cybersource.com/cgi-bin/register/reg_form.pl). 
Note, this is only a test account - you will need to contact a CyberSource sales representative to set up a real merchant account.
- Familiarize yourself with the CyberSource Silent Order Post (http://www.cybersource.com/developers/develop/integration_methods/silent_order_post/). 
BroadleafCommerce takes care of all the heavy lifting here, but it doesn't hurt to have the documentation that describes the process of how everything works should you need to reference them in the future.
-  You should have HOP/SOP (Hosted Order Page/Silent Order Post) functionality enabled in your CyberSource Business Center. If you do not see the Hosted Order Page Settings and Security links under the Tools & Settings tab, you will need to contact a CyberSource representative to get that feature enabled.


Start by logging into your CyberSource Business Center (https://ebctest.cybersource.com/ebctest/login/Login.do).
> Note: make sure you are logging into the appropriate version of the Business Center (Live vs. Test) when modifying your settings

1. Navigate to Tools & Settings > Hosted Order Page > Security
![CyberSource Business Center](images/payment-cybersource-business-center-1.png)
2. Generate a JSP Security Script (It should prompt you to download the file HOP.jsp)
3. Open the file HOP.jsp and note the following values (We will use these later): merchantId, sharedSecret, and serialNumber
4. Next, Navigate to Tools & Settings > Hosted Order Page > Settings
5. On the Hosted Order Page Settings, select which Credit Cards you would like to accept.
![CyberSource Business Center](images/payment-cybersource-business-center-2.png)
6. Near the end of this page, configure the Receipt Page and the Decline Page. Make sure to check the "This URL is my custom receipt/decline page." checkbox. CyberSource redirects the customer to these pages after evaluating the transaction (e.g. http://localhost:8080/cybersource/success or http://localhost:8080/cybersource/decline)
![CyberSource Business Center](images/payment-cybersource-business-center-3.png)
7. Finalize your changes and click Update

Once you have established an account with CyberSource and configured your settings in the Business Center, 
begin by including the CyberSource Module dependency to your Broadleaf application's pom.xml.

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-cybersource-silentpost</artifactId>
    <version>${blc.cybersource.version}</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```
Make sure to include the dependency in your site pom.xml as well:

```xml
<dependency>
    <groupId>com.broadleafcommerce</groupId>
    <artifactId>broadleaf-cybersource-silentpost</artifactId>
</dependency>
```

You should now begin to setup your environment to work with Broadleaf Commerce CyberSource Silent Post support. 
The first step is to make Broadleaf Commerce aware of your CyberSource account credentials. 
This is accomplished through environment configuration (see [[Runtime Environment Configuration]]).

Broadleaf allows you to create your own property files per environment (e.g. common.properties, local.properties, development.properties, integrationdev.properties, integrationqa.properties, staging.properties, and production.properties) 
You will need to enter the following key/value pairs (obtained from HOP.jsp) in the appropriate locations:

### common.properties
    cybersource.silentpost.sharedSecret=?
    cybersource.silentpost.serialNumber=?
    cybersource.silentpost.merchantId=?
    cybersource.silentpost.validCardTypes=001,002,003,004
    cybersource.silentpost.validDecisionCodes=ACCEPT,REVIEW,PARTIAL
    
- cybersource.silentpost.validCardTypes : a comma separated list of accepted credit cards that were configured in your Business Center.
The codes are mapped in the class `CybersourceCreditCardTypeEnum` and can also be found below:
    - 001: Visa
    - 002: MasterCard
    - 003: American Express
    - 004: Discover
    - 005: Diners Club
    - 006: Carte Blanche
    - 007: JCB
    - 014: EnRoute
    - 021: JAL
    - 024: Maestro (UK Domestic)
    - 031: Delta
    - 033: Visa Electron
    - 034: Dankort
    - 035: Laser
    - 036: Carte Bleue
    - 037: Carta Si
    - 039: Encoded account number
    - 040: UATP
    - 042: Maestro (International)
    - 043: GE Money UK card
- cybersource.silentpost.validDecisionCodes : a comma separated list of decision codes. 
When CyberSource sends back a decision code located in this list, Broadleaf will consider it a successful transaction. 
If not, the Payment Response will be logged and the Checkout Workflow will be halted. 

### development.properties, local.properties etc...
    cybersource.silentpost.server.url=https://orderpagetest.ic3.com/hop/ProcessOrder.do

> Quick Tip: When testing, you can change the url to "https://orderpagetest.ic3.com/hop/CheckOrderData.do" 
to see a CyberSource page to check if the passed in parameters are valid. 

### production.properties
    cybersource.silentpost.server.url=https://orderpage.ic3.com/hop/ProcessOrder.do
    
Now that you have your environment set up, let's begin setting up the [[CyberSource Silent Post Module]].