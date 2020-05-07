-- Install citext to allow for case insentivity
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA PUBLIC;

-- Install generator fo unique tokens
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Domain for email check
CREATE DOMAIN email AS citext CHECK (
    VALUE ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
);

CREATE TABLE MEMBER (
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
    FOREIGN KEY (user_id) REFERENCES MEMBER (user_id) ON
    UPDATE
        CASCADE
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
    FOREIGN KEY (user_id) REFERENCES MEMBER (user_id) ON
    UPDATE
        CASCADE,
        FOREIGN KEY (room_id) REFERENCES Room (room_id) ON
    UPDATE
        CASCADE
);

-- Table for created user messages
CREATE TABLE Messages (
    message_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    message_text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES MEMBER (user_id) ON
    UPDATE
        CASCADE,
        FOREIGN KEY (room_id) REFERENCES Room (room_id) ON
    UPDATE
        CASCADE
);

-- Create function to check if given email or username 
-- match with any existing email or useranme respectively.
-- returns: 
-- 0 if not conflict
-- 10 if email conflict
-- 01 if username conflict
-- 11 if email and username conflicts
CREATE FUNCTION registerConflictCheck(email, VARCHAR(20)) RETURNS BIGINT AS --
$BODY$
SELECT 
    (
        SELECT COUNT(*) * 10
        FROM MEMBER
        WHERE email = $1
    ) + 
    (
        SELECT COUNT(*)
        FROM MEMBER
        WHERE username = $2
    );

$BODY$ --
LANGUAGE SQL;

-- Create function to register user.
-- Calls registerConflictCheck() to determine if there's conflict.
-- If non adds new user into Members and returns check code.
-- Otherwise return check code.
CREATE FUNCTION registerUser(email, VARCHAR(20), VARCHAR(50)) RETURNS INTEGER AS 
$BODY$
DECLARE
    res INTEGER := registerConflictCheck($1, $2);
BEGIN
    IF 
        res > 0 THEN RETURN res;
    ELSE
        INSERT INTO MEMBER(email, username, user_password)
        VALUES ($1, $2, $3);
        RETURN res;
END IF;
END;
$BODY$ 
LANGUAGE plpgsql;

-- Create function to login user.
-- Compares given email and password to members for authentication.
-- Create token if record for user doesn't exit otheriwise update with new token.
-- Returns if username and token login successful otherwise nothing (empty table).

CREATE OR REPLACE FUNCTION loginUser(email email, password VARCHAR(50)) 
RETURNS TABLE (
    --user_id INTEGER, 
    username VARCHAR(20), l_token uuid)  AS
$BODY$
BEGIN
RETURN QUERY
WITH token AS (
     -- Check if user with matching email and password exist
     -- Will have user_id to add to Login_Token if valid login.
    INSERT INTO Login_Token (user_id) 
        SELECT member.user_id FROM member 
       
        WHERE member.email = $1 AND member.user_password = $2
    -- If user already in table update with existing token with new
    ON conflict ON CONSTRAINT login_token_pkey 
    DO
    UPDATE SET l_token = DEFAULT, created_at = DEFAULT
RETURNING Login_Token.user_id, Login_Token.l_token
)
SELECT
-- Join with Member to get name 
-- member.user_id, -- might return user_id as well
    member.username, token.l_token 
FROM member INNER JOIN token 
ON member.user_id = token.user_id;
END;
$BODY$
LANGUAGE plpgsql;





select username, l_token from loginUser('aaa@aaa.com','aaa')


--


-- if login token -> compare token

-- no token-> check email/pass
--     if good -> add login toekn and return
--         insert on conglict update
    
--     bad->return nothing


-- CREATE FUNCTION loginUser(email email, password VARCHAR(50))RETURNS TABLE


-- insert into Login_Token (user_id) select user_id from member where email='ccc@ccc.com' and user_password = 'ccc';


-- create function 
-- select member.user_id, username, l_token from insert into Login_Token (user_id) select user_id from member where email='ccc@ccc.com' and user_password = 'ccc'
-- ON conflict (user_id)
-- DO
-- UPDATE  SET l_token = DEFAULT,created_at = DEFAULT
-- RETURNING user_id, l_token
-- where member.user_id = Login_Token.user_id;



-- from (select user_id from member where email='ccc@ccc.com' and user_password = 'ccc') as b 
-- where  Login_Token.user_id = b.user_id
-- RETURNING Login_Token.user_id, l_token


-- create
-- insert into Login_Token (user_id) select user_id from member 
-- ON conflict (user_id)
-- DO
-- UPDATE  SET l_token = DEFAULT,created_at = DEFAULT 


-- WITH token AS (
--   INSERT into Login_Token (user_id) SELECT user_id FROM member WHERE email='ccc@ccc.com' AND user_password = 'cc6c'
-- ON conflict (user_id)
-- DO
-- UPDATE  SET l_token = DEFAULT,created_at = DEFAULT
-- RETURNING user_id, l_token
-- )
-- SELECT member.user_id, username, l_token FROM member INNER JOIN token ON member.user_id = token.user_id;
-- -- SELECT member.user_id, username, l_token FROM Member, token WHERE member.user_id = token.user_id;

