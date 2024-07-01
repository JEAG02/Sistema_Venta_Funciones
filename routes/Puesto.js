const express = require('express');
const router = express.Router();
const { puestos } = require('../data');

router.post('/', (req, res) => {
    const { numero, id_fila } = req.body;
    const id = puestos.length + 1;
    const nuevoPuesto = { id, numero, id_fila };
    puestos.push(nuevoPuesto);
    res.send(nuevoPuesto);
});

router.get('/', (req, res) => {
    res.send(puestos);
});

router.get('/:id', (req, res) => {
    const puesto = puestos.find(p => p.id === parseInt(req.params.id));
    if (!puesto) return res.status(404).send('Puesto no encontrado');
    res.send(puesto);
});

router.put('/:id', (req, res) => {
    let puesto = puestos.find(p => p.id === parseInt(req.params.id));
    if (!puesto) {
        return res.status(404).send('Puesto no encontrado');
    }
    puesto.numero = req.body.numero;
    puesto.id_fila = req.body.id_fila;
    res.send(puesto);
});

router.delete('/:id', (req, res) => {
    const puestoIndex = puestos.findIndex(p => p.id === parseInt(req.params.id));
    if (puestoIndex === -1) {
        return res.status(404).send('Puesto no encontrado');
    }
    const deletedPuesto = puestos.splice(puestoIndex, 1);
    res.send(deletedPuesto);
});

module.exports = router;
