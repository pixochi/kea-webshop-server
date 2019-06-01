SET LOCK_TIMEOUT 1800; 
SET DEADLOCK_PRIORITY LOW;

BEGIN TRANSACTION;
	DELETE FROM category;
	DBCC CHECKIDENT (category, RESEED, 0);

	INSERT INTO category(name) VALUES('Laptops');
	INSERT INTO category(name) VALUES('Desktops');
	INSERT INTO category(name) VALUES('Processors');
	INSERT INTO category(name) VALUES('Graphic Cards');
	INSERT INTO category(name) VALUES('Memory');
	INSERT INTO category(name) VALUES('Storage Devices');
	INSERT INTO category(name) VALUES('Motherboards');
	INSERT INTO category(name) VALUES('Power Supplies');
	INSERT INTO category(name) VALUES('Monitors');
	INSERT INTO category(name) VALUES('Keyboards');
	INSERT INTO category(name) VALUES('Mice');
	INSERT INTO category(name) VALUES('Headphones');
	INSERT INTO category(name) VALUES('Speakers');
	INSERT INTO category(name) VALUES('Printers');
	INSERT INTO category(name) VALUES('Routers');
	INSERT INTO category(name) VALUES('Projectors');
	INSERT INTO category(name) VALUES('TVs');
	INSERT INTO category(name) VALUES('DVD Players');
	INSERT INTO category(name) VALUES('Video Game Consoles');
	INSERT INTO category(name) VALUES('Radios');
	INSERT INTO category(name) VALUES('Mobile Phones');
	INSERT INTO category(name) VALUES('Tablets');
	INSERT INTO category(name) VALUES('Cameras');
	INSERT INTO category(name) VALUES('Refrigerators');
	INSERT INTO category(name) VALUES('Ovens');
	INSERT INTO category(name) VALUES('Washers');
	INSERT INTO category(name) VALUES('Dishwashers');
	INSERT INTO category(name) VALUES('Coffee Makers');
	INSERT INTO category(name) VALUES('Kettles');
	INSERT INTO category(name) VALUES('Vacuum Cleaners');

	SELECT * FROM category;
COMMIT;