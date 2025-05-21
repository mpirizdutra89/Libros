const express = require('express')
const router = express.Router();
const { listaA, listaB } = require('../controllers/listadosController');




router.post('/lista-b', listaB)
router.get('/lista.-a', listaA)


module.exports = router

