import CodigoTelefonicoService from '../services/CodigoTelefonicoService.js';
import { ResponseProvider } from "../providers/ResponseProvider.js";

const codigoTelefonicoController = {
    async getAll(req, res) {
        try {
            const codigos = await CodigoTelefonicoService.getAll();
            ResponseProvider.success(res, codigos);
        } catch (error) {
            ResponseProvider.error(res, error.message || error);
        }
    }
};

export default codigoTelefonicoController;
