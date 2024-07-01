const express = require('express');
const router = express.Router();
const { ventas } = require('../data');

router.post('/', (req, res) => {
    const { fecha, cantidad_Ventas, id_Taquillero, id_Cliente } = req.body;
    const id = ventas.length + 1;
    const nuevaVenta = { id, fecha, cantidad_Ventas, id_Taquillero, id_Cliente };
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
    venta.cantidad_Ventas = req.body.cantidad_Ventas;
    venta.id_Taquillero = req.body.id_Taquillero;
    venta.id_Cliente = req.body.id_Cliente;
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

module.exports = router;
