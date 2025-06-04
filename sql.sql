create database if not exists sistema_usuarios
default character set utf8mb4
default COLLATE utf8mb4_unicode_ci;

use sistema_usuarios;

create table if not exists usuarios(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    cpf varchar(14) not null unique,
    data_nascimento date not null,
    endereco text not null,
    usuario varchar(50) not null unique,
    senha varchar(255) not null
) default charset = utf8mb4;

select * from usuarios;