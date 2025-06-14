import EspacioService from "../services/espacio.service.mjs";

const espacioController = {
    getAll: async (req, res, next) => {
        try {
            const espacios = await EspacioService.getAll();
            // Devuelve los datos en el mismo formato para admin y empleado
            res.json(espacios);
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        const { numero, estado } = req.body;
        try {
            const nuevo = await EspacioService.create(numero, estado);
            // Devuelve el nuevo espacio creado en el mismo formato
            res.status(201).json(nuevo);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        const { id } = req.params;
        const { numero, estado } = req.body;
        try {
            await EspacioService.update(id, numero, estado);
            res.json({ mensaje: "Espacio actualizado correctamente." });
        } catch (err) {
            next(err);
        }
    },
    patchEstado: async (req, res, next) => {
        const { id } = req.params;
        const { estado } = req.body;
        try {
            await EspacioService.patchEstado(id, estado);
            res.json({ mensaje: "Estado actualizado correctamente." });
        } catch (err) {
            next(err);
        }
    },
    remove: async (req, res, next) => {
        const { id } = req.params;
        try {
            await EspacioService.remove(id);
            // Devuelve el mismo mensaje de éxito para admin y empleado
            res.json({ mensaje: "Espacio eliminado correctamente." });
        } catch (err) {
            next(err);
        }
    }
};

export default espacioController;
