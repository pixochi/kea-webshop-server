CREATE VIEW product_with_registry AS
SELECT product.name, product.price, product_registry.amount AS amount
FROM product
LEFT JOIN product_registry
ON product.id = product_registry.productId