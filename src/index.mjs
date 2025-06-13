//Librerias
import "rootpath";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

//Archivos de configuaracion propios
import config from "./middlewares/config.mjs";
import errorHandler from "./middlewares/error-handler.mjs";

// archivos que procesan las entidades (tablas) del proyecto
import clienteRoutes from "./routes/cliente.routes.mjs";
import usuarioRoutes from "./routes/usuario.routes.mjs";
import espacioRoutes from "./routes/espacio.routes.mjs";
import vehiculoRoutes from "./routes/vehiculo.routes.mjs";
import pagoRoutes from "./routes/pago.routes.mjs";
import reservacionRoutes from "./routes/reservacion.routes.mjs";
import reporteRoutes from "./routes/reporte.routes.mjs";
import configuracionRoutes from "./routes/configuracion.routes.mjs";

// se instancia el servidor
const app = express();

//libreria en tiempo de desarrollo para poder ver el tipo de peticion que te estan mandando
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //decodifica los json que envia el cliente
app.use(bodyParser.json()); //decodifica los json que envia el cliente
app.use(cors()); // evita que tengas el error de no poder conectarte a tu mismo servidor

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz para comprobar que el backend está activo
app.get("/", (req, res) => {
    res.json({ mensaje: "API de Estacionamiento funcionando" });
});

//se establecen tus rutas o tus apis o tus endpoints
app.use(clienteRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/espacios", espacioRoutes);
app.use("/vehiculos", vehiculoRoutes);
app.use("/pagos", pagoRoutes);
app.use("/reservaciones", reservacionRoutes);
app.use("/reportes", reporteRoutes);
app.use("/configuracion", configuracionRoutes);

app.use(errorHandler);

// inicia el servidor
const PORT = config.PORT; // Usa el puerto del .env/config
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});