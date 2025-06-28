import MeGustaCapitulo from "../models/MeGustaCapitulo.js";

class MeGustaCapituloService {
  static async getMeGustas(id_Capitulo) {
    try {
      const mgInstance = new MeGustaCapitulo();
      const meGustas = await mgInstance.getAllByCapitulo(id_Capitulo);
      if (meGustas.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay me gusta registrados para este capítulo",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Me gusta obtenidos correctamente",
        data: meGustas,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener los me gusta",
      };
    }
  }

  static async getMeGustaById(id_Capitulo, id_Usuario) {
    try {
      const mgInstance = new MeGustaCapitulo();
      const meGusta = await mgInstance.getById(id_Capitulo, id_Usuario);
      if (!meGusta || meGusta.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Me gusta no encontrado",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Me gusta obtenido correctamente",
        data: meGusta,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener el me gusta",
      };
    }
  }

  static async createMeGusta(data) {
    try {
      const mgInstance = new MeGustaCapitulo();
      const meGusta = await mgInstance.create(data);
      if (meGusta === null) {
        return {
          error: true,
          code: 400,
          message: "Ya existe un me gusta para este usuario y capítulo",
        };
      }
      return {
        error: false,
        code: 201,
        message: "Me gusta registrado correctamente",
        data: meGusta,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al registrar el me gusta",
      };
    }
  }

  static async deleteMeGusta(id_Capitulo, id_Usuario) {
    try {
      const mgInstance = new MeGustaCapitulo();
      const meGustaExistente = await mgInstance.getById(id_Capitulo, id_Usuario);
      if (!meGustaExistente || meGustaExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Me gusta no encontrado",
        };
      }
      const resultado = await mgInstance.delete(id_Capitulo, id_Usuario);
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
        message: "Me gusta eliminado correctamente",
        data: meGustaExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar el me gusta",
      };
    }
  }
}

export default MeGustaCapituloService;
