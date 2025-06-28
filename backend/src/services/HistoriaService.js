import Historia from "../models/Historia.js";

class HistoriaService {
  static async getHistorias() {
    try {
      const historiaInstance = new Historia();
      const historias = await historiaInstance.getAll();
      if (historias.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay historias registradas",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Historias obtenidas correctamente",
        data: historias,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las historias",
      };
    }
  }

  static async getHistoriaById(id) {
    try {
      const historiaInstance = new Historia();
      const historia = await historiaInstance.getById(id);
      if (historia.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Historia no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Historia obtenida correctamente",
        data: historia,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la historia",
      };
    }
  }

  static async createHistoria(data) {
    try {
      const historiaInstance = new Historia();
      const historia = await historiaInstance.create(data);
      if (historia === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la historia",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Historia creada correctamente",
        data: historia,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la historia",
      };
    }
  }

  static async updateHistoria(id, campos) {
    try {
      const historiaInstance = new Historia();
      const historiaExistente = await historiaInstance.getById(id);
      if (historiaExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Historia no encontrada",
        };
      }
      const historia = await historiaInstance.update(id, campos);
      if (historia === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la historia",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Historia actualizada correctamente",
        data: historia,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la historia",
      };
    }
  }

  static async deleteHistoria(id) {
    try {
      const historiaInstance = new Historia();
      const historiaExistente = await historiaInstance.getById(id);
      if (historiaExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Historia no encontrada",
        };
      }
      const resultado = await historiaInstance.delete(id);
      if (resultado.error) {
        return {
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }
      return {
        error: false,
        code: 200,
        message: "Historia eliminada correctamente",
        data: historiaExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar la historia",
      };
    }
  }
}

export default HistoriaService;
