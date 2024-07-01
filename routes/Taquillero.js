const express = require('express');
const router = express.Router();
const { taquilleros } = require('../data');

router.post('/', (req, res) => {
    const { nombre, apellido, salario } = req.body;
    const id = taquilleros.length + 1;
    const nuevoTaquillero = { id, nombre, apellido, salario };
    taquilleros.push(nuevoTaquillero);
    res.send(nuevoTaquillero);
});

router.get('/', (req, res) => {
    res.send(taquilleros);
});

router.get('/:id', (req, res) => {
    const taquillero = taquilleros.find(t => t.id === parseInt(req.params.id));
    if (!taquillero) return res.status(404).send('Taquillero no encontrado');
    res.send(taquillero);
});

router.put('/:id', (req, res) => {
    let taquillero = taquilleros.find(t => t.id === parseInt(req.params.id));
    if (!taquillero) {
        return res.status(404).send('Taquillero no encontrado');
    }
    taquillero.nombre = req.body.nombre;
    taquillero.apellido = req.body.apellido;
    taquillero.salario = req.body.salario;
    res.send(taquillero);
});

router.delete('/:id', (req, res) => {
    const taquilleroIndex = taquilleros.findIndex(t => t.id === parseInt(req.params.id));
    if (taquilleroIndex === -1) {
        return res.status(404).send('Taquillero no encontrado');
    }
    const deletedTaquillero = taquilleros.splice(taquilleroIndex, 1);
    res.send(deletedTaquillero);
});

module.exports = router;
