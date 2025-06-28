import EstadoSerie from "../models/EstadoSerie.js";

class EstadoSerieService {
  static async getEstadosSerie() {
    try {
      const estadoSerieInstance = new EstadoSerie();
      const estados = await estadoSerieInstance.getAll();
      if (!estados || estados.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay estados de serie registrados",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Estados de serie obtenidos correctamente",
        data: estados,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los estados de serie",
      };
    }
  }

  static async getEstadoSerieById(id) {
    try {
      const estadoSerieInstance = new EstadoSerie();
      const estado = await estadoSerieInstance.getById(id);
      if (!estado || Object.keys(estado).length === 0) {
        return {
          error: true,
          code: 404,
          message: "Estado de serie no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Estado de serie obtenido correctamente",
        data: estado,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el estado de serie",
      };
    }
  }

  static async createEstadoSerie(nombre_estado) {
    try {
      const estadoSerieInstance = new EstadoSerie();
      const estado = await estadoSerieInstance.create(nombre_estado);
      if (!estado) {
        return {
          error: true,
          code: 400,
          message: "No se pudo crear el estado de serie",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Estado de serie creado correctamente",
        data: estado,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al crear el estado de serie",
      };
    }
  }

  static async updateEstadoSerie(id, campos) {
    try {
      const estadoSerieInstance = new EstadoSerie();
      const estado = await estadoSerieInstance.update(id, campos);
      if (!estado) {
        return {
          error: true,
          code: 404,
          message: "No se pudo actualizar el estado de serie",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Estado de serie actualizado correctamente",
        data: estado,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al actualizar el estado de serie",
      };
    }
  }

  static async deleteEstadoSerie(id) {
    try {
      const estadoSerieInstance = new EstadoSerie();
      const result = await estadoSerieInstance.delete(id);
      if (result && result.affectedRows > 0) {
        return {
          error: false,
          code: 200,
          message: "Estado de serie eliminado correctamente",
          data: { id },
        };
      } else {
        return {
          error: true,
          code: 404,
          message: "No se pudo eliminar el estado de serie",
        };
      }
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al eliminar el estado de serie",
      };
    }
  }
}

export default EstadoSerieService;
