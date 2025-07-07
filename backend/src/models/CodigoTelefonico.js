import connection from '../utils/db.js';

class CodigoTelefonico {
    static async findAll() {
        
        try {

            const [rows] = await connection.query('SELECT * FROM codigostelefonicos');
            return rows;
            
        } catch (error) {
            throw new Error("Error al obtener los códigos telefónicos");
        }
    }
}

export default CodigoTelefonico;
