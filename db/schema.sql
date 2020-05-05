-- Install citext to allow for case insentivity
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;

-- Install generator fo unique tokens
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Domain for email check
CREATE DOMAIN email AS citext CHECK (
    VALUE ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
);

CREATE TABLE Member (
    user_id SERIAL PRIMARY KEY,
    email email NOT NULL UNIQUE,
    username VARCHAR(20) NOT NULL UNIQUE,
    user_password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Table to hold login tokens
CREATE TABLE Login_Token (
    user_id INTEGER PRIMARY KEY,
    l_token uuid DEFAULT uuid_generate_v1 () UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Member (user_id) ON UPDATE CASCADE
);

CREATE TABLE Room (
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(20) NOT NULL UNIQUE,
    room_password VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Table to hold login tokens
CREATE TABLE Room_Token (
    user_id INTEGER,
    room_id INTEGER,
    r_token uuid DEFAULT uuid_generate_v1 () UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, room_id),
    FOREIGN KEY (user_id) REFERENCES Member (user_id) ON UPDATE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Room (room_id) ON UPDATE CASCADE
);

-- Table for created user messages
CREATE TABLE Messages (
    message_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    message_text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Member (user_id) ON UPDATE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Room (room_id) ON UPDATE CASCADE
);

-- Create function to check if given email or username 
-- match with any existing email or useranme respectively.
-- returns: 
-- 0 if not conflict
-- 10 if email conflict
-- 01 if username conflict
-- 11 if email and username conflicts
CREATE FUNCTION registerConflictCheck(email, VARCHAR(20)) RETURNS BIGINT AS --
$ $
SELECT
    (
        SELECT
            count(*) * 10
        FROM
            member
        WHERE
            email = $ 1
    ) + (
        SELECT
            count(*)
        FROM
            member
        WHERE
            username = $ 2
    );

$ $ --
LANGUAGE SQL;

CREATE FUNCTION registerUser(email, VARCHAR(20), VARCHAR(50)) RETURNS record AS --
$ $ DECLARE res BIGINT;

DO BEGIN res := registerConflictCheck('email@email.com', 'username') IF res > 0 THEN
SELECT
    res
    ELSE
INSERT
    (email, username, user_password) INTO member ($ 1, $ 2, $ 3) returning email,
    username
END IF;

END;

$ $ LANGUAGE SQL;

SELECT
    registerConflictCheck('email@emil.com', 'aa') CREATE FUNCTION test() RETURNS record AS $ $
SELECT
    *
FROM
    member;

$ $ LANGUAGE SQL;

CREATE FUNCTION test2() RETURNS record AS $ $ DECLARE a boolean;

BEGIN RETURN 2;

END;

$ $ LANGUAGE SQL;

-- Create function to register user.
-- Calls registerConflictCheck() to determine if there's conflict.
-- If non adds new user into Members and returns check code.
-- Otherwise return check code.
CREATE FUNCTION registerUser(email, VARCHAR(20), VARCHAR(50)) RETURNS INTEGER AS $ $ DECLARE res INTEGER := registerConflictCheck($ 1, $ 2);

BEGIN IF res > 0 THEN RETURN res;

ELSE
INSERT INTO
    Member(email, username, user_password)
VALUES
    ($ 1, $ 2, $ 3);

RETURN res;

END IF;

END;

$ $ LANGUAGE plpgsql registerUser('www@wddww.comda', 'mynamdddea', 'mypass') CREATE PROCEDURE insert_data(email, VARCHAR(20), VARCHAR(50)) LANGUAGE SQL AS $ $
INSERT INTO
    Member(email, username, user_password)
VALUES
    ($ 1, $ 2, $ 3);

RETURN r $ $;

CALL insert_data('www@www.com', 'myname', 'mypass');

SELECT
    email,
    username
FROM
    (
        SELECT
            email
        FROM
            member
        WHERE
            email = 'email@email.com'
    ) AS a
    LEFT JOIN (
        SELECT
            username
        FROM
            member
        WHERE
            username = 'username'
    ) AS b;

SELECT
    email,
    username
FROM
    member
WHERE
    email = 'email@email.comff'
UNION
SELECT
    username
FROM
    member
WHERE
    username = 'username'