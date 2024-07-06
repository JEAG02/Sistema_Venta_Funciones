const express = require('express');
const router = express.Router();
const { localidades } = require('../data');

router.post('/', (req, res) => {
    const { nombre, capacidad, id_sala } = req.body;
    const id = localidades.length + 1;
    const crearlocalidad = { id, nombre, capacidad, id_sala };
    localidades.push(crearlocalidad); 
    res.send(crearlocalidad);
});

router.get('/', (req, res) => {
    res.send(localidades);
});

router.get('/:id', (req, res) => {
    const localidad = localidades.find(b => b.id === parseInt(req.params.id));
    if (!localidad) return res.status(404).send('Localidad no encontrada');
    res.send(localidad);
});

router.put('/:id', (req, res) => {
    let localidad = localidades.find(c => c.id === parseInt(req.params.id));
    if (!localidad) {
        return res.status(404).send('Localidad no encontrada');
    }
    localidad.nombre = req.body.nombre;
    localidad.capacidad = req.body.capacidad;
    localidad.id_sala = req.body.id_sala;
    res.send(localidad);
});


router.delete('/:id', (req, res) => {
    const localidadIndex = localidades.findIndex(p => p.id === parseInt(req.params.id));
    if (localidadIndex === -1) {
        return res.status(404).send('Localidad no encontrada');
    }
    
    const deletedLocalidad = localidades.splice(localidadIndex, 1);
    res.send(deletedLocalidad);
});

module.exports = router;
