IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[updateOldPassword]'))
DROP TRIGGER updateOldPassword;

GO
CREATE TRIGGER updateOldPassword
ON dbo.[user]
FOR UPDATE
AS
DECLARE @UserId INT,
    @CurrentPassword VARCHAR(128);

  SELECT @UserId = ins.id FROM INSERTED ins;

  SELECT @CurrentPassword = d.[password]
  FROM DELETED as d
  WHERE id = @UserId;

BEGIN
  UPDATE dbo.[user]
  SET previousPassword = @CurrentPassword
  WHERE id = 10
END
