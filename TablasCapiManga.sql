-- create database CapiManga_DB;

-- Usuario
create table Usuario (
    id int auto_increment primary key,
    nombre varchar (255) not null,
    user_Name varchar (100) not null unique,
    foto_Perfil varchar(255),
    banner_Perfil varchar(255),
    rol_Usuario enum ('normal', 'verificado', 'administrador') default 'normal',
    edad_Usuario int,
    fecha_Nacimiento date not null,
    email_Usuario varchar (200),
    telefono varchar(100) default null,
    contrasena varchar (255) not null,
    genero_Usuario enum ('femenino', 'masculino', 'ninguno', 'otro'),
    biografia_Usuario varchar (500) default null,
    visibilidad_Usuario enum ('publico', 'privado') default 'publico',
    
    fecha_Usuario datetime default current_timestamp,
    
    refresh_Token text
);

select * from Capitulo;
delete from Historia where id = 3;
delete from Capitulo where id = 2;
select * from Paginas_Capitulo;


ALTER TABLE Usuario ADD CONSTRAINT unique_email UNIQUE (email_Usuario);
ALTER TABLE Usuario ADD CONSTRAINT unique_telefono UNIQUE (telefono);

create table Generos (
    id int auto_increment primary key,
    nombre varchar(200) not null unique
);

create table Tipo_Estado (
    id int auto_increment primary key,
    nombre_Estado varchar(100) not null unique
);

create table edad_Recomendada (
    id int auto_increment primary key,
    tipo_Recomendacion varchar(200) not null,
    edad_Minima int not null,
    edad_Maxima int not null
);

-- no se si poner calificacion desde ante e integrarla a la tabla historia o... asi como esta el orden esta bien?

create table tipo_historia (
    id int auto_increment primary key,
    nombre_tipo varchar(100) not null unique
);

create table Historia (
    id int auto_increment primary key,
    autor_Historia int not null,
    titulo_Historia varchar(255) not null unique,
    formato_Publicacion enum ('serie', 'one-Shot'),
    portada_Historia varchar(255) not null,
    icono_Historia varchar(255) not null,
    logo_Historia varchar(255) not null,
    banner_Historia varchar(255),
    personaje_Png varchar(255),
    genero_Id int not null,
    subgenero_Id int not null,
    argumento_Historia varchar(500) not null,
    tipo_Serie int not null,
    edad_Recomendada int not null,
    visibilidad_Historia enum ('publica', 'privada'),
    tipo_Historia int not null,
    fecha_Publicacion_Historia datetime default current_timestamp,
    verificacion_Historia enum ('Original', 'CapiBoard') default 'CapiBoard',
    
    -- llaves foraneas
    foreign key (autor_Historia) references Usuario(id) on delete cascade,
    foreign key (genero_Id) references Generos(id),
    foreign key (subgenero_Id) references Generos(id),
    foreign key (tipo_Serie) references Tipo_Estado(id),
    foreign key (tipo_historia) references tipo_historia(id),
    foreign key (edad_Recomendada) references edad_Recomendada(id)
);

create table Estado_Serie (
    -- En caso de ser una serie solamente, esto no deberia usarse en un one shot ya que este este de un capitulo
    -- Esto es para ingresar el tipo de estado
    -- id int auto_increment primary key,
    -- tipo_Estado varchar(100) not null,
    -- fecha_Estado datetime default current_timestamp -- quiero tener la fecha cuando un proyecto se cancela, se pausa o se finaliza
	id int auto_increment primary key,
	id_Historia int not null,
	estado_Serie int not null,
	fecha_Estado datetime default current_timestamp,
    
    -- llaves foraneas
    foreign key (id_Historia) references Historia(id) on delete cascade,
    foreign key (estado_Serie) references Tipo_Estado(id)
);

create table Capitulo (
    id int auto_increment primary key,
    id_Historia int not null, -- DEbe relacionarse con la historia,
    titulo_Capitulo varchar (200) not null,
    numero_Capitulo int not null, -- No se si esto deba ser así
    argumento_Capitulo varchar (150) default null,
    icono_Capitulo varchar (255),
    
    -- Evita capítulos duplicados por número en la misma historia
    unique (id_Historia, numero_Capitulo),
    
    -- llaves foraneas
    foreign key (id_Historia) references Historia(id) on delete cascade
);

ALTER TABLE Capitulo AUTO_INCREMENT = 1;

ALTER TABLE Capitulo MODIFY COLUMN numero_Capitulo DECIMAL(5,2) NOT NULL;

create table Paginas_Capitulo (
    id int auto_increment primary key,
    id_Capitulo int not null,
    pagina_img varchar(255) not null,
    pagina_numero int not null, -- Número de página dentro del capítulo
    
    -- Evita capítulos duplicados por número en la misma historia
    unique (id_Capitulo, pagina_numero),
    
    -- llaves foraneas
    foreign key (id_Capitulo) references Capitulo(id) on delete cascade
);

create table guardar_Historia (
    id_Historia int not null,
    guardada_por int not null,
    fecha_Guardado datetime default current_timestamp,
    
    -- llaves foraneas
    primary key (id_Historia, guardada_por),
    foreign key (id_Historia) references Historia(id) on delete cascade,
    foreign key (guardada_por) references Usuario(id)  on delete cascade
);

