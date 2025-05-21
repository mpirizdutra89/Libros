const express = require('express')
const router = express.Router();
const { gestionInit, nuevoLibro } = require('../controllers/gestionController');




router.post('/nuevo-libro', nuevoLibro)
router.get('/', gestionInit)


module.exports = router