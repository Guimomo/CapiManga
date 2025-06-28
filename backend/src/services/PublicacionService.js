import Publicacion from "../models/Publicacion.js";

class PublicacionService {
  static async getPublicaciones() {
    try {
      const instance = new Publicacion();
      const publicaciones = await instance.getAll();
      if (!publicaciones.length) {
        return { error: true, code: 404, message: "No hay publicaciones registradas" };
      }
      return { error: false, code: 200, message: "Publicaciones obtenidas correctamente", data: publicaciones };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener las publicaciones" };
    }
  }

  static async getPublicacionById(id) {
    try {
      const instance = new Publicacion();
      const publicacion = await instance.getById(id);
      if (!publicacion || publicacion.length === 0) {
        return { error: true, code: 404, message: "Publicación no encontrada" };
      }
      return { error: false, code: 200, message: "Publicación obtenida correctamente", data: publicacion };
    } catch (error) {
      return { error: true, code: 500, message: "Error al obtener la publicación" };
    }
  }

  static async createPublicacion(data) {
    try {
      const instance = new Publicacion();
      const publicacion = await instance.create(data);
      if (publicacion === null) {
        return { error: true, code: 400, message: "Error al crear la publicación" };
      }
      return { error: false, code: 201, message: "Publicación creada correctamente", data: publicacion };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al crear la publicación" };
    }
  }

  static async updatePublicacion(id, campos) {
    try {
      const instance = new Publicacion();
      const publicacionExistente = await instance.getById(id);
      if (publicacionExistente.length === 0) {
        return { error: true, code: 404, message: "Publicación no encontrada" };
      }
      const publicacion = await instance.update(id, campos);
      if (publicacion === null) {
        return { error: true, code: 400, message: "Error al actualizar la publicación" };
      }
      return { error: false, code: 200, message: "Publicación actualizada correctamente", data: publicacion };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al actualizar la publicación" };
    }
  }

  static async deletePublicacion(id) {
    try {
      const instance = new Publicacion();
      const publicacionExistente = await instance.getById(id);
      if (publicacionExistente.length === 0) {
        return { error: true, code: 404, message: "Publicación no encontrada" };
      }
      const resultado = await instance.delete(id);
      if (resultado.error) {
        return { error: true, code: 400, message: resultado.mensaje };
      }
      return { error: false, code: 200, message: "Publicación eliminada correctamente", data: publicacionExistente };
    } catch (error) {
      return { error: true, code: 500, message: "Error interno al eliminar la publicación" };
    }
  }
}

export default PublicacionService;
