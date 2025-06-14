import UsuarioService from "../services/usuario.service.mjs";

const usuarioController = {
    // Login
    login: async (req, res, next) => {
        const { usuario, contrasenia } = req.body;
        try {
            const user = await UsuarioService.login(usuario, contrasenia);
            if (user) {
                res.json({ usuario: user.usuario, rol: user.rol });
            } else {
                res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
            }
        } catch (err) {
            next(err);
        }
    },

    // Obtener todos los usuarios
    getAll: async (req, res, next) => {
        try {
            const usuarios = await UsuarioService.getAll();
            res.json(usuarios);
        } catch (err) {
            next(err);
        }
    },

    // Crear usuario
    create: async (req, res, next) => {
        const { usuario, contrasenia, rol } = req.body;
        try {
            const nuevo = await UsuarioService.create(usuario, contrasenia, rol);
            res.status(201).json(nuevo);
        } catch (err) {
            next(err);
        }
    },

    // Editar usuario
    update: async (req, res, next) => {
        const { id } = req.params;
        const { usuario, contrasenia, rol } = req.body;
        try {
            await UsuarioService.update(id, usuario, contrasenia, rol);
            res.json({ mensaje: "Usuario actualizado correctamente." });
        } catch (err) {
            next(err);
        }
    },

    // Eliminar usuario
    remove: async (req, res, next) => {
        const { id } = req.params;
        try {
            // Verifica si el usuario existe antes de eliminar
            const usuarios = await UsuarioService.getAll();
            const usuario = usuarios.find(u => u.id == id);
            if (!usuario) {
                return res.status(404).json({ mensaje: "Usuario no encontrado." });
            }
            await UsuarioService.remove(id);
            res.json({ mensaje: "Usuario eliminado correctamente." });
        } catch (err) {
            next(err);
        }
    }
};

export default usuarioController;