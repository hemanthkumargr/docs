**NEEDS JEFF REVIEW** (Edited for 1.7 by Andre)

In this tutorial, we will walk through adding a new payment type to support employee payroll deduction as a method of payment. We will assume that you are familiar with [[service extension|Extending Services]] and [[entity extension|Extending Entities]].

## PaymentInfo

First, we will need to support a new Referenced implementation if we plan on storing account information for this payment type and:

- the information must be kept secure
- or, the information required to represent the account is more complicated than a simple account number

Please read the [[Payment Security]] section for more information on ensuring data is secure.

or this example, we will assume that employee account information passes this litmus test for creating a Referenced implementation. First, we'll create a custom interface that extends Referenced and defines our additional custom fields.

```java
public interface EmployeePaymentInfo extends Referenced {

    public String getEmployeeId();

    public void setEmployeeId(String employeeId);

    public String getPin();

    public void setPin(String pin);

}
```

Next, we need to create our implementation of `EmployeePaymentInfo`, which yields a new entity (since this is persisted information).

```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "MY_EMPLOYEE_PAYMENT")
public class EmployeePaymentInfoImpl implements EmployeePaymentInfo {

    private static final long serialVersionUID = 1L;

    @Transient
    protected EncryptionModule encryptionModule;

    @Id
    @GeneratedValue(generator = "EmployeePaymentId", strategy = GenerationType.TABLE)
    @TableGenerator(name = "EmployeePaymentId", table = "SEQUENCE_GENERATOR", pkColumnName = "ID_NAME", valueColumnName = "ID_VAL", pkColumnValue = "EmployeePaymentInfoImpl", allocationSize = 50)
    @Column(name = "PAYMENT_ID")
    protected Long id;

    @Column(name = "REFERENCE_NUMBER", nullable=false)
    @Index(name="EMPLOYEE_INDEX", columnNames={"REFERENCE_NUMBER"})
    protected String referenceNumber;

    @Column(name = "PIN", nullable=false)
    protected String pin;

    @Column(name = "EMPLOYEE_ID", nullable=false)
    protected String employeeId;


    public String getPin() {
        return encryptionModule.decrypt(pin);
    }

    public void setPin(String pin) {
        this.pin = encryptionModule.encrypt(pin);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getPin() {
        return encryptionModule.decrypt(pin);
    }

    public void setPin(String pin) {
        this.pin = encryptionModule.encrypt(pin);
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this. employeeId = employeeId;
    }

    public EncryptionModule getEncryptionModule() {
        return encryptionModule;
    }

    public void setEncryptionModule(EncryptionModule encryptionModule) {
        this.encryptionModule = encryptionModule;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((employeeId == null) ? 0 : employeeId.hashCode());
        result = prime * result + ((pin == null) ? 0 : pin.hashCode());
        result = prime * result + ((referenceNumber == null) ? 0 : referenceNumber.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        EmployeePaymentInfoImpl other = (EmployeePaymentInfoImpl) obj;

        if (id != null && other.id != null) {
            return id.equals(other.id);
        }

        if (employeeId == null) {
            if (other. employeeId h != null)
                return false;
        } else if (! employeeId.equals(other.employeeId))
            return false;
        if (pin == null) {
            if (other.pin != null)
                return false;
        } else if (!pin.equals(other.pin))
            return false;
        return true;
    }

}
```

Of course, a new table in the secure database (see [[Data and Service Models]]) entitled `MY_EMPLOYEE_PAYMENT` should be available to back this entity. The `id` and `referenceNumber` fields are managed by Broadleaf Commerce. The `pin` and `employeeId` fields are your custom fields and we'll talk more about where you manage them later. The `encryptionModule` field is discussed in the "Securing Account Information" section later. The next step is to create a new PaymentInfoType to support the employee payment type.

```java
public class MyPaymentInfoType extends PaymentInfoType {

private static final long serialVersionUID = 1L;

    public static MyPaymentInfoType EMPLOYEE = new MyPaymentInfoType("EMPLOYEE");

    public MyPaymentInfoType(String type) {
        super(type);
    }

    public MyPaymentInfoType() {
        //do nothing
    }

}
```

Your payment info type must extend PaymentInfoType so that Broadleaf Commerce can properly recognize it as a valid payment type. Here, we've simply added one new PaymentInfoType of "EMPLOYEE". Next, we must create a module to actually process our employee payment.

```java
public class EmployeePaymentModule extends DefaultModule {

    @Override
    public PaymentResponseItem debit(PaymentContext paymentContext) throws PaymentException {
        //TODO Do something to charge the employee for the purchase.
        return null;
    }

    @Override
    public Boolean isValidCandidate(PaymentInfoType paymentType) {
        if (MyPaymentInfoType.EMPLOYEE.equals(paymentType)) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

}
```

For employee purchase, we only care about supporting the debit method of the PaymentModule, so it's easiest to override the debit method from DefaultModule. In your debit implementation, perform whatever tasks are necessary to charge the employee for the purchase. This could be as simple as making a database entry which a separate batch process reads at a later time to perform a payroll deduction or making a web service call of some sort. Whatever fits your circumstance - the choice is yours.

Finally, we need to configure Broadleaf Commerce to recognize our new payment option so it's included in the payment workflow. We'll pretend we're adding it to our application context for the debit workflow from our previous example.

