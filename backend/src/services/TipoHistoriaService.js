import TipoHistoria from "../models/TipoHistoria.js";

class TipoHistoriaService {
  static async getTiposHistoria() {
    try {
      const tipoHistoriaInstance = new TipoHistoria();
      const tipos = await tipoHistoriaInstance.getAll();
      if (tipos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay tipos de historia registrados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Tipos de historia obtenidos correctamente",
        data: tipos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los tipos de historia",
      };
    }
  }

  static async getTipoHistoriaById(id) {
    try {
      const tipoHistoriaInstance = new TipoHistoria();
      const tipo = await tipoHistoriaInstance.getById(id);
      if (tipo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de historia no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Tipo de historia obtenido correctamente",
        data: tipo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el tipo de historia",
      };
    }
  }

  static async createTipoHistoria(nombre_tipo) {
    try {
      const tipoHistoriaInstance = new TipoHistoria();
      const tipo = await tipoHistoriaInstance.create(nombre_tipo);
      if (tipo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el tipo de historia",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Tipo de historia creado correctamente",
        data: tipo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el tipo de historia",
      };
    }
  }

  static async updateTipoHistoria(id, campos) {
    try {
      const tipoHistoriaInstance = new TipoHistoria();
      const tipoExistente = await tipoHistoriaInstance.getById(id);
      if (tipoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de historia no encontrado",
        };
      }
      const tipo = await tipoHistoriaInstance.update(id, campos);
      if (tipo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el tipo de historia",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Tipo de historia actualizado correctamente",
        data: tipo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el tipo de historia",
      };
    }
  }

  static async deleteTipoHistoria(id) {
    try {
      const tipoHistoriaInstance = new TipoHistoria();
      const tipoExistente = await tipoHistoriaInstance.getById(id);
      if (tipoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Tipo de historia no encontrado",
        };
      }
      const resultado = await tipoHistoriaInstance.delete(id);
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
        message: "Tipo de historia eliminado correctamente",
        data: tipoExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el tipo de historia",
      };
    }
  }
}

export default TipoHistoriaService;
