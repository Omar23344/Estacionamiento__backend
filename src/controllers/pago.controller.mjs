import PagoService from "../services/pago.service.mjs";

const pagoController = {
    getAll: async (req, res, next) => {
        try {
            const pagos = await PagoService.getAll();
            res.json(pagos);
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        const { placa, monto, metodo } = req.body;
        try {
            const nuevo = await PagoService.create(placa, monto, metodo);
            res.status(201).json(nuevo);
        } catch (err) {
            next(err);
        }
    }
};

export default pagoController;
