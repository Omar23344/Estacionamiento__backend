import VehiculoService from "../services/vehiculo.service.mjs";

const vehiculoController = {
    create: async (req, res, next) => {
        const { placa, marca, modelo, color, espacioId } = req.body;
        try {
            const nuevo = await VehiculoService.create(placa, marca, modelo, color, espacioId);
            res.status(201).json(nuevo);
        } catch (err) {
            next(err);
        }
    },
    historial: async (req, res, next) => {
        try {
            const historial = await VehiculoService.historial();
            res.json(historial);
        } catch (err) {
            next(err);
        }
    },
    salida: async (req, res, next) => {
        const { id } = req.params;
        try {
            const result = await VehiculoService.salida(id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
};

export default vehiculoController;
