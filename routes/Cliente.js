const express = require('express');
const router = express.Router();
const { clientes } = require('../data');

router.post('/', (req, res) => {
    const { nombre, apellido } = req.body;
    const id = clientes.length + 1;
    const nuevoCliente = { id, nombre, apellido };
    clientes.push(nuevoCliente);
    res.send(nuevoCliente);
});

router.get('/', (req, res) => {
    res.send(clientes);
});

router.get('/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    res.send(cliente);
});

router.put('/:id', (req, res) => {
    let cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) {
        return res.status(404).send('Cliente no encontrado');
    }
    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    res.send(cliente);
});

router.delete('/:id', (req, res) => {
    const clienteIndex = clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (clienteIndex === -1) {
        return res.status(404).send('Cliente no encontrado');
    }
    const deletedCliente = clientes.splice(clienteIndex, 1);
    res.send(deletedCliente);
});

module.exports = router;