```xml
<bean id="myEmployeePaymentModule" class="com.mycompany.payment.service.module.EmployeePaymentModule"/>

<bean id="myEmployeePaymentService" class="org.broadleafcommerce.core.payment.service.PaymentServiceImpl">
    <property name="paymentModule" ref="myEmployeePaymentModule"/>
</bean>

<bean id="myDebitWorkflow" class="org.broadleafcommerce.core.workflow.SequenceProcessor">
    <property name="processContextFactory">
        <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentProcessContextFactory">
            <property name="paymentActionType" value="DEBIT"/>
        </bean>
    </property>
    <property name="activities">
        <list>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="blCreditCardService"/>
                <property name="userName" value="web"/>
            </bean>
            <bean class="org.broadleafcommerce.core.payment.service.workflow.PaymentActivity">
                <property name="paymentService" ref="myEmployeePaymentService"/>
                <property name="userName" value="web"/>
            </bean>
        </list>
    </property>
    <property name="defaultErrorHandler" ref="blDefaultErrorHandler"/>
</bean>
```

We've now defined the module for Broadleaf Commerce, wrapped it with a payment service and included it in the standard debit payment workflow. Now, during checkout, Broadleaf Commerce will use our new module for any PaymentInfo instances associated with the order whose PaymentInfoType is "EMPLOYEE". Note, while the new payment service is included in the regular payment workflow used by Broadleaf Commerce during checkout, this service is directly available to all of your code like any other Broadleaf Commerce service. Simply inject the service into your own beans to acquire payment transaction functionality outside of the checkout workflow.

## Managing Custom Payment Type Data

Recall the earlier discussion regarding the custom employee payment type. Remember that we utilized a custom Referenced implementation. To be able to persist this employee account information, we'll need to add support to the SecurePaymentInfoService and SecurePaymentInfoDao. The first thing to do is extend the SecurePaymentInfoDao interface to support our custom payment.

```java
public interface MySecurePaymentInfoDao extends SecurePaymentInfoDao {

    public EmployeePaymentInfo findEmployeeInfo(String referenceNumber);

    public EmployeePaymentInfo createEmployeePaymentInfo();

}
```

Now, let's extend the `SecurePaymentInfoDaoImpl` to implement the find and create functionality for our custom payment.

```
public class MySecurePaymentInfoDaoImpl extends SecurePaymentInfoDaoImpl implements MySecurePaymentInfoDao {

    public EmployeePaymentInfo createEmployeePaymentInfo() {
    EmployeePaymentInfo response = (EmployeePaymentInfo) entityConfiguration.createEntityInstance("com.mycompany.payment.domain.EmployeePaymentInfo");
        response.setEncryptionModule(encryptionModule);
        return response;
    }

    @SuppressWarnings("unchecked")
    public EmployeePaymentInfo findEmployeeInfo(String referenceNumber) {
        Query query = em.createQuery("SELECT employeePayment FROM com.mycompany.payment.domain.EmployeePaymentInfo employeePayment WHERE employeePayment.referenceNumber = :referenceNumber");
        query.setParameter("referenceNumber", referenceNumber);
        List<EmployeePaymentInfo> infos = query.getResultList();
        EmployeePaymentInfo response = (infos == null || infos.size() == 0) ? null : infos.get(0);
        if (response != null) {
            response.setEncryptionModule(encryptionModule);
        }
        return response;
    }

}
```

For the `createEmployeePaymentInfo` method, we use the EntityConfiguration instance to create an instance of our entity. Then when add the encryption module supplied by the superclass. To be able to use the EntityConfiguration instance, we must have configuration supplied for the entity in our application context. Here's an example to support our EmployeePaymentInfo entity.

```xml
<bean id="com.mycompany.payment.domain.EmployeePaymentInfo" class="com.mycompany.payment.domain.EmployeePaymentInfoImpl" scope="prototype"/>
```

We also need to notify Broadleaf Commerce to use our custom dao, instead of its default, internal one. We accomplish this by setting an instance of our dao to the key id `blSecurePaymentInfoDao` in our application context.

```xml
<bean id="blSecurePaymentInfoDao" class="com.mycompany.payment.dao.MySecurePaymentInfoDaoImpl"/>
```

Next, let's extend the SecurePaymentInfoServiceImpl to support our custom payment.

```java
public class MySecurePaymentInfoServiceImpl extends SecurePaymentInfoServiceImpl {

    @Override
    public Referenced create(PaymentInfoType paymentInfoType) {
        if (MyPaymentInfoType.EMPLOYEE.equals(paymentInfoType)) {
            return ((MySecurePaymentInfoDao) securePaymentInfoDao).createEmployeePaymentInfo();
        }
        return super.create(paymentInfoType);
    }

    @Override
    public Referenced findSecurePaymentInfo(String referenceNumber, PaymentInfoType paymentInfoType) throws WorkflowException {
        if (MyPaymentInfoType.EMPLOYEE.equals(paymentInfoType)) {
            return ((MySecurePaymentInfoDao) securePaymentInfoDao).findEmployeeInfo(referenceNumber);
        }
        return super.findSecurePaymentInfo(referenceNumber, paymentInfoType);
    }

}
```

Finally, we need to add configuration to our application context to notify Broadleaf Commerce to use our custom secure payment service implementation instead of its default internal one. We accomplish this by assigning the key id "blSecurePaymentInfoService" to an instance of our custom secure payment service.

```xml
<bean id="blSecurePaymentInfoService" class="com.mycompany.payment.service.MySecurePaymentInfoServiceImpl"/>
```
