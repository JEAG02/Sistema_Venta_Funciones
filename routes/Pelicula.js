const express = require('express');
const router = express.Router();
const { peliculas } = require('../data');

router.post('/', (req, res) => {
    const {nombre} = req.body;
    const id = peliculas.length + 1;
    const crearpelicula = { id, nombre };
    peliculas.push(crearpelicula); 
    res.send(crearpelicula);
});

router.get('/', (req, res) => {
    res.send(peliculas);
});

router.get('/:id', (req, res) => {
    const pelicula = peliculas.find(p => p.id === parseInt(req.params.id));
    if (!pelicula) return res.status(404).send('Película no encontrada');
    res.send(pelicula);
});

router.put('/:id', (req, res) => {
    let pelicula = peliculas.find(p => p.id === parseInt(req.params.id));
    if (pelicula) {
        const { nombre } = req.body;
        pelicula.nombre = nombre;
        res.status(200).json(pelicula);
    } else {
        res.status(404).json({ message: 'Pelicula no encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const peliculaIndex = peliculas.findIndex(p => p.id === parseInt(req.params.id));
    if (peliculaIndex === -1) {
        return res.status(404).send('Película no encontrada');
    }
    
    const deletedPelicula = peliculas.splice(peliculaIndex, 1);
    res.send(deletedPelicula);
});


module.exports = router;
