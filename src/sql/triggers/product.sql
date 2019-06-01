IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[decreaseProductAmountOnOrder]'))
DROP TRIGGER decreaseProductAmountOnOrder;

GO

CREATE TRIGGER decreaseProductAmountOnOrder  
ON dbo.order_item
FOR INSERT
AS
DECLARE @OrderItemAmount INT,
	   @ProductId INT;

SELECT @ProductId = ins.productId FROM INSERTED ins;
SELECT @OrderItemAmount = ins.amount FROM INSERTED ins;

SELECT 'country' AS country FROM dbo.order_item
    LEFT JOIN dbo.[order]
    ON dbo.order_item.orderId = dbo.[order].id;

BEGIN
       UPDATE dbo."product_registry"
       SET "amount" = "amount" - @OrderItemAmount
       WHERE "country" = country AND "productId" = @ProductId
END