-- A role is a group that has a set of permissions inside the database.
-- Users can be added to a specific role to gain its privileges.
-- A user can be a member of multiple roles.

USE schooldb;

-- FIXED DATABASE ROLES
-- Roles built-in inside SQL Server

-- Members of the db_owner fixed database role can perform all configuration 
-- and maintenance activities on the database, and can also drop the database 
-- in SQL Server.
ALTER ROLE db_owner ADD MEMBER marcin;


-- Members of the db_ddladmin fixed database role can run any Data Definition 
-- Language (DDL) command in a database.
ALTER ROLE db_ddladmin ADD MEMBER gosia;

-- Members of the db_datareader fixed database role can read all data from all
-- user tables.
ALTER ROLE db_datareader ADD MEMBER gosia;

-- Members of the db_datawriter fixed database role can add, delete, or change
-- data in all user tables.
ALTER ROLE db_datawriter ADD MEMBER gosia;


-- Members of the db_securityadmin fixed database role can modify role
-- membership for custom roles only, create users without logins, and manage
-- permissions. Adding principals to this role could enable unintended 
-- privilege escalation.
ALTER ROLE db_securityadmin ADD MEMBER paulius;

-- Members of the db_accessadmin fixed database role can add or remove access
-- to the database for Windows logins, Windows groups, and SQL Server logins.
ALTER ROLE db_accessadmin ADD MEMBER paulius;

-- Members of the db_backupoperator fixed database role can back up the
-- database.
ALTER ROLE db_backupoperator ADD MEMBER paulius;


ALTER ROLE db_ddladmin ADD MEMBER jakub;
ALTER ROLE db_datareader ADD MEMBER jakub;
ALTER ROLE db_datawriter ADD MEMBER jakub;


-- USER-DEFINED DATABASE ROLES
-- Custom roles that can be created by a database user

-- A role that is only able to read the data from tables
CREATE ROLE reader AUTHORIZATION marcin; -- create a role
GRANT SELECT TO reader; -- give permissions the role
ALTER ROLE reader ADD MEMBER getter; -- add user to the role

-- A role that can write (add, modify) data to the tables
CREATE ROLE writer AUTHORIZATION marcin;
GRANT INSERT TO writer;
GRANT UPDATE TO writer;
ALTER ROLE writer ADD MEMBER poster;