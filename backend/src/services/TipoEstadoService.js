import TipoEstado from "../models/TipoEstado.js";

class TipoEstadoService {
  static async getTiposEstado() {
    try {
      const tipoEstadoInstance = new TipoEstado();
      const tipos = await tipoEstadoInstance.getAll();
      if (tipos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay tipos de estado registrados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Tipos de estado obtenidos correctamente",
        data: tipos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los tipos de estado",
      };
    }
  }

  static async getTipoEstadoById(id) {
    try {
      const tipoEstadoInstance = new TipoEstado();
      const tipo = await tipoEstadoInstance.getById(id);
      if (tipo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de estado no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Tipo de estado obtenido correctamente",
        data: tipo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el tipo de estado",
      };
    }
  }

  static async createTipoEstado(nombre_Estado) {
    try {
      const tipoEstadoInstance = new TipoEstado();
      const tipo = await tipoEstadoInstance.create(nombre_Estado);
      if (tipo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el tipo de estado",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Tipo de estado creado correctamente",
        data: tipo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el tipo de estado",
      };
    }
  }

  static async updateTipoEstado(id, campos) {
    try {
      const tipoEstadoInstance = new TipoEstado();
      const tipoExistente = await tipoEstadoInstance.getById(id);
      if (tipoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de estado no encontrado",
        };
      }
      const tipo = await tipoEstadoInstance.update(id, campos);
      if (tipo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tipo de estado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Tipo de estado actualizado correctamente",
        data: tipo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el tipo de estado",
      };
    }
  }

  static async deleteTipoEstado(id) {
    try {
      const tipoEstadoInstance = new TipoEstado();
      const tipoExistente = await tipoEstadoInstance.getById(id);
      if (tipoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de estado no encontrado",
        };
      }
      const resultado = await tipoEstadoInstance.delete(id);
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
        message: "Tipo de estado eliminado correctamente",
        data: tipoExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el tipo de estado",
      };
    }
  }
}

export default TipoEstadoService;
