ALTER ROLE db_owner ADD MEMBER marcin;

ALTER ROLE db_ddladmin ADD MEMBER gosia;
ALTER ROLE db_datareader ADD MEMBER gosia;
ALTER ROLE db_datawriter ADD MEMBER gosia;

ALTER ROLE db_securityadmin ADD MEMBER paulius;
ALTER ROLE db_accessadmin ADD MEMBER paulius;
ALTER ROLE db_backupoperator ADD MEMBER paulius;

ALTER ROLE db_ddladmin ADD MEMBER jakub;
ALTER ROLE db_datareader ADD MEMBER jakub;
ALTER ROLE db_datawriter ADD MEMBER jakub;

CREATE ROLE reader AUTHORIZATION marcin;
GRANT SELECT TO reader;
ALTER ROLE reader ADD MEMBER getter;

CREATE ROLE writer AUTHORIZATION marcin;
GRANT INSERT TO writer;
GRANT UPDATE TO writer;
ALTER ROLE writer ADD MEMBER poster;