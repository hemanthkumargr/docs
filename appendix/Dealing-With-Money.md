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
