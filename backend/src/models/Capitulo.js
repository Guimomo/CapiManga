import connection from "../utils/db.js";

class Capitulo {

    //Obtener todos los capitulos
    async getAll() {

        try {
            const [rows] = await connection.query("SELECT * FROM Capitulos")
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los capitulos");
        }
    }

    //Obtener capitulos por ID por serie
    async getBySerieId(id_serie) {
        try {
          const [rows] = await connection.query(
            "SELECT * FROM Capitulos WHERE id_serie = ?",
            [id_serie]
          );
          return rows;
        } catch (error) {
          throw new Error("Error al obtener los capítulos de la serie");
        }
    }

    //Crear un nuevo capitulos
    async create (id_serie, numero, titulo) {

        try {

            const [resultado] = await connection.query(
                "INSERT INTO Capitulos (id_serie, numero, titulo) VALUES (?, ?, ?)", [id_serie, numero, titulo]
            )
            //el [] es para desestructurar el resultado de la consulta en este caso el resultado 
            //es la tabla de capitulos de la base de datos la cual se va a desestructurar como un array 
            
            return { id: resultado.insertId, id_serie, numero, titulo }

        } catch (error) {
            throw new Error("Error al crear el capítulo");
        }

    }

    //Eliminar un capitulo
    async delete(id) {

        try {
            
            const [resultado] = await connection.query(
                "delete from Capitulos where id=?", [id]
            );

            if (resultado.affectedRows ===0) {

                return{
                    error: true,
                    message: "Capítulo no encontrado",
                }
            }

        } catch (error) {
          
            throw new Error("Error al eliminar el capítulo");
        }
    }

    //Listar comentarios del capitulo

}