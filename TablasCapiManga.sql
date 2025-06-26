create database CapiManga_DB;

-- Usuario
create table usuario (
	id int auto_increment primary key,
    nombre varchar (255) not null,
    user_Name varchar (100) not null unique,
    foto_Perfil varchar(255),
    banner_Perfil varchar(255),
    rol_Usuario enum ('normal', 'verificado', 'Administrador'),
    edad_Usuario int,
    fecha_Nacimiento date not null,
    email_Usuario varchar (200),
    telefono varchar(100) default null,
    contrasena varchar (255) not null,
    genero_Usuario enum ('femenino', 'masculino', 'ninguno', 'otro'),
    biografia_Usuario varchar (500) default null,
    visibilidad_Usuario enum ('publico', 'privado') default 'publico'
    
);

create table generos (
    id int auto_increment primary key,
    nombre varchar(200) not null unique
);

create table Historia (
    id int auto_increment primary key,
    autor_Historia int not null,
    titulo_Historia varchar(255) not null unique,
    formato_Publicacion enum ('serie', 'one-Shot'), -- One shot: historia de un capitulo; serie: historia de varios capitulos
    portada_Historia varchar(255) not null,
    logo_historia varchar (255) default null,
    banner_Historia varchar(255), -- No se como hacer para que el banner perzonalizado sea solo para usuarios verificados que vayan a crear una historia
    personaje_Png varchar(255), -- no se como hacer para que esto solo sea para para el usuario verificado que vaya a crear una historia
    genero_Id int not null,
    subgenero_Id int not null,
    argumento_Historia varchar(500) not null,
    estado_Historia int not null, -- No se si necesito una columna del estado de la serie (en publicacion, en pausa, cancelada y finalizada)
    edad_Recomendada int not null,
    visibilidad_Historia enum ('publica', 'privada'),
    tipo_Historia int not null, -- Se ve si la historia es un comic, webcomic o novela
    fecha_Publicacion_Historia datetime default current_timestamp
    -- Necesito una tabla para 
    
);