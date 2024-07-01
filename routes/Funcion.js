const express = require('express');
const router = express.Router();
const { funciones } = require('../data');

router.post('/', (req, res) => {
    const { hora_funcion, fecha_funcion, id_Pelicula, id_Sala } = req.body;
    const id = funciones.length + 1;
    const nuevaFuncion = { id, hora_funcion, fecha_funcion, id_Pelicula, id_Sala };
    funciones.push(nuevaFuncion);
    res.send(nuevaFuncion);
});

router.get('/', (req, res) => {
    res.send(funciones);
});

router.get('/:id', (req, res) => {
    const funcion = funciones.find(f => f.id === parseInt(req.params.id));
    if (!funcion) return res.status(404).send('Función no encontrada');
    res.send(funcion);
});

router.put('/:id', (req, res) => {
    let funcion = funciones.find(f => f.id === parseInt(req.params.id));
    if (!funcion) {
        return res.status(404).send('Función no encontrada');
    }
    funcion.hora_funcion = req.body.hora_funcion;
    funcion.fecha_funcion = req.body.fecha_funcion;
    funcion.id_Pelicula = req.body.id_Pelicula;
    funcion.id_Sala = req.body.id_Sala;
    res.send(funcion);
});

router.delete('/:id', (req, res) => {
    const funcionIndex = funciones.findIndex(f => f.id === parseInt(req.params.id));
    if (funcionIndex === -1) {
        return res.status(404).send('Función no encontrada');
    }
    const deletedFuncion = funciones.splice(funcionIndex, 1);
    res.send(deletedFuncion);
});

module.exports = router;
