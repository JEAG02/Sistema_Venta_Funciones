const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const localidadRoutes = require('./routes/Localidad');
const clienteRoutes = require('./routes/Cliente');
const lfRoutes = require('./routes/Localidad_funcion');
const filaRoutes = require('./routes/Fila');
const funcionRoutes = require('./routes/Funcion');
const peliculaRoutes = require('./routes/Pelicula');
const puestoRoutes = require('./routes/Puesto');
const salaRoutes = require('./routes/Sala');
const taquilleroRoutes = require('./routes/Taquillero');
const ventaRoutes = require('./routes/Venta');

app.use(bodyParser.json());
app.use(cors());

app.use('/localidades', localidadRoutes);
app.use('/clientes', clienteRoutes);
app.use('/localidad_funcion', lfRoutes);
app.use('/filas', filaRoutes);
app.use('/funciones', funcionRoutes);
app.use('/peliculas', peliculaRoutes);
app.use('/puestos', puestoRoutes);
app.use('/salas', salaRoutes);
app.use('/taquilleros', taquilleroRoutes);
app.use('/ventas', ventaRoutes);


app.listen(port, () => {
    console.log(`App de cine corriendo en http://localhost:${port}`);
});
