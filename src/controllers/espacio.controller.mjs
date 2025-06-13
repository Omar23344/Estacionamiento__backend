import EspacioService from "../services/espacio.service.mjs";

const espacioController = {
    getAll: async (req, res, next) => {
        try {
            const espacios = await EspacioService.getAll();
            res.json(espacios);
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        const { numero, estado } = req.body;
        try {
            const nuevo = await EspacioService.create(numero, estado);
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
            res.json({ mensaje: "Espacio eliminado correctamente." });
        } catch (err) {
            next(err);
        }
    }
};

export default espacioController;
