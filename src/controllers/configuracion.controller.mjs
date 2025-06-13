import ConfiguracionService from "../services/configuracion.service.mjs";

const configuracionController = {
    getTarifa: async (req, res, next) => {
        try {
            const tarifa = await ConfiguracionService.getTarifa();
            res.json(tarifa);
        } catch (err) {
            next(err);
        }
    },
    updateTarifa: async (req, res, next) => {
        const { tarifa } = req.body;
        try {
            await ConfiguracionService.updateTarifa(tarifa);
            res.json({ mensaje: "Tarifa actualizada correctamente." });
        } catch (err) {
            next(err);
        }
    }
};

export default configuracionController;
