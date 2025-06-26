create database CapiManga_DB;

-- Usuario
create table Usuario (
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

create table Generos (
    id int auto_increment primary key,
    nombre varchar(200) not null unique
);

Estado_Serie (
    -- En caso de ser una serie solamente, esto no deberia usarse en un one shot ya que este este de un capitulo
    -- Esto es para ingresar el tipo de estado
    id int auto_increment primary key,
    tipo_Estado varchar(100) not null,
    fecha_Estado datetime default current_timestamp -- quiero tener la fecha cuando un proyecto se cancela, se pausa o se finaliza
);

edad_Recomendada (
    id int auto_increment primary key,
    tipo_Recomendacion varchar(200) not null,
    edad_Minima int not null,
    edad_Maxima int not null
);

-- no se si poner calificacion desde ante e integrarla a la tabla historia o... asi como esta el orden esta bien?

create table Historia (
    id int auto_increment primary key,
    autor_Historia int not null,
    titulo_Historia varchar(255) not null unique,
    formato_Publicacion enum ('serie', 'one-Shot'), -- One shot: historia de un capitulo; serie: historia de varios capitulos
    portada_Historia varchar(255) not null,
    icono_Historia varchar (255) not null,
    logo_historia varchar (255) default null,
    banner_Historia varchar(255), -- No se como hacer para que el banner perzonalizado sea solo para usuarios verificados que vayan a crear una historia
    personaje_Png varchar(255), -- no se como hacer para que esto solo sea para para el usuario verificado que vaya a crear una historia
    genero_Id int not null,
    subgenero_Id int not null,
    argumento_Historia varchar(500) not null,
    estado_Serie int not null, -- No se si necesito una columna del estado de la serie (en publicacion, en pausa, cancelada y finalizada)
    edad_Recomendada int not null,
    visibilidad_Historia enum ('publica', 'privada'),
    tipo_Historia int not null, -- Se ve si la historia es un comic, webcomic o novela
    fecha_Publicacion_Historia datetime default current_timestamp, -- no se actualiza
    verificación_Historia enum ('original', 'capiBoard') -- No se si esto deba ser aqui o en una tabla a parte	
    -- Necesito una tabla para 
    
);

create table Capitulo (
    id int auto_increment primary key,
    id_Historia int not null, -- DEbe relacionarse con la historia,
    titulo_Capitulo varchar (200) not null,
    numero_Capitulo int not null, -- No se si esto deba ser así
    argumento_Capitulo varchar (150) default null,
    icono_Capitulo varchar varchar (255),
);

create table Paginas_Capitulo (
    id int auto_increment primary key,
    id_Capitulo int not null, -- se relacionan las paginas con un capitulo que a su vez esta relacionada a una historia
    pagina_img varchar(255) not null, -- las paginas y en general imagenes se guardaran en un backend por lo que se creara una url para llamar a estas paginas e imagenes con formato png o jpg
    pagina_numeracion_nombre int auto_increment primary key -- ... no se si esta sea la froma correcta porque imaginate que se cambie la pocision si lo edito, o bueno no se como se haga en webtoon en otras plataformas el nombramiento de cada pagina y con que nombre se guarde en el backend
);

create table guardar_Historia ( -- no se si solo hacerlo con series o tambien lo aplico para one-shots
    id int auto_increment primary key,
    id_Historia int not null,
    guardada_por int not null -- Aqui va el id del usuario que empezo a guardar a historia
);

create table calificacion_Historia (
    id int auto_increment primary key,
    id_Historia int not null,
    calificacion int not null, -- no se si deba normalizar una tabla o hacerlo todo aqui con las puntuaciones del 1 al 10 o un sistema mas amigable con enum de pulgar arriba y pulgar abajo, necesito ayuda
    reseña_Historia varchar (600) default null,
    calificada_por int not null -- Aqui va el id del usuario que reseño
);
-- ___________________________________ Seccion social

create table seguir_Usuario ( -- solo funciona si el usuario es publico... una cosa no porque el usuario sea privado significa que sus historias tambien los sean, puede ser que solo quiera publicar su historia sin tener que mostrar su perfil en capimanga al publico
    id int auto_increment primary key,
    siguiendo_a int not null, -- Usuario al que se sigue :)
    seguido_por int not null, -- Usuario que empezo a seguir al anterior
    seguimiento_fecha datetime default current_timestamp
    -- No se si a esta tabla le falte algo o asi esta bien
)

create table publicacion (

    id int auto_increment primary key,
    publicado_por int not null,
    publicacion_Text text(600) not null,
    publicacion_Img varchar (255) default null,
    publicacion_Fecha datetime default current_timestamp,
    publicacion_Reaccion enum ('me gusta', 'no me gusta') -- no se si solo dejar el boton de me gusta por temas de hacer un ambiente amigable o hacer una normalizacion de tabla para agregar reacciones estilo facebook
);

create table notificaciones (
    -- No se como se deveria hacer esta tabla o si es necesaria pero me gustaria integrar notificaciones tipo "tal persona que siguies subio una nueva historia" o "nuevo capitulo de tu serie guardada" o "mira que publico @user_name"
    -- Ya sabes cosas de notificaciones
);
