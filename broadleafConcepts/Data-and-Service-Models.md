## <a name="wiki-entities" />Main Entities

### Product
This is the entity that the catalog revolves around and is used for browsing and searching. Product does not have any pricing information associated with it directly, but is available to the Product from its one-to-one relationship with a Sku (its "default Sku"). This one-to-one relationship is a required relationship and Products cannot exist in the system without a link to a Sku.

### Sku
This entity has pricing information associated with it and is sold and added to the cart. One way to think about a Sku is that a Sku is a particular concrete representation of a Product. Because of this "concrete representation",  Sku has name, description, size, etc. Each Product needs at least 1 concrete representation of itself which is why there is a required relationship between Product and its default Sku.

You can also have multiple concrete representations of a Product. Take an example of selling T-shirts. You might be selling a T-shirt with a certain picture on it; let's say that's a dog shirt. When you initially create the dog shirt, you will give the default Sku a particular name, price, etc. However, you offer want to offer this dog shirt in a variety of colors (we'll say "blue", "yellow", "green") as well as a variety of sizes ("small", "medium" and "large"). This would be represented by 9 additional Skus (a blue small dog shirt, a yellow small dog shirt, a green small dog shirt, etc) which are related by ProductOptions and ProductOptionValues. A ProductOption in this example would be "Color" and "Size" whereas the ProductOptionValues would be "blue", "yellow", "green", etc. In this specific example, a Product would then have 10 Skus related to it: 1 Sku that represents the default Sku (which is always required) and 9 other Skus represented by various sets of ProductOptionValues. This would allow you to have specific pricing (a blue XL dog shirt could be $2.00 more) and inventory constraints around each combination.

A Sku can also be a member of many ProductBundles, which is a subclass of Product. This relationship is achieved indirectly via SkuBundleItem where you can optionally set a discounted price for selling the Sku as a part of the bundle, as well as a quantity for how many of that Sku you are offering in the bundle.

Learn about [[Extending Entities]]

## <a name="wiki-services" />Main Services




Learn about [[Extending Services]]
