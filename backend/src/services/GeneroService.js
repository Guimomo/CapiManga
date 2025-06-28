import Genero from "../models/Genero.js";

class GeneroService {
  static async getGeneros() {
    try {
      const generoInstance = new Genero();
      const generos = await generoInstance.getAll();
      if (generos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay géneros registrados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Géneros obtenidos correctamente",
        data: generos,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los géneros",
      };
    }
  }

  static async getGeneroById(id) {
    try {
      const generoInstance = new Genero();
      const genero = await generoInstance.getById(id);
      if (genero.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Género no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Género obtenido correctamente",
        data: genero,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el género",
      };
    }
  }

  static async createGenero(nombre) {
    try {
      const generoInstance = new Genero();
      const genero = await generoInstance.create(nombre);
      if (genero === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el género",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Género creado correctamente",
        data: genero,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el género",
      };
    }
  }

  static async updateGenero(id, campos) {
    try {
      const generoInstance = new Genero();
      const generoExistente = await generoInstance.getById(id);
      if (generoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Género no encontrado",
        };
      }
      const genero = await generoInstance.update(id, campos);
      if (genero === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el género",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Género actualizado correctamente",
        data: genero,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el género",
      };
    }
  }

  static async deleteGenero(id) {
    try {
      const generoInstance = new Genero();
      const generoExistente = await generoInstance.getById(id);
      if (generoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Género no encontrado",
        };
      }
      const resultado = await generoInstance.delete(id);
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
        message: "Género eliminado correctamente",
        data: generoExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el género",
      };
    }
  }
}

export default GeneroService;
