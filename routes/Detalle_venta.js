const express = require('express');
const router = express.Router();
const { detallesVenta } = require('../data');

router.post('/', (req, res) => {
    const { cantidad, precio, id_venta, id_boleta } = req.body;
    const id = detallesVenta.length + 1;
    const nuevoDetalleVenta = { id, cantidad, precio, id_venta, id_boleta };
    detallesVenta.push(nuevoDetalleVenta);
    res.send(nuevoDetalleVenta);
});

router.get('/', (req, res) => {
    res.send(detallesVenta);
});

router.get('/:id', (req, res) => {
    const detalleVenta = detallesVenta.find(d => d.id === parseInt(req.params.id));
    if (!detalleVenta) return res.status(404).send('Detalle de Venta no encontrado');
    res.send(detalleVenta);
});

router.put('/:id', (req, res) => {
    let detalleVenta = detallesVenta.find(d => d.id === parseInt(req.params.id));
    if (!detalleVenta) {
        return res.status(404).send('Detalle de Venta no encontrado');
    }
    detalleVenta.cantidad = req.body.cantidad;
    detalleVenta.precio = req.body.precio;
    detalleVenta.id_venta = req.body.id_venta;
    detalleVenta.id_boleta = req.body.id_boleta;

    res.send(detalleVenta);
});

router.delete('/:id', (req, res) => {
    const detalleVentaIndex = detallesVenta.findIndex(d => d.id === parseInt(req.params.id));
    if (detalleVentaIndex === -1) {
        return res.status(404).send('Detalle de Venta no encontrado');
    }
    const deletedDetalleVenta = detallesVenta.splice(detalleVentaIndex, 1);
    res.send(deletedDetalleVenta);
});

module.exports = router;
