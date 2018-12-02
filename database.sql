create database card_game;

use card_game;

create table User (
    id int primary key auto_increment,
    username varchar(128) not null unique,
    pass_hash varchar(128),
    pass_salt varchar(128),
    cash int default 0
);