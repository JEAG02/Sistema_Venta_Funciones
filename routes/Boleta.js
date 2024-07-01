const express = require('express');
const router = express.Router();
const { boletas } = require('../data');

router.post('/', (req, res) => {
    const {descripcion_boleta, id_funcion} = req.body;
    const id = boletas.length + 1;
    const crearboleta = { id, descripcion_boleta, id_funcion };
    boletas.push(crearboleta); 
    res.send(crearboleta);
});

router.get('/', (req, res) => {
    res.send(boletas);
});

router.get('/:id', (req, res) => {
    const boleta = boletas.find(b => b.id === parseInt(req.params.id));
    if (!boleta) return res.status(404).send('Boleta no encontrada');
    res.send(boleta);
});

router.put('/:id', (req, res) => {
    let boleta = boletas.find(c => c.id === parseInt(req.params.id));
    if (!boleta) {
        return res.status(404).send('Cliente no encontrado');
    }
    boleta.descripcion_boleta = req.body.descripcion_boleta;
    boleta.id_funcion = req.body.id_funcion;
    res.send(boleta);
});


router.delete('/:id', (req, res) => {
    const boletaIndex = boletas.findIndex(p => p.id === parseInt(req.params.id));
    if (boletaIndex === -1) {
        return res.status(404).send('Película no encontrada');
    }
    
    const deletedBoleta = boletas.splice(boletaIndex, 1);
    res.send(deletedBoleta);
});

module.exports = router;
