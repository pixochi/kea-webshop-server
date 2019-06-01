-- A view combining the product_registry and product tables to display the
-- product name in the registry

CREATE VIEW registry_with_product AS
SELECT product.name, product_registry.amount, product_registry.country
FROM product_registry
LEFT JOIN product
ON product_registry.productId = product.id