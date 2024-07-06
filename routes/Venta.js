const express = require('express');
const router = express.Router();
const { ventas } = require('../data');
const { localidades, puestos } = require('../data');


router.post('/', (req, res) => {
    const { fecha, dni_Taquillero, dni_Cliente, id_puesto, id_funcion } = req.body;
    const ventaExistente = ventas.find(v =>
        v.id_puesto === id_puesto &&
        v.id_funcion === id_funcion
    );

    if (ventaExistente) {
        return res.status(400).send('Este puesto ya ha sido vendido para esta función.');
    }


    const id = ventas.length + 1;
    const nuevaVenta = { id, fecha, dni_Taquillero, dni_Cliente, id_puesto, id_funcion };
    ventas.push(nuevaVenta);
    res.send(nuevaVenta);
});

router.get('/', (req, res) => {
    res.send(ventas);
});

router.get('/:id', (req, res) => {
    const venta = ventas.find(v => v.id === parseInt(req.params.id));
    if (!venta) return res.status(404).send('Venta no encontrada');
    res.send(venta);
});

router.put('/:id', (req, res) => {
    let venta = ventas.find(v => v.id === parseInt(req.params.id));
    if (!venta) {
        return res.status(404).send('Venta no encontrada');
    }
    venta.id_fecha = req.body.fecha;
    venta.dni_Taquillero = req.body.dni_Taquillero;
    venta.dni_Cliente = req.body.dni_Cliente;
    venta.id_puesto = req.body.id_puesto;
    venta.id_funcion = req.body.id_funcion;
    res.send(venta);
});

router.delete('/:id', (req, res) => {
    const ventaIndex = ventas.findIndex(v => v.id === parseInt(req.params.id));
    if (ventaIndex === -1) {
        return res.status(404).send('Venta no encontrada');
    }
    const deletedVenta = ventas.splice(ventaIndex, 1);
    res.send(deletedVenta);
});


//ENDPOINTS

//1.VER TODAS LAS VENTAS HECHAS POR UN TAQUILLERO
router.get('/taquillero/:dni_Taquillero', (req, res) => {
    const dni_Taquillero = parseInt(req.params.dni_Taquillero);
    const ventasPorTaquillero = ventas.filter(v => v.dni_Taquillero === dni_Taquillero);
    if (ventasPorTaquillero.length === 0) {
        return res.status(404).send('No se encontraron ventas para el taquillero especificado.');
    }
    res.send(ventasPorTaquillero);
});

//2.VER TODAS LAS VENTAS HECHAS POR UN CLIENTE
router.get('/cliente/:dni_Cliente', (req, res) => {
    const dni_Cliente = parseInt(req.params.dni_Cliente);
    const ventasPorCliente = ventas.filter(v => v.dni_Cliente === dni_Cliente);
    if (ventasPorCliente.length === 0) {
        return res.status(404).send('No se encontraron ventas para el cliente especificado.');
    }
    res.send(ventasPorCliente);
});

//3. VER TODAS LAS VENTAS POR FUNCION
router.get('/funcion/:id_funcion', (req, res) => {
    const id_funcion = parseInt(req.params.id_funcion);
    const ventasPorFuncion = ventas.filter(v => v.id_funcion === id_funcion);
    if (ventasPorFuncion.length === 0) {
        return res.status(404).send('No se encontraron ventas para la función especificada.');
    }
    res.send(ventasPorFuncion);
});

//4. VER TODAS LAS VENTAS POR LOCALIDAD
router.get('/ventas_por_localidad', (req, res) => {
    const ventasPorLocalidad = localidades.map(localidad => {
        const ventasDeLocalidad = ventas.filter(v => {
            const puesto = puestos.find(p => p.id === v.id_puesto);
            return puesto && puesto.id_localidad === localidad.id;
        });
        return { id_localidad: localidad.id, nombre_localidad: localidad.nombre, cantidad_ventas: ventasDeLocalidad.length };
    });
    res.send(ventasPorLocalidad);
});

//5. VER VENTA ESPECIFICA POR ID
router.get('/:id', (req, res) => {
    const ventaId = parseInt(req.params.id);
    const venta = ventas.find(v => v.id === ventaId);

    if (!venta) {
        return res.status(404).send('Venta no encontrada');
    }

    res.send(venta);
});


module.exports = router;
