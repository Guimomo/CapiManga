import EdadRecomendada from "../models/EdadRecomendada.js";

class EdadRecomendadaService {
  static async getEdadesRecomendadas() {
    try {
      const edadInstance = new EdadRecomendada();
      const edades = await edadInstance.getAll();
      if (edades.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay edades recomendadas registradas",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Edades recomendadas obtenidas correctamente",
        data: edades,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las edades recomendadas",
      };
    }
  }

  static async getEdadRecomendadaById(id) {
    try {
      const edadInstance = new EdadRecomendada();
      const edad = await edadInstance.getById(id);
      if (edad.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Edad recomendada no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Edad recomendada obtenida correctamente",
        data: edad,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la edad recomendada",
      };
    }
  }

  static async createEdadRecomendada(tipo_Recomendacion, edad_Minima, edad_Maxima) {
    try {
      const edadInstance = new EdadRecomendada();
      const edad = await edadInstance.create(tipo_Recomendacion, edad_Minima, edad_Maxima);
      if (edad === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la edad recomendada",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Edad recomendada creada correctamente",
        data: edad,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la edad recomendada",
      };
    }
  }

  static async updateEdadRecomendada(id, campos) {
    try {
      const edadInstance = new EdadRecomendada();
      const edadExistente = await edadInstance.getById(id);
      if (edadExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Edad recomendada no encontrada",
        };
      }
      const edad = await edadInstance.update(id, campos);
      if (edad === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la edad recomendada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Edad recomendada actualizada correctamente",
        data: edad,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la edad recomendada",
      };
    }
  }

  static async deleteEdadRecomendada(id) {
    try {
      const edadInstance = new EdadRecomendada();
      const edadExistente = await edadInstance.getById(id);
      if (edadExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Edad recomendada no encontrada",
        };
      }
      const resultado = await edadInstance.delete(id);
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
        message: "Edad recomendada eliminada correctamente",
        data: edadExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar la edad recomendada",
      };
    }
  }
}

export default EdadRecomendadaService;
