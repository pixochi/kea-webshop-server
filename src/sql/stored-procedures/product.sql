USE schooldb;  
GO  
  CREATE PROCEDURE getAllProducts
  AS   
      SELECT *  
      FROM dbo.product;
GO

USE schooldb;  
GO  
  CREATE PROCEDURE getProductById
    @ProductId nvarchar(256)
  AS   
      SELECT *  
      FROM dbo.product
      WHERE id = @ProductId;
GO