// Archivo de configuración de la base de datos
import pool from "../middlewares/db.mjs";

const UsuarioService = {
    // Buscar usuario por usuario y contraseña
    login: async (usuario, contrasenia) => {
        const result = await pool.query(
            "SELECT usuario, rol FROM usuarios WHERE usuario = $1 AND contrasenia = $2",
            [usuario, contrasenia]
        );
        return result.rows[0] || null;
    },
    // Obtener todos los usuarios
    getAll: async () => {
        const result = await pool.query("SELECT id, usuario, rol FROM usuarios");
        return result.rows;
    },
    // Crear un nuevo usuario
    create: async (usuario, contrasenia, rol) => {
        const result = await pool.query(
            "INSERT INTO usuarios (usuario, contrasenia, rol) VALUES ($1, $2, $3) RETURNING id, usuario, rol",
            [usuario, contrasenia, rol]
        );
        return result.rows[0];
    },
    // Editar usuario
    update: async (id, usuario, contrasenia, rol) => {
        await pool.query(
            "UPDATE usuarios SET usuario = $1, contrasenia = $2, rol = $3 WHERE id = $4",
            [usuario, contrasenia, rol, id]
        );
    },
    // Eliminar usuario
    remove: async (id) => {
        // Elimina el usuario por id (asegúrate que el id sea numérico)
        await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
    }
};

export default UsuarioService;