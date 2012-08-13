The Java `Double` (or `Float`) classes are not suitable for representing money in an accurate way. One of the simplest ways to describe this problem is with a short code snippet:

```java
public class DoubleTest {
    public static void main(String args[]) {
        Double num = 1.2 - 1.1;
        System.out.println(num);
    }
}
```

Run this code and we get...

    0.09999999999999987

Well that's certainly not what we would expect from a mathematical point of view. However, due to the way floating point numbers work, we don't always have absolute precision, especially when addition and subtraction come into the picture. 

Always use the Broadleaf class `Money`, which is a wrapper on top of `BigDecimal` to represent finances. Also, be sure to instantiate the class like this:

```java
new Money("1.1");
```

and not like this:

```
new Money(1.1);
```

because that's still creating a double literal before going to the Money object, which already implies a loss of precision.

## A 'Gotcha' on Equals
Since `Money` is really just a wrapper for Java's `BigDecimal`, `Money`'s `equals` method internally calls the `equals` method on `BigDecimal`.  The gotcha here is that the `equals` method on `BigDecimal` compares both value _and_ scale.  This allows for the following interesting results:

```java
assert(BigDecimal.ZERO.equals(new Money(new BigDecimal("0.0")).getAmount()) == false);
```

This especially comes into play when comparing values obtained from entities, since `BigDecimal` columns (like `retailPrice` and `salePrice` on `Sku`) are annotated like this:

```java
    @Column(name = "RETAIL_PRICE", precision=19, scale=5)
    protected BigDecimal retailPrice;

    @Column(name = "SALE_PRICE", precision=19, scale=5)
    protected BigDecimal salePrice;
```

So if you were ever trying to see if the salePrice or retailPrice was zero, `BigDecimal.ZERO.equals(sku.getSalePrice().getAmount())` will _always_ be false since the database enforces a scale of 5, and the `BigDecimal.ZERO` constant has a scale of 0.

To get around this, you can use the `compareTo` method which ignores precision.
```java
Sku sku = new SkuImpl();
sku.setRetailPrice(new Money(BigDecimal.ZERO);
sku = catalogService.saveSku(sku);

//assume that the changes have been completely persisted and the EntityManager flushed

Sku dbSku = catalogService.findSkuById(sku.getId());
assert(dbSku.getRetailPrice().toString().equals("0.00000"));
assert(BigDecimal.ZERO.equals(sku.getSalePrice().getAmount()) == false);
assert(BigDecimal.ZERO.compareTo(sku.getSalePrice().getAmount()) == 0);
```