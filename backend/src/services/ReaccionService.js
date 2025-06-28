import Reaccion from "../models/Reaccion.js";

class ReaccionService {
  static async getReacciones(tipo_objetivo, id_objetivo) {
    try {
      const reaccionInstance = new Reaccion();
      const reacciones = await reaccionInstance.getAllByObjetivo(tipo_objetivo, id_objetivo);
      if (reacciones.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay reacciones registradas",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Reacciones obtenidas correctamente",
        data: reacciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las reacciones",
      };
    }
  }

  static async getReaccionById(id) {
    try {
      const reaccionInstance = new Reaccion();
      const reaccion = await reaccionInstance.getById(id);
      if (!reaccion || reaccion.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Reacción no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Reacción obtenida correctamente",
        data: reaccion,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la reacción",
      };
    }
  }

  static async createReaccion(data) {
    try {
      const reaccionInstance = new Reaccion();
      const reaccion = await reaccionInstance.create(data);
      if (reaccion === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear o actualizar la reacción",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Reacción creada o actualizada correctamente",
        data: reaccion,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear o actualizar la reacción",
      };
    }
  }

  static async deleteReaccion(id, id_Usuario) {
    try {
      const reaccionInstance = new Reaccion();
      const reaccionExistente = await reaccionInstance.getById(id);
      if (!reaccionExistente || reaccionExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Reacción no encontrada",
        };
      }
      const resultado = await reaccionInstance.delete(id, id_Usuario);
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
        message: "Reacción eliminada correctamente",
        data: reaccionExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar la reacción",
      };
    }
  }
}

export default ReaccionService;
