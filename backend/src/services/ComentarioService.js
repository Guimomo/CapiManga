import Comentario from "../models/Comentario.js";

class ComentarioService {
  static async getComentarios(tipo_objetivo, id_objetivo) {
    try {
      const comentarioInstance = new Comentario();
      const comentarios = await comentarioInstance.getAllByObjetivo(tipo_objetivo, id_objetivo);
      if (comentarios.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay comentarios registrados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Comentarios obtenidos correctamente",
        data: comentarios,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los comentarios",
      };
    }
  }

  static async getComentarioById(id) {
    try {
      const comentarioInstance = new Comentario();
      const comentario = await comentarioInstance.getById(id);
      if (!comentario || comentario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Comentario no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Comentario obtenido correctamente",
        data: comentario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el comentario",
      };
    }
  }

  static async createComentario(data) {
    try {
      const comentarioInstance = new Comentario();
      const comentario = await comentarioInstance.create(data);
      if (comentario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear el comentario",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Comentario creado correctamente",
        data: comentario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear el comentario",
      };
    }
  }

  static async updateComentario(id, contenido) {
    try {
      const comentarioInstance = new Comentario();
      const comentarioExistente = await comentarioInstance.getById(id);
      if (!comentarioExistente || comentarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Comentario no encontrado",
        };
      }
      const comentario = await comentarioInstance.update(id, contenido);
      if (comentario === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el comentario",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Comentario actualizado correctamente",
        data: comentario,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar el comentario",
      };
    }
  }

  static async deleteComentario(id, id_Usuario) {
    try {
      const comentarioInstance = new Comentario();
      const comentarioExistente = await comentarioInstance.getById(id);
      if (!comentarioExistente || comentarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Comentario no encontrado",
        };
      }
      const resultado = await comentarioInstance.delete(id, id_Usuario);
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
        message: "Comentario eliminado correctamente",
        data: comentarioExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el comentario",
      };
    }
  }

  static async deleteComentarioById(id) {
    try {
      const comentarioInstance = new Comentario();
      const resultado = await comentarioInstance.deleteById(id);
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
        message: "Comentario eliminado correctamente",
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el comentario por ID",
      };
    }
  }
}

export default ComentarioService;
