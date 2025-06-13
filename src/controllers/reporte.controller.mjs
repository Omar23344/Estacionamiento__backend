import ReporteService from "../services/reporte.service.mjs";

const reporteController = {
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
            // Aquí deberías enviar el archivo como descarga, ejemplo:
            // res.download(archivo.path, archivo.filename);
            res.json({ mensaje: "Exportación simulada", archivo });
        } catch (err) {
            next(err);
        }
    }
};

export default reporteController;
