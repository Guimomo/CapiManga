import Notificacion from "../models/Notificacion.js";

class NotificacionService {
  static async getNotificaciones(id_Usuario) {
    try {
      const notificacionInstance = new Notificacion();
      const notificaciones = await notificacionInstance.getAllByUsuario(id_Usuario);
      if (notificaciones.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay notificaciones registradas",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Notificaciones obtenidas correctamente",
        data: notificaciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las notificaciones",
      };
    }
  }

  static async getNotificacionById(id) {
    try {
      const notificacionInstance = new Notificacion();
      const notificacion = await notificacionInstance.getById(id);
      if (!notificacion || notificacion.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Notificación no encontrada",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Notificación obtenida correctamente",
        data: notificacion,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la notificación",
      };
    }
  }

  static async createNotificacion(data) {
    try {
      const notificacionInstance = new Notificacion();
      const notificacion = await notificacionInstance.create(data);
      if (notificacion === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la notificación",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Notificación creada correctamente",
        data: notificacion,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la notificación",
      };
    }
  }

  static async updateLeida(id, id_Usuario) {
    try {
      const notificacionInstance = new Notificacion();
      const notificacion = await notificacionInstance.updateLeida(id, id_Usuario);
      if (notificacion === null) {
        return {
          error: true,
          code: 400,
          message: "Error al marcar la notificación como leída",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Notificación marcada como leída correctamente",
        data: notificacion,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al marcar como leída",
      };
    }
  }

  static async deleteNotificacion(id, id_Usuario) {
    try {
      const notificacionInstance = new Notificacion();
      const notificacionExistente = await notificacionInstance.getById(id);
      if (!notificacionExistente || notificacionExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Notificación no encontrada",
        };
      }
      const resultado = await notificacionInstance.delete(id, id_Usuario);
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
        message: "Notificación eliminada correctamente",
        data: notificacionExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar la notificación",
      };
    }
  }
}

export default NotificacionService;
