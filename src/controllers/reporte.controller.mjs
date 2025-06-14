import ReporteService from "../services/reporte.service.mjs";

const reporteController = {
    // Reporte por semana: GET /reportes/semana?fecha=YYYY-MM-DD
    getBySemana: async (req, res, next) => {
        const { fecha } = req.query;
        try {
            const reportes = await ReporteService.getBySemana(fecha);
            res.json(reportes);
        } catch (err) {
            next(err);
        }
    },
    // Historial de pagos por día: GET /reportes/pagos?fecha=YYYY-MM-DD
    pagosPorDia: async (req, res, next) => {
        const { fecha } = req.query;
        try {
            const pagos = await ReporteService.pagosPorDia(fecha);
            res.json(pagos);
        } catch (err) {
            next(err);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const reportes = await ReporteService.getAll();
            res.json(reportes);
        } catch (err) {
            next(err);
        }
    },
    exportar: async (req, res, next) => {
        const { fecha, formato } = req.query;
        try {
            const archivo = await ReporteService.exportar(fecha, formato);
            res.json({ mensaje: "Exportación simulada", archivo });
        } catch (err) {
            next(err);
        }
    }
};

export default reporteController;
