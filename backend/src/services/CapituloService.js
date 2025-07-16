import Capitulo from "../models/Capitulo.js";

class CapituloService {
  static async getCapitulos() {
    try {
      const capituloInstance = new Capitulo();
      const capitulos = await capituloInstance.getAll();
      if (capitulos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay capítulos registrados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Capítulos obtenidos correctamente",
        data: capitulos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los capítulos",
      };
    }
  }

  static async getCapituloById(id) {
    try {
      const capituloInstance = new Capitulo();
      const capitulo = await capituloInstance.getById(id);
      if (capitulo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Capítulo no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Capítulo obtenido correctamente",
        data: capitulo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el capítulo",
      };
    }
  }

  static async getCapituloByHistoriaAndCapitulo(historiaId, capituloId) {
    try {
      const capituloInstance = new Capitulo();
      const capitulo = await capituloInstance.getByHistoriaAndCapitulo(historiaId, capituloId);
      if (capitulo.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Capítulo no encontrado para la historia y capítulo especificados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Capítulo obtenido correctamente",
        data: capitulo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el capítulo por historia y capítulo",
      };
    }
  }

  static async getCapitulosByHistoria(id_Historia) {
    try {
      const capituloInstance = new Capitulo();
      const capitulos = await capituloInstance.getByHistoria(id_Historia);
      return {
        error: false,
        code: 200,
        message: "Capítulos obtenidos correctamente",
        data: capitulos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los capítulos de la historia",
      };
    }
  }

  static async createCapitulo(data) {
    try {
      const capituloInstance = new Capitulo();
      const capitulo = await capituloInstance.create(data);
      if (capitulo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el capítulo",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Capítulo creado correctamente",
        data: capitulo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el capítulo",
      };
    }
  }

  static async updateCapitulo(id, campos) {
    try {
      const capituloInstance = new Capitulo();
      const capituloExistente = await capituloInstance.getById(id);
      if (capituloExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Capítulo no encontrado",
        };
      }
      const capitulo = await capituloInstance.update(id, campos);
      if (capitulo === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el capítulo",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Capítulo actualizado correctamente",
        data: capitulo,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el capítulo",
      };
    }
  }

  static async deleteCapitulo(id) {
    try {
      const capituloInstance = new Capitulo();
      const capituloExistente = await capituloInstance.getById(id);
      if (capituloExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Capítulo no encontrado",
        };
      }
      const resultado = await capituloInstance.delete(id);
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
        message: "Capítulo eliminado correctamente",
        data: capituloExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el capítulo",
      };
    }
  }
}

export default CapituloService;
