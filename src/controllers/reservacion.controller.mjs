import ReservacionService from "../services/reservacion.service.mjs";

const reservacionController = {
    getAll: async (req, res, next) => {
        try {
            const reservaciones = await ReservacionService.getAll();
            res.json(reservaciones);
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        const { placa, fecha, hora, espacioId } = req.body;
        try {
            const nueva = await ReservacionService.create(placa, fecha, hora, espacioId);
            res.status(201).json(nueva);
        } catch (err) {
            next(err);
        }
    },
    remove: async (req, res, next) => {
        const { id } = req.params;
        try {
            await ReservacionService.remove(id);
            res.json({ mensaje: "Reservación eliminada correctamente." });
        } catch (err) {
            next(err);
        }
    }
};

export default reservacionController;
