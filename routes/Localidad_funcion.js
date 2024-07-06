const express = require('express');
const router = express.Router();
const { Lf } = require('../data');

router.post('/', (req, res) => {
    const { precio, id_localidad, id_funcion } = req.body;
    const id = Lf.length + 1;
    const locfun = { id, precio, id_localidad, id_funcion };
    Lf.push(locfun);
    res.send(locfun);
});

router.get('/', (req, res) => {
    res.send(Lf);
});

router.get('/:id', (req, res) => {
    const locfun = Lf.find(d => d.id === parseInt(req.params.id));
    if (!locfun) return res.status(404).send('Resultado no encontrado');
    res.send(locfun);
});

router.put('/:id', (req, res) => {
    let locfun = Lf.find(d => d.id === parseInt(req.params.id));
    if (!locfun) {
        return res.status(404).send('Resultado no encontrado');
    }
    locfun.precio = req.body.precio;
    locfun.id_localidad = req.body.id_localidad;
    locfun.id_funcion = req.body.id_funcion;

    res.send(locfun);
});

router.delete('/:id', (req, res) => {
    const locfunIndex = Lf.findIndex(d => d.id === parseInt(req.params.id));
    if (locfunIndex === -1) {
        return res.status(404).send('Resultado no encontrado');
    }
    const deletedlocfun = Lf.splice(locfunIndex, 1);
    res.send(deletedlocfun);
});

module.exports = router;
