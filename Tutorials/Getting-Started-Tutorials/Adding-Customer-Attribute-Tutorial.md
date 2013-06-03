# Adding Customer Attribute Tutorial

In this tutorial, we will walk through the two different ways you can keep track of personalized attributes for your customers. We will demonstrate the easy way of simply storing the attributes in the `customerAttributes` object and the slightly more customized (but still easy) way of extending the Broadleaf `CustomerImpl` class. Also, please note that while we're going through extending a Customer in this tutorial, the same patterns apply for all Broadleaf provided objects.

# Using the provided CustomerAttributes object

If you're only wanting to save off simple String values to be referenced later, the easiest way is to use the `CustomerAttributes`. This is exactly what we'll do to store a referral code on our Customer.

First, we need to modify the UI to pass in a referral code to our controller. We'll do that by extending the `RegisterCustomerForm` to carry our referral code along.

```java
public class HCRegisterCustomerForm extends RegisterCustomerForm {
    
    public String referralCode;

    public String getReferralCode() {
        return referralCode;
    }

    public void setReferralCode(String referralCode) {
        this.referralCode = referralCode;
    }
    
}
```

Then, we need to modify `RegisterController` to initialize our extended form. If we look at the source of the parent `BroadleafRegisterController`, we can see that it initializes a `RegisterCustomerForm` and simply sets the customer object. Therefore, we can utilize the super method and just modify it slightly:

```java
    @ModelAttribute("registrationForm")
    public HCRegisterCustomerForm initCustomerRegistrationForm() {
        RegisterCustomerForm superForm = super.initCustomerRegistrationForm();      
        
        HCRegisterCustomerForm form = new HCRegisterCustomerForm();
        form.setCustomer(superForm.getCustomer());
        return form;
    }
```

Then, we can add the new field to `ajax/register.html`, right below the confirm password field:

```html
<div class="form50">
  <label for="referralCode">
    Referral Code
  </label>
  <input type="text" th:field="*{referralCode}" class="field50" />
</div>          
```

> Note: We are not attaching any validation to this field. It is completely optional for the sake of this tutorial.

At this, point, when you click on Register, you should see your additional field:

![Referral Code field](referral-code-tutorial-1.png)

All that's left is to save our referral code into our customer. We want to do this if the registration was successful. So, in `RegisterController`, we want to modify the `processRegister` method to look like this:

```java
String url = super.processRegister(registerCustomerForm, errors, request, response, model);
    if (url.equals(getRegisterSuccessView())) {
        // Grab the current customer from the request
        Customer newCustomer = CustomerState.getCustomer();

        // Create the referralCode CustomerAttribute
        CustomerAttribute referralCodeAttr = new CustomerAttributeImpl();
        referralCodeAttr.setName("referralCode");
        referralCodeAttr.setValue(registerCustomerForm.getReferralCode());
        referralCodeAttr.setCustomer(newCustomer);
        
        // Update our customer object
        newCustomer.getCustomerAttributes().add(referralCodeAttr);
        newCustomer = customerService.saveCustomer(newCustomer);

        // Place the new customer onto the request
        CustomerState.setCustomer(newCustomer);
    }
return url;
```

It's as easy as that!
