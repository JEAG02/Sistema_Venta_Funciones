const express = require('express');
const router = express.Router();
const { filas } = require('../data');

router.post('/', (req, res) => {
    const { numero_fila, id_sala } = req.body;
    const id = filas.length + 1;
    const nuevaFila = { id, numero_fila, id_sala };
    filas.push(nuevaFila);
    res.send(nuevaFila);
});

router.get('/', (req, res) => {
    res.send(filas);
});

router.get('/:id', (req, res) => {
    const fila = filas.find(f => f.id === parseInt(req.params.id));
    if (!fila) return res.status(404).send('Fila no encontrada');
    res.send(fila);
});

router.put('/:id', (req, res) => {
    let fila = filas.find(f => f.id === parseInt(req.params.id));
    if (!fila) {
        return res.status(404).send('Fila no encontrada');
    }
    fila.numero_fila = req.body.numero_fila;
    fila.id_sala = req.body.id_sala;
    res.send(fila);
});

router.delete('/:id', (req, res) => {
    const filaIndex = filas.findIndex(f => f.id === parseInt(req.params.id));
    if (filaIndex === -1) {
        return res.status(404).send('Fila no encontrada');
    }
    const deletedFila = filas.splice(filaIndex, 1);
    res.send(deletedFila);
});

module.exports = router;
