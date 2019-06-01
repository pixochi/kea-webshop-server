-- Users are created within the database.
-- Only logins with a user in the specific database can access it.
-- Every login can have multiple users but only one per database.

USE schooldb;

CREATE USER marcin FOR LOGIN marcin;
CREATE USER gosia FOR LOGIN gosia;
CREATE USER paulius FOR LOGIN paulius;
CREATE USER jakub FOR LOGIN jakub;
CREATE USER getter FOR LOGIN getter;
CREATE USER poster FOR LOGIN poster;