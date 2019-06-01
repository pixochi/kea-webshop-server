CREATE VIEW product_with_category AS
SELECT product.name, category.name AS category, product.price, product.description, product.image, product.rating
FROM product
LEFT JOIN category
ON product.categoryId = category.id