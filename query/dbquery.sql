CREATE TABLE users (
    id varchar(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo varchar(255),
    UNIQUE (email)
);

ALTER TABLE users 
ADD CONSTRAINT users_id_pk
PRIMARY KEY (id);

CREATE TABLE messages (
    id varchar(255) not null,
    body VARCHAR(255) NOT NULL,
    sender_id varchar(255) not null REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    receiver_id varchar(255) not null REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    post_at timestamp default current_timestamp,
    UNIQUE (id)
);

CREATE TABLE groupmessage (
    id varchar(255) not null,
    body VARCHAR(255) NOT NULL,
    sender_id varchar(255) not null REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    room_id varchar(255) not null,
    post_at timestamp default current_timestamp,
    UNIQUE (id)
);