create table calificacion_Historia (
    id_Historia int not null,
    calificada_por int not null,
    calificacion enum ('positivo', 'negativo'),
    reseña_Historia varchar(600) default null,
    
    -- llaves foraneas
    primary key (id_Historia, calificada_por),
    foreign key (id_Historia) references Historia(id) on delete cascade,
    foreign key (calificada_por) references Usuario(id)  on delete cascade
);

select * from Comentario;
-- Cambiar contenido de Comentario a TEXT
ALTER TABLE Comentario MODIFY COLUMN contenido TEXT NOT NULL;

-- Cambiar publicacion_Text de publicacion a TEXT
ALTER TABLE publicacion MODIFY COLUMN publicacion_Text TEXT NOT NULL;

-- Cambiar reseña_Historia a resena_Historia y tipo TEXT
ALTER TABLE calificacion_Historia CHANGE COLUMN reseña_Historia resena_Historia TEXT DEFAULT NULL;
-- ___________________________________ Seccion social

create table seguir_Usuario (
    siguiendo_a int not null,
    seguido_por int not null,
    seguimiento_fecha datetime default current_timestamp,
    
    -- llaves foraneas
    primary key (siguiendo_a, seguido_por),
    foreign key (siguiendo_a) references Usuario(id)  on delete cascade,
    foreign key (seguido_por) references Usuario(id)  on delete cascade
);

create table publicacion (
    id int auto_increment primary key,
    publicado_por int not null,
    publicacion_Text varchar(600) not null,
    publicacion_Img varchar(255) default null,
    publicacion_Fecha datetime default current_timestamp,
    
    -- llaves foraneas
    foreign key (publicado_por) references Usuario(id)  on delete cascade
);

create table notificaciones (
    id int auto_increment primary key,
    id_Usuario int not null, -- A quién se le notifica
    mensaje varchar(500) not null,
    leida boolean default false,
    fecha_Notificacion datetime default current_timestamp,
    
    -- llaves foraneas
    foreign key (id_Usuario) references Usuario(id)  on delete cascade
);

create table Comentario (
    id int auto_increment primary key,
    id_Usuario int not null, -- Quién hizo el comentario
    contenido varchar(600) not null,
    fecha_Comentario datetime default current_timestamp,
    
    -- Identifica a qué tipo de entidad va dirigido el comentario
    tipo_objetivo enum ('historia', 'capitulo', 'publicacion', 'comentario') not null,
    id_objetivo int not null, -- El id de la historia, capítulo, publicación o comentario que se comenta
    
    -- Relaciones
    foreign key (id_Usuario) references Usuario(id) on delete cascade
);

ALTER TABLE Comentario MODIFY COLUMN contenido TEXT NOT NULL;

create table Reaccion (
    id int auto_increment primary key,
    id_Usuario int not null, -- Quién reaccionó
    tipo_objetivo enum ('publicacion', 'comentario') not null, -- A qué se reacciona
    id_objetivo int not null, -- El ID de publicación o comentario
    tipo_Reaccion enum ('me_gusta', 'me_encanta', 'muy_divertido', 'que_increible', 'que_triste', 'no_me_parece') not null,
    fecha_Reaccion datetime default current_timestamp,
    
    -- Evita duplicadas: un usuario solo puede tener 1 reacción por elemento, pero puede cambiarla
    unique (id_Usuario, tipo_objetivo, id_objetivo),
    
    -- Relaciones
    foreign key (id_Usuario) references Usuario(id) on delete cascade
);

select * from Reaccion;
select * from publicacion;
delete from Reaccion where id = 10;
create table MeGusta_Capitulo (
    id_Capitulo int not null,
    id_Usuario int not null,
    fecha_MeGusta datetime default current_timestamp,
    
    -- Llaves foraneas
    primary key (id_Capitulo, id_Usuario),
    foreign key (id_Capitulo) references Capitulo(id) on delete cascade,
    foreign key (id_Usuario) references Usuario(id) on delete cascade
);

insert into Reaccion (id_Usuario, tipo_objetivo, id_objetivo,tipo_Reaccion) values (5,'comentario', 2, 'me_gusta');

select * from MeGusta_Capitulo;

-- Usuario
ALTER TABLE Usuario MODIFY COLUMN fecha_Usuario timestamp default current_timestamp;

-- Historia
ALTER TABLE Historia MODIFY COLUMN fecha_Publicacion_Historia timestamp default current_timestamp;

-- Estado_Serie
ALTER TABLE Estado_Serie MODIFY COLUMN fecha_Estado timestamp default current_timestamp;

-- guardar_Historia
ALTER TABLE guardar_Historia MODIFY COLUMN fecha_Guardado timestamp default current_timestamp;

-- publicacion
ALTER TABLE publicacion MODIFY COLUMN publicacion_Fecha timestamp default current_timestamp;

-- notificaciones
ALTER TABLE notificaciones MODIFY COLUMN fecha_Notificacion timestamp default current_timestamp;

-- Comentario
ALTER TABLE Comentario MODIFY COLUMN fecha_Comentario timestamp default current_timestamp;

-- Reaccion
ALTER TABLE Reaccion MODIFY COLUMN fecha_Reaccion timestamp default current_timestamp;

-- MeGusta_Capitulo
ALTER TABLE MeGusta_Capitulo MODIFY COLUMN fecha_MeGusta timestamp default current_timestamp;

-- seguir_Usuario
ALTER TABLE seguir_Usuario MODIFY COLUMN seguimiento_fecha timestamp default current_timestamp;
