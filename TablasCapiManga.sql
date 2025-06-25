create database CapiManga_DB;

-- Usuario
create table usuario (
	id int auto_increment primary key,
    nombre varchar (255) not null,
    user_Name varchar (100) not null unique,
    rol_Usuario enum ('normal', 'verificado', 'Administrador'),
    edad_Usuario int,
    fecha_Nacimiento date not null,
    email_Usuario varchar (200),
    telefono varchar(100) default null,
    contrasena varchar (255) not null,
    genero_Usuario enum ('femenino', 'masculino', 'ninguno', 'otro'),
    biografia varchar (500) default null,
    visibilidad_Usuario enum ()
    
);