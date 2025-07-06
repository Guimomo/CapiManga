import CodigoTelefonico from '../models/CodigoTelefonico.js';

const CodigoTelefonicoService = {
    async getAll() {
        return await CodigoTelefonico.findAll();
    }
};

export default CodigoTelefonicoService;
