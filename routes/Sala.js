const express = require('express');
const router = express.Router();
const { salas } = require('../data');

router.post('/', (req, res) => {
    const { numero, cantidad_sillas } = req.body;
    const id = salas.length + 1;
    const nuevaSala = { id, numero, cantidad_sillas };
    salas.push(nuevaSala);
    res.send(nuevaSala);
});

router.get('/', (req, res) => {
    res.send(salas);
});

router.get('/:id', (req, res) => {
    const sala = salas.find(s => s.id === parseInt(req.params.id));
    if (!sala) return res.status(404).send('Sala no encontrada');
    res.send(sala);
});

router.put('/:id', (req, res) => {
    let sala = salas.find(s => s.id === parseInt(req.params.id));
    if (!sala) {
        return res.status(404).send('Sala no encontrada');
    }
    sala.numero = req.body.numero;
    sala.cantidad_sillas = req.body.cantidad_sillas;
    res.send(sala);
});

router.delete('/:id', (req, res) => {
    const salaIndex = salas.findIndex(s => s.id === parseInt(req.params.id));
    if (salaIndex === -1) {
        return res.status(404).send('Sala no encontrada');
    }
    const deletedSala = salas.splice(salaIndex, 1);
    res.send(deletedSala);
});

module.exports = router;
