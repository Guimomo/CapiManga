CREATE TABLE codigostelefonicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pais VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) NOT NULL
);

ALTER TABLE codigostelefonicos ADD COLUMN iso VARCHAR(2) NOT NULL AFTER pais;

select * from guardar_Historia;
INSERT INTO seguir_Usuario (siguiendo_a, seguido_por) VALUES (4, 5);
describe Usuario;
update Historia set verificacion_Historia = "Original" where id = 5;
update Usuario set rol_Usuario = 'verificado' where id=5;
select * from Capitulo;
delete from Historia where id =6;

update Historia SET portada_Historia = "/uploads/4/Sailor_moon/Portada_Historia.jpg" where id = 1;
update Historia SET logo_Historia = "/uploads/4/Sailor_moon/logo_Historia.png" where id = 1;

INSERT INTO codigostelefonicos (pais, codigo) VALUES
('Colombia', '+57'),
('Argentina', '+54'),
('México', '+52'),
('España', '+34'),
('Venezuela', '+58');

UPDATE codigostelefonicos SET iso = 'CO' WHERE id = 1;
UPDATE codigostelefonicos SET iso = 'AR' WHERE id = 2;
UPDATE codigostelefonicos SET iso = 'MX' WHERE id = '3';
UPDATE codigostelefonicos SET iso = 'ES' WHERE id = '4';
UPDATE codigostelefonicos SET iso = 'VE' WHERE id = '5';

delete from Usuario where id=3;

INSERT INTO Tipo_Estado (nombre_Estado) VALUES
('en publicacion'),
('en pausa'),
('cancelado');

INSERT INTO Generos (nombre) VALUES
('Accion'),
('Aventura'),
('Fantasia'),
('Chicas magicas'),
('Superheroes'),
('SliceOfLife'),
('Romance'),
('Terror'),
('Misterio'),
('Comedia');

INSERT INTO edad_Recomendada (tipo_Recomendacion, edad_Minima, edad_Maxima) VALUES
('Adolescentes', 14, 99),
('Mayores de 18', 18, 99),
('Mayores de 21', 21, 99);

INSERT INTO tipo_historia (nombre_tipo) VALUES
('comic'),
('web comic'),
('novela ligera');

-- Cambia el nombre de la columna y el enum, y pon el default en 'CapiBoard'
ALTER TABLE Historia 
CHANGE COLUMN verificación_Historia verificacion_Historia ENUM('Original', 'CapiBoard') DEFAULT 'CapiBoard';

ALTER TABLE seguir_Usuario 
MODIFY COLUMN seguimiento_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

