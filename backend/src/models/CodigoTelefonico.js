import db from '../utils/db.js';

class CodigoTelefonico {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM codigostelefonicos');
        return rows;
    }
}

export default CodigoTelefonico;
